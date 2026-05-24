import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['3000.blyss.co.ke', '4001.blyss.co.ke'],
  images: {
    localPatterns: [
      { pathname: '/api/media/file/**' },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: '4001.blyss.co.ke' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'pixabay.com' },
    ],
  },
  async headers() {
    return [
      // Security headers — apply to everything
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      // Static assets — long cache, immutable
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'CDN-Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Cloudflare-CDN-Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Images — long cache
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
          { key: 'CDN-Cache-Control', value: 'public, max-age=2592000' },
          { key: 'Cloudflare-CDN-Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
      // Payload media — long cache (admin republish busts via URL)
      {
        source: '/api/media/file/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
          { key: 'CDN-Cache-Control', value: 'public, max-age=2592000' },
          { key: 'Cloudflare-CDN-Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
      // OG image — short cache (regenerates on content change)
      {
        source: '/api/og(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
          { key: 'CDN-Cache-Control', value: 'public, max-age=86400' },
          { key: 'Cloudflare-CDN-Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      // Sitemap & robots
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
          { key: 'Content-Type', value: 'application/xml' },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      // Dynamic HTML pages — no browser cache, but allow CDN edge cache with revalidation
      {
        source: '/((?!api|admin|_next).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'CDN-Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=86400' },
          { key: 'Cloudflare-CDN-Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=86400' },
        ],
      },
      // API and admin — never cache
      {
        source: '/api/(.*)',
        has: [{ type: 'header', key: 'cache-bypass', value: 'true' }],
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      {
        source: '/admin(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
