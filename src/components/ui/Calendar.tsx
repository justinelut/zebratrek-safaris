'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({ className = '', classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-3 ${className}`}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-[var(--fg)]',
        nav: 'space-x-1 flex items-center',
        nav_button:
          'h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 transition-opacity inline-flex items-center justify-center rounded-md hover:bg-[var(--bg-alt)]',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-[var(--fg-muted)] rounded-md w-9 font-normal text-[0.7rem] uppercase tracking-wider',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[var(--accent)]/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: 'h-9 w-9 p-0 font-normal text-[var(--fg)] aria-selected:opacity-100 hover:bg-[var(--bg-alt)] rounded-md inline-flex items-center justify-center transition-colors cursor-pointer',
        day_selected:
          'bg-[var(--accent)] text-ivory hover:bg-[var(--accent)] hover:text-ivory focus:bg-[var(--accent)] focus:text-ivory',
        day_today: 'bg-[var(--bg-alt)] text-[var(--accent)] font-medium',
        day_outside: 'text-[var(--fg-muted)]/40 opacity-50',
        day_disabled: 'text-[var(--fg-muted)]/40 opacity-50 cursor-not-allowed',
        day_range_middle: 'aria-selected:bg-[var(--accent)]/15 aria-selected:text-[var(--fg)] rounded-none',
        day_range_start: 'rounded-r-none',
        day_range_end: 'rounded-l-none',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
