import Image from 'next/image';
import Link from '@/components/site/Link';
import { business } from '@/lib/business';

export default function Colophon() {
  const o = business.registeredOffice;
  return (
    <footer className="colophon">
      <div className="frame" style={{ paddingBlock: '3rem 2rem', display: 'grid', gap: '2.25rem' }}>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))' }}>
          <div style={{ display: 'grid', gap: '0.9rem', alignContent: 'start' }}>
            <Image
              src="/assets/sigma-logo-horizontal.png"
              alt={business.name}
              width={900}
              height={245}
              sizes="200px"
              style={{ width: 200, height: 'auto' }}
            />
            <p>
              Shopfronts, roller shutters, doors and commercial glazing. Fitted across the UK; repairs within {business.repairRadiusMiles} road miles of {business.repairCentre}.
            </p>
          </div>
          <div>
            <h2>Talk to us</h2>
            <ul style={{ marginTop: '0.8rem' }}>
              <li>
                <a href={`tel:${business.phones.main.tel}`} data-dial="main">
                  {business.phones.main.display}
                </a>
              </li>
              <li>
                <a href={`tel:${business.phones.second.tel}`} data-dial="second">
                  {business.phones.second.display}
                </a>{' '}
                (also WhatsApp)
              </li>
              <li>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              <li>{business.emergencyPromise}</li>
              <li>{business.freeQuote}.</li>
            </ul>
          </div>
          <div>
            <h2>Sigma</h2>
            <ul style={{ marginTop: '0.8rem' }}>
              <li><Link href="/shopfronts">What we fit</Link></li>
              <li><Link href="/repair-radius">Repair area</Link></li>
              <li><Link href="/jobs">Our work</Link></li>
              <li><Link href="/costs">Costs</Link></li>
              <li><Link href="/questions">Questions</Link></li>
              <li><Link href="/company">The company</Link></li>
              <li><Link href="/enquire">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h2>Council permission</h2>
            <ul style={{ marginTop: '0.8rem' }}>
              <li><Link href="/frontage-check">Do I need permission?</Link></li>
              <li><Link href="/planning">Shopfront rules by council</Link></li>
              <li><Link href="/planning/conservation-areas">Conservation areas</Link></li>
              <li><Link href="/grants">Shopfront grants</Link></li>
              <li><Link href="/explained">Permission, explained</Link></li>
              <li><Link href="/shopfront-anatomy">Parts of a shopfront</Link></li>
            </ul>
          </div>
        </div>
        <div className="dimline" style={{ background: '#2a3848' }} />
        <p style={{ fontSize: '0.85rem' }}>
          {business.legalName}. Registered in England and Wales, company number{' '}
          <a href={business.companiesHouseUrl} rel="noopener">
            {business.companyNumber}
          </a>
          . Registered office: {o.street}, {o.locality}, {o.postcode}.{' '}
          <Link href="/privacy">Privacy</Link> · <Link href="/terms-of-business">Terms of business</Link>
        </p>
      </div>
    </footer>
  );
}
