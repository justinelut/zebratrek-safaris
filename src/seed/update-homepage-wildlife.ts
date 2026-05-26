/**
 * Idempotent homepage Wildlife section updater.
 * Looks up existing media by filename, then updates ONLY the wildlife
 * fields on the homepage global. No migrate:fresh, no media re-upload.
 *
 * Usage:
 *   DATABASE_URL=... pnpm tsx src/seed/update-homepage-wildlife.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

async function findMediaIdByFilename(payload: any, filename: string): Promise<number | null> {
  const result = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  return result.docs[0]?.id ?? null
}

async function findMediaIdLike(payload: any, contains: string): Promise<number | null> {
  const result = await payload.find({
    collection: 'media',
    where: { filename: { contains } },
    limit: 1,
  })
  return result.docs[0]?.id ?? null
}

async function run() {
  const payload = await getPayload({ config })
  console.log('🦓 Updating homepage wildlife section…')

  const lookup = async (key: string) => {
    // Tries exact filename, then fuzzy contains
    const id = (await findMediaIdByFilename(payload, key)) || (await findMediaIdLike(payload, key.replace(/\.[a-z]+$/, '')))
    if (!id) console.log(`  ⚠ no media found for ${key}`)
    return id
  }

  const lion = await lookup('lion.jpg')
  const elephant = await lookup('elephant.jpg')
  const leopard = await lookup('leopard.jpg')
  const buffalo = await lookup('buffalo.jpg')
  const rhino = await lookup('rhino.jpg')
  const cheetah = await lookup('cheetah.jpg')
  const giraffe = await lookup('giraffe.jpg')
  const zebra = await lookup('zebra.jpg')

  // Read existing homepage to preserve everything else
  const existing = await payload.findGlobal({ slug: 'homepage' })

  const animals = [
    {
      name: 'Lion',
      scientificName: 'Panthera leo',
      description:
        "Africa's apex predator. Watch prides at dawn and listen for the territorial roar that carries 8km across the plains.",
      images: lion ? [{ image: lion }] : [],
      linkType: 'safaris',
    },
    {
      name: 'Elephant',
      scientificName: 'Loxodonta africana',
      description:
        "The world's largest land mammal. Amboseli holds some of the most magnificent tuskers left on the continent.",
      images: elephant ? [{ image: elephant }] : [],
      linkType: 'destinations',
    },
    {
      name: 'Leopard',
      scientificName: 'Panthera pardus',
      description:
        'Solitary, secretive, and stunningly beautiful. The Mara and Samburu offer your best chance to spot one in the wild.',
      images: leopard ? [{ image: leopard }] : [],
      linkType: 'safaris',
    },
    {
      name: 'Buffalo',
      scientificName: 'Syncerus caffer',
      description:
        "Hardy and unpredictable, the Cape buffalo is one of Africa's most respected and resilient herd animals.",
      images: buffalo ? [{ image: buffalo }] : [],
      linkType: 'safaris',
    },
    {
      name: 'Rhino',
      scientificName: 'Diceros bicornis',
      description:
        "A conservation triumph in progress. Ol Pejeta and Lewa protect Kenya's rebounding black and white rhino populations.",
      images: rhino ? [{ image: rhino }] : [],
      linkType: 'destinations',
    },
    {
      name: 'Cheetah',
      scientificName: 'Acinonyx jubatus',
      description:
        'The fastest land animal on earth. Catch a hunt at full sprint across the open Mara plains.',
      images: cheetah ? [{ image: cheetah }] : [],
      linkType: 'safaris',
    },
    {
      name: 'Giraffe',
      scientificName: 'Giraffa camelopardalis',
      description:
        'Tallest creature on the savanna. Three subspecies inhabit East Africa — the reticulated being the most striking.',
      images: giraffe ? [{ image: giraffe }] : [],
      linkType: 'safaris',
    },
    {
      name: 'Zebra',
      scientificName: 'Equus quagga',
      description:
        'Each pattern is unique as a fingerprint. Watch hundreds of thousands cross the Mara River during the Great Migration.',
      images: zebra ? [{ image: zebra }] : [],
      linkType: 'safaris',
    },
  ]

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      ...existing,
      wildlifeHeadline: existing.wildlifeHeadline || 'The Big Five and Beyond',
      wildlifeIntro:
        'East Africa is home to some of the most charismatic wildlife on earth. From iconic predators to gentle giants, every animal tells a story of survival, migration, and the wild rhythms of the savanna.',
      animals: animals as any,
    },
  })

  console.log(`✓ Homepage wildlife updated (${animals.filter((a) => a.images.length).length}/${animals.length} animals with images)`)
  process.exit(0)
}

run().catch((err) => {
  console.error('✗ failed', err)
  process.exit(1)
})
