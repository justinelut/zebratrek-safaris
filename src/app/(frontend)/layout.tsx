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
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { CookieConsent } from '@/components/CookieConsent'
import { BackToTop } from '@/components/BackToTop'
import { getSiteSettings } from '@/lib/queries'
import { getImageUrl } from '@/lib/media'
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
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://zebratreksafaris.com'
  const title = settings.defaultMetaTitle || 'ZebraTrek Safaris — Luxury African Safari Experiences'
  const description = settings.defaultMetaDescription || "Intimate wildlife encounters across East Africa's most pristine wilderness."

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: '%s — ZebraTrek Safaris' },
    description,
    applicationName: 'ZebraTrek Safaris',
    authors: [{ name: 'ZebraTrek Safaris' }],
    generator: 'Next.js',
    keywords: ['African safari', 'Kenya safari', 'luxury safari', 'Masai Mara', 'Serengeti', 'Amboseli', 'Tanzania safari', 'Bwindi gorillas', 'East Africa wildlife', 'safari packages'],
    referrer: 'origin-when-cross-origin',
    creator: 'ZebraTrek Safaris',
    publisher: 'ZebraTrek Safaris',
    formatDetection: { email: false, address: false, telephone: false },
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      title,
      description,
      siteName: settings.companyName || 'ZebraTrek Safaris',
      images: [{ url: `${siteUrl}/api/og`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/api/og`],
      creator: '@zebratrek',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true, follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
      },
    },
    category: 'travel',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://zebratreksafaris.com'

  const navLinks = (settings.navigation || []).map((item) => ({
    href: item.href,
    label: item.label,
  }))

  const footerData = {
    companyName: settings.companyName,
    tagline: settings.footerTagline || '',
    conservationStatement: settings.conservationStatement || '',
    columns: settings.footerColumns || [],
    socialLinks: settings.socialLinks || {},    email: settings.email || '',
    phone: settings.phone || '',
    officeAddress: settings.officeAddress || '',
    brandPattern: getImageUrl((settings as any).brandPattern) || null,
  }

  const social = settings.socialLinks || {}
  const sameAs = [social.instagram, social.facebook, social.youtube, social.tripAdvisor].filter(Boolean)

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'TravelAgency', 'LocalBusiness'],
    '@id': `${siteUrl}#organization`,
    name: settings.companyName || 'ZebraTrek Safaris',
    legalName: settings.companyName || 'ZebraTrek Safaris',
    description: settings.defaultMetaDescription || '',
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/api/og`, width: 1200, height: 630 },
    image: `${siteUrl}/api/og`,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: settings.officeAddress
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.officeAddress,
          addressLocality: 'Nairobi',
          addressCountry: 'KE',
        }
      : undefined,
    areaServed: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'],
    priceRange: '$$$',
    sameAs,
  }

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ThemeProvider>
          <CurrencyProvider>
          <SmoothScroll>
          <PageReveal logo={getImageUrl((settings as any).logoIcon || (settings as any).logo)} companyName={settings.companyName} />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <ScrollProgress />
          <Header
            companyName={settings.companyName}
            navLinks={navLinks}
            ctaText={settings.mobileCtaText || 'Plan your safari'}
            ctaLink={settings.mobileCtaLink || '/contact'}
            logoLight={getImageUrl((settings as any).logo) || null}
            logoDark={getImageUrl((settings as any).logoDark || (settings as any).logo) || null}
            logoIcon={getImageUrl((settings as any).logoIcon) || null}
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
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
