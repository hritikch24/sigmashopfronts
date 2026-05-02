import Link from 'next/link';

const services = [
  { label: 'Aluminium Shop Fronts', href: '/services/aluminium-shopfronts' },
  { label: 'Roller Shutters', href: '/services/roller-shutters' },
  { label: 'Security Doors', href: '/services/security-doors' },
  { label: 'Automatic Doors', href: '/services/automatic-doors' },
  { label: 'Bi-Fold Doors', href: '/services/bi-fold-doors' },
  { label: 'Fire Doors', href: '/services/fire-doors' },
  { label: 'Shop Front Repairs', href: '/services/shopfront-repairs' },
  { label: 'Emergency Callout', href: '/services/emergency-callout' },
];

const areas = [
  { label: 'London', href: '/areas/london' },
  { label: 'Birmingham', href: '/areas/birmingham' },
  { label: 'Manchester', href: '/areas/manchester' },
  { label: 'Leeds', href: '/areas/leeds' },
  { label: 'Liverpool', href: '/areas/liverpool' },
  { label: 'Sheffield', href: '/areas/sheffield' },
  { label: 'Bristol', href: '/areas/bristol' },
  { label: 'Coventry', href: '/areas/coventry' },
  { label: 'Leicester', href: '/areas/leicester' },
  { label: 'Nottingham', href: '/areas/nottingham' },
  { label: 'Newcastle', href: '/areas/newcastle' },
  { label: 'Cardiff', href: '/areas/cardiff' },
  { label: 'Edinburgh', href: '/areas/edinburgh' },
  { label: 'Glasgow', href: '/areas/glasgow' },
  { label: 'Southampton', href: '/areas/southampton' },
];

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading font-bold text-xl tracking-wide text-gold">
                SIGMA SHOP FRONTS
              </span>
            </Link>
            <p className="text-grey-400 text-sm leading-relaxed mb-4">
              Professional shop front installation and repair specialists. Serving businesses across the UK with quality aluminium shop fronts, roller shutters, security doors and more.
            </p>
            <p className="text-grey-500 text-xs">
              Company No: 16794487
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-gold mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-grey-400 hover:text-gold text-sm transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-gold mb-4">
              Areas We Cover
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {areas.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="text-grey-400 hover:text-gold text-sm transition-colors"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-gold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:07414779594"
                  className="flex items-center gap-2 text-grey-400 hover:text-gold text-sm transition-colors"
                >
                  <PhoneIcon />
                  <span>07414 779594 (Office)</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:07397066538"
                  className="flex items-center gap-2 text-grey-400 hover:text-gold text-sm transition-colors"
                >
                  <PhoneIcon />
                  <span>07397 066538 (Mobile)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447397225530"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-grey-400 hover:text-gold text-sm transition-colors"
                >
                  <WhatsAppIcon />
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@sigmashopfronts.com"
                  className="flex items-center gap-2 text-grey-400 hover:text-gold text-sm transition-colors"
                >
                  <EmailIcon />
                  <span>sales@sigmashopfronts.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-grey-400 text-sm">
                <ClockIcon />
                <div>
                  <p>Mon–Fri: 8AM–6PM</p>
                  <p>Sat: 9AM–4PM</p>
                  <p className="text-gold font-medium">24/7 Emergency</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-grey-500 text-sm">
            &copy; {new Date().getFullYear()} Sigma Shop Fronts Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-grey-500 hover:text-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-grey-500 hover:text-gold text-sm transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
