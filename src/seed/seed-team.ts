export default async function seedTeam(payload: any, images: Record<string, any>) {
  const portrait = images['people/guide.jpg']
  const members = [
    {
      name: 'Daniel Kipchoge', role: 'Head Guide & Founder', order: 1, featured: true, yearsExperience: 18,
      speciality: 'Big cat behaviour & tracking',
      bio: 'Born in the Mara, Daniel grew up alongside the wildlife he now shares with guests. A certified KPSGA Silver-level guide with an uncanny ability to predict predator movements.',
      languages: [{ language: 'English' }, { language: 'Swahili' }, { language: 'Maa' }],
      certifications: [{ certification: 'KPSGA Silver Guide' }, { certification: 'Wilderness First Responder' }],
    },
    {
      name: 'Grace Wanjiku', role: 'Operations Director', order: 2, featured: true, yearsExperience: 12,
      speciality: 'Bespoke itinerary design',
      bio: 'Grace ensures every safari runs like clockwork — from charter flights to bush dinner setups. She knows every lodge manager, every pilot, and every secret sundowner spot in Kenya.',
      languages: [{ language: 'English' }, { language: 'Swahili' }, { language: 'French' }],
      certifications: [{ certification: 'IATA Travel Professional' }],
    },
    {
      name: 'Joseph Oloo', role: 'Senior Wildlife Guide', order: 3, featured: true, yearsExperience: 15,
      speciality: 'Ornithology & photography',
      bio: "Joseph can identify over 400 bird species by call alone. His patience and eye for composition make him the go-to guide for photography safaris.",
      languages: [{ language: 'English' }, { language: 'Swahili' }, { language: 'German' }],
      certifications: [{ certification: 'KPSGA Bronze Guide' }, { certification: 'Bird Guide Specialist' }],
    },
    {
      name: 'Sarah Leina', role: 'Conservation Lead', order: 4, featured: false, yearsExperience: 9,
      speciality: 'Community conservation & anti-poaching',
      bio: 'Sarah bridges the gap between tourism and conservation, managing our partnerships with local communities and anti-poaching units across three conservancies.',
      languages: [{ language: 'English' }, { language: 'Swahili' }, { language: 'Maa' }],
      certifications: [{ certification: 'MSc Wildlife Conservation' }],
    },
    {
      name: 'Peter Mutua', role: 'Guest Relations Manager', order: 5, featured: false, yearsExperience: 8,
      speciality: 'Luxury hospitality & special occasions',
      bio: 'Peter handles the details that transform a safari from great to extraordinary — the surprise bush breakfast, the perfectly timed sundowner, the birthday cake in the middle of nowhere.',
      languages: [{ language: 'English' }, { language: 'Swahili' }, { language: 'Italian' }],
      certifications: [{ certification: 'Certified Hospitality Professional' }],
    },
  ]

  for (const member of members) {
    await payload.create({ collection: 'team-members', data: { ...member, portrait } })
  }
  console.log('  ✓ Team Members (5)')
}
