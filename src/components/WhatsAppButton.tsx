'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type Props = { phoneNumber: string }

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export function WhatsAppButton({ phoneNumber }: Props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  if (!phoneNumber) return null
  const cleaned = phoneNumber.replace(/[^0-9]/g, '')

  const send = () => {
    const text = message.trim() || "Hi, I'm interested in planning a safari with ZebraTrek Safaris."
    window.open(`https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`, '_blank')
    setOpen(false)
    setMessage('')
  }

  return (
    <>
      {/* Chat popup */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'var(--bg)' }}>
          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
              <WhatsAppIcon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">ZebraTrek Safaris</p>
              <p className="text-white/70 text-xs">Typically replies within an hour</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Chat body */}
          <div className="p-4 min-h-[120px]" style={{ background: '#ECE5DD' }}>
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
              <p className="text-[0.8rem] text-gray-800">Hi there! 👋 How can we help you plan your safari?</p>
              <p className="text-[0.6rem] text-gray-400 mt-1 text-right">now</p>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border border-[var(--border)] rounded-full px-4 py-2 text-[0.85rem] outline-none focus:border-[#25D366]"
            />
            <button
              onClick={send}
              className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20BA5C] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#20BA5C] transition-all duration-300"
      >
        {open ? <X size={22} /> : <WhatsAppIcon size={26} />}
      </button>
    </>
  )
}
