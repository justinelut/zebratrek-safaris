import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[6rem] font-light leading-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-warm)' }}>404</p>
        <h1 className="mt-4 text-[1.8rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>Lost in the bush</h1>
        <p className="mt-4 text-[var(--fg-muted)] leading-relaxed">
          The trail you followed doesn&apos;t lead anywhere. Perhaps the page has moved, or the link was mistyped.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="text-[0.7rem] tracking-[0.25em] uppercase px-8 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm">
            Back to Home
          </Link>
          <Link href="/safaris" className="text-[0.7rem] tracking-[0.25em] uppercase px-8 py-4 border border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors rounded-sm">
            Browse Safaris
          </Link>
        </div>
      </div>
    </section>
  )
}
