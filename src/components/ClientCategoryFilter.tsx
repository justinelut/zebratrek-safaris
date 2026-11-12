'use client'

import { useEffect, useState } from 'react'

type Props = { categories: string[]; group: string }

export function ClientCategoryFilter({ categories, group }: Props) {
  const [active, setActive] = useState('All')

  function apply(category: string) {
    const selection = categories.includes(category) ? category : 'All'
    setActive(selection)
    const params = new URLSearchParams(window.location.search)
    if (selection === 'All') params.delete('category')
    else params.set('category', selection)
    const query = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`)

    document.querySelectorAll<HTMLElement>(`[data-filter-group="${group}"] [data-filter-item]`).forEach((item) => {
      item.hidden = selection !== 'All' && item.dataset.filterItem !== selection
    })
    document.querySelectorAll<HTMLElement>(`[data-filter-group="${group}"] [data-filter-empty]`).forEach((empty) => {
      empty.hidden = document.querySelectorAll<HTMLElement>(`[data-filter-group="${group}"] [data-filter-item]:not([hidden])`).length > 0
    })
  }

  useEffect(() => {
    apply(new URLSearchParams(window.location.search).get('category') || 'All')
    // Initial query filter is intentionally read only after hydration.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={active === category}
          onClick={() => apply(category)}
          className={`text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 border rounded-sm transition-colors ${active === category ? 'bg-[var(--fg)] text-[var(--bg)]' : 'border-[var(--border)] hover:border-[var(--fg)]'}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
