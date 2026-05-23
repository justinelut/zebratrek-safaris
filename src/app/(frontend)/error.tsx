'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[4rem] font-light leading-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-warm)' }}>Oops</p>
        <h1 className="mt-4 text-[1.5rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>Something went wrong</h1>
        <p className="mt-4 text-[var(--fg-muted)] leading-relaxed">
          We encountered an unexpected issue. Our team has been notified. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 text-[0.7rem] tracking-[0.25em] uppercase px-8 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm"
        >
          Try Again
        </button>
      </div>
    </section>
  )
}
