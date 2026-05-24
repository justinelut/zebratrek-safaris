import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ZebraTrek Safaris'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'ZebraTrek Safaris'
  const subtitle = searchParams.get('subtitle') || 'Luxury East African Safari Experiences'
  const eyebrow = searchParams.get('eyebrow') || 'Where Every Trail Tells a Story'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '80px',
          background: 'linear-gradient(135deg, #0C1A0C 0%, #1A2E1A 50%, #2D5A27 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#C4883A' }} />
          <span style={{ fontSize: 24, color: '#F0EDE6', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 300 }}>
            ZebraTrek Safaris
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{ fontSize: 22, color: '#C4883A', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 400 }}>
            {eyebrow}
          </span>
          <h1 style={{ fontSize: title.length > 40 ? 72 : 96, color: '#F0EDE6', fontWeight: 300, lineHeight: 1.05, margin: 0, maxWidth: 1000, fontFamily: 'serif' }}>
            {title}
          </h1>
          <p style={{ fontSize: 28, color: 'rgba(240, 237, 230, 0.7)', fontWeight: 300, lineHeight: 1.4, maxWidth: 800, margin: 0 }}>
            {subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 18, color: 'rgba(240, 237, 230, 0.5)' }}>zebratrek.com</span>
          <span style={{ fontSize: 14, color: 'rgba(196, 136, 58, 0.8)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Conservation · Expert-Led · Unforgettable
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
