import { TestimonialForm } from './TestimonialForm'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata = { title: 'Share Your Experience — ZebraTrek Safaris' }

export default function ShareExperiencePage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container-narrow">
        <FadeIn className="text-center mb-12">
          <span className="eyebrow">Welcome Home</span>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
            Share Your Experience
          </h1>
          <p className="mt-4 text-[var(--fg-muted)] max-w-lg mx-auto">
            We&apos;d love to hear about your safari. Your story helps future travellers discover the magic of East Africa.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <TestimonialForm />
        </FadeIn>
      </div>
    </section>
  )
}
