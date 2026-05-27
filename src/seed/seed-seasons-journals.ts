/**
 * Idempotent seed for Seasons + additional Journal Posts.
 * Checks by slug/name before creating — safe to re-run.
 *
 * Usage:
 *   DATABASE_URL=... S3_BUCKET=... pnpm tsx src/seed/seed-seasons-journals.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

function richBody(paragraphs: string[]) {
  return {
    root: {
      type: 'root', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
      children: paragraphs.map((text) =>
        text.startsWith('## ')
          ? { type: 'heading', version: 1, tag: 'h2', children: [{ type: 'text', version: 1, format: 0, mode: 'normal', text: text.slice(3) }] }
          : { type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', children: [{ type: 'text', version: 1, format: 0, mode: 'normal', text }] },
      ),
    },
  }
}

async function run() {
  const payload = await getPayload({ config })

  // --- SEASONS ---
  const seasons = [
    { name: 'Green Season 2026', year: 2026, startDate: '2026-01-01', endDate: '2026-05-31', priceMultiplier: 0.8, description: 'Low season — lush landscapes, newborn animals, fewer crowds. Best rates.' },
    { name: 'High Season 2026', year: 2026, startDate: '2026-06-01', endDate: '2026-10-31', priceMultiplier: 1.5, description: 'Peak migration season — river crossings, big cat action. Book 6-12 months ahead.' },
    { name: 'Shoulder Season Late 2026', year: 2026, startDate: '2026-11-01', endDate: '2026-12-15', priceMultiplier: 1.0, description: 'Short rains, green returning, good game viewing with fewer vehicles.' },
    { name: 'Festive Season 2026', year: 2026, startDate: '2026-12-16', endDate: '2026-12-31', priceMultiplier: 1.4, description: 'Holiday peak — family travel, warm weather, excellent game.' },
    { name: 'Green Season 2027', year: 2027, startDate: '2027-01-01', endDate: '2027-05-31', priceMultiplier: 0.8, description: 'Low season — calving in Ndutu, dramatic skies, lowest prices.' },
    { name: 'High Season 2027', year: 2027, startDate: '2027-06-01', endDate: '2027-10-31', priceMultiplier: 1.5, description: 'Peak migration season. The Great Migration crosses the Mara River.' },
  ]

  console.log('🗓  Seeding seasons…')
  let created = 0
  for (const s of seasons) {
    const existing = await payload.find({ collection: 'seasons', where: { name: { equals: s.name } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'seasons', data: s as any })
      created++
    }
  }
  console.log(`  ✓ Seasons: ${created} created, ${seasons.length - created} already existed`)

  // --- JOURNAL POSTS ---
  // Look up images by filename
  async function findMedia(contains: string) {
    const r = await payload.find({ collection: 'media', where: { filename: { contains } }, limit: 1 })
    return r.docs[0]?.id ?? null
  }

  const heroImages = {
    flamingos: await findMedia('flamingos'),
    acacia: await findMedia('acacia'),
    balloon: await findMedia('balloon'),
    masaiMara: await findMedia('masai-mara'),
    sunset: await findMedia('sunset-savanna'),
  }

  const posts = [
    {
      title: 'Flamingos of Lake Nakuru: A Pink Spectacle',
      slug: 'flamingos-lake-nakuru',
      summary: 'Two million flamingos turning a lake pink is one of nature\'s great shows. Here\'s when to see it, and why the numbers fluctuate year to year.',
      heroImage: heroImages.flamingos,
      category: 'Wildlife', readTime: 6, featured: false,
      publishedAt: new Date('2026-05-10').toISOString(), _status: 'published',
      body: richBody([
        'Lake Nakuru sits in the Rift Valley, ringed by acacia woodland and alive with alkaline-loving algae. This algae is what draws the flamingos — both lesser and greater species — in numbers that darken the shoreline from above.',
        '## Why numbers change',
        'Flamingos follow the algae, which follows the water chemistry. Heavy rains dilute the alkalinity and the birds shift to Lake Bogoria or Lake Natron. In drier years, Nakuru fills pink shore-to-shore. Your guide monitors water levels weekly to advise timing.',
        '## Best time',
        'January to March and June to September tend to see peak concentrations. But it is never guaranteed — nature does not perform on schedule. That uncertainty is part of the magic.',
      ]),
    },
    {
      title: 'Night Drives: What Comes Out After Dark',
      slug: 'night-drives-after-dark',
      summary: 'Most safari visitors miss 50% of the action. Here\'s what happens on a conservancy night drive — and why nocturnal species will change how you see Africa.',
      heroImage: heroImages.sunset,
      category: 'Wildlife', readTime: 5, featured: false,
      publishedAt: new Date('2026-05-20').toISOString(), _status: 'published',
      body: richBody([
        'National parks close at dusk. Conservancies do not. This is one of the biggest advantages of staying in a private conservancy — after 6pm, the bush transforms.',
        '## What you see',
        'Aardvarks emerge from burrows. Leopards become bolder. Genets hunt in the canopy. Porcupines rattle across the road. Bat-eared foxes listen for termites. Your guide sweeps a filtered spotlight — red light that does not disturb the animals — across the landscape.',
        '## Where we offer this',
        'Ol Pejeta, Naboisho, and Laikipia conservancies all permit night drives. Most of our classic itineraries include at least one night drive.',
      ]),
    },
    {
      title: 'Travelling with Children: A Safari for Every Age',
      slug: 'safari-with-children',
      summary: 'The minimum age question, the attention span question, and the safety question — all answered by someone who has taken a 4-year-old on bush walks.',
      heroImage: heroImages.acacia,
      category: 'Travel Tips', readTime: 7, featured: false,
      publishedAt: new Date('2026-04-28').toISOString(), _status: 'published',
      body: richBody([
        'Children see things adults miss. A dung beetle rolling a ball of elephant dung is the best show on earth if you are seven. A lizard doing push-ups on a rock is better than any lion, at age four.',
        '## Age considerations',
        'Under 5: Choose malaria-free conservancies (Laikipia, parts of Lewa). Stay in family-friendly camps with fenced pools. Short morning drives only — two hours max. Ages 6-12: Full game drives work well. Add bush walks (supervised), star talks, junior ranger programs. Teens: Treat them like adults. Add adrenaline — walking safaris, gorilla trekking, balloon rides.',
        '## Our family itineraries',
        'We design multi-generational trips where grandparents, parents, and children all have independent options. Morning drives for the adults; craft and tracking with a junior guide for the children.',
      ]),
    },
    {
      title: 'Why We Partner with Conservancies, Not Just National Parks',
      slug: 'conservancies-vs-parks',
      summary: 'The conservancy model pays local Maasai landowners directly for keeping their land wild. It works better than any government scheme. Here\'s the evidence.',
      heroImage: heroImages.masaiMara,
      category: 'Conservation', readTime: 8, featured: true,
      publishedAt: new Date('2026-05-15').toISOString(), _status: 'published',
      body: richBody([
        'A national park is government-owned. A conservancy is community-owned. This difference matters enormously.',
        '## The economic model',
        'In the Mara conservancies, each Maasai landowner receives a monthly lease payment in exchange for keeping their land wild and unfenced. No cattle, no farming, no settlement. The payment comes from tourism operators — including us.',
        '## Why it works',
        'Before conservancies, a Maasai herder could earn $2 per acre per year from cattle. The conservancy model pays $50-100 per acre. The financial incentive for conservation is 25-50x higher than agriculture. Wildlife wins. Communities win. Guests win.',
        '## The numbers',
        'The 14 conservancies surrounding the Masai Mara protect 350,000 acres — larger than the national reserve itself. Vehicle density is capped. Night drives are permitted. Walking safaris are permitted. You see fewer vehicles and more wildlife.',
      ]),
    },
    {
      title: 'Green Season Secrets: Why Low Season Is Our Favourite',
      slug: 'green-season-secrets',
      summary: 'November to May is when Kenya transforms. The landscape is cinematic, the prices drop, and the animals are everywhere — without the crowds.',
      heroImage: heroImages.balloon,
      category: 'Travel Tips', readTime: 6, featured: false,
      publishedAt: new Date('2026-05-25').toISOString(), _status: 'published',
      body: richBody([
        'The safari industry markets July-October as "the" time to visit. We disagree. For experienced travellers and photographers, green season is the best-kept secret in East Africa.',
        '## Why we love it',
        'Dramatic skies: Every afternoon brings towering cumulonimbus — the light is extraordinary. Baby animals: Wildebeest calving happens in February. Other species give birth early in the rains. Fewer guests: Some camps run at 30% occupancy. You share sightings with one or two vehicles, not twenty.',
        '## The price advantage',
        'Lodges drop rates by 30-40%. Internal flights offer green season specials. The same 7-day itinerary that costs $7,000 in August runs $4,500 in March. Same camps, same guides, fewer people.',
        '## The trade-off',
        'It rains. Not all day — typically a dramatic 45-minute downpour in the afternoon. Mornings are clear. And the rain brings life: the bush is emerald green, rivers flow, and the light has a quality that high season simply cannot match.',
      ]),
    },
  ]

  console.log('📓 Seeding journal posts…')
  let postsCreated = 0
  for (const post of posts) {
    const existing = await payload.find({ collection: 'journal-posts', where: { slug: { equals: post.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'journal-posts', data: post as any })
      postsCreated++
    }
  }
  console.log(`  ✓ Journal Posts: ${postsCreated} created, ${posts.length - postsCreated} already existed`)

  process.exit(0)
}

run().catch((err) => { console.error('✗', err); process.exit(1) })
