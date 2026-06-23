# Neuroid site — working guide

The live site is a **Next.js (App Router) + React** app in **`web/`**. Plain
JavaScript (no TypeScript). It recreates the Claude Design `.dc.html` prototypes
that still live, untouched, in `project/` (and the design intent is in `chats/`).
Always work in `web/`.

## Run / build / deploy

```bash
cd web
npm install
npm run dev      # local preview at http://localhost:3000
npm run build    # ALWAYS run before committing — this is the only validation
```

Deploy = commit on branch `implement-neuroid-site` and push to
`github.com/lakshsehgal/neuroid2.0`; **Vercel auto-deploys on push** (its Root
Directory is set to `web`). Commits must be signed (the env signs automatically;
GitHub shows them Verified) and authored as `Claude <noreply@anthropic.com>`.
Pushing needs a GitHub token from the user — never commit a token; scrub it from
`.git/config` after pushing.

## Where things live (in `web/`)

- `app/page.js` — Home. `app/portfolio/`, `app/lets-talk/`, `app/booking-confirmed/` — the other pages. **Every page is `'use client'`.**
- `app/layout.js` — `<html>`, fonts (`next/font/local`), and the default `metadata`.
- `app/globals.css` — design tokens (CSS variables) + every page-level CSS class + keyframes + all responsive `@media` rules. **One file; classes are uniquely prefixed (`nrd-…`, `lt-…`, `bc-…`, `svc-…`).**
- `components/` — `Button.jsx`, `Figure.jsx` (service motion card), `figures/*` (the 4 animated scenes), `home/*` (`Nav`, `Footer`, `Loop`, `Services`, `WorkGrid`, `WhyNeuroid`, `Faq`, `HeroGallery`, `marquees`).
- `lib/` — `animations.jsx` (the `Stage` motion runtime + `useTime`), `useReveal.js` (scroll-in via `data-reveal`), `useVideoVisibility.js` (plays only on-screen videos).
- `public/fonts/`, `public/assets/` — served at `/fonts/...` and `/assets/...`.

## Design system (reuse — never invent)

- **Colors (CSS vars only):** `--neuroid-ink #0C0C0C`, `--neuroid-yellow #FEEF24`, `--neuroid-red #FF2600`, `--neuroid-paper #fff`, `--neuroid-grey`, `--neuroid-grey-dark`. Page background `#F4F1EA`. **Do not add new colors.**
- **Fonts (vars):** `--font-sans` (DM Sans), `--font-serif` (PP Editorial italic), `--font-mono`, `--font-display` (FH Lecturis). Easing `--ease-snap`.
- **Brutalist idioms:** hard offset shadows (`Npx Npx 0 0 var(--neuroid-ink)`, no blur), sharp corners, `1.5px` ink borders, the `.nrd-highlight` yellow-block serif word, the red full-stop square after headings, mono uppercase eyebrows with a red square.
- Buttons → `<Button variant=… size=…>` wrapped in `<a className="nrd-btnlink">` for the hover lift.

## Routing conventions

`/` Home · `/portfolio` · `/lets-talk` · `/booking-confirmed`. Every **"Book a
Growth Audit"** CTA → `/lets-talk`. **"Work" / "See the work"** → `/portfolio`.
Cross-page section anchors use `/#services`, `/#about`, `/#work`.

---

## ▶ Adding a NEW page (same look & feel)

1. Create `web/app/<route>/page.js`, first line `'use client';`.
2. Reuse the chrome: `import Nav from '@/components/home/Nav'` and `Footer`, and render `<Nav />` … `<Footer />`. (Nav is already responsive — see the rule below.)
3. Root wrapper, copied from the existing pages:
   ```jsx
   const rootRef = useRef(null);
   useReveal(rootRef);
   return (
     <div ref={rootRef} style={{ fontFamily: 'var(--font-sans)', background: '#F4F1EA', color: 'var(--neuroid-ink)', overflowX: 'hidden' }}>
       <Nav />
       {/* sections */}
       <Footer />
     </div>
   );
   ```
4. Section skeleton (matches the rest of the site):
   ```jsx
   <section style={{ padding: 'clamp(56px,8vw,112px) clamp(18px,4vw,56px)', borderBottom: '1.5px solid var(--neuroid-ink)' }}>
     <div style={{ maxWidth: '1280px', margin: '0 auto' }}> … </div>
   </section>
   ```
5. Add `data-reveal` to elements you want to fade/slide in on scroll.
6. Use only the tokens, utility classes, and `<Button>` above. Add new CSS to
   `globals.css` with a fresh unique prefix; reuse existing keyframes.
7. New page-specific copy/data → keep it in a small `const` array at the top of
   the file (that's the established pattern).
8. `npm run build`, then commit + push.

**Note on metadata:** pages are `'use client'`, so they can't `export const
metadata`. The shared title/description in `app/layout.js` covers all pages. For
truly per-page SEO you'd split a server wrapper — usually not worth it.

## ▶ Making a MINOR change (copy, color, spacing, a link)

1. Locate it: text/data lives in the page file (`app/**/page.js`) or its section
   component (`components/home/*`). Use grep on the visible string.
2. Copy lives in plain JSX or in the `const` data arrays near the top of each
   file (e.g. `FAQS`, `NODES`, `ROWS`, `STEPS`). Edit there.
3. Styling: prefer existing tokens/classes. Spacing/size usually uses `clamp()`.
4. `npm run build` (catches the mistake before deploy), then commit + push.
   Vercel redeploys automatically.

## Hard-won gotchas (don't reintroduce)

- **Responsive = CSS, not JS.** Don't branch layout on `window.innerWidth` in
  render — it defaults to desktop during SSR and causes a flash/reflow on phones.
  Use `@media` + show/hide classes (see `.nrd-nav-desktop/.nrd-nav-mobile`,
  `.nrd-loop-desktop/.nrd-loop-mobile`). When a diagram is built for a horizontal
  layout, give phones a stacked variant rather than `display:none`.
- **Service motion figures** render through `Stage` with `showBar={false}`; never
  add a CSS rule that hides a `:last-child` inside `.svc-fig-stage` (that hid the
  whole scene once). The `Stage` runtime must loop and must NOT persist a playhead.
- **Calendly:** the inline target uses a manual `initInlineWidget` on a ref. Do
  NOT also give that div the `calendly-inline-widget` class — the auto-initializer
  fights the manual one and blanks the widget.
- **Fonts** are `next/font/local` in `layout.js` (preloaded, no FOUT). Don't
  reintroduce `@font-face`/`font-display:swap`.
