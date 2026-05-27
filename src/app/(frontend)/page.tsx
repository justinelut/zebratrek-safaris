import { getHomepage, getSafaris, getTestimonials, getDestinations, getTeamMembers, getSiteSettings } from '@/lib/queries'
import { getImageUrl } from '@/lib/media'
import { Hero } from '@/components/home/Hero'
import { IntroStatement } from '@/components/home/IntroStatement'
import { ImageBreak } from '@/components/home/ImageBreak'
import { Philosophy } from '@/components/home/Philosophy'
import { Numbers } from '@/components/home/Numbers'
import { Experiences } from '@/components/home/Experiences'
import { PullQuote } from '@/components/home/PullQuote'
import { WildlifeGrid } from '@/components/home/WildlifeGrid'
import { Lodge } from '@/components/home/Lodge'
import { GuidesPreview } from '@/components/home/GuidesPreview'
import { DestinationsPreview } from '@/components/home/DestinationsPreview'
import { Process } from '@/components/home/Process'
import { Testimonials } from '@/components/home/Testimonials'
import { Conservation } from '@/components/home/Conservation'
import { ClosingCTA } from '@/components/home/ClosingCTA'
import { DestinationMarquee } from '@/components/home/DestinationMarquee'

export default async function HomePage() {
  const [homepage, safaris, testimonials, destinations, team, settings] = await Promise.all([
    getHomepage(),
    getSafaris({ featured: true, limit: 3 }),
    getTestimonials({ featured: true, limit: 4 }),
    getDestinations({ featured: true, limit: 4 }),
    getTeamMembers({ featured: true, limit: 3 }),
    getSiteSettings(),
  ])

  const imageBreaks = homepage.images || []
  const brandPattern = getImageUrl((settings as any).brandPattern) || null

  return (
    <>
      <Hero
        headline={homepage.headline || ''}
        subheadline={homepage.subheadline || ''}
        backgroundImage={homepage.backgroundImage as any}
        ctaText={homepage.ctaText || 'Plan Your Safari'}
        ctaLink={homepage.ctaLink || '/contact'}
      />
      <IntroStatement text={homepage.statement || ''} />
      {imageBreaks[0] && <ImageBreak image={imageBreaks[0].image as any} alt={imageBreaks[0].alt || ''} />}
      <Philosophy
        headline={homepage.philosophyHeadline || ''}
        body={homepage.philosophyBody || ''}
        image={homepage.philosophyImage as any}
      />
      <Numbers stats={homepage.stats || []} />
      <DestinationMarquee />
      <Experiences
        headline={homepage.experiencesHeadline || ''}
        subheadline={homepage.experiencesSubheadline || ''}
        safaris={safaris.docs}
      />
      <PullQuote quote={homepage.quote || ''} attribution={homepage.attribution || ''} />
      <WildlifeGrid headline={homepage.wildlifeHeadline || ''} intro={(homepage as any).wildlifeIntro || ''} animals={homepage.animals as any || []} />
      <Lodge
        headline={homepage.lodgeHeadline || ''}
        body={homepage.lodgeBody || ''}
        image={homepage.lodgeImage as any}
      />
      <GuidesPreview
        headline="Meet Your Guides"
        team={team}
      />
      <DestinationsPreview destinations={destinations.docs} />
      <Process headline={homepage.processHeadline || ''} steps={homepage.steps || []} />
      <Testimonials testimonials={testimonials} />
      <Conservation
        headline={homepage.conservationHeadline || ''}
        body={homepage.conservationBody || ''}
        stat={homepage.conservationStat || ''}
        image={homepage.conservationImage as any}
      />
      {imageBreaks[1] && <ImageBreak image={imageBreaks[1].image as any} alt={imageBreaks[1].alt || ''} />}
      <ClosingCTA
        headline={homepage.closingHeadline || ''}
        body={homepage.closingBody || ''}
        ctaText={homepage.closingCtaText || 'Start Planning'}
        ctaLink={homepage.closingCtaLink || '/contact'}
        brandPattern={brandPattern}
      />
    </>
  )
}
