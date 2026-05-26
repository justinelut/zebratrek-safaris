'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

type Props = { logo?: string; companyName?: string }

export function PageReveal({ logo, companyName = 'ZebraTrek' }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          style={{ background: '#1A1208' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={companyName} className="h-32 w-auto mx-auto" />
            ) : (
              <p className="text-[2.5rem] font-light text-[#eff3cf]" style={{ fontFamily: 'var(--font-display)' }}>
                {companyName}
              </p>
            )}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-px mx-auto mt-5"
              style={{ background: '#B8860B' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
