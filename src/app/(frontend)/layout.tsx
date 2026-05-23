import React from 'react'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CurrencyProvider } from '@/components/CurrencyProvider'
import { SmoothScroll } from '@/components/SmoothScroll'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ScrollProgress } from '@/components/ScrollProgress'
import { PageReveal } from '@/components/PageReveal'
import { CookieConsent } from '@/components/CookieConsent'
import { BackToTop } from '@/components/BackToTop'
import { getSiteSettings } from '@/lib/queries'
import './globals.css'

export const dynamic = 'force-dynamic'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export async function generateMetadata() {
  const settings = await getSiteSettings()
  return {
    title: settings.defaultMetaTitle || 'ZebraTrek Safaris — Luxury African Safari Experiences',
    description: settings.defaultMetaDescription || "Intimate wildlife encounters across East Africa's most pristine wilderness.",
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  const navLinks = (settings.navigation || []).map((item) => ({
    href: item.href,
    label: item.label,
  }))

  const footerData = {
    companyName: settings.companyName,
    tagline: settings.footerTagline || '',
    conservationStatement: settings.conservationStatement || '',
    columns: settings.footerColumns || [],
    socialLinks: settings.socialLinks || {},
    email: settings.email || '',
    phone: settings.phone || '',
    officeAddress: settings.officeAddress || '',
  }

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: settings.companyName,
              description: settings.defaultMetaDescription || '',
              url: process.env.NEXT_PUBLIC_SERVER_URL || '',
              telephone: settings.phone || undefined,
              email: settings.email || undefined,
              address: settings.officeAddress ? { '@type': 'PostalAddress', addressLocality: settings.officeAddress } : undefined,
            }),
          }}
        />
        <ThemeProvider>
          <CurrencyProvider>
          <SmoothScroll>
          <PageReveal />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <ScrollProgress />
          <Header
            companyName={settings.companyName}
            navLinks={navLinks}
            ctaText={settings.mobileCtaText || 'Plan your safari'}
            ctaLink={settings.mobileCtaLink || '/contact'}
          />
          <main id="main-content">{children}</main>
          <Footer {...footerData} />
          <WhatsAppButton phoneNumber={settings.whatsAppNumber || ''} />
          <BackToTop />
          <CookieConsent />
          </SmoothScroll>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
