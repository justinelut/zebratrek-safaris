'use client'

import { useCurrency } from './CurrencyProvider'
import { formatPrice, convertPrice } from '@/lib/currency'

type Props = {
  amount: number | null | undefined
  baseCurrency?: string | null
  className?: string
  showFrom?: boolean
}

export function Price({ amount, baseCurrency = 'USD', className = '', showFrom = false }: Props) {
  const { currency } = useCurrency()
  if (amount === null || amount === undefined) return null
  const converted = convertPrice(amount, baseCurrency || 'USD', currency)
  return (
    <span className={className}>
      {showFrom && <span className="text-[0.85em] opacity-70">From </span>}
      {formatPrice(converted, currency)}
    </span>
  )
}
