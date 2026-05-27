/**
 * Enriches the when-to-visit-page global with 4 seasons + images.
 * Idempotent — overwrites the seasons array in the global.
 *
 * Usage:
 *   DATABASE_URL=... pnpm tsx src/seed/update-when-to-visit-seasons.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

async function findMedia(payload: any, contains: string) {
  const r = await payload.find({ collection: 'media', where: { filename: { contains } }, limit: 1 })
  return r.docs[0]?.id ?? null
}

async function run() {
  const payload = await getPayload({ config })
  console.log('🗓  Updating When to Visit seasons…')

  const savanna = await findMedia(payload, 'savanna-sunrise')
  const masaiMara = await findMedia(payload, 'masai-mara')
  const flamingos = await findMedia(payload, 'flamingos')
  const acacia = await findMedia(payload, 'acacia')

  const existing = await payload.findGlobal({ slug: 'when-to-visit-page' })

  await payload.updateGlobal({
    slug: 'when-to-visit-page',
    data: {
      ...existing,
      seasons: [
        {
          name: 'Peak Season',
          months: 'July — October',
          description: 'The Great Migration fills the Masai Mara. River crossings are at their most dramatic, big cats hunt in the open, and dry conditions mean animals concentrate around water sources. This is prime time — book 6-12 months ahead.',
          highlights: 'Wildebeest river crossings, big cat hunting action, clear skies for photography, highest game density',
          image: masaiMara,
        },
        {
          name: 'Green Season',
          months: 'November — May',
          description: 'The bush transforms into a lush emerald landscape. Newborn animals appear across the plains, migratory birds arrive, and tourist numbers drop dramatically. Rates are 20-40% lower than peak.',
          highlights: 'Baby animals everywhere, 300+ bird species, dramatic thunderstorm skies, lower prices, fewer vehicles',
          image: savanna,
        },
        {
          name: 'Shoulder Season',
          months: 'June & November',
          description: 'The sweet spot between crowds and value. June sees the migration moving north into the Mara. November brings short rains, green returning, and excellent game viewing with far fewer vehicles.',
          highlights: 'Great value, moderate crowds, migration movement, lush landscapes beginning',
          image: acacia,
        },
        {
          name: 'Festive Season',
          months: 'Mid-December — Early January',
          description: 'Warm weather, family-friendly conditions, and a celebratory atmosphere in camp. Popular with multi-generational groups. Book early — premium camps fill fast.',
          highlights: 'Family travel, warm dry mornings, festive camp dinners, excellent predator sightings',
          image: flamingos,
        },
      ] as any,
    },
  })

  console.log('  ✓ When to Visit seasons updated (4 seasons with images)')
  process.exit(0)
}

run().catch((err) => { console.error('✗', err); process.exit(1) })
