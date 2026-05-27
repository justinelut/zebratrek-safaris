/**
 * Adds included/not-included to real safari packages.
 * Idempotent: only updates packages that have empty included/excluded arrays.
 */
import { getPayload } from 'payload'
import config from '../payload.config'

const commonIncluded = [
  'Hotel pickup and drop-off (Mombasa/coast hotels)',
  'Transport in safari vehicle with pop-up roof',
  'Park/sanctuary entrance fees',
  'English-speaking driver guide',
  'Mineral water during the drive',
]

const commonExcluded = [
  'Travel insurance',
  'Tips and gratuities',
  'Personal expenses',
  'Alcoholic beverages',
  'Optional activities not mentioned',
]

const packageExtras: Record<string, { included: string[]; excluded: string[] }> = {
  'full-day-shimba-hills': {
    included: [...commonIncluded, 'Lunch at Shimba Green Lodge', 'Game drives (morning + afternoon)'],
    excluded: [...commonExcluded, 'Sheldrick Falls visit (optional, requires fitness)'],
  },
  '1-day-tsavo-east-red-elephant': {
    included: [...commonIncluded, 'Lunch at Ashnil Aruba Lodge', 'Full-day game drive in Tsavo East', 'Dida Area & River Circuit route'],
    excluded: commonExcluded,
  },
  '1-5-days-saltlick-safari': {
    included: [...commonIncluded, 'Lunch at Taita Hills Resort', 'Dinner & overnight at Saltlick Safari Lodge (fullboard)', 'Morning and afternoon game drives', 'Early morning Day 2 game drive'],
    excluded: commonExcluded,
  },
  '1-5-days-tsavo-east-ashnil-aruba': {
    included: [...commonIncluded, 'Lunch, dinner & overnight at Ashnil Aruba Lodge (fullboard)', 'Afternoon game drive till sundown', 'Early morning Day 2 game drive + breakfast'],
    excluded: commonExcluded,
  },
  '1-5-days-tsavo-east-sentrim': {
    included: [...commonIncluded, 'Lunch, dinner & overnight at Sentrim Tsavo Camp (fullboard)', 'Afternoon game drive till sundown', 'Early morning Day 2 game drive + breakfast'],
    excluded: commonExcluded,
  },
  '2-days-saltlick-ngutuni-watamu': {
    included: ['Hotel pickup and drop-off (Watamu/Malindi)', 'Transport in safari vehicle with pop-up roof', 'Park/sanctuary entrance fees', 'English-speaking driver guide', 'Mineral water', 'Dinner & overnight at Saltlick Safari Lodge (fullboard)', 'Lunch at Taita Hills Resort (Day 1)', 'Game drive + lunch at Ngutuni Lodge (Day 2)'],
    excluded: commonExcluded,
  },
  '2-days-saltlick-ngutuni': {
    included: [...commonIncluded, 'Dinner & overnight at Saltlick Safari Lodge (fullboard)', 'Lunch at Taita Hills Resort (Day 1)', 'Game drive + lunch at Ngutuni Lodge (Day 2)', 'Morning & afternoon game drives'],
    excluded: commonExcluded,
  },
  '2-days-taita-ngutuni': {
    included: [...commonIncluded, 'Dinner & overnight at Taita Hills Resort (fullboard)', 'Lunch at Taita Hills Resort (Day 1)', 'Game drive + lunch at Ngutuni Lodge (Day 2)', 'Morning & afternoon game drives'],
    excluded: commonExcluded,
  },
  '2-days-tsavo-east-saltlick': {
    included: [...commonIncluded, 'Lunch at Ashnil Aruba Lodge (Day 1)', 'Dinner & overnight at Saltlick Safari Lodge (fullboard)', 'Full game drives in Tsavo East + Taita Hills Sanctuary', 'Morning & afternoon drives both days'],
    excluded: commonExcluded,
  },
  '3-days-shimba-ngutuni-saltlick': {
    included: [...commonIncluded, '2 nights accommodation (Shimba Green Lodge + Saltlick Lodge) fullboard', 'All meals as per itinerary', 'Shimba Hills, Taita Hills & Ngutuni game drives', 'Optional Sheldrick Falls visit', 'Lunch at Ngutuni Lodge (Day 3)'],
    excluded: [...commonExcluded, 'Sheldrick Falls guide fee (optional)'],
  },
  '3-days-tsavo-taita-saltlick': {
    included: [...commonIncluded, '2 nights accommodation (Taita Hills Resort + Saltlick Lodge) fullboard', 'All meals as per itinerary', 'Tsavo East + Taita Hills Sanctuary game drives', 'Night game drive at Saltlick (warden provided)', 'Lunch at Ashnil Aruba Lodge (Day 1)'],
    excluded: commonExcluded,
  },
  '4-days-mombasa-rendezvous': {
    included: ['Pickup from North/South coast hotel or Moi Airport', 'Transport in safari vehicle with pop-up roof', 'All park & conservancy entrance fees', 'English-speaking driver guide', 'Mineral water', '3 nights accommodation fullboard (Ashnil Aruba + Sentrim Amboseli + Saltlick Lodge)', 'All meals as per itinerary', 'Game drives in Tsavo East, Amboseli & Taita Hills', 'Night game drive at Saltlick', 'Swimming pool access at Sentrim Amboseli'],
    excluded: [...commonExcluded, 'Hot air balloon ride (available at extra cost)', 'Domestic flights'],
  },
}

async function run() {
  const payload = await getPayload({ config })
  console.log('📦 Updating safari packages with included/excluded...')

  let updated = 0
  for (const [slug, data] of Object.entries(packageExtras)) {
    const result = await payload.find({ collection: 'safari-packages', where: { slug: { equals: slug } }, limit: 1 })
    const pkg = result.docs[0]
    if (!pkg) { console.log(`  ⚠ not found: ${slug}`); continue }

    // Only update if included is empty
    const existing = (pkg as any).included || []
    if (existing.length > 0) { continue }

    await payload.update({
      collection: 'safari-packages',
      id: pkg.id,
      data: {
        included: data.included.map((item) => ({ item })),
        excluded: data.excluded.map((item) => ({ item })),
      } as any,
    })
    updated++
  }

  console.log(`  ✓ Updated ${updated} packages (${Object.keys(packageExtras).length - updated} already had data)`)
  process.exit(0)
}

run().catch((err) => { console.error('✗', err); process.exit(1) })
