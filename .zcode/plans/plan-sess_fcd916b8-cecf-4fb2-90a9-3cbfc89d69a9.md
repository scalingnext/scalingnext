## Restyle pass: content fixes + smooth animations

### Phase A — Content correctness (high impact)

**A1. Rebuild `components/sections/Curriculum.tsx`** *(biggest change)*
- **Decision: Inline + live content** — match the live site exactly.
- Replace the fabricated module data + Accordion with an **inline module layout**: each module renders as a titled block (`Module 1 — AI Image Generation`) with its real numbered lessons visible at once (`01 Master ChatGPT & Prompt Engineering`, `02 Create AI images using Nano Banana`, `03 Create AI images using Seedream`, …) for all 7 modules, sourced from the live DOM I captured.
- Keep the sticky **Course Overview sidebar** (Beginner Friendly / 21 Hours / Certificate / Lifetime access + features list + Enroll CTA) unchanged — it's already accurate.
- Add a per-module **stagger fade-up** (`delay: i * 0.08`) so modules reveal in sequence as you scroll.

**A2. Rename Pricing tier 3** in `components/sections/Pricing.tsx`
- `Master` → `Personalized` (matches live). CTA stays `#contact` (per your choice). Features list unchanged (already matches live).

**A3. Fix broken FAQ anchor**
- `Nav.tsx` links to `#faq`; `FAQ.tsx` section id is `faqs`. Standardize on **`#faqs`** (live uses `#faqs`) — update the Nav link href from `#faq` → `#faqs`.

---

### Phase B — Hero fixes (medium impact)

**B1. Fix the broken typewriter** in `Hero.tsx`
- Current: `width: 0 → 100%` reveal clips the sentence mid-word and looks broken.
- Replace with a **per-character typing animation** + blinking cursor (matches live site's behavior). I'll add a `blinking-cursor` keyframe to `globals.css` and drive the typing via a small `useState` + `useEffect` interval (respects `prefers-reduced-motion` by rendering the full text instantly).

**B2. Add Hero social proof**
- Below the prompt box, add `500+ professionals are already ahead of you` + a 4-avatar overlap stack (using the existing avatar URLs already in the project). This was flagged as a gap last pass.

**B3. Fix Hero marquee loop seam**
- Current hand-rolled marquee uses `x: [0, -1000]` hardcoded — doesn't match the 3-item content width, causing a visible jump on loop reset. Replace the Hero's custom marquee with the project's existing **shared `Marquee` component** (`components/ui/Marquee.tsx`, already used by ToolsMarquee) which handles seamless infinite scroll correctly. Duplicate the 3-card set enough times to fill the track.

---

### Phase C — Animation polish (explicitly requested)

**C1. Add stagger to cards that currently fly in together**
- `GenAIRocket.tsx` pillars: add `transition delay: i * 0.1`
- `Pricing.tsx` tiers: add `transition delay: i * 0.1`
- (PainPoints already staggers correctly — leave it.)

**C2. New keyframes in `globals.css`**
- `@keyframes blink` for the Hero cursor (`opacity: 1 → 0 → 1`).
- `.reveal-on-view` utility — a reusable opacity/translate fade-up class as a lightweight CSS alternative to per-component framer-motion, for any future static elements.

**C3. Heading reveals**
- Add a subtle `whileInView` fade-up (`opacity 0→1, y 16→0`) to the main `<h2>` in: Founders, Testimonials, AudienceFit, ToolsMarquee label — so headings lead the section reveal instead of appearing instantly.

---

### Phase D — Verify
1. `npm run build` — must pass with no TS/lint errors.
2. Dev server hot-reload — confirm all edits compile cleanly.
3. Re-snapshot the local DOM via the browser to confirm: curriculum lessons now visible inline, pricing tier 3 says "Personalized", `#faqs` anchor resolves, Hero cursor blinks.
4. Report any remaining gaps.

### Out of scope (noted, not doing)
- Converting all raw `<img>` Unsplash URLs → Next `<Image>` (requires `next.config.js` remotePatterns config; uniform across the project, not a restyle gap). Leaving as-is.
- Replicating live site typos (`Moneitizing`, `Acess`, `Everthing`) — your correctly-spelled versions are improvements; keeping them.