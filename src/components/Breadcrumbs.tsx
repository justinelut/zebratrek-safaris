import Link from 'next/link'

type Crumb = { label: string; href?: string }
type Props = { items: Crumb[] }

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || ''

export function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE }, ...items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: item.label,
      ...(item.href && { item: `${BASE}${item.href}` }),
    }))],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="container-wide pt-28 pb-4">
        <ol className="flex items-center gap-2 text-[0.7rem] text-[var(--fg-muted)]">
          <li><Link href="/" className="hover:text-[var(--fg)] transition-colors">Home</Link></li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="opacity-40">/</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-[var(--fg)] transition-colors">{item.label}</Link>
              ) : (
                <span className="text-[var(--fg)]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
