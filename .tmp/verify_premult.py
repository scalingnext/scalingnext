import struct, os
from PIL import Image
import io

TARGET_DIR = r"C:\Users\Amol\Downloads\macOS-cursors-for-Windows-main\macOS-cursors-for-Windows-main\1. Sierra and newer\2. With Shadow\3. XtraLarge"
FILES = [
    "Alternate.cur","Diagonal Resize 1.cur","Diagonal Resize 2.cur","Handwriting.cur",
    "Help.cur","Horizontal Resize.cur","Move.cur","Normal.cur","Vertical Resize.cur",
    "Working.ani","Zoom-in.cur","Zoom-out.cur",
]
PNG_SIG = b"\x89PNG\r\n\x1a\n"

def bmp_get(data, offset, size):
    blob = bytearray(data[offset:offset+size])
    width  = struct.unpack("<i", blob[4:8])[0]
    height = struct.unpack("<i", blob[8:12])[0]
    bpp    = struct.unpack("<H", blob[14:16])[0]
    info_size = struct.unpack("<I", blob[:4])[0]
    h_abs = abs(height)
    doubled = (h_abs % 2 == 0) and (h_abs != width)
    color_h = h_abs // 2 if doubled else h_abs
    pal_size = 0
    if bpp <= 8:
        clrused = struct.unpack("<I", blob[32:36])[0]
        n = clrused if clrused else (1 << bpp)
        pal_size = n*4
    px_off = info_size + pal_size
    row_bytes = ((width*bpp+31)//32)*4
    px_len = row_bytes*color_h
    return dict(width=width, color_h=color_h, bpp=bpp, px_off=px_off, row_bytes=row_bytes,
                px_len=px_len, blob=blob)

def check_32bit_premult(data):
    """Return (max_excess, count_excess) where excess = channel - alpha (should be <=0 if premult)."""
    max_excess = 0; count_excess = 0; total_px = 0
    count = struct.unpack("<H", data[4:6])[0]
    for i in range(count):
        e = data[6+i*16:6+(i+1)*16]
        w,h,colors,r2,hx,hy,size,offset = struct.unpack("<BBBBHHII", e)
        blob = data[offset:offset+size]
        if blob[:8] == PNG_SIG:
            continue
        info = bmp_get(data, offset, size)
        if info["bpp"] != 32:
            continue
        pd = info["blob"][info["px_off"]:info["px_off"]+info["px_len"]]
        for k in range(0, len(pd), 4):
            b,g,r,a = pd[k], pd[k+1], pd[k+2], pd[k+3]
            total_px += 1
            for ch in (b,g,r):
                excess = ch - a
                if excess > max_excess: max_excess = excess
                if excess > 0: count_excess += 1
    return max_excess, count_excess, total_px

# also check the embedded ani frames
def check_ani_premult(data):
    max_e=0; cnt=0; tot=0
    off=12; end=len(data)
    while off < end-8:
        cid = data[off:off+4]; csize = struct.unpack("<I", data[off+4:off+8])[0]
        bs = off+8; be = bs+csize
        if cid==b"LIST" and data[bs:bs+4]==b"fram":
            ioff=bs+4
            while ioff < be-8:
                fcid = data[ioff:ioff+4]; fsz = struct.unpack("<I", data[ioff+4:ioff+8])[0]
                if fcid==b"icon":
                    cur = data[ioff+8:ioff+8+fsz]
                    me,ce,tp = check_32bit_premult(cur)
                    if me>max_e: max_e=me
                    cnt+=ce; tot+=tp
                ioff += 8+fsz+(fsz&1)
        off += 8+csize+(csize&1)
    return max_e, cnt, tot

for name in FILES:
    p = os.path.join(TARGET_DIR, name)
    with open(p,"rb") as f: data=f.read()
    if name.lower().endswith(".ani"):
        me,ce,tot = check_ani_premult(data)
    else:
        me,ce,tot = check_32bit_premult(data)
    flag = "PREMULT" if (me==0 and ce==0) else f"NOT-premult (max_excess={me}, count={ce})"
    print(f"{name:28s} 32bit px={tot:8d}  -> {flag}")
