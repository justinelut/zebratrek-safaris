ZEBRA TRAILS SAFARI — Comprehensive Build Brief
Premium African safari tours & travel · Kenya
This document is a complete instruction set for an AI coding agent. Read it end-to-end before writing a single line. Build the production-grade product described here.
__________________________________________________
0. MISSION

Build the website for Zebra Trails Safari — a premium African safari tours and travel company based in Kenya. The company specialises in curated game drives, walking safaris, hot air balloon experiences, and luxury bush camp stays across Kenya's finest conservancies including the Maasai Mara, Amboseli, Tsavo, and Samburu.

The website's job is to convert a visitor into a booked safari enquiry. Everything on the page funnels toward that single CTA: "Plan Your Safari."

The brand voice: adventurous yet refined, wild yet welcoming. The product is transformation through wilderness. The audience is international travellers (US, UK, Europe, Australia) seeking authentic African safari experiences, honeymooners wanting a once-in-a-lifetime trip, families looking for educational wildlife encounters, and photography enthusiasts chasing the perfect shot.

If a section looks like a generic travel agency template, rebuild it. If a screen looks like a Wix "tours" template, rebuild it. The reference is editorial-grade safari storytelling — think National Geographic meets luxury hospitality.

Brand contact: info@zebratrailssafari.com, Nairobi, Kenya. Categories: Safari Tour Operator · Luxury Travel · Wildlife Experiences · Conservation Tourism.
__________________________________________________
1. SOURCE & APPROACH

The project already has a Payload CMS 3.x scaffold (Next.js 15 App Router) in place. The existing repo at /home/ubuntu/workspace/zebra-trails-safari contains:
- Payload CMS configured with PostgreSQL
- Next.js 15 App Router
- Users collection
- Media collection
- Basic test infrastructure (Playwright + Vitest)

Build the frontend at app/(frontend)/ using the existing Payload setup. Content will be managed through /admin. Do NOT spin up a separate project.

After customising, verify locally:
1. pnpm dev
2. Visit http://localhost:3000/admin → confirm admin panel
3. Visit http://localhost:3000 → confirm frontend renders
4. Only then start building pages
__________________________________________________
2. TECH STACK (exact versions, do not substitute)

Runtime: Node 20 LTS
Framework: Next.js 15 App Router (already scaffolded by Payload)
CMS / data layer: Payload CMS 3.x — source of truth for all content
Database: PostgreSQL (configured via DATABASE_URI in .env)
ORM: Payload uses Drizzle internally — do not introduce a second ORM
Image optimisation: Payload's built-in image processing + Next.js Image component
Component library: shadcn/ui — install fresh. Allowed extensions: Radix UI primitives, Lucide icons, embla-carousel-react for safari galleries, framer-motion for scroll-triggered transitions.
Styling: Tailwind CSS v3 + custom CSS variables for the Zebra Trails palette
Fonts: Playfair Display (display, weights 400/500/600/700, italic) + DM Sans (body, weights 400/500/600). Self-host via next/font/google with display: swap.
Forms: Payload's @payloadcms/plugin-form-builder for enquiry forms
Payments: Not required for MVP. Future: Stripe for deposit collection.
Hosting: Vercel (Next.js) + PostgreSQL
Analytics: PostHog (future)
Email: Resend (transactional confirmations on enquiry form)
__________________________________________________
3. UI / VISUAL DIRECTION — non-negotiable

Zebra Trails Safari's UI must signal wilderness luxury and editorial confidence. Below is the exact palette, type system, and pattern guidance.

3.1 Reference websites (the AI must study these)

1. Singita — https://www.singita.com — PRIMARY REFERENCE
   - Luxury safari lodges. Full-screen immersive imagery, minimal text overlay.
   - Palette: deep greens, blacks, earth tones. White text on dark imagery.
   - What to copy: the immersive photography treatment, editorial generosity, conservation-first messaging.

2. Angama Mara — https://www.angama.com — SECONDARY REFERENCE
   - Premium Kenyan safari. "Between Heaven and Earth" tagline.
   - Palette: white/cream backgrounds, dark text, gold accents sparingly.
   - What to copy: day-by-day itinerary storytelling, transparent pricing, award displays, weekly stories.

3. andBeyond — https://www.andbeyond.com — TERTIARY REFERENCE
   - Luxury safari experiences across Africa.
   - What to copy: "Tailormade tours" concept, experiential language, magazine-style editorial.

4. Micato Safaris — https://www.micato.com
   - What to copy: named safari packages with clear pricing, expert-led approach, brochure-quality content.

5. Wilderness Safaris — https://www.wilderness-safaris.com
   - What to copy: conservation-first identity, limited guest numbers, "intimate wildlife encounters" language.

3.2 The Zebra Trails Safari palette (use exactly)

The palette is rooted in the African bush — deep safari greens, warm earth, and golden savanna light. Two modes.

Light mode (default):

    --background:        #FAFAF7   /* warm ivory */
    --surface:           #F0EDE6   /* parchment */
    --surface-elevated:  #FFFFFF
    --border:            #D4CFC4   /* dried grass */
    --border-strong:     #A89E8E
    --text-primary:      #1A2E1A   /* deep bush green */
    --text-secondary:    #2D4A2D   /* forest green */
    --text-muted:        #6B7B6B   /* sage */
    --accent:            #2D5A27   /* safari green — PRIMARY brand color */
    --accent-hover:      #3A7233   /* lighter safari green */
    --accent-foreground: #FAFAF7
    --accent-warm:       #C4883A   /* golden savanna — SECONDARY accent */
    --accent-warm-hover: #D49A4C
    --danger:            #8B2A2A

Dark mode (hero sections + CTA bands):

    --background:        #0C1A0C   /* deep night bush */
    --surface:           #142014   /* dark canopy */
    --surface-elevated:  #1C2E1C
    --border:            #2A3D2A
    --border-strong:     #3D5A3D
    --text-primary:      #F0EDE6   /* warm ivory */
    --text-secondary:    #C4D4B8   /* pale sage */
    --text-muted:        #7A9470   /* muted leaf */
    --accent:            #C4883A   /* golden savanna */
    --accent-hover:      #D49A4C
    --accent-foreground: #0C1A0C

Forbidden colors: any purple, any neon, any blue (no Bootstrap blue), pure black #000000, pure white #FFFFFF used as backgrounds.

Forbidden patterns:
- Gradient buttons, gradient hero overlays
- Drop-shadow cards
- Three-column emoji feature grids
- Section titles literally called "Services" or "Features"
- Stock business photography
- "4.9★ avatar-stack" social proof
- Animated counters ("1500+ Safaris Completed")
- "Book Now" urgency framing — luxury is patient

3.3 Typography

Display headlines (Playfair Display, weight 400-700):
- H1 hero: font-size: clamp(48px, 6vw, 96px), line-height: 1.05, letter-spacing: -0.01em
- H2 section: font-size: clamp(36px, 4vw, 64px), line-height: 1.1
- H3 sub: font-size: clamp(24px, 2.5vw, 36px), weight 500

Body (DM Sans, weight 400):
- Large lede: font-size: 20px, line-height: 1.6
- Standard: font-size: 16px, line-height: 1.7
- Caption: font-size: 14px, line-height: 1.5, color: var(--text-muted)

Eyebrows / labels (DM Sans, weight 600, text-transform: uppercase, letter-spacing: 0.15em, font-size: 12px)

Pull quotes: Playfair Display italic weight 400, font-size: 28px

3.4 UI patterns

Spacing: 8px base. Section vertical rhythm 100px desktop / 56px mobile. Card padding 28px minimum. Max content width 1280px with 64px gutters; text columns max 60ch.

Borders not shadows: border: 1px solid var(--border). Shadows reserved for dropdowns and modals only.

Buttons: primary is filled safari green (#2D5A27), border-radius: 2px, padding: 14px 32px. Secondary is transparent with thin underline on hover. Tertiary: golden savanna filled for warm CTAs.

Inputs: transparent background, single bottom border, no rounded corners. Focus → bottom border safari green.

Navigation: transparent background going opaque on scroll. Logo left, links centered, single "Plan Your Safari" CTA hard right.

Imagery: real safari photography from Pexels/Unsplash (see §15 for curated URLs). All images served via Next.js Image with appropriate sizes.

Image treatment: subtle warm overlay for consistency. Never apply filters that distort natural colors.

Animation: scroll-triggered fades via Framer Motion whileInView. No scroll-jacking, no parallax. Restraint.

3.5 Anti-patterns (verify against every page)

- No gradient buttons or gradient hero overlays
- No section titled "Services" or "Features" — use evocative names
- No emoji icons in feature lists. Use thin Lucide line icons in safari green.
- No drop-shadow cards
- No bg-white text-gray-500 Tailwind defaults
- No "Trusted by 500+ travellers" strip
- No carousel auto-rotation under 8 seconds
- No video autoplay with sound
- No "Book in 60 seconds" urgency framing
- No animated number counters
- No generic stock photos of people in suits

__________________________________________________
4. REPOSITORY SETUP STEPS

In order (the Payload scaffold already exists):

1. cd zebra-trails-safari
2. Verify .env has DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL=http://localhost:3000
3. pnpm dev → verify /admin and / boot
4. Initialize shadcn: pnpm dlx shadcn@latest init — pick New York style, CSS variables yes
5. Install components: pnpm dlx shadcn@latest add button card input label dialog sheet dropdown-menu sonner badge separator skeleton accordion carousel
6. Replace shadcn's generated globals.css palette with the Zebra Trails palette from §3.2
7. Wire fonts via next/font/google in app/(frontend)/layout.tsx: Playfair Display (400, 500, 600, 700, italic) + DM Sans (400, 500, 600)
8. Install Payload plugins:
   - pnpm add @payloadcms/plugin-form-builder
   - pnpm add @payloadcms/plugin-seo
   - pnpm add embla-carousel-react framer-motion
9. Configure payload.config.ts with new collections (see §5), plugins, email adapter
10. Generate migration: pnpm payload migrate:create initial → pnpm payload migrate
11. Create app/(frontend)/page.tsx, app/(frontend)/layout.tsx, section components, dynamic routes
12. Commit at each milestone with conventional commit messages
__________________________________________________
5. PAYLOAD COLLECTIONS

Define in src/collections/. Admins manage everything via /admin.

5.1 SafariPackages (collection)
Fields:
- title (text, required) — e.g., "The Great Migration Safari"
- slug (text, required, unique)
- tagline (text) — one-line teaser
- duration (text) — e.g., "7 Days / 6 Nights"
- priceFrom (number) — starting price per person
- currency (select: USD, EUR, GBP) — default USD
- heroImage (upload, required)
- destinations (array of { name, description, image })
- itinerary (array of { day, title, description, image })
- included (array of { item })
- excluded (array of { item })
- highlights (array of { highlight })
- difficulty (select: Easy, Moderate, Challenging)
- groupSize (text) — e.g., "2-8 guests"
- bestSeason (text) — e.g., "July - October"
- category (select: Classic Safari, Luxury Safari, Adventure Safari, Family Safari, Photography Safari, Honeymoon Safari)
- featured (checkbox)
- gallery (array of { image, caption })
- seo (group via plugin)

Seed packages:
- The Great Migration Safari (7 days, Maasai Mara)
- Amboseli & Tsavo Explorer (5 days)
- Luxury Balloon Safari Experience (3 days)
- Big Five Photography Safari (6 days)
- Family Bush Adventure (5 days)
- Honeymoon Under the Stars (4 days)

5.2 Destinations (collection)
Fields:
- name (text, required) — e.g., "Maasai Mara National Reserve"
- slug (text, required, unique)
- heroImage (upload, required)
- summary (textarea)
- body (rich text — Lexical editor)
- wildlife (array of { animal, description, image })
- bestTimeToVisit (text)
- location (text) — e.g., "South-western Kenya"
- gallery (array of { image, caption })
- relatedPackages (relationship → SafariPackages, hasMany)
- seo (group via plugin)

5.3 Testimonials (collection)
Fields:
- quote (textarea, required)
- guestName (text, required)
- guestCountry (text) — e.g., "United States"
- tripType (text) — e.g., "Great Migration Safari"
- rating (number, 1-5)
- featured (checkbox)
- guestImage (upload, optional)

5.4 TeamMembers (collection)
Fields:
- name (text, required)
- role (text) — e.g., "Lead Safari Guide"
- bio (textarea)
- portrait (upload)
- speciality (text) — e.g., "Big Cat Tracking"
- yearsExperience (number)
- order (number)

5.5 JournalPosts (collection)
Fields:
- title (text, required)
- slug (text, required, unique)
- summary (textarea)
- heroImage (upload, required)
- body (rich text — Lexical)
- category (select: Safari Stories, Wildlife, Conservation, Travel Tips, Behind the Scenes)
- publishedAt (date)
- author (relationship → Users)
- featured (checkbox)
- seo (group via plugin)

5.6 SafariEnquiries (collection — form submissions)
Fields:
- name (text, required)
- email (email, required)
- phone (text)
- country (text)
- travelDates (text)
- numberOfGuests (number)
- interestedPackages (relationship → SafariPackages, hasMany)
- budget (select: Under $3000, $3000-$5000, $5000-$10000, $10000+)
- specialRequests (textarea)
- howDidYouHear (select: Google, Instagram, Friend, Travel Agent, Magazine, Other)
- status (select: New, Contacted, Quoted, Booked, Completed, Lost)
- internalNotes (rich text)
Access: only authenticated admins can read.

5.7 Settings (global, single instance)
- companyName
- tagline — "Where Every Trail Tells a Story"
- phone
- whatsAppNumber
- email
- officeAddress
- socialLinks (Instagram, Facebook, YouTube, TripAdvisor)
- footerCopy
- heroHeadline
- heroSubheadline
- aboutStatement
- conservationStatement
- openGraphImage (upload)

5.8 Pages (collection — for Privacy, Terms, FAQ)
Fields: title, slug, body (rich text), seo.

__________________________________________________
6. PAGE-BY-PAGE SPEC (5 pages for MVP)

Each is a Next.js route under app/(frontend)/. Data comes from Payload via the local API (server components).

6.1 / — Home (Long-scroll editorial)

Sections in this exact order — every one required:

HEADER — fixed, transparent until 80px scroll. Logo wordmark left ("Zebra Trails" in Playfair Display 600), nav center (Safaris · Destinations · About · Journal · Contact), single safari-green "Plan Your Safari" CTA hard right. Mobile: hamburger menu with full-screen overlay.

HERO — full-bleed background image (savanna sunset with wildlife silhouettes). Dark overlay 40%. Text overlay:
- Eyebrow: "PREMIUM AFRICAN SAFARI EXPERIENCES" in DM Sans 12px tracked uppercase, color: var(--accent-warm)
- Headline: "Where Every Trail Tells a Story" in Playfair Display 400, clamp(48px, 6vw, 96px), color white
- Subheadline: "Curated wildlife encounters across Kenya's finest conservancies. Small groups. Expert guides. Unforgettable moments." in DM Sans 20px, color: rgba(255,255,255,0.85)
- CTA: "Plan Your Safari" safari-green button + "View Our Safaris" text link with arrow
- NO scroll-down arrow. NO secondary hero image.
- Image: https://images.pexels.com/photos/5643013/pexels-photo-5643013.jpeg?auto=compress&cs=tinysrgb&w=1920

THE PROMISE — centered text block, max 60ch:
- Eyebrow: "THE ZEBRA TRAILS DIFFERENCE"
- Headline: Playfair Display italic 28px: "We don't sell tours. We craft encounters with the wild — intimate, unhurried, and guided by those who speak the language of the bush."
- Below: 4 quiet value propositions in a 2x2 grid (icon + label + one sentence each):
  1. "Expert Guides" — Certified naturalists with 10+ years in the field
  2. "Small Groups" — Maximum 6 guests per vehicle for intimate encounters
  3. "Luxury Camps" — Hand-picked lodges and tented camps
  4. "Conservation First" — 5% of every booking funds wildlife protection

FEATURED SAFARIS — NOT titled "Packages" or "Services":
- Eyebrow: "CURATED EXPERIENCES"
- Headline: "Safaris We've Perfected"
- 3 featured packages from Payload (featured = true), displayed as full-width alternating rows:
  - Row 1: Image left (7/12), text right (5/12) — package title, duration, price from, 2-line description, "Explore this safari →" link
  - Row 2: Text left, image right (reversed)
  - Row 3: Image left, text right
- Each row uses the package heroImage
- Images from Pexels:
  - https://images.pexels.com/photos/16036953/pexels-photo-16036953.jpeg (game drive)
  - https://images.pexels.com/photos/16113204/pexels-photo-16113204.jpeg (balloon safari)
  - https://images.pexels.com/photos/16025358/pexels-photo-16025358.jpeg (elephant encounter)

WILDLIFE SHOWCASE — dark mode section (data-theme="dark"):
- Background: var(--background) dark mode (#0C1A0C)
- Eyebrow: "THE BIG FIVE & BEYOND" in golden savanna color
- Headline: "Every Drive, a New Discovery" in Playfair Display, ivory text
- Horizontal scroll gallery of 6 wildlife cards (lion, elephant, zebra, giraffe, leopard, buffalo):
  - Each card: full-bleed animal photo, animal name overlay bottom-left in Playfair 24px
  - Hover: subtle zoom 1.03
- Images:
  - https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg (lion)
  - https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg (elephant)
  - https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg (zebra)
  - https://images.pexels.com/photos/16025341/pexels-photo-16025341.jpeg (giraffe)
  - https://images.pexels.com/photos/16025372/pexels-photo-16025372.jpeg (cheetah/leopard)
  - https://images.pexels.com/photos/16025356/pexels-photo-16025356.jpeg (wildebeest/buffalo)

TESTIMONIALS — warm ivory background:
- Eyebrow: "GUEST STORIES"
- Headline: "In Their Words"
- 3 testimonials from Payload (featured = true), displayed as:
  - Large Playfair italic 24px pull quote
  - Thin golden rule above
  - Attribution: guest name + country + trip type in DM Sans 14px tracked
  - NO star ratings, NO avatars
- Background texture: subtle paper grain

HOW IT WORKS — process section:
- Eyebrow: "YOUR JOURNEY"
- Headline: "From Dream to Dust Road"
- 4 numbered steps as horizontal timeline on desktop, vertical on mobile:
  1. "Share Your Vision" — Tell us your dream safari
  2. "We Craft Your Trail" — Custom itinerary designed by experts
  3. "Refine Together" — Adjust until it's perfect
  4. "Step Into the Wild" — Your adventure begins
- Numbers in Playfair Display 300, 72px, safari green
- Each step: one sentence in DM Sans 16px

CLOSING CTA — dark mode band:
- Full-bleed dark green (#0C1A0C)
- Headline: Playfair Display italic 48px, ivory: "Your next chapter begins on the savanna."
- Below: "Plan Your Safari" golden savanna button + WhatsApp text link
- Background image (subtle, 10% opacity): https://images.pexels.com/photos/16025343/pexels-photo-16025343.jpeg

FOOTER — dark green background:
- Logo wordmark + tagline
- Three link columns: Safaris · Company · Connect
- Social icons (Instagram, Facebook, YouTube, TripAdvisor) in muted sage
- Contact: email + phone + WhatsApp
- "© 2026 Zebra Trails Safari · Nairobi, Kenya" in DM Sans 12px
- Conservation badge: "5% of every booking protects wildlife"

6.2 /safaris — Safari Packages

HERO:
- Eyebrow: "CURATED EXPERIENCES"
- Headline: "Safaris Crafted for the Curious" in Playfair Display 72px
- Subheadline: "Each journey is designed around your interests, pace, and sense of wonder."
- Background: https://images.pexels.com/photos/16025340/pexels-photo-16025340.jpeg (safari vehicle)

FILTER STRIP:
- All · Classic · Luxury · Adventure · Family · Photography · Honeymoon
- Persist in URL via ?category=...

PACKAGE GRID:
- 2-column grid on desktop, 1-column mobile
- Each card: heroImage full-width top, below: category pill, title (Playfair 28px), duration + group size, price "From $X,XXX per person", "View Details →" link
- Hover: image zoom 1.02, border color → safari green

BOTTOM CTA:
- "Can't find your perfect safari? Let us design one."
- "Start a Conversation" button → /contact

6.3 /safaris/[slug] — Safari Detail (dynamic)

HERO:
- Full-bleed heroImage from package
- Overlay: category pill + title (Playfair 80px) + tagline + duration + price
- "Enquire About This Safari" CTA button

AT A GLANCE — sticky sidebar on desktop:
- Duration, Group Size, Difficulty, Best Season, Price From
- "Enquire Now" button (scrolls to form or links to /contact)

ITINERARY — day-by-day storytelling:
- Each day: day number (Playfair 48px safari green), title, description paragraph, optional image
- Alternating layout: text-left/image-right, then reversed

INCLUDED / EXCLUDED — two-column list:
- Green checkmarks for included, muted X for excluded
- Clean, scannable

GALLERY — masonry grid of package gallery images with lightbox on click

RELATED SAFARIS — 2-3 other packages as quiet cards at bottom

ENQUIRY CTA — dark mode band:
- "Ready for this adventure?"
- Inline form or link to /contact pre-populated with package name

6.4 /about — About / The Company

HERO:
- Headline: "Born from a Love of the Wild"
- Subheadline: "Zebra Trails Safari was founded on a simple belief: the African bush changes everyone who enters it with respect and wonder."
- Background: https://images.pexels.com/photos/16036948/pexels-photo-16036948.jpeg

OUR STORY — editorial two-column layout:
- Left: large atmospheric photo of guide in the bush
- Right: 3-4 paragraphs of founding story, mission, philosophy
- Pull quote in Playfair italic: "We believe every trail should leave the land better than we found it."

THE TEAM — quiet grid:
- Portrait + name + role + speciality
- No bio cards by default; click → sheet/drawer with full bio
- Images: professional portraits of guides

OUR VALUES — 4 typographic statements:
- Large Playfair italic 32px, one per row:
  1. "The wild is not a product. It is a privilege."
  2. "Small groups see more. Always."
  3. "Our guides don't read scripts. They read the land."
  4. "Conservation is not a checkbox. It's our reason."

CONSERVATION — dedicated section:
- Eyebrow: "GIVING BACK"
- Headline: "5% of Every Booking Protects Wildlife"
- Description of conservation partnerships
- Stats: hectares protected, animals monitored, communities supported
- Image: https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg (elephant herd)

CLOSING CTA → /contact

6.5 /contact — Contact / Plan Your Safari

HERO:
- Headline: Playfair italic 64px: "Tell Us About Your Dream Safari"
- Subheadline: "No obligation. No pressure. Just a conversation about what moves you."

TWO-COLUMN LAYOUT:
- Left: the enquiry form (Payload form-builder powered):
  - Name, Email, Phone, Country
  - Travel dates (text), Number of guests
  - Interested packages (multiselect from SafariPackages)
  - Budget range (select)
  - Special requests (textarea)
  - How did you hear about us (select)
  - Submit button: "Start Planning" in safari green
- Right: contact details:
  - Phone + WhatsApp click-to-chat
  - Email
  - Office: Nairobi, Kenya
  - Response time: "We respond within 24 hours, always with a real person."
  - Operating hours

AFTER SUBMIT:
- Confirmation: Playfair italic "Thank you. Your safari story is about to begin. We'll be in touch within 24 hours."
- NOT auto-message style

BOTTOM: embedded map (optional) or atmospheric image of Nairobi skyline

__________________________________________________
7. FORMS & ENQUIRY DETAIL

Use @payloadcms/plugin-form-builder so admins can edit fields in /admin without code.

Form: "Safari Enquiry" with fields from §6.5.
Submission: writes to SafariEnquiries collection with editable status fields.

Email notifications:
- To customer (Resend): subject "Your Safari Journey with Zebra Trails", editorial copy. From hello@zebratrailssafari.com.
- To team (Resend): subject "New Safari Enquiry — {name}", all fields + "Open in admin" CTA.

Honeypot anti-spam field (hidden, reject if filled).
__________________________________________________
8. SEO

Target keywords: "luxury safari Kenya", "Maasai Mara safari", "African safari tours", "Kenya safari packages", "wildlife safari experience", "balloon safari Kenya".

@payloadcms/plugin-seo for per-page meta titles, descriptions, OG images.
Dynamic OG image generation per safari package via @vercel/og.
Sitemap auto-generated via next-sitemap.

Structured data:
- TourOperator schema on every page
- Organization schema on home
- Product schema on safari packages (with pricing)
- Article schema on journal posts
- Review schema on testimonials
__________________________________________________
9. PERFORMANCE

- All hero images via Next.js <Image> with priority on LCP image
- Defer non-critical JS (Framer Motion only on scroll-triggered sections)
- Target Lighthouse Performance ≥ 90
- Total JS budget for home route: < 200KB gzipped
- Images: WebP format, responsive sizes, lazy loading below fold
__________________________________________________
10. DEPLOYMENT

Hosting: Vercel
Database: PostgreSQL (Supabase or Neon)
DNS: zebratrailssafari.com → Vercel
Email: Resend with verified domain
Environment: staging + production Vercel projects
__________________________________________________
11. ADMIN HANDOFF

Admins must be able to:
- Add/edit safari packages with full itinerary, gallery, pricing
- Add testimonials
- Add journal posts
- Edit homepage hero text and images (via Settings global)
- Read incoming enquiries, update status, add internal notes
- Edit form fields if intake process evolves
__________________________________________________
12. TESTING

Playwright E2E: home → safari detail → contact form submission
Vitest: form validation, OG image generation
Manual QA: iPhone SE (375px), iPad (768px), 1440px desktop
Lighthouse: Performance ≥ 90, Accessibility ≥ 95
__________________________________________________
13. WHAT GOOD LOOKS LIKE

When done:
- A first-time visitor feels they've entered a Singita-grade editorial experience (deep greens, slow type, real photography, no template energy)
- A potential guest can browse safaris, read an itinerary, and submit an enquiry in under 3 minutes
- The admin can add a new safari package from photos to live in 15 minutes via /admin
- The site never displays purple, neon, Bootstrap blue, or pure black/white backgrounds
- No section title literally says "Services", "Features", or "Packages"
- Lighthouse Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- The wildlife gallery scrolls smoothly on mobile and desktop
- Conservation messaging is visible on every page

If any of these are not true, the build is not done.
__________________________________________________
14. THINGS TO EXPLICITLY NOT DO

- Do not build a separate frontend project — use the existing Payload scaffold
- Do not introduce any second CMS or ORM
- Do not use any color outside the §3.2 palette
- Do not install any UI library other than shadcn/ui + explicit additions
- Do not use stock photos of people in suits or generic office settings
- Do not auto-play video with sound
- Do not title a section "Services", "Features", or "Why Choose Us"
- Do not use emoji icons on any page
- Do not add a chat-bubble widget — WhatsApp is enough
- Do not use animated number counters
- Do not use parallax scrolling
- Do not use carousel auto-rotation under 8 seconds
__________________________________________________
15. CURATED IMAGE LIBRARY (Pexels + Unsplash)

All images are free to use. Append ?auto=compress&cs=tinysrgb&w=1920 for full-width, &w=1280 for cards.

15.1 Hero / Landscape (full-bleed backgrounds)
- https://images.pexels.com/photos/5643013/pexels-photo-5643013.jpeg — Savanna sunset, lone tree silhouette
- https://images.pexels.com/photos/16025353/pexels-photo-16025353.jpeg — Kenyan sunset with acacia
- https://images.pexels.com/photos/15873083/pexels-photo-15873083.jpeg — Tanzania dramatic sunset
- https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg — Elephants at sunset
- https://images.pexels.com/photos/259547/pexels-photo-259547.jpeg — Giraffes against sunset
- https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920 — Safari sunset

15.2 Safari Vehicles / Guides
- https://images.pexels.com/photos/16025340/pexels-photo-16025340.jpeg — Safari vehicle on trail
- https://images.pexels.com/photos/16036948/pexels-photo-16036948.jpeg — Vehicle in Mara landscape
- https://images.pexels.com/photos/16025367/pexels-photo-16025367.jpeg — Jeeps in Ngorongoro
- https://images.pexels.com/photos/16036937/pexels-photo-16036937.jpeg — Guest with binoculars
- https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920 — Safari vehicle

15.3 Safari Experiences
- https://images.pexels.com/photos/16036953/pexels-photo-16036953.jpeg — Game drive spotting lion
- https://images.pexels.com/photos/16025358/pexels-photo-16025358.jpeg — Elephant encounter
- https://images.pexels.com/photos/16113204/pexels-photo-16113204.jpeg — Hot air balloon safari
- https://images.pexels.com/photos/16113210/pexels-photo-16113210.jpeg — Balloons over Serengeti
- https://images.pexels.com/photos/16113207/pexels-photo-16113207.jpeg — Balloon above elephants
- https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1920 — Hot air balloon Africa

15.4 Wildlife — Big Five & Beyond
Lions:
- https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg — Lion resting in savannah
- https://images.pexels.com/photos/16036945/pexels-photo-16036945.jpeg — Lion in Maasai Mara
- https://images.pexels.com/photos/68421/pexels-photo-68421.jpeg — Lion portrait close-up
- https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920 — Lion

Elephants:
- https://images.pexels.com/photos/16025344/pexels-photo-16025344.jpeg — Elephant crossing road
- https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg — Elephant in Kenya
- https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg — Elephant herd
- https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1920 — Elephant

Zebras (BRAND ANIMAL):
- https://images.pexels.com/photos/16025349/pexels-photo-16025349.jpeg — Zebra herd, Serengeti
- https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg — Zebra in wild
- https://images.pexels.com/photos/259411/pexels-photo-259411.jpeg — Zebra close-up stripes
- https://images.pexels.com/photos/16025355/pexels-photo-16025355.jpeg — Pair of zebras
- https://images.unsplash.com/photo-1534759926787-89c25457468f?w=1920 — Zebra

Giraffes:
- https://images.pexels.com/photos/16025341/pexels-photo-16025341.jpeg — Giraffes crossing road
- https://images.pexels.com/photos/16025368/pexels-photo-16025368.jpeg — Giraffe and calf
- https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920 — Giraffe

Other Wildlife:
- https://images.pexels.com/photos/16025372/pexels-photo-16025372.jpeg — Cheetah with safari vehicle
- https://images.pexels.com/photos/16025356/pexels-photo-16025356.jpeg — Wildebeest migration
- https://images.pexels.com/photos/16025370/pexels-photo-16025370.jpeg — Wildebeest and zebras
- https://images.pexels.com/photos/16025362/pexels-photo-16025362.jpeg — Impalas

15.5 Accommodation
- https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg — Luxury tent interior
- https://images.pexels.com/photos/6271634/pexels-photo-6271634.jpeg — Glamping tent interior
- https://images.pexels.com/photos/6271619/pexels-photo-6271619.jpeg — Lodge deck view
- https://images.pexels.com/photos/6271640/pexels-photo-6271640.jpeg — Open-air dining
- https://images.pexels.com/photos/6271616/pexels-photo-6271616.jpeg — Safari lodges landscape

15.6 Atmospheric / Testimonial Backgrounds
- https://images.pexels.com/photos/16025375/pexels-photo-16025375.jpeg — Lone acacia golden light
- https://images.pexels.com/photos/16025380/pexels-photo-16025380.jpeg — Sunrise savanna mist
- https://images.pexels.com/photos/16025348/pexels-photo-16025348.jpeg — Sunset vibrant colors
- https://images.pexels.com/photos/16025360/pexels-photo-16025360.jpeg — Namibian sunset

15.7 CTA / Contact Backgrounds
- https://images.pexels.com/photos/16025343/pexels-photo-16025343.jpeg — Tree silhouette sunset
- https://images.pexels.com/photos/16025378/pexels-photo-16025378.jpeg — Giraffe silhouettes sunset
- https://images.pexels.com/photos/16025363/pexels-photo-16025363.jpeg — Acacia silhouettes Botswana
- https://images.pexels.com/photos/16025373/pexels-photo-16025373.jpeg — Baobab sunset Angola

15.8 Gallery / Mixed
- https://images.pexels.com/photos/16025346/pexels-photo-16025346.jpeg — Giraffes at sunset
- https://images.pexels.com/photos/16025350/pexels-photo-16025350.jpeg — Zebras grazing
- https://images.pexels.com/photos/16025371/pexels-photo-16025371.jpeg — Zebras and giraffe
- https://images.pexels.com/photos/16025382/pexels-photo-16025382.jpeg — Zebras at sunset
- https://images.pexels.com/photos/16025352/pexels-photo-16025352.jpeg — Giraffes and zebras together
__________________________________________________
16. AI AGENT SKILLS (installed in .kiro/skills/)

16.1 frontend-design skill — design discipline guard
Location: .kiro/skills/frontend-design/SKILL.md
Invoke: BEFORE drafting any new page or component. Re-invoke if output feels generic.

16.2 webapp-testing skill — automated build verification
Location: .kiro/skills/webapp-testing/SKILL.md
Invoke: AFTER every major page is drafted — screenshot and visually compare to reference sites.

16.3 Skill invocation playbook:
Phase 0: Skills already installed in .kiro/skills/
Phase 1: Scaffolding — install shadcn components, configure Payload collections
Phase 2: Building — BEFORE each page: re-read Visual Bible (§3.1). AFTER each page: screenshot and critique.
Phase 3: Validation — Lighthouse on every route. Performance ≥ 90, Accessibility ≥ 95.
__________________________________________________
17. VISUAL BIBLE — ANTI-REFERENCE SET

Study these to understand what NOT to build:
- Generic Wix "travel agency" templates with rotating carousels and "BOOK NOW" urgency banners
- Elementor "tour operator" templates with hard-hat icons and blue/orange palettes
- Bootstrap "safari" templates with animated counters and "Why Choose Us" grids
- Any template with a chat bubble, animated number counter, or "Trusted by X clients" strip

If your draft uses any of these patterns, scrap and rebuild.

The standard: Could this page exist on Singita.com or Angama.com? If yes, ship. If it looks like a Wix template, rebuild.
__________________________________________________

End of brief. Build it.
