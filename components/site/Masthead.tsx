import Image from 'next/image';
import Link from 'next/link';
import { business } from '@/lib/business';
import { whatsappLink } from '@/lib/quick-line';

const NAV = [
  { href: '/shopfronts', label: 'Shopfronts & shutters' },
  { href: '/repair-radius', label: 'Repairs' },
  { href: '/jobs', label: 'Our work' },
  { href: '/costs', label: 'Costs' },
  { href: '/planning', label: 'Planning help' },
  { href: '/enquire', label: 'Enquire' },
];

/**
 * Dark band so the horizontal logo — drawn for a dark ground — is used exactly
 * as supplied. The mobile menu is a <details> element: no script to load.
 */
export default function Masthead() {
  return (
    <header className="masthead">
      <a href="#content" className="skip">
        Skip to content
      </a>
      <div className="frame masthead__bar">
        <Link href="/" aria-label={`${business.name} — home`} style={{ display: 'block', lineHeight: 0 }}>
          <Image
            src="/assets/sigma-logo-horizontal.png"
            alt={business.name}
            width={900}
            height={245}
            priority
            sizes="(min-width: 64rem) 188px, 160px"
            style={{ width: 'clamp(150px, 20vw, 188px)', height: 'auto' }}
          />
        </Link>
        <nav aria-label="Main" className="masthead__links">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <a className="masthead__phone" href={`tel:${business.phones.main.tel}`} data-dial="main">
            {business.phones.main.display}
          </a>
          <a className="masthead__wa" href={whatsappLink(business.whatsapp)} data-dial="whatsapp" rel="noopener">
            WhatsApp
          </a>
        </nav>
        <details className="masthead__menu">
          <summary>Menu</summary>
          <nav aria-label="Main" className="masthead__drawer">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
            <Link href="/frontage-check">Frontage check</Link>
            <Link href="/company">The company</Link>
            <a href={`tel:${business.phones.main.tel}`} data-dial="main">
              Call {business.phones.main.display}
            </a>
            <a href={whatsappLink(business.whatsapp)} data-dial="whatsapp" rel="noopener">
              WhatsApp {business.phones.second.display}
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
