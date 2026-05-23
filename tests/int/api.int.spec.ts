import { describe, it, expect } from 'vitest'

describe('Enquiry Submission Logic', () => {
  it('rejects empty name', async () => {
    const formData = new FormData()
    formData.set('name', '')
    formData.set('email', 'test@example.com')
    formData.set('website', '') // honeypot empty

    // Import the action
    const { submitEnquiry } = await import('../src/app/(frontend)/contact/actions')
    const result = await submitEnquiry({ success: false }, formData)
    expect(result.success).toBe(false)
    expect(result.error).toContain('required')
  })

  it('rejects invalid email', async () => {
    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'not-an-email')
    formData.set('website', '')

    const { submitEnquiry } = await import('../src/app/(frontend)/contact/actions')
    const result = await submitEnquiry({ success: false }, formData)
    expect(result.success).toBe(false)
    expect(result.error).toContain('valid email')
  })

  it('rejects honeypot-filled submissions', async () => {
    const formData = new FormData()
    formData.set('name', 'Bot User')
    formData.set('email', 'bot@spam.com')
    formData.set('website', 'http://spam.com') // honeypot filled

    const { submitEnquiry } = await import('../src/app/(frontend)/contact/actions')
    const result = await submitEnquiry({ success: false }, formData)
    expect(result.success).toBe(false)
  })
})

describe('Media Utilities', () => {
  it('getImageUrl returns empty string for null', async () => {
    const { getImageUrl } = await import('../src/lib/media')
    expect(getImageUrl(null)).toBe('')
    expect(getImageUrl(undefined)).toBe('')
  })

  it('getImageUrl returns string as-is', async () => {
    const { getImageUrl } = await import('../src/lib/media')
    expect(getImageUrl('https://example.com/img.jpg')).toBe('https://example.com/img.jpg')
  })

  it('getImageProps returns defaults for null', async () => {
    const { getImageProps } = await import('../src/lib/media')
    const props = getImageProps(null)
    expect(props.src).toBe('')
    expect(props.width).toBe(1200)
    expect(props.height).toBe(800)
  })
})

describe('SEO Utilities', () => {
  it('generatePageMetadata uses defaults when no SEO fields', async () => {
    const { generatePageMetadata } = await import('../src/lib/seo')
    const meta = generatePageMetadata(null, { title: 'Test Page', description: 'Test desc' })
    expect(meta.title).toBe('Test Page')
    expect(meta.description).toBe('Test desc')
  })

  it('generatePageMetadata prefers SEO fields over defaults', async () => {
    const { generatePageMetadata } = await import('../src/lib/seo')
    const meta = generatePageMetadata(
      { meta: { title: 'SEO Title', description: 'SEO Desc', image: null } },
      { title: 'Default', description: 'Default desc' }
    )
    expect(meta.title).toBe('SEO Title')
    expect(meta.description).toBe('SEO Desc')
  })
})
