# Zebra Trails Safari — Production CMS-Driven Website

## Mission

Convert the current static-mockup website into a fully CMS-driven production website. Build on top of what's already built — enhance, extend, and wire to Payload. **Zero hardcoded content.**
Every string, image, navigation link, testimonial, safari package, team member profile, and page section lives in Payload CMS.

## Design Skills Active

All design enforcement skills installed in `.kiro/skills/design/`:
- **Color** — OKLCH-based palette, statement/conversation/flood levels, contrast as material
- **Type** — Physical-object method for font choice, 3-level hierarchy (hook/bridge/detail), reading-distance scaling
- **Layout** — Work-pattern-first composition, 3-plane depth model, 1-4-9 rhythm, cliffhanger principle
- **Motion** — Tactile 150ms baseline, staggered reveals, reduced-motion authored
- **Interaction** — 9-state coverage, focus architecture, touch physics, undo-beats-confirm
- **Voice** — Brand register, proof-object-driven landing, named lane before design
- **Surface** — Product hardening, real data density, state coverage, operator familiarity
- **Responsive** — Container queries, thumb zone, input-mode detection, safe areas
- **Smell/Review/Checkup** — AI-tells catalog, design auditing, quality gates

---

## Phase 0 — Foundation: Design System Alignment

### 0.1 Fix Fonts

Switch from Cormorant Garamond + Outfit → **Playfair Display** (display, weights 400/500/600/700/italic) + **DM Sans** (body, weights 400/500/600).

Physical-object reference: "A leather-bound field journal from a 1920s East African expedition — elegant but practical, serious but warm."

**Files:** `layout.tsx`, `globals.css`

### 0.2 Fix Color Palette

Replace with exact palette from build brief §3.2:

**Light mode:**
```
--background: #FAFAF7 (warm ivory)
--surface: #F0EDE6 (parchment)
--surface-elevated: #FFFFFF
--border: #D4CFC4 (dried grass)
--border-strong: #A89E8E
--text-primary: #1A2E1A (deep bush green)
--text-secondary: #2D4A2D (forest green)
--text-muted: #6B7B6B (sage)
--accent: #2D5A27 (safari green — primary)
--accent-hover: #3A7233
--accent-foreground: #FAFAF7
--accent-warm: #C4883A (golden savanna — secondary)
--accent-warm-hover: #D49A4C
--danger: #8B2A2A
```

**Dark mode:**
```
--background: #0C1A0C (deep night bush)
--surface: #142014
--surface-elevated: #1C2E1C
--border: #2A3D2A
--border-strong: #3D5A3D
--text-primary: #F0EDE6
--text-secondary: #C4D4B8
--text-muted: #7A9470
--accent: #C4883A (golden savanna — primary in dark)
--accent-hover: #D49A4C
--accent-foreground: #0C1A0C
```

**Color strategy:** Statement level — safari green owns the brand. Golden savanna is the warm secondary. Two distinct hues in defined roles, not scattered decoration. This is a "Decide" composition with "Explore" editorial pacing.

**File:** `globals.css`

### 0.3 Environment & Docker

- Fix `.env.example` — Postgres URL, add `NEXT_PUBLIC_SERVER_URL`, `PAYLOAD_PUBLIC_SERVER_URL`
- Fix `docker-compose.yml` — remove Mongo, use Postgres

---

## Phase 1 — Complete Payload Schema

### 1.1 Install Packages

```bash
pnpm add @payloadcms/plugin-seo @payloadcms/plugin-form-builder @payloadcms/plugin-nested-docs
pnpm add resend
```

### 1.2 Enhance Existing Collections

**Users** — add `name`, `role` (select), `avatar` (upload)
**SafariPackages** — add `destinations` (relationship←Destinations), `seo` (plugin group), `accommodation` (textarea)
**Destinations** — fix `as any` cast, add `tagline`, `seo`
**Testimonials** — add `tripDate`
**SafariEnquiries** — `travelDates`→date, add `honeypot`, add `afterChange` Resend hook, enable public create access

### 1.3 New Collections

**JournalPosts** — blog: title, slug, summary, heroImage, body (Lexical), category (select), author (relationship→Users), publishedAt, featured, seo
**Pages** — legal: title, slug, body (Lexical), seo

### 1.4 Page Globals (one per route — admin edits page content without touching code)

**Homepage** — 13 section groups each with `show` toggle, text fields, images. Content types: sections that fetch from collections (featured safaris, testimonials, destinations, team) vs sections entirely in the global (hero, promise, philosophy, numbers, wildlife, lodge, guides, process, conservation, closing CTA, pull quote, image breaks).

**SafarisPage** — hero image/text, empty state copy
**SafariDetailPage** — UI labels (enquire button, itinerary heading, included/excluded labels, closing CTA)
**AboutPage** — hero, story, values array, team heading, conservation text/stats/image, CTA
**ContactPage** — hero, success message, field labels/placeholders, sidebar text
**JournalPage** — hero image/text

### 1.5 Enhanced Settings Global

Add: `favicon`, `logo`, `navigation` (array), `mobileCtaText`, `footerTagline`, `footerColumns` (array), `defaultMetaTitle`, `defaultMetaDescription`

### 1.6 Plugins & Types

Configure `seoPlugin`, `formBuilderPlugin`, `nestedDocsPlugin`. Run `pnpm payload generate:types`.

---

## Phase 2 — Data Layer

```
src/lib/payload.ts    — getPayload() server helper
src/lib/queries.ts    — getHomepage(), getSafaris(), getSafariBySlug(), getAboutPage(), getContactPage(), getSiteLayout(), getJournalPosts(), getJournalPostBySlug()
src/lib/media.ts      — getImageProps() for Payload Media → Next.js Image
```

---

## Phase 3 — Wire Every Page to Payload

**Layout** — fetch `Settings` in `layout.tsx`, pass as props to Header/Footer. `generateMetadata()` dynamic from Settings.

**Homepage** — server component calling `getHomepage()`. All 15 section components become prop-driven. Conditional `show` rendering. Featured safaris from collection, testimonials from collection, everything else from global.

**Safaris listing** — `getSafaris(category)` based on `searchParams`. Filter via URL. Chrome from `SafarisPage` global.

**Safari detail** — `getSafariBySlug()`. Dynamic `generateMetadata()`. Labels from `SafariDetailPage` global.

**About** — `getAboutPage()`. Team from collection, story/values/conservation from global.

**Contact** — server wrapper + client form. Form state handled by `ContactForm.tsx`. Submission via server action `submit-enquiry.ts`.

**Journal listing** (NEW) — `/journal` route with category filtering from `searchParams`.

**Journal detail** (NEW) — `/journal/[slug]` with Lexical rich text rendering.

**Dynamic pages** (NEW) — `/[slug]` for Pages collection (Privacy, Terms, FAQ).

**Image migration** — every `<img>` becomes `<Image>` via `getImageProps()`. Every Unsplash/Pexels URL removed from components.

---

## Phase 4 — Forms & Email

- Server action `submit-enquiry.ts` writes to `safari-enquiries` with honeypot
- `SafariEnquiries.ts` `afterChange` hook sends Resend emails
- Customer: editorial HTML confirmation from `hello@zebratrailssafari.com`
- Team: notification with enquiry details + admin link

---

## Phase 5 — SEO

- Dynamic `generateMetadata()` on every route from Payload SEO plugin fields
- `next-sitemap` with dynamic routes from collections
- JSON-LD: `TourOperator` (layout), `Organization` (home), `Product/Offer` (safari detail), `Article` (journal), `Review` (testimonials)
- OG images: safari hero image from Payload Media

---

## Phase 6 — Complete Pages (Build on MVP)

Beyond the existing 5 pages, add:

### 6.1 `/destinations` — All Destinations
Grid of destination cards from `Destinations` collection. Each card: hero image, name, tagline, wildlife count, "Explore →" link.

### 6.2 `/destinations/[slug]` — Destination Detail
Full-bleed hero, rich text body, wildlife gallery, best time to visit, related safaris. Same editorial quality as safari detail.

### 6.3 `/team` — Meet The Guides
Full team page. Grid of team members from `TeamMembers` collection. Portrait, name, role, speciality, years experience. Click any → drawer with full bio. This was a section on About, now gets its own page too.

### 6.4 `/conservation` — Our Commitment
Dedicated conservation page. Rich text body from a new `ConservationPage` global or the About page conservation section expanded. Stats, partnerships, impact stories. This is a key trust signal for premium safari buyers.

### 6.5 Enhanced Footer Component
Currently a footer. Make it magazine-grade: three-column layout with navigation, social proof (awards/affiliations), newsletter signup (optional), conservation badge, WhatsApp floating button.

### 6.6 Booking/Enquiry Page Enhancement
The `/contact` page gets a more immersive layout. Two-panel: left is the form (calm, editorial, no urgency), right is "Why Book With Us" trust signals — guide certifications, conservation commitment, small group promise, 24hr response. No stock icons — thin Lucide line icons in safari green.

### 6.7 `/faq` — From Pages Collection
Pre-seeded FAQ page. Common questions: What's included? What's the payment process? What about travel insurance? What should I pack? Is it safe? When is the best time? This builds trust and reduces enquiry friction.

### 6.8 `/gallery` — Wildlife & Safari Gallery (NEW)
Masonry/"bento" grid from a curated gallery of Payload Media images. Categories: Wildlife, Landscapes, Camps, Guests. Lightbox on click. This is pure brand power — people book safaris because of the images.

---

## Phase 7 — Design Quality Gates

After each major phase, run:

1. **Smell check** — no AI tells (no feature tile grid, no accent rail, no unearned blur, no icon toppers, no center-stack-by-default)
2. **Voice check** — the safari green/ivory palette cannot be guessed from "travel website". Playfair Display has a reason (field journal, expedition, editorial). The proof object is the wildlife image.
3. **Squint test** — first 3 reads survive blur: hero image, CTA, one wildlife shot
4. **5-minute test** — browse safaris, read an itinerary, submit enquiry. Every friction is a bug.

---

## Phase 8 — Testing & Deployment

- Rewrite E2E tests for actual site content
- Integration tests for Payload API, enquiry submission, SEO metadata
- Seed script populating all collections/globals from current hardcoded content
- Production env vars, Vercel config, Docker production build

---

## Execution Order

| Phase | Depends On |
|---|---|
| 0 — Foundation (fonts, colors, env) | Nothing |
| 1 — Payload schema (collections, globals, plugins, types) | Phase 0 |
| 2 — Data layer (queries, helpers) | Phase 1 |
| 3 — Wire all existing pages to Payload | Phase 2 |
| 4 — Forms & email (server action, Resend) | Phase 3 |
| 5 — SEO (metadata, sitemap, structured data) | Phase 3 |
| 6 — New pages (destinations, team, conservation, gallery, FAQ, journal) | Phase 3 |
| 7 — Design quality gates (smell, voice, interaction, responsive) | Phase 6 |
| 8 — Testing & deployment | Phase 5 |
