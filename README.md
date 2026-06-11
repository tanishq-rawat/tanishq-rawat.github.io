# Portfolio — Tanishq Rawat

A distinctive, systems-minded personal site for a **Backend & AI engineer**. Dark, layered
theme; a live 2D network-diagram hero; smooth scrolling; scroll-linked reveals and parallax.
Built to deploy as a static export on **GitHub Pages** or Vercel.

## Stack

- **Next.js 15** (App Router) + **TypeScript**, static export (`output: "export"`)
- **Tailwind CSS v4** with a custom design-token layer (CSS variables)
- **Framer Motion** (`motion/react`) for all animation
- **Lenis** for smooth scrolling (auto-disabled under `prefers-reduced-motion`)
- **lucide-react** icons + inline brand SVGs (GitHub, LeetCode, Medium, LinkedIn, X)
- Fonts via **`next/font/local`**: Space Grotesk (display), Geist Sans (body), JetBrains Mono (data labels)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

> Requires Node 18.18+ (Node 20+ recommended — Tailwind v4's native binary prefers it).

Production build → static site in `out/`:

```bash
npm run build
```

## ✏️ Where to edit your content

**Everything you'd change lives in one file:**

### [`src/data/content.ts`](src/data/content.ts)

| Export | What it controls |
|---|---|
| `profile` | name, role, tagline, one-liner, email, location, resume path |
| `socials` | the icon row (hero / contact / footer) — URLs + which platforms |
| `about` | the 2–3 bio paragraphs + the "system status" stat strip |
| `experience` | the vertical timeline entries (company, role, dates, bullets, tech) |
| `projects` | the project cards (set `featured: true` for the larger card) |
| `skillCategories` | the skill tabs: Backend / Frontend / Database / AI/ML / Tools |
| `blogs` | the Medium article cards |
| `navLinks` | which sections appear in the navbar |

All values there are **realistic placeholders** — swap them for your real details. You should
not need to touch any component to update content.

### Visual design tokens

Colors, surfaces, accents, type scale, spacing → CSS variables at the top of
[`src/app/globals.css`](src/app/globals.css). Change the palette in one place.

Animation timing/variants are centralized in [`src/lib/motion.ts`](src/lib/motion.ts).

### Assets to replace

- `public/favicon.svg` — favicon (node-graph motif)
- `public/og.svg` — Open Graph / social share image
- `public/resume.pdf` — drop your résumé here (referenced by `profile.resumeUrl`)

## Deploy

### GitHub Pages (project site, e.g. `user.github.io/portfolio`)

Set the base path so assets resolve under the subpath, then build:

```bash
NEXT_PUBLIC_BASE_PATH="/portfolio" NEXT_PUBLIC_SITE_URL="https://USER.github.io/portfolio" npm run build
```

Push the `out/` directory to your Pages branch (a `.nojekyll` file is already included so
`_next/` assets aren't stripped). A typical GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_BASE_PATH: /portfolio          # repo name; omit for user.github.io root site
          NEXT_PUBLIC_SITE_URL: https://USER.github.io/portfolio
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages }
    steps:
      - uses: actions/deploy-pages@v4
```

For a **root** user site (`user.github.io`) or **Vercel**, leave `NEXT_PUBLIC_BASE_PATH` unset.

## Project structure

```
src/
  app/
    layout.tsx        # metadata, OG tags, fonts wiring
    page.tsx          # section composition + dividers
    fonts.ts          # next/font/local definitions
    fonts/            # vendored .woff2 files
    globals.css       # design tokens + base styles + utilities
  components/
    Navbar, ScrollProgress, Backdrop, SmoothScroll, Reveal,
    Section, SocialRow, BrandIcons, NetworkDiagram
    sections/         # Hero, About, Experience, Projects, Skills, Blogs, Contact, Footer
  data/content.ts     # ← all content
  lib/motion.ts       # animation variants
```

## Accessibility & quality notes

- Semantic landmarks (`main`, `header`, `footer`, `section[aria-labelledby]`), skip link, sequential headings.
- Visible keyboard focus rings; icon buttons have `aria-label`; the hero diagram has a descriptive `aria-label`.
- `prefers-reduced-motion` disables smooth scroll, parallax, packet/pulse animation, and instances all Framer transitions (via `MotionConfig reducedMotion="user"`).
- Touch targets are ≥44px; body text meets AA contrast on the dark surfaces.
