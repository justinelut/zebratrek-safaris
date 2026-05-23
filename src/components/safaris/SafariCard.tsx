import Image from 'next/image'
import Link from 'next/link'

interface SafariCardProps {
  title: string
  slug: string
  duration: string
  price: number
  category: string
  image: string
}

export function SafariCard({ title, slug, duration, price, category, image }: SafariCardProps) {
  return (
    <Link href={`/safaris/${slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="mt-4">
        <span className="eyebrow">{category}</span>
        <h3 className="mt-1 text-[1.2rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
        <p className="mt-1 text-[0.8rem] text-[var(--fg-muted)]">{duration} · From ${price.toLocaleString()}</p>
      </div>
    </Link>
  )
}
