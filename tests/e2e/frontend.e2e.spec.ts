import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

test.describe('Site Navigation', () => {
  test('homepage loads with hero section', async ({ page }) => {
    await page.goto(BASE)
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('header')).toBeVisible()
  })

  test('navigation links work', async ({ page }) => {
    await page.goto(BASE)
    await page.click('a[href="/safaris"]')
    await expect(page).toHaveURL(/\/safaris/)
  })

  test('safaris listing page loads', async ({ page }) => {
    await page.goto(`${BASE}/safaris`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('destinations page loads', async ({ page }) => {
    await page.goto(`${BASE}/destinations`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('about page loads', async ({ page }) => {
    await page.goto(`${BASE}/about`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('contact page loads with form', async ({ page }) => {
    await page.goto(`${BASE}/contact`)
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('team page loads', async ({ page }) => {
    await page.goto(`${BASE}/team`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('conservation page loads', async ({ page }) => {
    await page.goto(`${BASE}/conservation`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('gallery page loads', async ({ page }) => {
    await page.goto(`${BASE}/gallery`)
    await expect(page.locator('h1')).toContainText(/gallery/i)
  })

  test('journal page loads', async ({ page }) => {
    await page.goto(`${BASE}/journal`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('plan your safari page loads', async ({ page }) => {
    await page.goto(`${BASE}/plan-your-safari`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('when to visit page loads', async ({ page }) => {
    await page.goto(`${BASE}/when-to-visit`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('what to expect page loads', async ({ page }) => {
    await page.goto(`${BASE}/what-to-expect`)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('FAQ page loads with accordions', async ({ page }) => {
    await page.goto(`${BASE}/faq`)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('details')).toHaveCount({ minimum: 1 })
  })

  test('share experience page loads', async ({ page }) => {
    await page.goto(`${BASE}/share-your-experience`)
    await expect(page.locator('form')).toBeVisible()
  })
})

test.describe('Contact Form', () => {
  test('shows validation error for empty submission', async ({ page }) => {
    await page.goto(`${BASE}/contact`)
    await page.click('button[type="submit"]')
    // HTML5 validation should prevent submission
    const nameInput = page.locator('input[name="name"]')
    await expect(nameInput).toHaveAttribute('required', '')
  })

  test('accepts safari param from URL', async ({ page }) => {
    await page.goto(`${BASE}/contact?safari=classic-masai-mara`)
    const hidden = page.locator('input[name="safari"]')
    await expect(hidden).toHaveValue('classic-masai-mara')
  })
})

test.describe('Dark Mode', () => {
  test('theme toggle exists', async ({ page }) => {
    await page.goto(BASE)
    await expect(page.locator('button[aria-label="Toggle theme"]')).toBeVisible()
  })
})

test.describe('404 Page', () => {
  test('shows custom 404 for invalid routes', async ({ page }) => {
    await page.goto(`${BASE}/this-page-does-not-exist`)
    await expect(page.locator('text=Lost in the bush')).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('skip link exists', async ({ page }) => {
    await page.goto(BASE)
    const skipLink = page.locator('a.skip-link')
    await expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  test('main content has id', async ({ page }) => {
    await page.goto(BASE)
    await expect(page.locator('main#main-content')).toBeVisible()
  })
})
