'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Currency = 'USD' | 'KES' | 'EUR' | 'GBP'

type Ctx = { currency: Currency; setCurrency: (c: Currency) => void }

const CurrencyContext = createContext<Ctx>({ currency: 'USD', setCurrency: () => {} })

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD')

  useEffect(() => {
    const saved = localStorage.getItem('preferred-currency') as Currency | null
    if (saved) setCurrencyState(saved)
  }, [])

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
    localStorage.setItem('preferred-currency', c)
  }

  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
