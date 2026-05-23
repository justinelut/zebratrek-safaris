export default async function seedSafaris(payload: any, images: Record<string, any>) {
  // Fetch destinations to link them
  const destResult = await payload.find({ collection: 'destinations', limit: 50 })
  const destBySlug: Record<string, any> = {}
  destResult.docs.forEach((d: any) => { destBySlug[d.slug] = d.id })

  const heroImages = [
    images['landscapes/masai-mara.jpg'],
    images['landscapes/kilimanjaro.jpg'],
    images['wildlife/wildebeest.jpg'],
    images['wildlife/giraffe.jpg'],
    images['wildlife/lion.jpg'],
    images['landscapes/sunset-savanna.jpg'],
  ]

  // map safari slug -> linked destinations
  const links: Record<string, string[]> = {
    'classic-masai-mara': ['masai-mara'],
    'luxury-amboseli': ['amboseli'],
    'great-migration': ['masai-mara', 'serengeti'],
    'family-safari': ['masai-mara', 'lake-nakuru'],
    'photography-safari': ['masai-mara', 'amboseli', 'samburu'],
    'honeymoon-safari': ['masai-mara', 'amboseli'],
  }

  const safaris = [
    {
      title: 'Classic Masai Mara', slug: 'classic-masai-mara', status: 'published', featured: true,
      tagline: 'The quintessential East African safari experience',
      duration: '5 Days / 4 Nights', groupSize: '6', priceFrom: 3200, currency: 'USD',
      category: 'Classic Safari', difficulty: 'Easy', bestSeason: 'July - October',
      accommodation: 'Luxury tented camp overlooking the Mara River with en-suite bathrooms, outdoor showers, and private verandas.',
      highlights: [{ highlight: 'Big Five game drives' }, { highlight: 'Mara River crossing (seasonal)' }, { highlight: 'Maasai village visit' }, { highlight: 'Sundowner cocktails on the savanna' }],
      included: [{ item: 'All game drives in 4x4 Land Cruiser' }, { item: 'Full-board accommodation' }, { item: 'Expert English-speaking guide' }, { item: 'Park fees and conservancy charges' }, { item: 'Airport transfers' }],
      excluded: [{ item: 'International flights' }, { item: 'Travel insurance' }, { item: 'Visa fees' }, { item: 'Tips and gratuities' }],
      itinerary: [
        { day: 1, title: 'Arrival in Nairobi', description: 'Meet at Jomo Kenyatta International Airport. Transfer to your Nairobi hotel for an overnight stay and safari briefing.' },
        { day: 2, title: 'Fly to the Mara', description: 'Morning flight to the Masai Mara. Afternoon game drive through the golden grasslands. First encounters with the resident wildlife.' },
        { day: 3, title: 'Full Day Game Drives', description: 'Dawn and dusk drives following the big cats. Picnic lunch by the hippo pools. Optional walking safari with Maasai guides.' },
        { day: 4, title: 'Mara River & Culture', description: 'Morning drive to the Mara River for crocodile and hippo sightings. Afternoon visit to a Maasai village. Farewell bush dinner under the stars.' },
        { day: 5, title: 'Departure', description: 'Final sunrise drive. Fly back to Nairobi for your onward journey.' },
      ],
    },
    {
      title: 'Luxury Amboseli Retreat', slug: 'luxury-amboseli', status: 'published', featured: true,
      tagline: 'Elephants against the backdrop of Kilimanjaro',
      duration: '4 Days / 3 Nights', groupSize: '4', priceFrom: 4800, currency: 'USD',
      category: 'Luxury Safari', difficulty: 'Easy', bestSeason: 'June - September',
      accommodation: 'Private villa with infinity pool overlooking Kilimanjaro. Butler service, spa treatments, and gourmet dining.',
      highlights: [{ highlight: 'Kilimanjaro views at sunrise' }, { highlight: 'Large elephant herds' }, { highlight: 'Private conservancy access' }, { highlight: 'In-room spa treatments' }],
      included: [{ item: 'Private 4x4 vehicle and guide' }, { item: 'All meals and premium drinks' }, { item: 'Conservancy fees' }, { item: 'Domestic flights' }, { item: 'Spa treatment (1 per guest)' }],
      excluded: [{ item: 'International flights' }, { item: 'Travel insurance' }, { item: 'Additional spa treatments' }],
      itinerary: [
        { day: 1, title: 'Nairobi to Amboseli', description: 'Private charter flight. Champagne welcome at your villa. Afternoon game drive as Kilimanjaro reveals itself.' },
        { day: 2, title: 'Elephant Encounters', description: 'Dawn drive among the great elephant herds. Brunch at a secret bush location. Afternoon at leisure — pool, spa, or guided nature walk.' },
        { day: 3, title: 'Kilimanjaro Sunrise', description: 'Pre-dawn drive for the famous Kilimanjaro sunrise. Full day exploring the park. Farewell dinner under African skies.' },
        { day: 4, title: 'Departure', description: 'Leisurely breakfast. Charter flight back to Nairobi.' },
      ],
    },
    {
      title: 'Great Migration Safari', slug: 'great-migration', status: 'published', featured: true,
      tagline: 'Witness nature\'s greatest spectacle',
      duration: '7 Days / 6 Nights', groupSize: '6', priceFrom: 5500, currency: 'USD',
      category: 'Classic Safari', difficulty: 'Moderate', bestSeason: 'July - September',
      accommodation: 'Mobile tented camps that follow the migration. Authentic bush experience with full comfort.',
      highlights: [{ highlight: 'Wildebeest river crossings' }, { highlight: 'Predator-prey interactions' }, { highlight: 'Hot air balloon safari' }, { highlight: 'Mobile camp experience' }],
      included: [{ item: 'All game drives' }, { item: 'Hot air balloon flight' }, { item: 'Full-board accommodation' }, { item: 'Expert migration guide' }, { item: 'All park fees' }, { item: 'Internal flights' }],
      excluded: [{ item: 'International flights' }, { item: 'Travel insurance' }, { item: 'Visa fees' }, { item: 'Tips' }],
      itinerary: [
        { day: 1, title: 'Arrival', description: 'Arrive Nairobi. Transfer and overnight.' },
        { day: 2, title: 'Fly to the Serengeti', description: 'Charter to our mobile camp positioned near the migration herds.' },
        { day: 3, title: 'Following the Herds', description: 'Full day tracking the wildebeest. Witness the raw drama of predator and prey.' },
        { day: 4, title: 'River Crossing Day', description: 'Position at the Mara River. Wait for the crossing — one of nature\'s most dramatic events.' },
        { day: 5, title: 'Balloon Safari', description: 'Pre-dawn hot air balloon flight over the migration. Champagne breakfast on the plains.' },
        { day: 6, title: 'Big Cat Country', description: 'Focus on the predators — lions, cheetahs, leopards hunting the migration stragglers.' },
        { day: 7, title: 'Departure', description: 'Final morning drive. Fly back to Nairobi.' },
      ],
    },
    {
      title: 'Family Safari Adventure', slug: 'family-safari', status: 'published', featured: false,
      tagline: 'Create lifelong memories with your children',
      duration: '6 Days / 5 Nights', groupSize: '8', priceFrom: 2800, currency: 'USD',
      category: 'Family Safari', difficulty: 'Easy', bestSeason: 'Year-round',
      accommodation: 'Family-friendly lodges with interconnecting rooms, kids\' programmes, and swimming pools.',
      highlights: [{ highlight: 'Child-friendly game drives' }, { highlight: 'Junior ranger programme' }, { highlight: 'Bush skills workshop' }, { highlight: 'Swimming pool at lodge' }],
      included: [{ item: 'Family vehicle with child seats' }, { item: 'All meals (kids menu available)' }, { item: 'Junior ranger activities' }, { item: 'Park fees for all ages' }, { item: 'Transfers' }],
      excluded: [{ item: 'International flights' }, { item: 'Travel insurance' }, { item: 'Personal items' }],
      itinerary: [
        { day: 1, title: 'Welcome to Kenya', description: 'Airport pickup. Giraffe Centre visit — kids love hand-feeding the giraffes. Overnight Nairobi.' },
        { day: 2, title: 'To the Bush', description: 'Drive to the conservancy. Settle into your family suite. Afternoon nature walk with junior ranger badges.' },
        { day: 3, title: 'Game Drives', description: 'Morning and afternoon drives designed for young attention spans. Bush picnic lunch.' },
        { day: 4, title: 'Bush Skills Day', description: 'Learn tracking with Maasai warriors. Fire-making, star-gazing, and storytelling around the campfire.' },
        { day: 5, title: 'Lake Nakuru', description: 'Drive to Lake Nakuru for flamingos and rhinos. Kids\' photography challenge.' },
        { day: 6, title: 'Departure', description: 'Morning at leisure. Transfer to Nairobi for departure.' },
      ],
    },
    {
      title: 'Photography Safari', slug: 'photography-safari', status: 'published', featured: false,
      tagline: 'Capture Africa through a professional lens',
      duration: '8 Days / 7 Nights', groupSize: '4', priceFrom: 6200, currency: 'USD',
      category: 'Photography Safari', difficulty: 'Moderate', bestSeason: 'February - March',
      accommodation: 'Lodges selected for photographic light and proximity to wildlife corridors.',
      highlights: [{ highlight: 'Professional photography guide' }, { highlight: 'Modified vehicles with camera mounts' }, { highlight: 'Golden hour positioning' }, { highlight: 'Post-processing workshops' }],
      included: [{ item: 'Photography-specialist guide' }, { item: 'Modified vehicle with bean bags and mounts' }, { item: 'All accommodation and meals' }, { item: 'Daily editing sessions' }, { item: 'Park fees' }],
      excluded: [{ item: 'Camera equipment' }, { item: 'International flights' }, { item: 'Insurance' }],
      itinerary: [
        { day: 1, title: 'Arrival & Gear Check', description: 'Arrive Nairobi. Evening gear review and settings workshop with your photography guide.' },
        { day: 2, title: 'Amboseli — Elephants', description: 'Fly to Amboseli. Afternoon shoot: elephants with Kilimanjaro backdrop. Golden hour magic.' },
        { day: 3, title: 'Amboseli — Landscapes', description: 'Pre-dawn shoot at the dried lake bed. Dust-bathing elephants. Evening editing session.' },
        { day: 4, title: 'Transfer to Mara', description: 'Fly to Masai Mara. Afternoon drive focusing on big cat behaviour.' },
        { day: 5, title: 'Mara — Predators', description: 'Full day with the lions and cheetahs. Low-angle shots from modified vehicle.' },
        { day: 6, title: 'Mara — Birds & Details', description: 'Macro and bird photography. Lilac-breasted rollers, secretary birds, weaver nests.' },
        { day: 7, title: 'Mara — Final Shoot', description: 'Sunrise silhouettes. Last golden hour session. Portfolio review with guide.' },
        { day: 8, title: 'Departure', description: 'Morning flight to Nairobi. Departure with a hard drive full of memories.' },
      ],
    },
    {
      title: 'Honeymoon Safari', slug: 'honeymoon-safari', status: 'published', featured: false,
      tagline: 'Begin your forever in the African wild',
      duration: '7 Days / 6 Nights', groupSize: '2', priceFrom: 7500, currency: 'USD',
      category: 'Honeymoon Safari', difficulty: 'Easy', bestSeason: 'June - October',
      accommodation: 'The most romantic suites in Kenya — private plunge pools, outdoor bathtubs, and candlelit bush dinners.',
      highlights: [{ highlight: 'Private game drives' }, { highlight: 'Couples spa treatments' }, { highlight: 'Candlelit bush dinner' }, { highlight: 'Hot air balloon at sunrise' }],
      included: [{ item: 'Private vehicle throughout' }, { item: 'All luxury accommodation' }, { item: 'Couples spa package' }, { item: 'Hot air balloon flight' }, { item: 'Bush dinner setup' }, { item: 'Champagne and flowers on arrival' }],
      excluded: [{ item: 'International flights' }, { item: 'Travel insurance' }, { item: 'Additional spa treatments' }],
      itinerary: [
        { day: 1, title: 'Arrival in Paradise', description: 'VIP airport meet. Champagne transfer to your Nairobi boutique hotel. Welcome dinner.' },
        { day: 2, title: 'Fly to Your Private Suite', description: 'Charter to the Mara. Rose petals and champagne in your suite. Sunset game drive for two.' },
        { day: 3, title: 'Romance in the Wild', description: 'Morning drive. Afternoon couples massage overlooking the plains. Private bush dinner under the stars.' },
        { day: 4, title: 'Balloon Over Africa', description: 'Pre-dawn hot air balloon. Champagne breakfast on the savanna. Afternoon at leisure.' },
        { day: 5, title: 'Lake Naivasha', description: 'Transfer to a lakeside retreat. Boat ride among hippos and fish eagles. Crescent Island walk.' },
        { day: 6, title: 'Final Safari Day', description: 'Morning game drive. Farewell sundowner at a secret viewpoint. Last night in the bush.' },
        { day: 7, title: 'Departure', description: 'Leisurely breakfast. Transfer to Nairobi. Departure with memories to last a lifetime.' },
      ],
    },
  ]

  for (let i = 0; i < safaris.length; i++) {
    const safari = safaris[i]
    const destinationIds = (links[safari.slug] || []).map((s) => destBySlug[s]).filter(Boolean)
    await payload.create({ collection: 'safari-packages', data: { ...safari, heroImage: heroImages[i] || heroImages[0], destinations: destinationIds } as any })
  }
  console.log('  ✓ Safari Packages (6)')
}
