const SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  KES: 'KSh',
}

const LOCALES: Record<string, string> = {
  USD: 'en-US',
  EUR: 'en-GB',
  GBP: 'en-GB',
  KES: 'en-KE',
}

// Approximate conversion rates from USD (admin can override per-package)
const USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  KES: 130,
}

export function getCurrencySymbol(currency?: string | null): string {
  return SYMBOLS[currency || 'USD'] || '$'
}

export function formatPrice(amount: number | null | undefined, currency?: string | null): string {
  if (amount === null || amount === undefined) return ''
  const cur = currency || 'USD'
  const symbol = SYMBOLS[cur] || cur
  const locale = LOCALES[cur] || 'en-US'
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount)
  return cur === 'KES' ? `${symbol} ${formatted}` : `${symbol}${formatted}`
}

export function convertFromUSD(usdAmount: number, toCurrency: string): number {
  const rate = USD_RATES[toCurrency] || 1
  return usdAmount * rate
}

export function convertPrice(amount: number, fromCurrency: string, toCurrency: string): number {
  const inUsd = amount / (USD_RATES[fromCurrency] || 1)
  return inUsd * (USD_RATES[toCurrency] || 1)
}
