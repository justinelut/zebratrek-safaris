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

export default async function seedDestinations(payload: any, images: Record<string, any>) {
  const destinations = [
    {
      name: 'Masai Mara', slug: 'masai-mara', featured: true, country: 'Kenya', heroKey: 'landscapes/masai-mara.jpg',
      tagline: "Kenya's crown jewel of wildlife",
      summary: "The Masai Mara is East Africa's most celebrated wildlife reserve — home to the Great Migration, abundant big cats, and the iconic golden savanna that defines the African safari experience.",
      body: richBody([
        "The Masai Mara is the northern extension of the Serengeti ecosystem, covering 1,510 km² of golden grasslands, riverine forest, and acacia-dotted plains. Between July and October, more than 1.5 million wildebeest, zebra, and gazelle pour across the Mara River in one of nature's most spectacular events.",
        '## What sets the Mara apart',
        "Big cat density here is among the highest on Earth. Lions hunt in coalitions of fifteen-plus. Cheetahs use vehicle hoods as elevated viewpoints. Leopards drape themselves over sausage tree branches. The drama happens close to the road, often before breakfast.",
        '## When and why we go',
        "Migration season (July to October) is what most visitors come for, but the Mara delivers year-round. February brings dramatic skies and newborn animals. The shoulder seasons offer the same wildlife with a fraction of the visitors. We design itineraries around what excites you most — predator action, photography, or quiet contemplation.",
      ]),
      bestTimeToVisit: 'July - October (Migration), Year-round for big cats',
      location: 'South-western Kenya, bordering Tanzania',
      wildlife: [
        { animal: 'Lion', description: 'The Mara has one of the highest lion densities in Africa.' },
        { animal: 'Leopard', description: 'Often spotted in the riverine forests along the Mara River.' },
        { animal: 'Cheetah', description: 'The open plains are perfect hunting grounds.' },
        { animal: 'Wildebeest', description: 'Over 1.5 million cross through during the Great Migration.' },
        { animal: 'Hippo', description: 'Abundant in the Mara River pools.' },
      ],
    },
    {
      name: 'Amboseli', slug: 'amboseli', featured: true, country: 'Kenya', heroKey: 'landscapes/kilimanjaro.jpg',
      tagline: 'Elephants beneath Kilimanjaro',
      summary: "Amboseli offers the most iconic African vista — great elephant herds moving across dusty plains with the snow-capped peak of Mount Kilimanjaro rising behind them.",
      body: richBody([
        "Amboseli National Park covers 392 km² at the foot of Mount Kilimanjaro. The park's name comes from the Maa word for 'salty dust' — and the dry pans here become some of the most photogenic locations in Africa during the dry season.",
        '## The elephant story',
        "Amboseli's elephants have been studied continuously since 1972 by Dr. Cynthia Moss's research project — the longest-running elephant study in the world. Some of the matriarchs you'll see are over 60 years old. The bulls carry tusks rarely seen elsewhere on the continent.",
        '## Beyond the elephants',
        "While elephants are the headline, Amboseli's swamps support hippos, buffalo, and over 400 bird species. The Maasai communities surrounding the park have negotiated co-existence with wildlife for generations — a model now studied across Africa.",
      ]),
      bestTimeToVisit: 'June - September (dry season, clear Kilimanjaro views)',
      location: 'Southern Kenya, at the foot of Mount Kilimanjaro',
      wildlife: [
        { animal: 'Elephant', description: 'Famous for its large-tusked elephant herds studied for over 40 years.' },
        { animal: 'Giraffe', description: 'Masai giraffe frequently seen against the Kilimanjaro backdrop.' },
        { animal: 'Flamingo', description: 'Seasonal visitors to the lake when water levels are right.' },
      ],
    },
    {
      name: 'Samburu', slug: 'samburu', featured: true, country: 'Kenya', heroKey: 'landscapes/savanna-sunrise.jpg',
      tagline: 'Where the rare and remarkable roam',
      summary: "Samburu is northern Kenya's hidden gem — a semi-arid landscape of red earth and doum palms, home to species found nowhere else: the reticulated giraffe, Grevy's zebra, and gerenuk.",
      body: richBody([
        "Samburu National Reserve sits along the Ewaso Nyiro River in northern Kenya — a riverine oasis cutting through arid scrubland. The landscape feels different from the Mara: red earth, doum palms, sparse acacia, and a sense of vastness.",
        '## The Samburu Special Five',
        "Five species are easier to see here than anywhere else in Kenya: reticulated giraffe (with their distinctive net-like patterns), Grevy's zebra (the rarest zebra species), gerenuk (the long-necked 'giraffe gazelle'), beisa oryx, and Somali ostrich.",
        '## Culture and conservation',
        "The Samburu people are pastoralists closely related to the Maasai, with their own distinct dress, jewelry, and traditions. Visiting a manyatta is encouraged through community-led conservancies that channel tourism revenue directly back to villagers.",
      ]),
      bestTimeToVisit: 'June - September, January - February',
      location: 'Northern Kenya, along the Ewaso Nyiro River',
      wildlife: [
        { animal: "Grevy's Zebra", description: 'The rarest zebra species, with narrow stripes.' },
        { animal: 'Reticulated Giraffe', description: 'Distinctive net-like pattern unique to northern Kenya.' },
        { animal: 'Gerenuk', description: 'The "giraffe gazelle" that stands on hind legs to browse.' },
        { animal: 'Somali Ostrich', description: 'Blue-necked variant found only in this region.' },
      ],
    },
    {
      name: 'Tsavo', slug: 'tsavo', featured: false, country: 'Kenya', heroKey: 'landscapes/sunset-savanna.jpg',
      tagline: "Kenya's largest wilderness",
      summary: "Tsavo is raw, vast, and untamed — Kenya's largest protected area split into East and West. Red elephants, volcanic landscapes, and far fewer tourists than the Mara.",
      body: richBody([
        "Tsavo covers 22,000 km² — making it Kenya's largest protected wilderness, larger than Israel. Split by the Nairobi-Mombasa railway into East and West, it offers two distinct experiences: Tsavo East's vast plains and Tsavo West's volcanic landscapes.",
        '## Why we love Tsavo',
        "Tsavo is what East Africa looked like before mass tourism. Visitor numbers are a fraction of the Mara. Lodges are spaced far apart. You can drive for hours without seeing another vehicle. The wildlife is harder to find, but the encounters feel more authentic.",
        '## Distinctive features',
        "Tsavo's elephants are coated in red dust from the soil — the famous 'red elephants'. The lions here are largely maneless, a curiosity that has been the subject of multiple documentaries. Mzima Springs in Tsavo West produces 50 million gallons of crystal water daily, creating an oasis where you can underwater-watch hippos.",
      ]),
      bestTimeToVisit: 'June - October (dry season, animals concentrate at water)',
      location: 'South-eastern Kenya, between Nairobi and Mombasa',
      wildlife: [
        { animal: 'Red Elephant', description: "Elephants coated in Tsavo's distinctive red soil." },
        { animal: 'Lion', description: 'The famous maneless lions of Tsavo.' },
        { animal: 'Black Rhino', description: 'Tsavo West hosts a rhino sanctuary.' },
      ],
    },
    {
      name: 'Lake Nakuru', slug: 'lake-nakuru', featured: true, country: 'Kenya', heroKey: 'landscapes/lake-flamingos.jpg',
      tagline: 'Flamingos and rhinos in the Rift Valley',
      summary: "A compact park in the Great Rift Valley, Lake Nakuru is famous for its flamingo-lined shores and is one of Kenya's best places to see both black and white rhino.",
      body: richBody([
        "Lake Nakuru National Park is one of Kenya's most accessible safari destinations — just 2.5 hours from Nairobi. The compact park (188 km²) wraps around an alkaline lake in the Great Rift Valley, creating a high-density wildlife experience.",
        '## The flamingo phenomenon',
        "When conditions are right, hundreds of thousands of lesser flamingos paint the lake's edges pink — one of the most photographed wildlife scenes in Africa. The numbers fluctuate with water levels and salinity, so timing matters.",
        '## Rhino sanctuary',
        "Lake Nakuru is fully fenced and patrolled, making it one of Kenya's most reliable rhino-viewing parks. Both white and black rhino populations are healthy here. Combined with the rare Rothschild giraffe and excellent leopard sightings, it's an ideal short add-on to a Mara safari.",
      ]),
      bestTimeToVisit: 'Year-round, best June - September',
      location: 'Central Kenya, Great Rift Valley',
      wildlife: [
        { animal: 'Flamingo', description: 'Thousands of lesser flamingos paint the lake pink.' },
        { animal: 'White Rhino', description: 'One of the best places in Kenya to see white rhino.' },
        { animal: 'Rothschild Giraffe', description: 'An endangered subspecies protected here.' },
      ],
    },
    {
      name: 'Laikipia', slug: 'laikipia', featured: false, country: 'Kenya', heroKey: 'landscapes/laikipia.jpg',
      tagline: 'Conservation pioneers in the highlands',
      summary: "Laikipia's network of private conservancies pioneered community-led conservation. Walking safaris, horseback riding, and rare species like wild dog and Grevy's zebra define the experience.",
      body: richBody([
        "Laikipia is a 9,500 km² plateau north-west of Mt Kenya — not a national park but a federation of private conservancies that pioneered the community-led conservation model now copied across Africa.",
        '## What you get here',
        "Because conservancies set their own rules, Laikipia offers experiences impossible inside national parks: night drives, walking safaris, horseback rides, mountain biking, and exclusive wildlife encounters with no other vehicles. Group sizes are tiny.",
        '## Conservation story',
        "Ol Pejeta Conservancy hosts the last two northern white rhinos on the planet — Najin and her daughter Fatu. Lewa Wildlife Conservancy protects 14% of Kenya's black rhino population. African wild dogs, almost extinct elsewhere, thrive in packs of 30+ here.",
      ]),
      bestTimeToVisit: 'June - October, January - February',
      location: 'Central Kenya, north-west of Mt Kenya',
      wildlife: [
        { animal: 'African Wild Dog', description: 'Endangered packs roam the conservancies.' },
        { animal: 'Black Rhino', description: 'Ol Pejeta hosts the last two northern white rhinos.' },
        { animal: 'Cheetah', description: 'High densities in the open grasslands.' },
      ],
    },
    {
      name: 'Aberdares', slug: 'aberdares', featured: false, country: 'Kenya', heroKey: 'landscapes/aberdares.jpg',
      tagline: "Kenya's misty mountain forest",
      summary: "Aberdares National Park is a high-altitude forest of bamboo, moorland, and waterfalls. Famous for tree lodges where you watch elephants and bongo antelope visit waterholes through the night.",
      body: richBody([
        "Aberdares National Park climbs from 2,000m to over 4,000m, encompassing dense montane forest, bamboo zones, and high-altitude moorland. The drive in feels like leaving Africa — fog, ferns, and tree heather cover the slopes.",
        '## Tree lodges',
        "Aberdares is famous for its tree-lodge tradition. Lodges like Treetops and The Ark are built around forest waterholes — you sleep above the wildlife, with elephants, buffalo, and rare bongo antelope visiting through the night. A bell rings to wake guests for sightings.",
        '## Notable wildlife',
        "The bongo — a critically endangered forest antelope with chestnut coat and white stripes — has its last Kenyan stronghold here. Black leopard sightings are documented. Forest elephants visit the salt licks. The melanistic gene that produces black leopards appears more frequently here than almost anywhere else.",
      ]),
      bestTimeToVisit: 'June - September',
      location: 'Central Kenya highlands',
      wildlife: [
        { animal: 'Bongo', description: 'Critically endangered forest antelope.' },
        { animal: 'Elephant', description: 'Forest elephants visit the salt licks.' },
        { animal: 'Black Leopard', description: 'Rare melanistic leopard sightings reported.' },
      ],
    },
    {
      name: 'Serengeti', slug: 'serengeti', featured: true, country: 'Tanzania', heroKey: 'landscapes/serengeti.jpg',
      tagline: 'The endless plains',
      summary: "The Serengeti is the stage for the Great Migration's full annual cycle. Two million animals, vast open plains, and Africa's most dramatic predator-prey interactions.",
      body: richBody([
        "The Serengeti covers 30,000 km² — three times the size of Yellowstone. The name comes from the Maasai word 'siringet' meaning 'endless plains', and standing on the central plains, you understand why. The horizon disappears.",
        '## The Migration cycle',
        "Two million wildebeest, zebra, and gazelle complete an 800 km annual circuit through the Serengeti-Mara ecosystem. December-March: calving in the southern plains. April-May: the herds head north. June: river crossings begin. July-August: the herds enter the Mara. October: they return south. Different camps in different months — we time your visit precisely.",
        '## Beyond the migration',
        "Even when the herds are elsewhere, the Serengeti delivers. Resident populations of lion, leopard, and cheetah are the highest in Africa. The kopjes (granite outcrops) shelter prides of lions visible from miles away. Predator-prey densities here are unmatched anywhere on the continent.",
      ]),
      bestTimeToVisit: 'January - March (calving), June - October (river crossings)',
      location: 'Northern Tanzania',
      wildlife: [
        { animal: 'Wildebeest', description: 'Over 1.5 million cross the Mara River seasonally.' },
        { animal: 'Lion', description: 'Largest lion population in Africa.' },
        { animal: 'Cheetah', description: 'The open plains favour high-speed hunters.' },
      ],
    },
    {
      name: 'Ngorongoro Crater', slug: 'ngorongoro', featured: false, country: 'Tanzania', heroKey: 'landscapes/ngorongoro.jpg',
      tagline: "Africa's natural amphitheatre",
      summary: "The world's largest unbroken volcanic caldera holds 25,000 large animals year-round in a self-contained ecosystem. Walking the rim at dawn is unforgettable.",
      body: richBody([
        "Three million years ago, a volcano larger than Kilimanjaro collapsed in on itself, creating a 19-kilometre-wide crater 600 metres deep. Today, the Ngorongoro Crater holds the densest concentration of large animals in Africa — 25,000 of them, all year, in a self-contained ecosystem.",
        '## What makes it special',
        "Because the crater walls are too steep for most animals to migrate over, populations stay year-round. This means consistent sightings of black rhino (rare almost everywhere else), the resident lion prides, and tens of thousands of flamingos on the soda lake.",
        '## Beyond the crater floor',
        "The Ngorongoro Conservation Area extends far beyond the crater itself. Olduvai Gorge — where Mary and Louis Leakey unearthed early hominid fossils — is a fascinating side trip. The Empakaai and Olmoti craters offer hikes with views, and Maasai villages still graze cattle alongside wildlife under a unique multi-use mandate.",
      ]),
      bestTimeToVisit: 'June - October (dry), November - May (lush, fewer crowds)',
      location: 'Northern Tanzania, west of Arusha',
      wildlife: [
        { animal: 'Black Rhino', description: 'One of the few places to reliably see black rhino.' },
        { animal: 'Lion', description: 'Resident prides found across the crater floor.' },
        { animal: 'Hippo', description: 'Pools at the crater base host large hippo populations.' },
      ],
    },
    {
      name: 'Zanzibar', slug: 'zanzibar', featured: false, country: 'Tanzania', heroKey: 'landscapes/zanzibar.jpg',
      tagline: 'The spice island finale',
      summary: "After the dust of safari, Zanzibar's white beaches, turquoise water, and 1,000-year-old Stone Town offer the perfect counterpoint. The classic safari-plus-beach combination.",
      body: richBody([
        "Zanzibar Archipelago — the spice islands — sits 35 km off the Tanzanian coast. After a week of dust and dawn drives, the white sand and warm Indian Ocean is the perfect counterweight. Most of our guests add 4-5 nights here at the end of their safari.",
        '## Stone Town',
        "Zanzibar's UNESCO-protected old quarter is a labyrinth of carved doors, courtyards, and Indian Ocean trading-port history dating back 1,000 years. Walking tours reveal the spice trade, slavery, and the complex Swahili-Arab-Persian-Indian heritage that shaped the islands.",
        '## The beaches',
        "The east coast (Paje, Jambiani) offers white-sand classic beaches with kitesurfing. The north (Nungwi, Kendwa) has sunsets and nightlife. The south coast offers privacy and snorkeling. Mnemba atoll is where to swim with dolphins. We match coast to your taste.",
      ]),
      bestTimeToVisit: 'June - October, December - February',
      location: 'Indian Ocean archipelago, off Tanzania',
      wildlife: [
        { animal: 'Red Colobus Monkey', description: 'Endemic to Zanzibar, found in Jozani Forest.' },
        { animal: 'Dolphins', description: 'Spinner dolphins encountered on boat trips.' },
        { animal: 'Sea Turtles', description: 'Nesting and rehabilitation sites along the coast.' },
      ],
    },
    {
      name: 'Bwindi Impenetrable Forest', slug: 'bwindi', featured: true, country: 'Uganda', heroKey: 'landscapes/bwindi.jpg',
      tagline: 'Mountain gorilla home',
      summary: "Bwindi protects half of the world's mountain gorillas. A permit costs $800 USD and the trek can be brutal — but standing five metres from a 200kg silverback is a transformative experience.",
      body: richBody([
        "Bwindi Impenetrable Forest — the name is not metaphorical — protects 25,000 hectares of one of Africa's oldest rainforests. The forest predates the last ice age and survived as a refugium when other African forests dried up. Today, it is home to roughly half the world's remaining mountain gorillas.",
        '## The trek',
        "Treks range from 1 to 8 hours each way. The terrain is steep, humid, and tangled with vegetation. Porters can be hired (and we strongly recommend it — they support local communities and your knees). When the rangers signal contact with a gorilla family, you have one hour, no flash photography, and a 7-metre minimum distance.",
        '## The encounter',
        "Standing seven metres from a 200kg silverback — watching him pluck shoots, glance at you, ignore you — is one of the most quietly profound experiences in wildlife travel. The hour passes in what feels like minutes. Most guests describe it as life-changing.",
      ]),
      bestTimeToVisit: 'June - September, December - February',
      location: 'Southwestern Uganda, near the DRC border',
      wildlife: [
        { animal: 'Mountain Gorilla', description: 'Habituated families allow one hour of close observation.' },
        { animal: 'Chimpanzee', description: 'Trekking available in nearby Kibale Forest.' },
        { animal: 'Forest Elephant', description: 'Smaller subspecies found in the dense jungle.' },
      ],
    },
    {
      name: 'Volcanoes National Park', slug: 'volcanoes-rwanda', featured: false, country: 'Rwanda', heroKey: 'landscapes/volcanoes-rwanda.jpg',
      tagline: 'Where Diane Fossey worked',
      summary: "Rwanda's flagship park where Diane Fossey did her gorilla research. Permits are $1,500 USD but the trek is shorter and the experience more polished than Bwindi.",
      body: richBody([
        "Volcanoes National Park forms the Rwandan section of the Virunga Massif — five extinct volcanoes that straddle the borders of Rwanda, Uganda, and the DRC. This is where Dian Fossey conducted her landmark gorilla research from 1967 until her murder in 1985.",
        '## Why choose Rwanda over Uganda',
        "Rwanda's permits are $1,500 USD versus Uganda's $800. In return: shorter treks (typically 1-3 hours), better infrastructure, world-class lodges within minutes of the park headquarters, and a more curated experience. You can fly Kigali to gorilla encounter in under three hours.",
        '## Beyond the gorillas',
        "Golden monkey trekking is a wonderful add-on — endemic to the Virunga volcanoes, these monkeys are habituated and easier to find than gorillas. The Dian Fossey hike to her research camp and grave site is a moving half-day excursion through the forest where she lived.",
      ]),
      bestTimeToVisit: 'June - September (dry season)',
      location: 'Northwestern Rwanda',
      wildlife: [
        { animal: 'Mountain Gorilla', description: 'Twelve habituated families across the Virunga slopes.' },
        { animal: 'Golden Monkey', description: 'Endemic to the Virunga volcanoes.' },
      ],
    },
  ]

  for (const dest of destinations) {
    const { heroKey, ...data } = dest
    await payload.create({ collection: 'destinations', data: { ...data, heroImage: images[heroKey] || images['landscapes/savanna-sunrise.jpg'] } })
  }
  console.log(`  ✓ Destinations (${destinations.length})`)
}
