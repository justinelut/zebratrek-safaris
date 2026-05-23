function richBody(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) =>
        text.startsWith('## ')
          ? { type: 'heading', version: 1, tag: 'h2', children: [{ type: 'text', version: 1, format: 0, mode: 'normal', text: text.slice(3) }] }
          : { type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', children: [{ type: 'text', version: 1, format: 0, mode: 'normal', text }] },
      ),
    },
  }
}

export default async function seedJournalPosts(payload: any, images: Record<string, any>) {
  const posts = [
    {
      title: 'The Great Migration: A Photographer\'s Field Guide',
      slug: 'great-migration-photography-guide',
      summary: 'How to position yourself for the most dramatic river crossings, what gear to bring, and the small details that separate good safari photos from great ones.',
      heroImage: images['wildlife/wildebeest.jpg'],
      category: 'Wildlife', readTime: 8, featured: true,
      publishedAt: new Date('2026-04-15').toISOString(), _status: 'published',
      body: richBody([
        'The river is high. The wildebeest are restless. For three days they have grazed at the edge, building courage in numbers, until one — a young female, perhaps, or an old male tired of waiting — steps forward, and then they all do, and the air fills with hooves and dust and the distant splash of crocodile tails.',
        '## Position is everything',
        'The Mara River has dozens of crossing points. Most safari operators stack at the famous ones, where 40 vehicles compete for the same shot. We position differently — using twelve years of crossing data and our network of guides on the ground to predict where the herds will go before they get there.',
        'The result: front-row access to crossings that 95% of visitors never see.',
      ]),
    },
    {
      title: 'Why We Cap Group Sizes at Six',
      slug: 'why-six-guests',
      summary: 'A small business decision that became our defining philosophy. The economics behind why fewer guests mean a fundamentally different safari experience.',
      heroImage: images['experiences/game-drive.jpg'],
      category: 'Behind the Scenes', readTime: 5, featured: true,
      publishedAt: new Date('2026-03-22').toISOString(), _status: 'published',
      body: richBody([
        'Most safari vehicles seat eight or nine guests. Ours seats six. The math is simple: every additional guest doubles the time spent positioning, halves the conversation depth between guide and guest, and turns the safari into a logistics exercise.',
        '## The economics',
        'Six guests means we charge slightly more. Not because we want to, but because the math forces us to. What you get in return: a window seat without negotiation, a guide who learns your photography style, and the freedom to chase the unexpected.',
      ]),
    },
    {
      title: 'A Day in the Life of a Mara Guide',
      slug: 'day-in-life-mara-guide',
      summary: 'Daniel Kipchoge wakes at 4am. By 5:30am he\'s reading the previous night\'s tracks. By the time you finish breakfast, he already knows where the lions slept.',
      heroImage: images['people/guide.jpg'],
      category: 'Behind the Scenes', readTime: 6, featured: false,
      publishedAt: new Date('2026-02-10').toISOString(), _status: 'published',
      body: richBody([
        'Daniel grew up in a Maasai village three hours from the Mara. He learned to read tracks before he learned to read words. Now, eighteen years into his career, he can identify a leopard by the way it bends grass.',
        '## Before sunrise',
        'At 4am, Daniel is already at the radio room, checking overnight reports from rangers and other guides. By 5am he\'s mapped a route. By 5:30, he\'s standing at your tent with coffee, ready.',
      ]),
    },
    {
      title: 'Conservation Beyond the Headlines',
      slug: 'conservation-beyond-headlines',
      summary: 'The Mara Conservancy has 24/7 anti-poaching patrols. We help fund six rangers. Here\'s what that actually looks like on the ground.',
      heroImage: images['wildlife/elephant.jpg'],
      category: 'Conservation', readTime: 7, featured: false,
      publishedAt: new Date('2026-01-08').toISOString(), _status: 'published',
      body: richBody([
        'Anti-poaching is not glamorous. It is twelve-hour patrols on foot, in the dark, in the rain, often without backup. The rangers we fund have prevented seven incidents this year alone.',
      ]),
    },
    {
      title: 'What to Pack for a Kenyan Safari (And What to Leave)',
      slug: 'what-to-pack-kenyan-safari',
      summary: 'Forget the safari outfit catalogues. Here\'s the actual list, refined over hundreds of guests, of what you need and what you can leave at home.',
      heroImage: images['lodges/luxury-tent.jpg'],
      category: 'Travel Tips', readTime: 4, featured: false,
      publishedAt: new Date('2025-12-12').toISOString(), _status: 'published',
      body: richBody([
        'Wear neutrals. Bring layers. Forget the bright safari hat from the catalogue — it makes you look like a tourist and animals associate it with vehicles. A simple olive cap works better.',
      ]),
    },
    {
      title: 'Tracking Mountain Gorillas in Bwindi',
      slug: 'mountain-gorillas-bwindi',
      summary: 'The trek is physical, the permit is expensive, and the encounter is one hour long. But standing five metres from a 200kg silverback rewires something inside you.',
      heroImage: images['landscapes/bwindi.jpg'],
      category: 'Wildlife', readTime: 9, featured: true,
      publishedAt: new Date('2026-04-02').toISOString(), _status: 'published',
      body: richBody([
        'Bwindi means "impenetrable" in Runyakitara. After thirty minutes of climbing through wet, root-tangled understory, you understand why.',
        '## The encounter',
        'Your guide raises a hand. Stop. Listen. The forest is full of small sounds, but this one is different — heavy, deliberate movement. The silverback is fifteen metres away, eating shoots. He looks up. Eye contact. Time stops.',
        '## The permits',
        'Uganda permits cost $800 USD. Rwanda is $1,500. The fees fund ranger patrols, community development, and habitat protection. It is the most direct conservation tourism on the continent.',
      ]),
    },
    {
      title: 'When Is the Best Time to Visit Kenya?',
      slug: 'best-time-visit-kenya',
      summary: 'The honest answer depends on what you want to see. Here\'s a month-by-month breakdown from someone who has worked twelve safari seasons.',
      heroImage: images['landscapes/savanna-sunrise.jpg'],
      category: 'Travel Tips', readTime: 6, featured: false,
      publishedAt: new Date('2026-03-08').toISOString(), _status: 'published',
      body: richBody([
        'July to October is migration season — the obvious choice and also the busiest. Lodges fill 9-12 months in advance. November through May is the green season — fewer guests, lower rates, dramatic skies, baby animals.',
        '## Our quiet favourite',
        'February. The calving season is in full swing in the southern Serengeti. Predator action is intense. Crowds are minimal. And the price is two-thirds of peak.',
      ]),
    },
    {
      title: 'The Honeymoon Safari Playbook',
      slug: 'honeymoon-safari-playbook',
      summary: 'Romance in the bush requires deliberate design. Here\'s how to plan a safari honeymoon that actually feels romantic — not like a group tour with extra champagne.',
      heroImage: images['lodges/lodge-pool.jpg'],
      category: 'Travel Tips', readTime: 7, featured: false,
      publishedAt: new Date('2026-02-14').toISOString(), _status: 'published',
      body: richBody([
        'A safari honeymoon is not just a safari with rose petals. It is a different design problem: long unhurried mornings, private vehicles, sundowner spots away from groups, accommodation with privacy.',
        '## What to skip',
        'The "include everything" itinerary. Romance lives in the slow moments. Three nights in one camp beats one night in three.',
      ]),
    },
    {
      title: 'How Much Does an African Safari Really Cost?',
      slug: 'safari-cost-breakdown',
      summary: 'A transparent breakdown of where the $5,000+ goes. Spoiler: it\'s not all going to the operator.',
      heroImage: images['experiences/sundowner.jpg'],
      category: 'Travel Tips', readTime: 8, featured: false,
      publishedAt: new Date('2025-11-20').toISOString(), _status: 'published',
      body: richBody([
        'A typical 7-day luxury safari in Kenya costs $5,000-$7,500 per person. Where does it go? Roughly: 35% accommodation, 25% park and conservancy fees, 15% internal flights, 10% guide and vehicle, 10% food and beverage, 5% operator margin.',
        '## Why it costs what it does',
        'Kenya\'s park fees alone run $80-200 per person per day. Add conservancy fees of $100-150. Light aircraft transfers cost $300-500 per flight. The economics are punishing — but they fund the conservation that makes the safari possible.',
      ]),
    },
    {
      title: 'Five Things Nobody Tells You About Your First Safari',
      slug: 'first-safari-surprises',
      summary: 'After hosting 500+ guests, here are the patterns of "wait, really?" moments that nobody warns you about.',
      heroImage: images['experiences/game-drive.jpg'],
      category: 'Guest Stories', readTime: 5, featured: false,
      publishedAt: new Date('2026-01-30').toISOString(), _status: 'published',
      body: richBody([
        'One: The morning cold. Pre-dawn drives in July are 8-10°C. Bring layers. Two: The sound at night. Camps don\'t have walls. Lions, hyenas, hippos — all heard in the dark. Three: How dusty everything gets. Four: The lack of WiFi. Embrace it. Five: How emotional it is to leave.',
      ]),
    },
  ]

  for (const post of posts) {
    await payload.create({ collection: 'journal-posts', data: post as any })
  }
  console.log(`  ✓ Journal Posts (${posts.length})`)
}
