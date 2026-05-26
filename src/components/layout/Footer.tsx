import Link from 'next/link'
import Image from 'next/image'

type Props = {
  companyName: string
  tagline: string
  conservationStatement: string
  columns: { heading: string; links?: { label: string; href: string }[] | null }[]
  socialLinks: { instagram?: string | null; facebook?: string | null; youtube?: string | null; tripAdvisor?: string | null }
  email: string
  phone: string
  officeAddress: string
}

export function Footer({ companyName, tagline, conservationStatement, columns, email, phone, officeAddress }: Props) {
  return (
    <footer className="bg-deep text-ivory/70">
      <div className="container-wide py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <Image
              src="/brand/logo-gold.svg"
              alt={companyName}
              width={260}
              height={80}
              className="h-16 md:h-20 w-auto"
              priority
            />
            {tagline && (
              <p className="mt-5 text-[0.85rem] font-light leading-relaxed max-w-sm text-ivory/50">
                {tagline}
              </p>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-ivory/30 mb-5">{col.heading}</p>
              <ul className="space-y-3">
                {col.links?.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.8rem] font-light text-ivory/60 hover:text-gold transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-ivory/30 mb-5">Reach Us</p>
            <div className="space-y-3 text-[0.8rem] font-light text-ivory/60">
              {email && <p>{email}</p>}
              {phone && <p>{phone}</p>}
              {officeAddress && <p>{officeAddress}</p>}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[0.7rem] text-ivory/30 tracking-wide">
            © {new Date().getFullYear()} {companyName}
          </p>
          {conservationStatement && (
            <p className="text-[0.7rem] text-ivory/30 tracking-wide">
              {conservationStatement}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
