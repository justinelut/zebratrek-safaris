import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { SafariPackages } from './collections/SafariPackages'
import { Destinations } from './collections/Destinations'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { SafariEnquiries } from './collections/SafariEnquiries'
import { JournalPosts } from './collections/JournalPosts'
import { Pages } from './collections/Pages'
import { GalleryImages } from './collections/GalleryImages'
import { Bookings } from './collections/Bookings'
import { Availability } from './collections/Availability'
import { Seasons } from './collections/Seasons'
import { Settings } from './globals/Settings'
import { Homepage } from './globals/Homepage'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { SafarisPage } from './globals/SafarisPage'
import { DestinationsPage } from './globals/DestinationsPage'
import { ConservationPage } from './globals/ConservationPage'
import { PlanYourSafariPage } from './globals/PlanYourSafariPage'
import { WhenToVisitPage } from './globals/WhenToVisitPage'
import { WhatToExpectPage } from './globals/WhatToExpectPage'
import { GalleryPage } from './globals/GalleryPage'
import { JournalPage } from './globals/JournalPage'
import { FAQPage } from './globals/FAQPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, SafariPackages, Destinations, TeamMembers, Testimonials, SafariEnquiries, JournalPosts, Pages, GalleryImages, Bookings, Availability, Seasons],
  globals: [Settings, Homepage, AboutPage, ContactPage, SafarisPage, DestinationsPage, ConservationPage, PlanYourSafariPage, WhenToVisitPage, WhatToExpectPage, GalleryPage, JournalPage, FAQPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  ...(process.env.RESEND_API_KEY && {
    email: resendAdapter({
      apiKey: process.env.RESEND_API_KEY,
      defaultFromAddress: process.env.EMAIL_FROM || 'hello@zebratrek.com',
      defaultFromName: 'ZebraTrek Safaris',
    }),
  }),
  plugins: [
    seoPlugin({
      collections: ['safari-packages', 'destinations', 'journal-posts', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `${doc?.title || doc?.name || ''} — ZebraTrek Safaris`,
      generateDescription: ({ doc }: any) => doc?.summary || doc?.tagline || '',
    }),
    ...(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID
      ? [
          s3Storage({
            collections: { media: { prefix: 'media' } },
            bucket: process.env.S3_BUCKET,
            config: {
              endpoint: process.env.S3_ENDPOINT!,
              region: process.env.S3_REGION || 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
              },
            },
          }),
        ]
      : []),
  ],
})
