/**
 * Idempotent script to update business copy across all globals.
 * Corrects Mara/Nairobi/luxury positioning to Mombasa coast reality.
 * SAFE: only updates specific text fields, preserves images and arrays not mentioned.
 */
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  console.log('✓ Connected to database')

  // ─── A) SETTINGS ─────────────────────────────────────────
  console.log('Updating settings...')
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'ZebraTrek Safaris',
      tagline: 'Your East Africa Coast Specialists',
      footerTagline: 'Mombasa-based safari and travel specialists. From the airport to the bush to the beach — we handle every detail.',
      conservationStatement: 'Tourism that supports communities and wildlife.',
      email: 'info@zebratreksafaris.com',
      phone: '+254 784 999 015',
      whatsAppNumber: '+254784999015',
      officeAddress: 'Mombasa, Kenya',
    },
  })
  console.log('  ✓ Settings updated')

  // ─── B) HOMEPAGE ─────────────────────────────────────────
  console.log('Updating homepage...')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      headline: 'Coastal Kenya, the wild side',
      subheadline: 'Day trips and short safaris from Mombasa to Tsavo East, Taita Hills, Amboseli and beyond. Plus airport transfers, beach extensions, and everything in between.',
      statement: 'We are Mombasa-based travel specialists. From the moment you land — at Moi International or any coast hotel — we handle the logistics, the guides, the lodges, and the unforgettable moments. Game drives by day, ocean breeze by night.',
      philosophyHeadline: 'Coast meets wilderness',
      philosophyBody: 'Our base on the Kenyan coast puts you at the doorstep of two extraordinary worlds. Drive into Tsavo East at dawn for elephants on red earth. Return to your beach hotel by sunset. Combine bush, beach, and city in a single trip without ever stretching across the country.',
      experiencesHeadline: 'Safaris from the coast',
      experiencesSubheadline: 'From a single full day in Tsavo East to a four-day journey through three national parks. Real itineraries from real Mombasa departures.',
      wildlifeHeadline: 'What you\'ll see',
      wildlifeIntro: 'Tsavo East holds Kenya\'s largest elephant population. Taita Hills protects rhinos and rare antelope. Ngutuni delivers big cat encounters. Amboseli frames Kilimanjaro. Each park, a different story.',
      lodgeHeadline: 'Where you\'ll stay',
      lodgeBody: 'Saltlick Safari Lodge perched on stilts above a watering hole. Ashnil Aruba on the banks of Tsavo\'s Aruba Dam. Sentrim camps in the heart of the action. Every property handpicked, every meal fullboard, every sunset earned.',
      conservationHeadline: 'Travel that gives back',
      conservationBody: 'Every park entrance fee, every conservancy levy, every booking helps fund the rangers, the fences, and the communities that protect Kenya\'s wildlife. Travel here, and you contribute by being here.',
      conservationStat: '100% of park fees go directly to wildlife protection',
      closingHeadline: 'Ready when you are',
      closingBody: 'Tell us when you\'re arriving and what you want to see. We\'ll handle the rest.',
      closingCtaText: 'Plan My Trip',
      closingCtaLink: '/contact',
      processHeadline: 'How it works',
      steps: [
        { number: 1, title: 'Tell us your dates', description: 'Share when you\'re flying in, where you\'re staying, and how long you have. We work around your schedule.' },
        { number: 2, title: 'We design the itinerary', description: 'Day trip, overnight, week-long combo with beach — we tailor the route, the lodges, and the pace.' },
        { number: 3, title: 'We handle everything else', description: 'Pickup, drivers, park fees, lodges, meals, drop-off. You bring the curiosity. We bring the logistics.' },
      ],
      quote: 'Two hours from your hotel pool, you\'re watching elephants drink at sunset. That\'s the coast.',
      attribution: 'On the Mombasa Rendezvous Safari',
    },
  })
  console.log('  ✓ Homepage updated')

  // ─── C) ABOUT PAGE ───────────────────────────────────────
  console.log('Updating about page...')
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroHeadline: 'Our Story',
      heroSubheadline: 'Mombasa-based. Coast-rooted. Built around the rhythm of a different Kenya.',
      storyHeadline: 'Our Story',
      storyBody: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'ZebraTrek Safaris was built on the Kenyan coast, where the savanna meets the Indian Ocean. We design safaris and travel experiences that take advantage of this rare geography — short drives to wild parks, beach mornings and bush afternoons, no marathon transfers across the country. Our drivers know every gate at Tsavo. Our lodges remember our guests by name. Every itinerary is built from over a decade of running these exact roads, week after week.', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'To make Kenya\'s wildest places accessible, comfortable, and unforgettable for every traveller arriving on the coast.', version: 1 }],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      values: [
        { title: 'Coast-based, ground-true', description: 'We don\'t outsource. Our drivers, our vehicles, our knowledge — all from the coast. We know every shortcut, every viewpoint, every lodge.' },
        { title: 'Whole-trip, not just safari', description: 'Airport transfers, beach stays, city tours, group transport, air ticketing — we are a destination management company, not just a tour operator.' },
        { title: 'Real wildlife, real conservation', description: 'Park fees, conservancy levies, and lodge stays directly fund the rangers and communities that protect Kenya\'s wildlife. We travel with that purpose.' },
      ],
    },
  })
  console.log('  ✓ About page updated')

  // ─── D) CONTACT PAGE ─────────────────────────────────────
  console.log('Updating contact page...')
  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      headline: 'Plan Your Safari',
      subheadline: 'Speak to a Mombasa-based specialist. We respond within 24 hours.',
      formHeadline: 'Tell us about your trip',
      formSubheadline: 'Tell us when you\'re arriving, where you\'re staying, and what you want to see. We\'ll send you a tailored itinerary and quote.',
    },
  })
  console.log('  ✓ Contact page updated')

  // ─── E) CONSERVATION PAGE ────────────────────────────────
  console.log('Updating conservation page...')
  try {
    await payload.updateGlobal({
      slug: 'conservation-page',
      data: {
        subheadline: 'How tourism on the Kenyan coast directly funds the parks, rangers, and communities that protect wildlife in Tsavo, Taita Hills, and beyond.',
      },
    })
    console.log('  ✓ Conservation page updated')
  } catch (e) {
    console.log('  ⚠ Conservation page update skipped (field may not exist)')
  }

  // ─── F) FAQ PAGE ─────────────────────────────────────────
  console.log('Checking FAQ page...')
  try {
    const faq = await payload.findGlobal({ slug: 'faq-page' }) as any
    if (faq.categories?.length) {
      let needsUpdate = false
      const updated = faq.categories.map((cat: any) => ({
        ...cat,
        questions: cat.questions?.map((q: any) => {
          let answer = q.answer || ''
          let question = q.question || ''
          if (answer.includes('six guests') || answer.includes('Six guests') || answer.includes('6 guests')) {
            answer = answer.replace(/six guests|Six guests|6 guests/g, 'small groups')
            needsUpdate = true
          }
          if (answer.includes('Masai Mara') || answer.includes('Mara') && !answer.includes('Mombasa')) {
            answer = answer.replace(/Masai Mara/g, 'Tsavo East').replace(/the Mara/g, 'the coast parks')
            needsUpdate = true
          }
          if (question.includes('six guests') || question.includes('6 guests')) {
            question = question.replace(/six guests|6 guests/g, 'small groups')
            needsUpdate = true
          }
          return { ...q, question, answer }
        }),
      }))
      if (needsUpdate) {
        await payload.updateGlobal({ slug: 'faq-page', data: { categories: updated } })
        console.log('  ✓ FAQ page updated (removed Mara/6-guest references)')
      } else {
        console.log('  ✓ FAQ page OK (no Mara/6-guest references found)')
      }
    } else {
      console.log('  ✓ FAQ page has no categories')
    }
  } catch (e) {
    console.log('  ⚠ FAQ page check skipped')
  }

  console.log('\n✅ All business copy updated successfully')
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
