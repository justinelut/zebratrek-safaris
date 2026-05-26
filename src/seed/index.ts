import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const MEDIA_DIR = path.resolve(__dirname, '../../seed-media')

async function uploadImage(payload: any, filePath: string, alt: string) {
  const fullPath = path.resolve(MEDIA_DIR, filePath)
  if (!fs.existsSync(fullPath)) { console.log(`    ⚠ Missing: ${filePath}`); return null }
  const fileData = fs.readFileSync(fullPath)
  const result = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: fullPath,
  })
  return result.id
}

async function seed() {
  const payload = await getPayload({ config })
  console.log('🌱 Seeding ZebraTrek Safaris...')

  // Upload key images
  console.log('  Uploading images...')
  const images: Record<string, any> = {}
  const uploads = [
    ['hero-main.jpg', 'African savanna at golden hour'],
    ['wildlife/lion.jpg', 'Male lion in golden grass'],
    ['wildlife/elephant.jpg', 'Elephant herd in Amboseli'],
    ['wildlife/leopard.jpg', 'Leopard resting on branch'],
    ['wildlife/cheetah.jpg', 'Cheetah scanning the plains'],
    ['wildlife/giraffe.jpg', 'Giraffe against blue sky'],
    ['wildlife/zebra.jpg', 'Zebra herd at sunset'],
    ['wildlife/buffalo.jpg', 'Cape buffalo in grassland'],
    ['wildlife/rhino.jpg', 'White rhino grazing'],
    ['wildlife/wildebeest.jpg', 'Wildebeest migration'],
    ['wildlife/hippo.jpg', 'Hippo in water'],
    ['landscapes/savanna-sunrise.jpg', 'Savanna at sunrise'],
    ['landscapes/masai-mara.jpg', 'Masai Mara golden plains'],
    ['landscapes/kilimanjaro.jpg', 'Mount Kilimanjaro at dawn'],
    ['landscapes/sunset-savanna.jpg', 'Sunset over the savanna'],
    ['landscapes/acacia-tree.jpg', 'Acacia tree silhouette'],
    ['landscapes/lake-flamingos.jpg', 'Flamingos on lake'],
    ['landscapes/about-hero.jpg', 'Safari journey landscape'],
    ['landscapes/contact-hero.jpg', 'Africa landscape'],
    ['landscapes/conservation-hero.jpg', 'Wildlife conservation in Africa'],
    ['landscapes/plan-hero.jpg', 'Safari planning landscape'],
    ['landscapes/when-hero.jpg', 'Elephant in seasonal savanna'],
    ['landscapes/what-hero.jpg', 'Safari experience landscape'],
    ['landscapes/journal-hero.jpg', 'Safari storytelling moment'],
    ['landscapes/serengeti.jpg', 'Serengeti endless plains'],
    ['landscapes/ngorongoro.jpg', 'Ngorongoro crater'],
    ['landscapes/zanzibar.jpg', 'Zanzibar beach paradise'],
    ['landscapes/bwindi.jpg', 'Bwindi impenetrable forest'],
    ['landscapes/murchison.jpg', 'Murchison Falls Uganda'],
    ['landscapes/volcanoes-rwanda.jpg', 'Volcanoes National Park Rwanda'],
    ['landscapes/laikipia.jpg', 'Laikipia conservancy'],
    ['landscapes/aberdares.jpg', 'Aberdares mountain forest'],
    ['landscapes/lamu.jpg', 'Lamu coast'],
    ['lodges/luxury-tent.jpg', 'Luxury safari tent interior'],
    ['lodges/lodge-pool.jpg', 'Lodge infinity pool'],
    ['lodges/camp-exterior.jpg', 'Safari camp at dusk'],
    ['experiences/game-drive.jpg', 'Game drive vehicle on safari'],
    ['experiences/hot-air-balloon.jpg', 'Hot air balloon over savanna'],
    ['experiences/sundowner.jpg', 'Sundowner drinks at sunset'],
    ['people/guide.jpg', 'Safari guide with binoculars'],
    ['people/guests-safari.jpg', 'Guests on safari vehicle'],
    ['people/founder.jpg', 'Founder portrait'],
    // Brand assets — logos, icons, pattern
    ['brand/logo-full-color.png', 'ZebraTrek Safaris full color logo'],
    ['brand/logo-full-black.png', 'ZebraTrek Safaris full black logo'],
    ['brand/social-icon.png', 'ZebraTrek Safaris zebra icon'],
  ]
  for (const [file, alt] of uploads) {
    const id = await uploadImage(payload, file, alt)
    if (id) images[file] = id
  }
  console.log(`  ✓ Uploaded ${Object.keys(images).length} images`)

  // Settings Global
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'ZebraTrek Safaris',
      tagline: 'Where Every Trail Tells a Story',
      logo: images['brand/logo-full-color.png'] || null,
      logoDark: images['brand/logo-full-color.png'] || null,
      logoIcon: images['brand/social-icon.png'] || null,
      favicon: images['brand/social-icon.png'] || null,
      email: 'hello@zebratreksafaris.com',
      phone: '+254 712 345 678',
      whatsAppNumber: '+254712345678',
      officeAddress: 'Westlands, Nairobi, Kenya',
      navigation: [
        { label: 'Safaris', href: '/safaris' },
        { label: 'Destinations', href: '/destinations' },
        { label: 'About', href: '/about' },
        { label: 'Journal', href: '/journal' },
        { label: 'Contact', href: '/contact' },
      ],
      mobileCtaText: 'Plan Your Safari',
      mobileCtaLink: '/contact',
      heroHeadline: 'Where Every Trail Tells a Story',
      heroSubheadline: "Curated wildlife encounters across Kenya's finest conservancies. Small groups. Expert guides. Unforgettable moments.",
      socialLinks: {
        instagram: 'https://instagram.com/zebratreksafaris',
        facebook: 'https://facebook.com/zebratreksafaris',
        youtube: 'https://youtube.com/@zebratreksafaris',
        tripAdvisor: 'https://tripadvisor.com/zebratreksafaris',
      },
      footerTagline: "Intimate wildlife encounters across East Africa's most pristine wilderness. Conservation-driven. Expert-led.",
      conservationStatement: '5% of every journey protects East African wildlife',
      footerColumns: [
        { heading: 'Explore', links: [
          { label: 'Safari Experiences', href: '/safaris' },
          { label: 'Destinations', href: '/destinations' },
          { label: 'Gallery', href: '/gallery' },
          { label: 'Journal', href: '/journal' },
        ]},
        { heading: 'Plan', links: [
          { label: 'Plan Your Safari', href: '/plan-your-safari' },
          { label: 'When to Visit', href: '/when-to-visit' },
          { label: 'What to Expect', href: '/what-to-expect' },
          { label: 'FAQ', href: '/faq' },
        ]},
        { heading: 'Company', links: [
          { label: 'Our Story', href: '/about' },
          { label: 'The Team', href: '/team' },
          { label: 'Conservation', href: '/conservation' },
          { label: 'Contact', href: '/contact' },
        ]},
      ],
      defaultMetaTitle: 'ZebraTrek Safaris — Luxury African Safari Experiences',
      defaultMetaDescription: "Intimate wildlife encounters across East Africa's most pristine wilderness. Expert-led. Conservation-driven. Unforgettable.",
    },
  })
  console.log('  ✓ Settings')

  // Homepage Global
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      headline: 'Where Every Trail Tells a Story',
      subheadline: "Curated wildlife encounters across Kenya's finest conservancies. Small groups. Expert guides. Unforgettable moments.",
      backgroundImage: images['hero-main.jpg'] || null,
      ctaText: 'Plan Your Safari',
      ctaLink: '/contact',
      statement: "We don't sell safaris. We craft encounters — between you and the wild, between silence and wonder, between who you were and who you become when the dust settles.",
      philosophyHeadline: 'Fewer guests. Deeper connections.',
      philosophyBody: "Every journey is limited to six guests. This isn't a constraint — it's a promise. Smaller groups mean closer encounters, quieter mornings, and guides who know your name by the second sunrise.",
      philosophyImage: images['experiences/game-drive.jpg'] || null,
      stats: [
        { value: '500', label: 'Guests hosted', suffix: '+' },
        { value: '12', label: 'Years of experience', suffix: '' },
        { value: '6', label: 'Max group size', suffix: '' },
        { value: '98', label: 'Return rate', suffix: '%' },
      ],
      experiencesHeadline: 'Crafted Experiences',
      experiencesSubheadline: 'Each safari is designed around the season, the migration, and your curiosity.',
      wildlifeHeadline: 'The Big Five and Beyond',
      wildlifeIntro:
        'East Africa is home to some of the most charismatic wildlife on earth. From iconic predators to gentle giants, every animal tells a story of survival, migration, and the wild rhythms of the savanna.',
      animals: [
        {
          name: 'Lion',
          scientificName: 'Panthera leo',
          description:
            'Africa\'s apex predator. Watch prides at dawn and listen for the territorial roar that carries 8km across the plains.',
          images: [{ image: images['wildlife/lion.jpg'] }],
          linkType: 'safaris',
        },
        {
          name: 'Elephant',
          scientificName: 'Loxodonta africana',
          description:
            'The world\'s largest land mammal. Amboseli holds some of the most magnificent tuskers left on the continent.',
          images: [{ image: images['wildlife/elephant.jpg'] }],
          linkType: 'destinations',
        },
        {
          name: 'Leopard',
          scientificName: 'Panthera pardus',
          description:
            'Solitary, secretive, and stunningly beautiful. The Mara and Samburu offer your best chance to spot one in the wild.',
          images: [{ image: images['wildlife/leopard.jpg'] }],
          linkType: 'safaris',
        },
        {
          name: 'Buffalo',
          scientificName: 'Syncerus caffer',
          description:
            'Hardy and unpredictable, the Cape buffalo is one of Africa\'s most respected and resilient herd animals.',
          images: [{ image: images['wildlife/buffalo.jpg'] }],
          linkType: 'safaris',
        },
        {
          name: 'Rhino',
          scientificName: 'Diceros bicornis',
          description:
            'A conservation triumph in progress. Ol Pejeta and Lewa protect Kenya\'s rebounding black and white rhino populations.',
          images: [{ image: images['wildlife/rhino.jpg'] }],
          linkType: 'destinations',
        },
        {
          name: 'Cheetah',
          scientificName: 'Acinonyx jubatus',
          description:
            'The fastest land animal on earth. Catch a hunt at full sprint across the open Mara plains.',
          images: [{ image: images['wildlife/cheetah.jpg'] }],
          linkType: 'safaris',
        },
        {
          name: 'Giraffe',
          scientificName: 'Giraffa camelopardalis',
          description:
            'Tallest creature on the savanna. Three subspecies inhabit East Africa — the reticulated being the most striking.',
          images: [{ image: images['wildlife/giraffe.jpg'] }],
          linkType: 'safaris',
        },
        {
          name: 'Zebra',
          scientificName: 'Equus quagga',
          description:
            'Each pattern is unique as a fingerprint. Watch hundreds of thousands cross the Mara River during the Great Migration.',
          images: [{ image: images['wildlife/zebra.jpg'] }],
          linkType: 'safaris',
        },
      ],
      lodgeHeadline: 'Where Comfort Meets the Wild',
      lodgeBody: "Our partner lodges and tented camps sit at the intersection of luxury and wilderness. Fall asleep to the sounds of the bush. Wake to coffee on your private deck overlooking the savanna.",
      lodgeImage: images['lodges/luxury-tent.jpg'] || null,
      processHeadline: 'Your Journey Begins Here',
      steps: [
        { number: 1, title: 'Share Your Vision', description: 'Tell us when you want to travel, who is joining, and what excites you most about Africa.' },
        { number: 2, title: 'We Design Your Safari', description: 'Our team crafts a bespoke itinerary — the right parks, the right season, the right pace.' },
        { number: 3, title: 'Experience the Extraordinary', description: 'From the moment you land, every detail is handled. You just need to be present.' },
      ],
      conservationHeadline: 'Travel That Gives Back',
      conservationBody: "Every safari directly funds anti-poaching patrols, community schools, and habitat restoration. When you travel with us, you're not just a visitor — you're a guardian.",
      conservationStat: '5% of every booking protects East African wildlife',
      conservationImage: images['wildlife/elephant.jpg'] || null,
      closingHeadline: 'Ready to Begin?',
      closingBody: "Your African story is waiting. Let's write it together.",
      closingCtaText: 'Start Planning',
      closingCtaLink: '/contact',
      quote: "The silence after a lion's roar fades. The way dust turns gold at six in the evening. The feeling that you are, for the first time, exactly where you belong.",
      attribution: 'A guest, after their first morning drive',
      images: [
        { image: images['landscapes/sunset-savanna.jpg'], alt: 'Sunset over the savanna' },
        { image: images['landscapes/acacia-tree.jpg'], alt: 'Acacia tree at dusk' },
      ],
    },
  })
  console.log('  ✓ Homepage')

  await seedDestinations(payload, images)
  await seedSafaris(payload, images)
  await seedTeam(payload, images)
  await seedTestimonials(payload)
  await seedPageGlobals(payload, images)
  await seedJournalPosts(payload, images)
  await seedGallery(payload, images)

  // Backfill: link relatedPackages on each destination based on safari->destinations links
  console.log('  Linking destinations <-> safaris...')
  const allSafaris = await payload.find({ collection: 'safari-packages', limit: 50, depth: 0 })
  const destToSafaris: Record<string, number[]> = {}
  for (const s of allSafaris.docs) {
    if (s.destinations && Array.isArray(s.destinations)) {
      for (const destId of s.destinations) {
        const id = typeof destId === 'object' ? destId.id : destId
        destToSafaris[id] = destToSafaris[id] || []
        destToSafaris[id].push(s.id)
      }
    }
  }
  for (const [destId, safariIds] of Object.entries(destToSafaris)) {
    await payload.update({ collection: 'destinations', id: destId, data: { relatedPackages: safariIds } })
  }
  console.log('  ✓ Cross-linked')

  console.log('\n✅ Seeding complete!')
  process.exit(0)
}

// Imported from separate functions below
async function seedSafaris(payload: any, images: Record<string, any>) {
  const safaris = await import('./seed-safaris')
  await safaris.default(payload, images)
}
async function seedDestinations(payload: any, images: Record<string, any>) {
  const mod = await import('./seed-destinations')
  await mod.default(payload, images)
}
async function seedTeam(payload: any, images: Record<string, any>) {
  const mod = await import('./seed-team')
  await mod.default(payload, images)
}
async function seedTestimonials(payload: any) {
  const mod = await import('./seed-testimonials')
  await mod.default(payload)
}
async function seedPageGlobals(payload: any, images: Record<string, any>) {
  const mod = await import('./seed-pages')
  await mod.default(payload, images)
}
async function seedJournalPosts(payload: any, images: Record<string, any>) {
  const mod = await import('./seed-journal')
  await mod.default(payload, images)
}
async function seedGallery(payload: any, images: Record<string, any>) {
  const mod = await import('./seed-gallery')
  await mod.default(payload, images)
}

seed().catch((err) => { console.error(err); process.exit(1) })
