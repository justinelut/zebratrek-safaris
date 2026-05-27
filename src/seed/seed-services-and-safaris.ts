/**
 * Idempotent seed: 7 services + 12 real safari packages + Settings/Homepage updates.
 * Checks by slug before creating — safe to re-run. NEVER drops data.
 *
 * Usage:
 *   DATABASE_URL=... pnpm tsx src/seed/seed-services-and-safaris.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })

  // --- SERVICES ---
  const services = [
    { name: 'Road Safaris', slug: 'road-safaris', icon: 'Car', order: 1, shortDescription: 'Guided game drives through Kenya\'s iconic national parks and reserves in comfortable 4x4 Land Cruisers.' },
    { name: 'Airport Transfers', slug: 'airport-transfers', icon: 'Plane', order: 2, shortDescription: 'Reliable meet-and-greet airport pickups and drop-offs across Mombasa, Nairobi, and Malindi.' },
    { name: 'Group Transport', slug: 'group-transport', icon: 'Bus', order: 3, shortDescription: 'Comfortable minibus and coach hire for conferences, weddings, school trips, and corporate events.' },
    { name: 'Air Safaris', slug: 'air-safaris', icon: 'Plane', order: 4, shortDescription: 'Fly-in safari packages to remote parks — skip the long drives and maximize your wildlife time.' },
    { name: 'Beach Stay', slug: 'beach-stay', icon: 'Palmtree', order: 5, shortDescription: 'Extend your safari with pristine Indian Ocean beach stays along the Kenyan coast.' },
    { name: 'Air Ticketing', slug: 'air-ticketing', icon: 'Globe', order: 6, shortDescription: 'Domestic and international flight bookings at competitive rates with flexible change policies.' },
    { name: 'Excursions', slug: 'excursions', icon: 'Map', order: 7, shortDescription: 'Day trips and cultural tours — Mombasa Old Town, Wasini Island, Haller Park, and more.' },
  ]

  for (const svc of services) {
    const existing = await payload.find({ collection: 'services', where: { slug: { equals: svc.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      console.log(`⏭ Service "${svc.name}" already exists`)
      continue
    }
    await payload.create({ collection: 'services', data: { ...svc, featured: true, ctaText: 'Enquire Now', ctaLink: '/contact' } })
    console.log(`✅ Created service: ${svc.name}`)
  }

  // --- SAFARI PACKAGES ---
  // We need a heroImage — find any existing media or create a placeholder
  const mediaResult = await payload.find({ collection: 'media', limit: 1 })
  const heroImageId = mediaResult.docs[0]?.id || null

  const safaris = [
    {
      title: 'Full Day Shimba Hills Safari', slug: 'full-day-shimba-hills', duration: '1 Day',
      category: 'Day Safari', difficulty: 'Easy', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Coastal rainforest meets savanna — Kenya\'s only sable antelope habitat',
      itinerary: [
        { day: 1, title: 'Shimba Hills Full Day', description: '0600-0700 hotel pickup from Diani/Mombasa South Coast. Drive to Shimba Hills National Reserve. Morning game drive with optional hike to Sheldrick Falls. 1230 lunch at Shimba Green Lodge with panoramic views. 1515 afternoon game drive through the coastal rainforest. Transfer back to hotel by evening.' },
      ],
    },
    {
      title: '1 Day Tsavo East — Red Elephant Safari', slug: '1-day-tsavo-east-red-elephant', duration: '1 Day',
      category: 'Day Safari', difficulty: 'Easy', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'See the famous red elephants of Tsavo in a single action-packed day',
      itinerary: [
        { day: 1, title: 'Tsavo East Day Safari', description: '0500-0600 early pickup from Mombasa/Diani. 0600 drive along Mombasa-Nairobi highway. 0900 enter via Bachuma Gate. Game drives along Dida Plains and River Circuit — red elephants, lions, buffalo, hippos. Lunch at Ashnil Aruba Lodge. 1400 begin en-route game drive back. Return to hotel by evening.' },
      ],
    },
    {
      title: '1.5 Days Saltlick Safari', slug: '1-5-days-saltlick-safari', duration: '1.5 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Overnight at the iconic Saltlick Lodge with its underground viewing bunker',
      itinerary: [
        { day: 1, title: 'Mombasa to Taita Hills', description: '0520 pickup from Kizingo, Mombasa. 0700 drive to Taita Hills Wildlife Sanctuary. 1030 check-in and morning game drive. 1230 lunch at Taita Hills Resort. 1600 afternoon game drive through the sanctuary. Overnight at Saltlick Safari Lodge — watch elephants and buffalo from the underground bunker.' },
        { day: 2, title: 'Morning Drive & Return', description: '0630 early morning game drive — best chance for predators. Return for breakfast. Checkout and transfer back to Mombasa, arriving by early afternoon.' },
      ],
    },
    {
      title: '1.5 Days Tsavo East — Ashnil Aruba', slug: '1-5-days-tsavo-east-ashnil-aruba', duration: '1.5 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Overnight in Tsavo East with full-board luxury at Ashnil Aruba Lodge',
      itinerary: [
        { day: 1, title: 'Into Tsavo East', description: '0600-0830 pickup from Mombasa hotels. 0900 drive along Mombasa-Nairobi road. 1030 enter Bachuma Gate. Game drives along Dida Plains and River Circuit — red elephants, lions, crocodiles. 1300 lunch at Ashnil Aruba Lodge. 1600 afternoon game drive. Overnight fullboard at Ashnil Aruba.' },
        { day: 2, title: 'Morning Drive & Return', description: '0630 early morning game drive — golden light, active predators. 0830 breakfast at the lodge. 0930 checkout and drive back to Mombasa.' },
      ],
    },
    {
      title: '1.5 Days Tsavo East — Sentrim Tsavo', slug: '1-5-days-tsavo-east-sentrim', duration: '1.5 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Classic Tsavo East experience with overnight at Sentrim Tsavo Camp',
      itinerary: [
        { day: 1, title: 'Into Tsavo East', description: '0600-0830 pickup from Mombasa hotels. Drive along Mombasa-Nairobi road. Enter via Bachuma Gate. Game drives along Dida Plains and River Circuit. Lunch en-route. 1600 afternoon game drive. Overnight at Sentrim Tsavo Camp (Tarhi area).' },
        { day: 2, title: 'Morning Drive & Return', description: '0630 early morning game drive. Breakfast at camp. Checkout and drive back to Mombasa by midday.' },
      ],
    },
    {
      title: '2 Days Saltlick & Ngutuni (ex Watamu)', slug: '2-days-saltlick-ngutuni-watamu', duration: '2 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'From Watamu beach to Saltlick Lodge and Ngutuni Sanctuary',
      itinerary: [
        { day: 1, title: 'Watamu to Taita Hills', description: '0520 pickup from Watamu. 0700 drive via Malindi/Mavueni road toward Taita Hills. 1030 check-in at Taita Hills Wildlife Sanctuary and morning game drive. 1230 lunch. 1600 afternoon game drive. Overnight at Saltlick Safari Lodge.' },
        { day: 2, title: 'Ngutuni & Return', description: '0630 early morning game drive in Taita Hills. Breakfast. 0930 drive to Ngutuni Sanctuary — game drive and lunch. 1330 begin return journey to Watamu.' },
      ],
    },
    {
      title: '2 Days Saltlick & Ngutuni', slug: '2-days-saltlick-ngutuni', duration: '2 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Taita Hills and Ngutuni double feature from Mombasa',
      itinerary: [
        { day: 1, title: 'Mombasa to Taita Hills', description: '0520 pickup from Mombasa. Drive to Taita Hills Wildlife Sanctuary. 1030 check-in and morning game drive. 1230 lunch. 1600 afternoon game drive. Overnight at Saltlick Safari Lodge.' },
        { day: 2, title: 'Ngutuni & Return', description: '0630 early morning game drive. Breakfast. 0930 drive to Ngutuni Sanctuary — game drive and lunch. 1330 begin return to Mombasa.' },
      ],
    },
    {
      title: '2 Days Taita Hills & Ngutuni', slug: '2-days-taita-ngutuni', duration: '2 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Taita Hills Resort overnight with Ngutuni game drives',
      itinerary: [
        { day: 1, title: 'Mombasa to Taita Hills', description: '0520 pickup from Mombasa. Drive to Taita Hills Wildlife Sanctuary. Check-in and morning game drive. Lunch at Taita Hills Resort. 1600 afternoon game drive. Overnight at Taita Hills Resort.' },
        { day: 2, title: 'Ngutuni & Return', description: '0630 morning game drive. Breakfast. Drive to Ngutuni Sanctuary — game drive and lunch. 1330 return to Mombasa.' },
      ],
    },
    {
      title: '2 Days Tsavo East & Saltlick', slug: '2-days-tsavo-east-saltlick', duration: '2 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Combine Tsavo East\'s red elephants with Saltlick\'s underground bunker',
      itinerary: [
        { day: 1, title: 'Tsavo East to Taita Hills', description: '0500 pickup from Mombasa. Enter Tsavo East via Bachuma Gate. Game drives along Dida Plains and River Circuit. Lunch at Ashnil Aruba Lodge. 1430 continue game drive till 1700. Exit park and drive to Taita Hills. Overnight at Saltlick Safari Lodge.' },
        { day: 2, title: 'Taita Hills & Return', description: '0630 early morning game drive. Breakfast. 1000 second morning drive through Taita Hills. Lunch. 1400 begin return to Mombasa.' },
      ],
    },
    {
      title: '3 Days Shimba Hills, Ngutuni & Saltlick', slug: '3-days-shimba-ngutuni-saltlick', duration: '3 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Coast to bush — rainforest, sanctuary, and savanna in three days',
      itinerary: [
        { day: 1, title: 'Shimba Hills', description: 'Pickup from Mombasa/Diani. Drive to Shimba Hills National Reserve. Morning game drive with optional Sheldrick Falls hike. Lunch. Afternoon game drive. Overnight at Shimba Green Lodge.' },
        { day: 2, title: 'Taita Hills & Saltlick', description: 'Drive to Taita Hills Wildlife Sanctuary via Kinango. Game drives through the sanctuary. Lunch. Afternoon game drive. Overnight at Saltlick Safari Lodge.' },
        { day: 3, title: 'Ngutuni & Return', description: 'Early morning game drive. Breakfast. Drive to Ngutuni Sanctuary — game drive and lunch. Return to Mombasa by late afternoon.' },
      ],
    },
    {
      title: '3 Days Tsavo East, Taita Hills & Saltlick', slug: '3-days-tsavo-taita-saltlick', duration: '3 Days',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'The ultimate Tsavo-Taita combo with a night game drive at Saltlick',
      itinerary: [
        { day: 1, title: 'Tsavo East', description: 'Enter Tsavo East via Bachuma Gate. Full day game drives — Dida Plains, River Circuit, Aruba Dam. Lunch at Ashnil Aruba Lodge. Afternoon game drive. Overnight at Taita Hills Resort.' },
        { day: 2, title: 'Taita Hills & Saltlick', description: 'Morning game drive in Taita Hills. Lunch at the resort. Transfer to Saltlick Safari Lodge. Afternoon game drive. NIGHT GAME DRIVE — spot nocturnal predators. Overnight at Saltlick.' },
        { day: 3, title: 'Morning Drive & Return', description: '0600 early morning game drive. Breakfast. Checkout. Drive back to Mombasa.' },
      ],
    },
    {
      title: '4 Days Mombasa Rendezvous Safari', slug: '4-days-mombasa-rendezvous', duration: '4 Days',
      category: 'Adventure Safari', difficulty: 'Moderate', bestSeason: 'Year-round', groupSize: '2-7 guests',
      tagline: 'Tsavo, Amboseli, and Taita Hills — the grand Mombasa circuit',
      itinerary: [
        { day: 1, title: 'Tsavo East', description: 'Pickup from North/South Coast or Mombasa Airport. Enter Tsavo East via Bachuma Gate. Game drives through the park. Overnight at Ashnil Aruba Lodge (fullboard).' },
        { day: 2, title: 'Amboseli', description: 'Drive to Amboseli National Park. Game drive with Kilimanjaro views. Pool time at the lodge. Afternoon game drive. Overnight at Sentrim Amboseli.' },
        { day: 3, title: 'Taita Hills & Night Drive', description: 'Drive south via Loitokitok and Rombo to Taita Hills Wildlife Sanctuary. Afternoon game drive. NIGHT GAME DRIVE — leopards, hyenas, genets. Overnight at Saltlick Safari Lodge.' },
        { day: 4, title: 'Morning Drive & Return', description: 'Morning game drive. Lunch at the lodge. Drive back to Mombasa. Drop off at hotel or airport.' },
      ],
    },
  ]

  for (const safari of safaris) {
    const existing = await payload.find({ collection: 'safari-packages', where: { slug: { equals: safari.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      console.log(`⏭ Safari "${safari.title}" already exists`)
      continue
    }
    await payload.create({
      collection: 'safari-packages',
      data: {
        ...safari,
        status: 'published',
        featured: true,
        priceFrom: undefined,
        currency: 'USD',
        heroImage: heroImageId,
      } as any,
    })
    console.log(`✅ Created safari: ${safari.title}`)
  }

  // --- UPDATE SETTINGS ---
  const settings = await payload.findGlobal({ slug: 'settings' }) as any
  const nav: { label: string; href: string; id?: string }[] = settings.navigation || []
  const hasServices = nav.some((n: any) => n.href === '/services')
  const updatedNav = hasServices ? nav : [...nav, { label: 'Services', href: '/services' }]

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      phone: '+254 784 999 015',
      whatsAppNumber: '+254784999015',
      officeAddress: 'Mombasa, Kenya',
      navigation: updatedNav,
    } as any,
  })
  console.log('✅ Updated Settings (contact + nav)')

  // --- UPDATE HOMEPAGE ---
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      servicesHeadline: 'More Than Safaris',
      servicesSubheadline: 'From airport pickup to beach extension — we handle your entire East Africa experience.',
    } as any,
  })
  console.log('✅ Updated Homepage (services messaging)')

  console.log('\n🎉 Seed complete!')
  process.exit(0)
}

run().catch((err) => { console.error(err); process.exit(1) })
