import struct, io, os, shutil
from PIL import Image

TARGET_DIR = r"C:\Users\Amol\Downloads\macOS-cursors-for-Windows-main\macOS-cursors-for-Windows-main\1. Sierra and newer\2. With Shadow\3. XtraLarge"
BACKUP_DIR = os.path.join(os.environ["TEMP"], "cursor_invert_backup")
FILES = [
    "Alternate.cur",
    "Diagonal Resize 1.cur",
    "Diagonal Resize 2.cur",
    "Handwriting.cur",
    "Help.cur",
    "Horizontal Resize.cur",
    "Move.cur",
    "Normal.cur",
    "Vertical Resize.cur",
    "Working.ani",
    "Zoom-in.cur",
    "Zoom-out.cur",
]
PNG_SIG = b"\x89PNG\r\n\x1a\n"


# ---------- per-format inverters (return raw image bytes) ----------

def invert_png_bytes(blob):
    """RGBA PNG -> invert RGB, keep straight alpha, re-save RGBA PNG."""
    im = Image.open(io.BytesIO(blob)).convert("RGBA")
    r, g, b, a = im.split()
    r = r.point(lambda v: 255 - v)
    g = g.point(lambda v: 255 - v)
    b = b.point(lambda v: 255 - v)
    out = Image.merge("RGBA", (r, g, b, a))
    bio = io.BytesIO()
    out.save(bio, format="PNG")
    return bio.getvalue()


def bmp_parse(data, offset, size):
    blob = bytearray(data[offset:offset + size])
    info_size = struct.unpack("<I", blob[:4])[0]
    width = struct.unpack("<i", blob[4:8])[0]
    height = struct.unpack("<i", blob[8:12])[0]      # signed; doubled when AND mask present
    bpp = struct.unpack("<H", blob[14:16])[0]
    h_abs = abs(height)
    doubled = (h_abs % 2 == 0) and (h_abs != width) and (h_abs // 2 >= 1)
    color_h = h_abs // 2 if doubled else h_abs

    pal_off = info_size
    pal_size = 0
    if bpp <= 8:
        clrused = struct.unpack("<I", blob[32:36])[0]
        n = clrused if clrused else (1 << bpp)
        pal_size = n * 4
    px_off = info_size + pal_size
    row_bytes = ((width * bpp + 31) // 32) * 4
    px_len = row_bytes * color_h
    mask_off = px_off + px_len
    mask_row = ((width + 31) // 32) * 4
    mask_len = mask_row * width if doubled else 0
    return dict(
        blob=blob, info_size=info_size, width=width, height=height, bpp=bpp,
        color_h=color_h, doubled=doubled,
        pal_off=pal_off, pal_size=pal_size,
        px_off=px_off, row_bytes=row_bytes, px_len=px_len,
        mask_off=mask_off, mask_row=mask_row, mask_len=mask_len,
    )


def invert_bmp(data, offset, size):
    """Invert one embedded BMP and return complete new blob bytes.
    Info header, AND mask, and padding are preserved byte-for-byte; only color data changes.
    The 32-bit BMPs in this set are STRAIGHT (non-premultiplied) alpha -> invert via 255-channel."""
    info = bmp_parse(data, offset, size)
    blob = bytearray(info["blob"])
    bpp = info["bpp"]
    px_off, px_len = info["px_off"], info["px_len"]
    pd = blob[px_off:px_off + px_len]

    if bpp == 32:
        # BGRA, straight alpha. Invert B,G,R; keep A.
        mv = bytearray(pd)
        for i in range(0, len(mv), 4):
            mv[i]     = 255 - mv[i]
            mv[i + 1] = 255 - mv[i + 1]
            mv[i + 2] = 255 - mv[i + 2]
            # alpha byte untouched
        blob[px_off:px_off + px_len] = mv
    elif bpp == 24:
        mv = bytearray(pd)
        for j in range(0, len(mv), 3):
            mv[j]     = 255 - mv[j]
            mv[j + 1] = 255 - mv[j + 1]
            mv[j + 2] = 255 - mv[j + 2]
        blob[px_off:px_off + px_len] = mv
    elif bpp <= 8:
        # indexed: flip palette RGB only (indices + AND mask unchanged)
        pal_off, pal_size = info["pal_off"], info["pal_size"]
        pal = bytearray(blob[pal_off:pal_off + pal_size])
        for i in range(len(pal) // 4):
            pal[i * 4]     = 255 - pal[i * 4]        # B
            pal[i * 4 + 1] = 255 - pal[i * 4 + 1]    # G
            pal[i * 4 + 2] = 255 - pal[i * 4 + 2]    # R
            # reserved byte unchanged
        blob[pal_off:pal_off + pal_size] = pal
    else:
        raise RuntimeError("unsupported bpp %d" % bpp)
    return bytes(blob)


def invert_image(data, offset, size):
    blob = data[offset:offset + size]
    if blob[:8] == PNG_SIG:
        return invert_png_bytes(blob)
    return invert_bmp(data, offset, size)


# ---------- container rebuilders ----------

def invert_cur_file(data):
    """Rebuild a CUR/ICO file with inverted variants. Because PNG re-encode changes size,
    we recompute each directory entry's size/offset and concatenate new image blobs."""
    reserved, ctype, count = struct.unpack("<HHH", data[:6])
    entries = []
    new_images = []
    for i in range(count):
        e = data[6 + i * 16:6 + (i + 1) * 16]
        w, h, colors, r2, hx, hy, size, offset = struct.unpack("<BBBBHHII", e)
        new_img = invert_image(data, offset, size)
        entries.append((w, h, colors, r2, hx, hy, len(new_img)))
        new_images.append(new_img)

    header_size = 6 + count * 16
    out = bytearray()
    out += struct.pack("<HHH", reserved, ctype, count)
    # compute offsets
    cursor = header_size
    dir_bytes = bytearray()
    for (w, h, colors, r2, hx, hy, new_size), img in zip(entries, new_images):
        dir_bytes += struct.pack("<BBBBHHII", w, h, colors, r2, hx, hy, new_size, cursor)
        cursor += len(img)
    out += dir_bytes
    for img in new_images:
        out += img
    return bytes(out)


def invert_ani_file(data):
    """Walk RIFF/ACON, invert each embedded 'icon' CUR blob. Each embedded icon is a
    single-frame CUR (128x128 32-bit BMP + AND mask). Inverting is byte-for-byte size-preserving
    for 32-bit BMPs, so chunk sizes/padding stay valid. We rebuild icon blobs by replacing
    the single variant and rewriting its directory entry size."""
    out = bytearray(data)
    end = len(data)
    off = 12
    while off < end - 8:
        cid = bytes(data[off:off + 4])
        csize = struct.unpack("<I", data[off + 4:off + 8])[0]
        bs = off + 8
        be = bs + csize
        if cid == b"LIST" and data[bs:bs + 4] == b"fram":
            ioff = bs + 4
            while ioff < be - 8:
                fcid = data[ioff:ioff + 4]
                fsz = struct.unpack("<I", data[ioff + 4:ioff + 8])[0]
                fstart = ioff + 8
                if fcid == b"icon":
                    cur_blob = bytes(data[fstart:fstart + fsz])
                    new_blob = invert_cur_file(cur_blob)
                    if len(new_blob) != fsz:
                        # embedded 128x128 32-bit BMPs are size-preserving; if this ever
                        # triggers we would need to rewrite the whole RIFF. Assert to be safe.
                        raise RuntimeError("embedded icon size changed (%d -> %d) -- RIFF rebuild needed" % (fsz, len(new_blob)))
                    out[fstart:fstart + fsz] = new_blob
                ioff += 8 + fsz + (fsz & 1)
        off += 8 + csize + (csize & 1)
    return bytes(out)


# ---------------- main ----------------
os.makedirs(BACKUP_DIR, exist_ok=True)
report = []
for name in FILES:
    src = os.path.join(TARGET_DIR, name)
    if not os.path.exists(src):
        report.append("MISSING: " + name)
        continue
    bak = os.path.join(BACKUP_DIR, name)
    shutil.copy2(src, bak)
    with open(src, "rb") as f:
        data = f.read()
    new_data = invert_ani_file(data) if name.lower().endswith(".ani") else invert_cur_file(data)
    with open(src, "wb") as f:
        f.write(new_data)
    report.append("OK   %-26s %8d -> %8d bytes" % (name, len(data), len(new_data)))

print("\n".join(report))
print("\nBackups at: " + BACKUP_DIR)
