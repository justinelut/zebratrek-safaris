export default async function seedPageGlobals(payload: any, images: Record<string, any> = {}) {
  await payload.updateGlobal({ slug: 'about-page', data: {
    heroHeadline: 'Our Story', heroSubheadline: 'Born in the Mara. Driven by wonder.',
    heroImage: images['landscapes/about-hero.jpg'] || null,
    storyHeadline: 'From a childhood in the bush to a lifetime of sharing it',
    founderImage: images['people/founder.jpg'] || null,
    values: [
      { title: 'Intimacy Over Scale', description: 'Six guests maximum. Every safari is personal, never a production line.' },
      { title: 'Conservation First', description: 'Tourism must serve the land. 5% of every booking funds wildlife protection.' },
      { title: 'Local Expertise', description: 'Our guides are born here. Their knowledge is generational, not textbook.' },
    ],
    events: [
      { year: '2012', event: 'Daniel leads his first private safari in the Masai Mara' },
      { year: '2015', event: 'ZebraTrek Safaris officially founded in Nairobi' },
      { year: '2017', event: 'Conservation partnership with Mara Conservancy established' },
      { year: '2019', event: '100th guest milestone — 98% satisfaction rate' },
      { year: '2022', event: 'Expanded to Amboseli, Samburu, and Tsavo circuits' },
      { year: '2024', event: '500+ guests hosted, photography safari programme launched' },
    ],
    ctaHeadline: 'Ready to experience it yourself?', ctaBody: "Every great safari starts with a conversation.", ctaText: 'Get in Touch', ctaLink: '/contact',
  }})
  console.log('  ✓ About Page')

  await payload.updateGlobal({ slug: 'contact-page', data: {
    headline: 'Start the Conversation', subheadline: "No pressure, no hard sell. Just tell us what excites you about Africa, and we'll take it from there.",
    image: images['landscapes/contact-hero.jpg'] || null,
    formHeadline: 'Tell us about your dream safari', formSubheadline: "We respond within 24 hours — usually much sooner.",
    successMessage: "Thank you! Your enquiry has been received. Our team will craft a personalised response within 24 hours.",
    sidebarHeadline: 'Why Book With Us', sidebarBody: "We're not a booking engine. We're a small team of safari specialists who design every journey by hand.",
    trustSignals: [
      { title: '24-Hour Response', description: 'Every enquiry gets a personal reply within one business day.' },
      { title: 'No Deposits Until You\'re Ready', description: 'We send a detailed quote first. You only pay when you\'re certain.' },
      { title: 'KPSGA Certified Guides', description: 'Every guide holds professional certification from the Kenya Professional Safari Guides Association.' },
      { title: '5% Conservation Pledge', description: 'A portion of every booking directly funds wildlife protection.' },
    ],
  }})
  console.log('  ✓ Contact Page')

  await payload.updateGlobal({ slug: 'safaris-page', data: {
    hero: { headline: 'Safari Experiences', subheadline: 'Each journey is crafted around the season, the landscape, and your curiosity.', image: images['landscapes/masai-mara.jpg'] || null },
    emptyStateText: 'No safaris found for this category. Try browsing all experiences.',
  }})

  await payload.updateGlobal({ slug: 'destinations-page', data: {
    hero: { headline: 'Where We Go', subheadline: "From the golden plains of the Mara to the red earth of Samburu — each destination has its own rhythm.", image: images['landscapes/savanna-sunrise.jpg'] || null },
    introText: "Kenya's diversity is staggering. Each park and conservancy offers a completely different landscape, wildlife mix, and atmosphere.",
  }})

  await payload.updateGlobal({ slug: 'conservation-page', data: {
    headline: 'Conservation Is Not an Add-On', subheadline: "It's the reason we exist.",
    image: images['landscapes/conservation-hero.jpg'] || null,
    missionHeadline: 'Our Commitment to the Wild',
    stats: [
      { value: '5%', label: 'Of every booking funds conservation' },
      { value: '3', label: 'Conservancies we actively support' },
      { value: '12', label: 'Anti-poaching rangers funded' },
      { value: '2,400', label: 'Hectares under protection' },
    ],
    partnerships: [
      { name: 'Mara Conservancy', description: 'Supporting anti-poaching patrols and community ranger programmes in the greater Mara ecosystem.' },
      { name: 'David Sheldrick Wildlife Trust', description: 'Orphaned elephant rehabilitation and release back into the wild.' },
      { name: 'Northern Rangelands Trust', description: 'Community-led conservation across 44 community conservancies in northern Kenya.' },
    ],
    ctaHeadline: 'Travel with purpose', ctaBody: 'Every safari you take with us directly protects the wildlife and communities that make it possible.', ctaText: 'Plan Your Safari', ctaLink: '/contact',
  }})
  console.log('  ✓ Conservation Page')

  await payload.updateGlobal({ slug: 'faq-page', data: {
    hero: { headline: 'Frequently Asked Questions', subheadline: "Everything you need to know before your safari." },
    categories: [
      { name: 'Booking & Planning', questions: [
        { question: 'How far in advance should I book?', answer: "We recommend 3-6 months for peak season (July-October). Off-peak safaris can often be arranged with 4-6 weeks notice." },
        { question: 'What deposit is required?', answer: "A 30% deposit secures your booking. The balance is due 60 days before departure." },
        { question: 'Can I customise my itinerary?', answer: "Absolutely. Every safari is bespoke. We'll design it around your interests, fitness level, and budget." },
      ]},
      { name: 'Travel & Logistics', questions: [
        { question: 'Do I need a visa for Kenya?', answer: "Most nationalities need an eTA (Electronic Travel Authorization). We'll guide you through the process." },
        { question: 'What vaccinations are required?', answer: "Yellow fever is required if arriving from an endemic country. We recommend consulting a travel clinic 6-8 weeks before departure." },
        { question: 'How do I get to the safari camps?', answer: "We arrange all internal transfers — typically light aircraft flights from Nairobi's Wilson Airport directly to airstrips near your camp." },
      ]},
      { name: 'On Safari', questions: [
        { question: 'What should I pack?', answer: "Neutral-coloured clothing, layers for cool mornings, a good hat, sunscreen, binoculars, and a camera. We send a detailed packing list after booking." },
        { question: 'Is it safe?', answer: "Kenya is a well-established safari destination. Our guides are trained in wilderness first aid, and camps have 24-hour security. You're in expert hands." },
        { question: 'Will I see the Big Five?', answer: "In the Masai Mara, sightings of lion, elephant, buffalo, and leopard are very likely. Rhino sightings depend on the conservancy. We never guarantee, but our guides know where to look." },
      ]},
      { name: 'Payment', questions: [
        { question: 'What payment methods do you accept?', answer: "Bank transfer (USD, EUR, GBP), credit card (3% surcharge), and PayPal." },
        { question: "What's included in the price?", answer: "All accommodation, meals, game drives, park fees, internal flights, and transfers. International flights, visa, insurance, and tips are excluded." },
      ]},
    ],
  }})
  console.log('  ✓ FAQ Page')

  await payload.updateGlobal({ slug: 'plan-your-safari-page', data: {
    hero: { headline: 'Plan Your Safari', subheadline: 'From first enquiry to wheels down in the bush — here\'s how it works.', image: images['landscapes/plan-hero.jpg'] || null },
    steps: [
      { number: 1, title: 'Tell Us Your Vision', description: 'Share your dates, interests, budget, and who\'s travelling. No detail is too small.' },
      { number: 2, title: 'Receive Your Bespoke Itinerary', description: 'Within 48 hours, we\'ll send a detailed proposal with accommodation options, routing, and pricing.' },
      { number: 3, title: 'Refine & Confirm', description: 'We adjust until it\'s perfect. Once you\'re happy, a 30% deposit secures everything.' },
      { number: 4, title: 'Pre-Trip Preparation', description: 'We send packing lists, visa guidance, and a final itinerary. Your guide calls to introduce themselves.' },
      { number: 5, title: 'Experience Africa', description: 'From airport pickup to final farewell, every moment is handled. You just need to be present.' },
    ],
    travelStyles: [
      { name: 'Classic Safari', description: 'The essential East African experience. Game drives, lodges, and iconic landscapes.', priceRange: 'From $3,200 per person' },
      { name: 'Luxury Safari', description: 'Private vehicles, premium lodges, and exclusive experiences for the discerning traveller.', priceRange: 'From $4,800 per person' },
      { name: 'Family Safari', description: 'Kid-friendly lodges, shorter drives, and activities designed for young explorers.', priceRange: 'From $2,800 per person' },
      { name: 'Photography Safari', description: 'Modified vehicles, expert photography guides, and itineraries built around the light.', priceRange: 'From $6,200 per person' },
    ],
    cta: { headline: 'Ready to start planning?', ctaText: 'Get in Touch', ctaLink: '/contact' },
  }})
  console.log('  ✓ Plan Your Safari Page')

  await payload.updateGlobal({ slug: 'when-to-visit-page', data: {
    hero: { headline: 'When to Visit', subheadline: 'Kenya is a year-round destination, but each season offers something different.', image: images['landscapes/when-hero.jpg'] || null },
    intro: "The best time for your safari depends on what you want to see. The Great Migration peaks July-October, but the green season (November-May) offers lush landscapes, newborn animals, and fewer crowds.",
    months: [
      { month: 'January', weather: 'Hot & dry', wildlife: 'Calving season in Ndutu', crowds: 'Low', rating: 4 },
      { month: 'February', weather: 'Hot & dry', wildlife: 'Newborn wildebeest, predator action', crowds: 'Low', rating: 4 },
      { month: 'March', weather: 'Warm, long rains begin', wildlife: 'Bird migration, lush landscapes', crowds: 'Very low', rating: 3 },
      { month: 'April', weather: 'Rainy', wildlife: 'Green season, fewer tourists', crowds: 'Very low', rating: 2 },
      { month: 'May', weather: 'Rainy, cooling', wildlife: 'Excellent birding', crowds: 'Very low', rating: 2 },
      { month: 'June', weather: 'Dry, cool', wildlife: 'Migration moves north', crowds: 'Medium', rating: 4 },
      { month: 'July', weather: 'Dry, cool', wildlife: 'Migration in the Mara', crowds: 'High', rating: 5 },
      { month: 'August', weather: 'Dry, cool', wildlife: 'River crossings peak', crowds: 'High', rating: 5 },
      { month: 'September', weather: 'Dry, warming', wildlife: 'River crossings continue', crowds: 'High', rating: 5 },
      { month: 'October', weather: 'Dry, hot', wildlife: 'Migration returns south', crowds: 'Medium', rating: 4 },
      { month: 'November', weather: 'Short rains', wildlife: 'Calving begins, green season', crowds: 'Low', rating: 3 },
      { month: 'December', weather: 'Warm, rains ending', wildlife: 'Festive season, good game viewing', crowds: 'Medium', rating: 4 },
    ],
    seasons: [
      { name: 'Peak Season', months: 'July - October', description: 'The Great Migration is in the Masai Mara. River crossings, big cat action, and dry conditions make for exceptional game viewing.', highlights: 'Migration crossings, big cats hunting, clear skies for photography' },
      { name: 'Green Season', months: 'November - May', description: 'Lush landscapes, newborn animals, migratory birds, and significantly fewer tourists. Rates are lower and the bush is at its most beautiful.', highlights: 'Baby animals, bird migration, dramatic skies, lower prices' },
    ],
  }})
  console.log('  ✓ When to Visit Page')

  await payload.updateGlobal({ slug: 'what-to-expect-page', data: {
    hero: { headline: 'What to Expect', subheadline: 'A glimpse into your typical day on safari.', image: images['landscapes/what-hero.jpg'] || null },
    sections: [
      { title: 'Accommodation', body: 'From luxury tented camps to lodge suites — every property handpicked for comfort and proximity to wildlife.' },
      { title: 'Game Drives', body: 'Twice daily in custom 4x4 vehicles. Window seats guaranteed. Roof opens for unrestricted photography.' },
      { title: 'Meals', body: 'Three meals daily prepared by camp chefs. Bush breakfasts and sundowners are part of the experience.' },
      { title: 'Safety', body: 'Every guide is wilderness first aid certified. Camps have 24/7 security. Travel insurance is required.' },
    ],
    dayOnSafari: [
      { time: '5:30 AM', activity: 'Wake-up call', description: 'Coffee and biscuits delivered to your tent.' },
      { time: '6:00 AM', activity: 'Morning game drive', description: 'The bush comes alive at dawn — best for predator activity.' },
      { time: '9:30 AM', activity: 'Bush breakfast', description: 'Hot breakfast served in the wild or back at camp.' },
      { time: '12:00 PM', activity: 'Brunch & rest', description: 'Free time for pool, spa, or a nap during the heat.' },
      { time: '4:00 PM', activity: 'Afternoon game drive', description: 'The light is golden, animals are active again.' },
      { time: '7:00 PM', activity: 'Sundowner', description: 'Cocktails on a hilltop as the sun sets over the savanna.' },
      { time: '8:00 PM', activity: 'Dinner under the stars', description: 'Multi-course meal at the camp dining area.' },
    ],
    packingList: [
      { category: 'Clothing', items: [{ item: 'Neutral-coloured tops (khaki, olive, beige)' }, { item: 'Long sleeves for evenings' }, { item: 'Comfortable walking shoes' }, { item: 'Wide-brim hat' }] },
      { category: 'Photography', items: [{ item: 'Camera with zoom lens' }, { item: 'Extra batteries and memory cards' }, { item: 'Lens cleaning kit' }, { item: 'Binoculars' }] },
      { category: 'Essentials', items: [{ item: 'Sunscreen SPF 30+' }, { item: 'Insect repellent' }, { item: 'Reusable water bottle' }, { item: 'Travel insurance documents' }] },
    ],
  }})
  console.log('  ✓ What to Expect Page')

  await payload.updateGlobal({ slug: 'gallery-page', data: { headline: 'Gallery', subheadline: 'Moments captured across the East African wilderness.' }})
  await payload.updateGlobal({ slug: 'journal-page', data: { hero: { headline: 'Journal', subheadline: 'Stories from the bush, travel insights, and conservation updates.', image: images['landscapes/journal-hero.jpg'] || null }, featuredPostHeadline: 'Latest from the Field' }})
  console.log('  ✓ Gallery & Journal Pages')
}
