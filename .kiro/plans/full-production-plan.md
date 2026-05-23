# Zebra Trails Safari — Complete Production Website Plan

## Vision

Transform this MVP into a world-class luxury safari website rivaling **andBeyond**, **Singita**, and **Great Plains Conservation**. Every piece of content managed via Payload CMS. Premium editorial design. Immersive imagery. Trust-building architecture that converts high-net-worth travelers.

## Reference Websites (Design & Feature Inspiration)

- **Singita** (singita.com) — editorial storytelling, conservation-first, lodge-centric
- **andBeyond** (andbeyond.com) — trip planning tools, destination guides, travel styles
- **Aardvark Safaris** (aardvarksafaris.com) — "When to Travel", "A Day on Safari", planning guides
- **Great Plains Conservation** — conservation impact, photography-led
- **Extraordinary Journeys** — personalized trip design, journal/blog
- **Micato Safaris** — luxury positioning, awards, detailed itineraries

## Free Image Sources

| Source | URL | Best For |
|--------|-----|----------|
| Pexels | pexels.com/search/african%20safari/ | 137K+ safari photos, high-res |
| Unsplash | unsplash.com/s/photos/safari | Editorial-quality wildlife |
| Pixabay | pixabay.com/images/search/safari%20wildlife/ | 100K+ wildlife images |
| Pexels | pexels.com/search/african%20wildlife/ | 399K+ wildlife photos |
| Pexels | pexels.com/search/kenya-landscape/ | Kenyan landscapes |
| Unsplash | unsplash.com/s/photos/african-lodge | Lodge/camp interiors |
| Pixabay | pixabay.com/images/search/safari%20landscape/ | Savanna landscapes |

**Image Strategy:** Download 80-100 curated high-res images across categories (wildlife, landscapes, lodges, people, vehicles, sunsets, camps) and upload to Payload Media. Replace ALL Unsplash/Pexels URLs in components with Payload Media references.

## Complete Page Map (17 Pages)

| Route | Type | Status |
|-------|------|--------|
| `/` | Homepage | Exists (hardcoded) → CMS |
| `/safaris` | Safari listing | Exists (basic) → Enhanced |
| `/safaris/[slug]` | Safari detail | Exists (basic) → Enhanced |
| `/destinations` | Destination listing | NEW |
| `/destinations/[slug]` | Destination detail | NEW |
| `/about` | About us | Exists (hardcoded) → CMS |
| `/team` | Meet the guides | NEW |
| `/conservation` | Conservation commitment | NEW |
| `/gallery` | Photo gallery | NEW |
| `/journal` | Blog/journal listing | NEW |
| `/journal/[slug]` | Blog post detail | NEW |
| `/contact` | Enquiry form | Exists (basic) → Enhanced |
| `/plan-your-safari` | Trip planning guide | NEW |
| `/when-to-visit` | Seasonal guide | NEW |
| `/what-to-expect` | First-timer guide | NEW |
| `/faq` | FAQ page | NEW |
| `/[slug]` | Generic pages (Privacy, Terms) | NEW |
| `/book/[safari-slug]` | Multi-step booking form | NEW |
| `/share-your-experience` | Guest testimonial submission | NEW |

---

## Phase 0 — Foundation & Design System (Day 1)

### 0.1 Design System Setup
- Install design skill references (already present in `.kiro/skills/design/`)
- Run `/design setup` to create project brief
- Establish color palette (safari green + golden savanna)
- Set typography (Playfair Display + DM Sans)
- Define spacing scale (1-4-9 rhythm: 4px, 16px, 36px)

### 0.2 Font Installation
- Switch from current fonts → **Playfair Display** (display) + **DM Sans** (body)
- Configure in `layout.tsx` via `next/font/google`
- Update `globals.css` with type scale variables

### 0.3 Color Palette Implementation
- Light mode: warm ivory background, deep bush green text, safari green accent, golden savanna secondary
- Dark mode: deep night bush background, parchment text, golden savanna accent
- All colors as CSS custom properties in `globals.css`
- Tailwind config mapped to CSS vars

### 0.4 Environment & Config
- Fix `.env.example` with all required vars
- Ensure Docker Postgres setup works
- Add `NEXT_PUBLIC_SERVER_URL` for absolute URLs

---

## Phase 1 — Complete Payload CMS Schema (Day 1-2)

### 1.1 Register Everything in payload.config.ts
- Add SafariPackages, Destinations, TeamMembers, Testimonials, SafariEnquiries to collections array
- Add Settings global
- Run migrations to create DB tables
- Run `payload generate:types`

### 1.2 Install Payload Plugins
```
pnpm add @payloadcms/plugin-seo
```
- Configure SEO plugin (meta title, description, OG image on all content collections)

### 1.3 Enhance Existing Collections

**SafariPackages** — add:
- `destinations` (relationship → Destinations)
- `accommodation` (textarea — lodge/camp description)
- `seo` group (from plugin)
- `status` (draft/published)

**Destinations** — add:
- `tagline` (text)
- `country` (select: Kenya, Tanzania, Uganda, Rwanda)
- `seo` group
- `featured` (checkbox)

**TeamMembers** — add:
- `languages` (array of text)
- `certifications` (array of text)
- `featured` (checkbox)

**Testimonials** — add:
- `tripDate` (date)
- `safari` (relationship → SafariPackages)

**SafariEnquiries** — add:
- `honeypot` field (hidden text, reject if filled)
- Public create access (anyone can submit)

### 1.4 New Collections

**JournalPosts**
- title, slug, summary, heroImage, body (Lexical richText)
- category (select: Wildlife, Travel Tips, Conservation, Behind the Scenes, Guest Stories)
- author (relationship → Users)
- publishedAt (date), featured (checkbox), seo group
- readTime (number, minutes)

**Pages**
- title, slug, body (Lexical richText), seo group
- For: Privacy Policy, Terms & Conditions, Cookie Policy

**GalleryImages**
- image (upload → Media), caption, category (select: Wildlife, Landscapes, Camps, Guests, Vehicles)
- featured (checkbox), order (number)
- location (text), photographer (text)

### 1.5 New Globals

**Homepage** — structured fields for every section:
- hero: headline, subheadline, backgroundImage, backgroundVideo (upload), ctaText, ctaLink
- introStatement: text
- philosophy: headline, body, image
- numbers: array of { value, label, suffix }
- experiences: headline, subheadline (pulls featured SafariPackages)
- pullQuote: quote, attribution
- wildlifeGrid: array of { image, name }
- lodge: headline, body, image
- guidesPreview: headline, subheadline (pulls featured TeamMembers)
- destinationsPreview: headline (pulls featured Destinations)
- process: headline, steps array of { number, title, description }
- testimonials: headline (pulls featured Testimonials)
- conservation: headline, body, stat, image
- closingCta: headline, body, ctaText, ctaLink
- imageBreaks: array of { image, alt, position }

**AboutPage**
- hero: headline, subheadline, image
- story: headline, body (richText), founderImage
- values: array of { title, description, icon }
- timeline: array of { year, event }
- awards: array of { name, year, image }
- cta: headline, body, ctaText, ctaLink

**ContactPage**
- hero: headline, subheadline, image
- formHeadline, formSubheadline
- successMessage (richText)
- sidebarHeadline, sidebarBody
- trustSignals: array of { icon, title, description }

**SafarisPage**
- hero: headline, subheadline, image
- categories: array of { name, description, image }
- emptyStateText

**DestinationsPage**
- hero: headline, subheadline, image
- introText

**ConservationPage**
- hero: headline, subheadline, image
- mission: headline, body
- stats: array of { value, label }
- partnerships: array of { name, logo, description, url }
- impactStories: array of { title, body, image }
- cta: headline, body, ctaText, ctaLink

**PlanYourSafariPage**
- hero: headline, subheadline, image
- steps: array of { number, title, description, image }
- travelStyles: array of { name, description, image, priceRange }
- faqs: array of { question, answer }
- cta: headline, ctaText, ctaLink

**WhenToVisitPage**
- hero: headline, subheadline, image
- intro: body
- months: array of { month, weather, wildlife, crowds, rating }
- seasons: array of { name, months, description, highlights, image }
- migrationCalendar: body (richText)

**WhatToExpectPage**
- hero: headline, subheadline, image
- sections: array of { title, body, image, icon }
- packingList: array of { category, items array }
- dayOnSafari: array of { time, activity, description }

**GalleryPage**
- hero: headline, subheadline
- categories: array of { name, slug }

**JournalPage**
- hero: headline, subheadline, image
- featuredPostHeadline

**FAQPage**
- hero: headline, subheadline
- categories: array of { name, questions: array of { question, answer } }

### 1.6 Generate Types
- Run `pnpm payload generate:types`
- Verify all types in `payload-types.ts`

---

## Phase 2 — Data Layer & Utilities (Day 2-3)

### 2.1 Payload Server Helper
Create `src/lib/payload.ts`:
- `getPayload()` — cached server-side Payload instance
- Used in all server components and server actions

### 2.2 Query Functions
Create `src/lib/queries.ts`:
- `getSiteSettings()` — Settings global (nav, footer, contact, social)
- `getHomepage()` — Homepage global
- `getAboutPage()` — AboutPage global
- `getContactPage()` — ContactPage global
- `getSafarisPage()` — SafarisPage global
- `getDestinationsPage()` — DestinationsPage global
- `getConservationPage()` — ConservationPage global
- `getPlanYourSafariPage()` — PlanYourSafariPage global
- `getWhenToVisitPage()` — WhenToVisitPage global
- `getWhatToExpectPage()` — WhatToExpectPage global
- `getGalleryPage()` — GalleryPage global
- `getJournalPage()` — JournalPage global
- `getFAQPage()` — FAQPage global
- `getSafaris(options)` — SafariPackages with filters (category, featured, limit)
- `getSafariBySlug(slug)` — single safari with full depth
- `getDestinations(options)` — Destinations with filters
- `getDestinationBySlug(slug)` — single destination
- `getTeamMembers(options)` — TeamMembers sorted by order
- `getTestimonials(options)` — Testimonials (featured, limit)
- `getJournalPosts(options)` — JournalPosts with category filter, pagination
- `getJournalPostBySlug(slug)` — single post
- `getGalleryImages(options)` — GalleryImages with category filter
- `getPage(slug)` — generic Pages collection

### 2.3 Media Utilities
Create `src/lib/media.ts`:
- `getImageUrl(media)` — resolve Payload Media to full URL
- `getImageProps(media)` — return `{ src, width, height, alt }` for Next.js Image
- `getBlurDataUrl(media)` — placeholder blur (if available)

### 2.4 SEO Utilities
Create `src/lib/seo.ts`:
- `generatePageMetadata(seo, defaults)` — merge page SEO with site defaults
- Returns Next.js `Metadata` object with OG, Twitter, canonical

### 2.5 Rich Text Renderer
Create `src/components/RichText.tsx`:
- Render Payload Lexical rich text to React
- Custom block renderers for embedded media, callouts, quotes

---

## Phase 3 — Wire Existing Pages to CMS (Day 3-5)

### 3.1 Layout (Header + Footer)
- Fetch `getSiteSettings()` in `layout.tsx`
- **Header**: navigation from Settings, logo from Settings, CTA button from Settings
- **Footer**: 3-column links from Settings, social links, contact info, conservation badge
- Both components become prop-driven (zero hardcoded strings)

### 3.2 Homepage — All 15 Sections CMS-Driven
- Fetch `getHomepage()` + featured collections in `page.tsx`
- Each section component receives props from the global
- Sections with `show: false` are conditionally hidden
- Featured safaris → from `getSafaris({ featured: true, limit: 3 })`
- Featured testimonials → from `getTestimonials({ featured: true, limit: 3 })`
- Featured destinations → from `getDestinations({ featured: true, limit: 4 })`
- Featured team → from `getTeamMembers({ featured: true, limit: 3 })`
- All images from Payload Media (no more Unsplash URLs in components)

### 3.3 Safaris Listing Page
- Fetch `getSafarisPage()` + `getSafaris()` with category filter from searchParams
- Category filter tabs/pills from page global
- Safari cards with: hero image, title, duration, price, category badge
- Empty state from global

### 3.4 Safari Detail Page
- Fetch `getSafariBySlug(params.slug)`
- Dynamic `generateMetadata()` from safari SEO fields
- Full-bleed hero, itinerary timeline, included/excluded, gallery, related safaris
- Enquiry CTA linking to contact with pre-selected package
- JSON-LD structured data (TourProduct)

### 3.5 About Page
- Fetch `getAboutPage()` + `getTeamMembers()`
- Story section, values, timeline, team preview, awards
- All from CMS global

### 3.6 Contact Page
- Fetch `getContactPage()` + `getSiteSettings()`
- Server action for form submission → creates SafariEnquiry document
- Trust signals sidebar from global
- Success state from global
- WhatsApp link from Settings

---

## Phase 4 — New Pages Build (Day 5-8)

### 4.1 Destinations Listing (`/destinations`)
- Grid of destination cards: hero image, name, tagline, country badge, wildlife count
- Filter by country
- "Explore →" links to detail

### 4.2 Destination Detail (`/destinations/[slug]`)
- Full-bleed hero with parallax
- Rich text body, wildlife gallery (carousel), best time to visit
- Related safari packages (relationship)
- Map placeholder (text location for now)
- JSON-LD (TouristDestination)

### 4.3 Team Page (`/team`)
- Editorial grid of team members
- Portrait, name, role, speciality, years experience, languages
- Click → expandable bio (or modal/drawer)
- Trust signal: total combined years of experience

### 4.4 Conservation Page (`/conservation`)
- Hero with conservation imagery
- Mission statement, impact stats (animated counters)
- Partnership logos
- Impact stories (mini case studies)
- "5% of every journey" pledge section
- CTA to plan a safari

### 4.5 Gallery Page (`/gallery`)
- Masonry/bento grid layout
- Category filter tabs (Wildlife, Landscapes, Camps, Guests)
- Lightbox on click (use Radix Dialog)
- Lazy loading with blur placeholders
- Photographer credit overlay

### 4.6 Journal Listing (`/journal`)
- Featured post hero (large card)
- Grid of posts below
- Category filter
- Pagination
- Each card: hero image, title, summary, date, read time, category badge

### 4.7 Journal Detail (`/journal/[slug]`)
- Editorial long-form layout (max-width prose)
- Hero image full-bleed
- Author byline with avatar
- Rich text body with embedded images
- Related posts at bottom
- Share buttons (copy link, WhatsApp)
- JSON-LD (Article)

### 4.8 Plan Your Safari (`/plan-your-safari`)
- Step-by-step planning guide
- Travel styles section (Classic, Luxury, Adventure, Family, Photography, Honeymoon)
- Each style: image, description, price range, recommended duration
- FAQ accordion at bottom
- CTA to contact/enquire

### 4.9 When to Visit (`/when-to-visit`)
- Interactive month-by-month guide
- Each month: weather, wildlife highlights, crowd levels, rating
- Season overview cards (Dry Season, Green Season, Migration)
- Visual calendar/timeline
- Best for: photography, families, honeymoon, budget

### 4.10 What to Expect (`/what-to-expect`)
- "A Day on Safari" timeline (5:30am wake-up → evening sundowner)
- Sections: Accommodation, Game Drives, Walking Safaris, Meals, Safety
- Packing list (categorized)
- First-timer tips
- Photo of typical safari vehicle, lodge room, bush dinner

### 4.11 FAQ Page (`/faq`)
- Categorized accordion (Booking, Travel, Safety, Accommodation, Wildlife, Payment)
- Search/filter
- CTA to contact if question not answered

### 4.12 Generic Pages (`/[slug]`)
- Privacy Policy, Terms & Conditions, Cookie Policy
- Simple rich text layout from Pages collection
- Catch-all route with 404 for unknown slugs

---

## Phase 5 — Forms, Email & Interactivity (Day 8-9)

### 5.1 Enquiry Form Server Action
- Create `src/app/(frontend)/contact/actions.ts`
- Server action `submitEnquiry(formData)`:
  - Validate with Zod
  - Check honeypot field (reject if filled)
  - Create document in `safari-enquiries` collection
  - Return success/error state

### 5.2 Email Notifications (Resend)
- Install `resend` package
- `SafariEnquiries` collection `afterChange` hook:
  - **Customer email**: branded HTML confirmation ("We received your enquiry, expect a response within 24 hours")
  - **Team email**: notification with all enquiry details + link to admin panel
- Email templates in `src/lib/email/` (enquiry-confirmation.tsx, enquiry-notification.tsx)

### 5.3 WhatsApp Integration
- Floating WhatsApp button (bottom-right, above fold on mobile)
- Pre-filled message: "Hi, I'm interested in planning a safari..."
- Number from Settings global

### 5.4 Newsletter Signup (Optional)
- Simple email capture in footer
- Stores in a `NewsletterSubscribers` collection (email, subscribedAt)
- Or integrates with Mailchimp/ConvertKit via webhook

### 5.5 Safari Enquiry from Detail Page
- "Enquire About This Safari" button on safari detail
- Links to `/contact?safari=slug` with package pre-selected
- Contact form reads searchParams and pre-fills the interested package

---

## Phase 6 — SEO & Performance (Day 9-10)

### 6.1 Dynamic Metadata on Every Route
- Every page has `generateMetadata()` pulling from:
  - Page-specific SEO fields (from Payload SEO plugin)
  - Fallback to site defaults from Settings global
- Includes: title, description, OG image, canonical URL, robots

### 6.2 Sitemap Generation
- Install `next-sitemap` or build custom `/sitemap.xml` route
- Dynamic entries from: safaris, destinations, journal posts, pages
- Static entries: home, about, contact, team, conservation, gallery, plan, when-to-visit, what-to-expect, faq

### 6.3 JSON-LD Structured Data
- **Layout (all pages)**: Organization, WebSite
- **Homepage**: TravelAgency, AggregateRating
- **Safari detail**: Product, Offer, TourTrip
- **Destination detail**: TouristDestination
- **Journal post**: Article, BreadcrumbList
- **Team page**: Person (for each guide)
- **FAQ page**: FAQPage schema
- **Contact**: ContactPoint

### 6.4 Performance Optimization
- All images via Next.js `<Image>` with Payload Media URLs
- Blur placeholders for above-fold images
- Lazy loading for below-fold sections
- Font display: swap for body, optional for display
- Preload critical hero images
- Bundle analysis — ensure no unnecessary client JS

### 6.5 robots.txt & Security Headers
- `/robots.txt` allowing all crawlers
- Security headers in `next.config.ts` (X-Frame-Options, CSP, etc.)
- Canonical URLs on all pages

### 6.6 Open Graph Images
- Default OG image from Settings
- Per-page OG from SEO fields
- Safari/destination/journal hero images as OG

---

## Phase 7 — Design Polish & Premium Quality (Day 10-12)

### 7.1 Motion System
- Page transitions: subtle fade between routes
- Scroll-triggered reveals: staggered entrance for cards, stats, timeline items
- Hero parallax: subtle background movement on scroll
- Hover states: image zoom on cards, underline animations on links
- Loading states: skeleton screens matching layout
- `prefers-reduced-motion` respected throughout

### 7.2 Premium UI Components
- **Image carousel** (Embla): for safari galleries, destination wildlife
- **Lightbox** (Radix Dialog): for gallery page
- **Accordion** (custom): for FAQ, itinerary days
- **Tabs** (custom): for safari categories, destination filters
- **Counter animation**: for stats/numbers section
- **Scroll progress**: thin bar at top showing page progress
- **Back to top**: appears after scrolling past fold

### 7.3 Responsive Excellence
- Test all 17 pages at: 320px, 375px, 768px, 1024px, 1440px, 2560px
- Mobile navigation: full-screen overlay with staggered link animation
- Touch targets: minimum 44×44px on all interactive elements
- Thumb zone: primary CTAs in bottom 25% on mobile
- Safe areas: `env(safe-area-inset-*)` for notched devices

### 7.4 Accessibility
- WCAG 2.1 AA compliance
- Focus rings on all interactive elements (2-3px, offset, 3:1 contrast)
- Skip to content link
- Proper heading hierarchy (h1 → h2 → h3, no skips)
- Alt text on all images (from Payload Media alt field)
- Aria labels on icon-only buttons
- Color contrast: all text passes 4.5:1 (body) / 3:1 (large text)
- Reduced motion: all animations respect `prefers-reduced-motion`

### 7.5 Dark Mode
- Full dark mode support via `next-themes`
- All components adapt (not just background swap)
- Images: slightly reduced brightness in dark mode
- Toggle in header

### 7.6 Typography Refinement
- Playfair Display: hero headlines, section titles, pull quotes
- DM Sans: body text, navigation, buttons, captions
- Proper line-height: 1.1 for headlines, 1.5-1.7 for body
- Max-width prose: 65-75ch for readable paragraphs
- Responsive type scale: larger on desktop, proportional on mobile

### 7.7 Image Curation & Upload
- Download 80-100 high-quality images from Pexels/Unsplash/Pixabay:
  - **Wildlife** (20): lion, elephant, leopard, cheetah, giraffe, zebra, hippo, rhino, buffalo, wildebeest, flamingo, eagle, crocodile
  - **Landscapes** (15): savanna sunrise, sunset, Masai Mara, Amboseli with Kilimanjaro, Tsavo, Lake Nakuru, Samburu, Rift Valley
  - **Lodges/Camps** (15): luxury tent interior, lodge exterior, bush dinner setup, pool overlooking savanna, sundowner deck
  - **Experiences** (10): game drive vehicle, walking safari, hot air balloon, bush breakfast, sundowner drinks, night drive
  - **People** (10): Maasai guides, guests on safari, binoculars, camera setup, campfire
  - **Details** (10): safari hat, binoculars, journal, coffee at sunrise, starry sky, campfire, sundowner cocktail
- Upload all to Payload Media with proper alt text
- Replace every hardcoded URL in components

---

## Phase 8 — Advanced Features (Day 12-14)

### 8.1 Search
- Site-wide search across safaris, destinations, journal posts
- Search bar in header (expandable on click)
- Results page with categorized results
- Payload's built-in search or simple text matching

### 8.2 Related Content
- Safari detail → related safaris (same category or destination)
- Destination detail → related safaris (linked via relationship)
- Journal post → related posts (same category)
- Automatic via Payload relationships + manual override

### 8.3 Breadcrumbs
- On all inner pages: Home > Safaris > Masai Mara Classic
- Schema.org BreadcrumbList markup
- Styled subtly (muted text, separator)

### 8.4 Social Proof Elements
- TripAdvisor rating badge (from Settings)
- Awards section (from AboutPage global)
- Guest count ("500+ guests hosted since 2018")
- Response time ("We respond within 24 hours")

### 8.5 Print Stylesheet
- Safari detail pages printable as PDF-like itinerary
- Clean layout, no navigation, proper page breaks
- QR code linking back to the page

### 8.6 Cookie Consent
- Simple banner (not modal)
- Accept/Decline
- Stores preference in localStorage
- Blocks analytics until accepted

### 8.7 404 & Error Pages
- Custom 404: beautiful full-screen with safari imagery
- "Lost in the bush?" headline
- Search bar + popular links
- Custom 500: "Something went wrong" with retry

---

## Phase 8B — Booking & Reservation System (Day 14-16)

### 8B.1 Booking Collection
Create `Bookings` collection:
- `bookingRef` (auto-generated: ZTS-2026-001)
- `guest` (group): name, email, phone, country, passportName, dietaryRequirements, medicalConditions
- `trip` (group): safari (relationship → SafariPackages), destination (relationship → Destinations), startDate, endDate, numberOfAdults, numberOfChildren, childrenAges (array)
- `accommodation` (select): Standard, Luxury, Ultra-Luxury
- `extras` (array): hot air balloon, photography guide, private vehicle, bush dinner, spa treatment
- `pricing` (group): basePrice, extrasTotal, discount, discountReason, totalPrice, currency, depositAmount, depositPaid (checkbox), balanceDue, balancePaidDate
- `payment` (group): method (select: Bank Transfer, Card, PayPal), depositReference, balanceReference, invoiceSent (checkbox), receiptSent (checkbox)
- `status` (select): Enquiry → Quoted → Deposit Paid → Confirmed → In Progress → Completed → Cancelled → Refunded
- `timeline` (array): date, event, note, user (who logged it)
- `documents` (array): upload (PDF itinerary, invoice, receipt, voucher)
- `internalNotes` (richText)
- `assignedTo` (relationship → Users)
- `source` (select): Website, WhatsApp, Email, Referral, Agent
- Access: admin only (guests never see this directly)

### 8B.2 Availability System
Create `Availability` collection:
- `safari` (relationship → SafariPackages)
- `date` (date)
- `spotsTotal` (number)
- `spotsBooked` (number)
- `status` (select): Available, Limited, Full, Blocked
- `priceOverride` (number, optional — for peak season pricing)
- `notes` (text)

Admin can mark dates as blocked (maintenance, private bookings) or set seasonal pricing.

### 8B.3 Pricing & Seasons
Create `Seasons` collection:
- `name` (text: Peak, High, Shoulder, Green/Low)
- `startDate`, `endDate`
- `priceMultiplier` (number: 1.0, 1.3, 1.5, 0.8)
- `description` (text)
- `year` (number)

SafariPackages get a `basePricePerPerson` field. Final price = base × season multiplier + extras.

### 8B.4 Booking Request Flow (Frontend)
New page: `/book/[safari-slug]`
- Multi-step form (not a wall of fields):
  - **Step 1**: Select dates (calendar picker showing availability)
  - **Step 2**: Guest details (adults, children, names)
  - **Step 3**: Accommodation preference + extras
  - **Step 4**: Review & special requests
  - **Step 5**: Submit → creates Booking with status "Enquiry"
- Server action creates Booking document
- Sends confirmation email to guest
- Sends notification to team with all details
- Redirects to thank-you page with booking reference

### 8B.5 Booking Confirmation & Follow-up Emails
- **Immediate**: "We received your booking request (ref: ZTS-2026-001). Our team will send a detailed quote within 24 hours."
- **Quote sent** (manual trigger from admin): branded PDF quote email
- **Deposit received** (admin marks paid): "Your safari is confirmed! Here's what happens next..."
- **Pre-trip** (7 days before, via cron/scheduled job): "Your adventure begins soon. Here's your final itinerary."
- **Post-trip** (3 days after): "Welcome home. We'd love to hear about your experience." (links to testimonial form)

### 8B.6 Guest Testimonial Submission
- `/share-your-experience` page (linked from post-trip email)
- Form: rating (1-5 stars), quote, trip type, photo upload (optional)
- Creates Testimonial with `status: pending` (admin approves before showing on site)
- Thank-you message after submission

### 8B.7 Admin Booking Dashboard
Payload admin customization:
- Booking list view: sortable by status, date, assignee
- Status badges with colors (green=confirmed, yellow=quoted, red=cancelled)
- Quick filters: This month, Next month, Pending deposits, Overdue balances
- Booking detail: full timeline of events, attached documents, internal notes
- One-click actions: Mark deposit paid, Send quote, Generate invoice

---

## Phase 8C — Professional Admin & Operations (Day 16-17)

### 8C.1 User Roles & Permissions
- **Super Admin**: full access to everything
- **Operations Manager**: bookings, enquiries, availability, team — no settings/config
- **Content Editor**: journal posts, pages, gallery, testimonials — no bookings/financials
- **Guide**: can view assigned bookings only, update trip notes

### 8C.2 Admin Dashboard Widgets
Custom Payload dashboard:
- **This month's bookings** (count + revenue)
- **Pending enquiries** (count, oldest first)
- **Upcoming departures** (next 7 days)
- **Recent testimonials** (pending approval)
- **Quick actions**: New booking, New journal post, Upload to gallery

### 8C.3 Document Generation
- PDF itinerary generation (from booking + safari package data)
- PDF invoice generation (from booking pricing)
- Stored as uploads attached to the booking
- Template: branded header, clean typography, all trip details

### 8C.4 Analytics & Reporting (Admin)
- Enquiry conversion rate (enquiry → booking)
- Revenue by month/quarter
- Most popular safaris
- Traffic sources (from `howDidYouHear` field)
- Average booking lead time (enquiry date → departure date)

### 8C.5 Audit Trail
- Every booking status change logged with timestamp + user
- Every enquiry status change logged
- Content publish/unpublish logged
- Visible in admin timeline view

---

## Phase 9 — Content Seeding & Data Population (Day 17-18)

### 9.1 Seed Script
- Create `src/seed/index.ts` — populates all collections and globals
- Run via `pnpm seed` script
- Populates:
  - 6-8 Safari Packages (Classic Masai Mara, Luxury Amboseli, Great Migration, Family Safari, Photography Safari, Honeymoon, Adventure Samburu, Budget Tsavo)
  - 5-6 Destinations (Masai Mara, Amboseli, Tsavo, Samburu, Lake Nakuru, Laikipia)
  - 5-6 Team Members (Head Guide, Wildlife Expert, Operations Manager, Conservation Lead, Guest Relations, Photography Guide)
  - 8-10 Testimonials (varied countries, trip types, ratings)
  - 4-5 Journal Posts (sample articles about wildlife, travel tips, conservation)
  - 20-30 Gallery Images (categorized)
  - All page globals with real editorial copy
  - Settings global with full navigation, footer, contact info
  - 2-3 Pages (Privacy Policy, Terms, Cookie Policy)

### 9.2 Editorial Copy
- Write premium editorial copy for every section (not lorem ipsum)
- Tone: confident, warm, knowledgeable, never salesy
- Voice: "We" (the team), speaking to "you" (the discerning traveler)
- Reference real Kenyan locations, wildlife, seasons
- Conservation messaging woven throughout (not bolted on)

### 9.3 FAQ Content
- 20-30 real FAQs across categories:
  - **Booking**: How far in advance? Deposit? Cancellation? Group size?
  - **Travel**: Visa? Vaccinations? Flights? Transfers? Insurance?
  - **On Safari**: What to wear? Camera gear? Phone signal? Tipping?
  - **Accommodation**: Luxury level? Electricity? WiFi? Laundry?
  - **Wildlife**: Big Five guarantee? Best time for migration? Night drives?
  - **Payment**: Methods? Currency? Installments? What's included?

---

## Phase 10 — Testing & Quality Assurance (Day 15-16)

### 10.1 E2E Tests (Playwright)
- Homepage loads, all sections render
- Navigate to each of the 17 pages
- Safari listing → filter by category → click detail
- Destination listing → click detail → see related safaris
- Contact form: fill → submit → success message
- Mobile navigation: open → navigate → close
- Gallery: open lightbox → navigate → close
- Journal: listing → click post → see content
- 404 page: visit invalid URL → see custom 404
- Dark mode toggle works

### 10.2 Integration Tests (Vitest)
- Payload API: create/read safari packages
- Payload API: create enquiry (public access)
- Payload API: reject enquiry with honeypot filled
- Query functions return expected shapes
- SEO metadata generation
- Media URL resolution

### 10.3 Visual Regression
- Screenshot each page at 375px, 768px, 1440px
- Compare after changes to catch unintended regressions

### 10.4 Performance Audit
- Lighthouse score targets: Performance 90+, Accessibility 95+, SEO 95+, Best Practices 95+
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Bundle size check: no unnecessary client-side JS
- Image optimization: all served via Next.js Image with proper sizing

### 10.5 Cross-Browser Testing
- Chrome, Firefox, Safari, Edge (latest)
- iOS Safari, Android Chrome
- Test touch interactions on real devices

### 10.6 Design Quality Gates
Run after all pages complete:
1. **Smell check** — no AI tells (no feature tile grid, no accent rail, no unearned blur, no icon toppers)
2. **Voice check** — palette/type/layout cannot be guessed from "travel website" alone
3. **Squint test** — first 3 reads survive blur: hero image, CTA, one wildlife shot
4. **5-minute test** — browse safaris, read itinerary, submit enquiry. Every friction = bug
5. **30-second sniff** — show to stranger for 2 seconds. Can they tell it's a safari company?

---

## Phase 11 — Deployment & Production (Day 16-17)

### 11.1 Production Environment
- PostgreSQL production database (Neon, Supabase, or AWS RDS)
- S3-compatible storage for media (AWS S3, Cloudflare R2, or Payload Cloud)
- Environment variables: DATABASE_URL, PAYLOAD_SECRET, S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY, RESEND_API_KEY, NEXT_PUBLIC_SERVER_URL

### 11.2 Deployment Config
- Vercel deployment (or Docker on AWS/Railway)
- Build command: `pnpm build`
- Environment variables in deployment platform
- Custom domain setup
- SSL certificate (automatic with Vercel)

### 11.3 CI/CD Pipeline
- GitHub Actions or similar:
  - Lint on PR
  - Type check on PR
  - Run integration tests on PR
  - Build check on PR
  - Deploy preview on PR
  - Deploy production on merge to main

### 11.4 Monitoring
- Error tracking (Sentry or similar)
- Analytics (Plausible or Vercel Analytics — privacy-friendly)
- Uptime monitoring

### 11.5 Backup & Recovery
- Database backups (automated daily)
- Media backup strategy
- Payload admin access recovery plan

---

## Execution Summary

| Phase | Tasks | Duration | Depends On |
|-------|-------|----------|------------|
| 0 — Foundation | Design system, fonts, colors, env | Day 1 | Nothing |
| 1 — CMS Schema | Collections, globals, plugins, types | Day 1-2 | Phase 0 |
| 2 — Data Layer | Queries, utilities, helpers | Day 2-3 | Phase 1 |
| 3 — Wire Existing Pages | Homepage, safaris, about, contact → CMS | Day 3-5 | Phase 2 |
| 4 — New Pages | 12 new pages built and wired | Day 5-8 | Phase 2 |
| 5 — Forms & Email | Enquiry submission, Resend, WhatsApp | Day 8-9 | Phase 3 |
| 6 — SEO & Performance | Metadata, sitemap, JSON-LD, optimization | Day 9-10 | Phase 3 |
| 7 — Design Polish | Motion, responsive, a11y, dark mode, images | Day 10-12 | Phase 4 |
| 8A — Advanced Features | Search, breadcrumbs, social proof, 404 | Day 12-14 | Phase 4 |
| 8B — Booking System | Full reservation flow, availability, pricing | Day 14-16 | Phase 5 |
| 8C — Admin & Operations | Roles, dashboard, documents, analytics | Day 16-17 | Phase 8B |
| 9 — Content Seeding | Seed script, editorial copy, FAQs, sample bookings | Day 17-18 | Phase 4 |
| 10 — Testing & QA | E2E, integration, visual, performance | Day 18-19 | Phase 8C |
| 11 — Deployment | Production env, CI/CD, monitoring | Day 19-20 | Phase 10 |

**Total: ~20 working days for a complete, production-grade luxury safari platform.**

---

## Engineering Standards (Senior-Level Quality)

This is not a tutorial project. Every decision follows production engineering principles:

### Architecture
- **Server-first**: All data fetching in server components. Zero client-side fetching for page content.
- **Type safety end-to-end**: Payload generates types → queries return typed data → components receive typed props. No `any`, no untyped API responses.
- **Separation of concerns**: Data layer (`lib/queries.ts`) never imported in components directly from Payload. Components are pure render functions.
- **Error boundaries**: Every async page wrapped. Graceful degradation, never a white screen.
- **Edge cases handled**: Empty states, loading states, error states, overflow states on every component.

### Code Quality
- **No magic strings**: All slugs, routes, field names as constants or derived from types.
- **No prop drilling beyond 2 levels**: Use composition, not threading props through 5 components.
- **No `useEffect` for data fetching**: Server components handle it. Client components only for interactivity.
- **No inline styles**: Everything via Tailwind utilities or CSS custom properties.
- **No commented-out code**: Clean commits, clean files.
- **Consistent naming**: `get*` for queries, `submit*` for actions, `use*` for hooks, `*Page` for page globals.

### Performance
- **No layout shift**: All images have explicit width/height. Skeletons match final layout.
- **No render waterfalls**: Parallel data fetching with `Promise.all` where possible.
- **No unnecessary client JS**: `"use client"` only on components that genuinely need interactivity (forms, carousels, toggles).
- **Bundle splitting**: Dynamic imports for heavy components (lightbox, calendar picker, rich text renderer).

### Security
- **Input validation**: Zod schemas on all form submissions. Server-side validation always (client-side is UX, not security).
- **Honeypot fields**: On all public forms to block bots without CAPTCHAs.
- **Rate limiting**: On form submission endpoints.
- **CSRF protection**: Next.js server actions handle this natively.
- **No secrets in client code**: All sensitive operations server-side.
- **Access control**: Payload collection access functions enforce who can read/write what.

### Design (Senior Product Designer Quality)
- **No generic templates**: Every page has intentional composition based on its job (Decide, Explore, Learn, Compare).
- **No decoration without purpose**: Every visual element serves hierarchy, wayfinding, or trust-building.
- **Real content density**: Designed with real data lengths, not "Lorem ipsum" or "John Doe".
- **State coverage**: Every interactive element has idle, hover, active, focus, disabled, loading, error, empty, overflow states designed.
- **Micro-copy is UX**: Button labels name the action. Error messages provide recovery paths. Empty states teach.
- **Visual rhythm**: Consistent spacing scale (4/16/36px). No arbitrary values.
- **Photography as design**: The wildlife images ARE the design. Layout serves the photography, not the other way around.

---

## Skills & Tools Used

| Tool/Skill | Purpose |
|------------|---------|
| `/design` skill (installed) | Color, typography, layout, motion, interaction, responsive, voice, surface, review |
| `frontend-design` skill (installed) | Premium UI implementation, anti-AI-slop aesthetics |
| `webapp-testing` skill (installed) | Playwright screenshots, accessibility tree, console log verification |
| Payload CMS 3.84 | Content management for every piece of content |
| @payloadcms/plugin-seo | SEO fields on all content types |
| Next.js 16 App Router | Server components, server actions, dynamic metadata, ISR |
| Tailwind CSS 4 | Utility-first styling with CSS custom properties |
| Framer Motion | Scroll animations, page transitions, micro-interactions |
| Radix UI | Accessible dialog/lightbox, sheet/drawer |
| Embla Carousel | Image galleries, testimonial sliders |
| Lucide React | Consistent icon system |
| Resend | Transactional email (enquiry confirmations) |
| Playwright | E2E testing across all pages |
| Vitest | Unit/integration testing |
| next-themes | Dark mode support |
| Zod | Form validation |

---

## Definition of Done

The website is "production complete" when:

1. ✅ Every visible string comes from Payload CMS (zero hardcoded content)
2. ✅ Every image comes from Payload Media (zero external URLs in components)
3. ✅ All 18+ pages render correctly at all breakpoints (320px → 2560px)
4. ✅ Contact form creates enquiry + sends branded emails via Resend
5. ✅ Booking flow works end-to-end (request → admin quote → deposit → confirmed)
6. ✅ Availability calendar shows real data, blocks full dates
7. ✅ SEO metadata + JSON-LD structured data on every page
8. ✅ Lighthouse scores: 90+ Performance, 95+ Accessibility, 95+ SEO, 95+ Best Practices
9. ✅ Dark mode works on all pages without visual bugs
10. ✅ Animations respect `prefers-reduced-motion`
11. ✅ E2E tests pass for all critical user journeys
12. ✅ Admin can manage all content, bookings, and enquiries without touching code
13. ✅ Role-based access: Super Admin, Operations, Content Editor, Guide
14. ✅ Email notifications fire at every booking lifecycle stage
15. ✅ Design passes smell/voice/squint quality gates (no AI tells, no generic patterns)
16. ✅ Print stylesheet works on safari detail (clean PDF-like itinerary)
17. ✅ Cookie consent, privacy policy, terms all present
18. ✅ Custom 404/500 error pages with brand imagery
19. ✅ Deployed to production with custom domain, SSL, monitoring
20. ✅ A senior engineer would review this codebase and say "this is clean"
