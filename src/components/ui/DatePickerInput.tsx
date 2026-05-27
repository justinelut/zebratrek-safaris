'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'

type Props = {
  value?: string // YYYY-MM-DD
  onChange: (date: string) => void
  minDate?: Date
  placeholder?: string
}

export function DatePickerInput({ value, onChange, minDate, placeholder = 'Select date' }: Props) {
  const date = value ? new Date(value + 'T00:00:00') : undefined
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const min = minDate || today

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full border border-[var(--border)] bg-transparent px-4 py-3.5 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors flex items-center justify-between text-left hover:border-[var(--fg)]/40"
        >
          <span className={date ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]'}>
            {date ? format(date, 'EEE, MMM d, yyyy') : placeholder}
          </span>
          <CalendarIcon className="w-4 h-4 text-[var(--fg-muted)]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              const yyyy = d.getFullYear()
              const mm = String(d.getMonth() + 1).padStart(2, '0')
              const dd = String(d.getDate()).padStart(2, '0')
              onChange(`${yyyy}-${mm}-${dd}`)
            }
          }}
          disabled={(d) => d < min}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
