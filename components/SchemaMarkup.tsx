interface SchemaMarkupProps {
  type: 'LocalBusiness' | 'Service' | 'FAQPage';
  data?: Record<string, unknown>;
}

const defaultLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.sigmashopfronts.com/#localbusiness',
  name: 'Sigma Shop Fronts',
  legalName: 'Sigma Shopfronts and Shutter Limited',
  description:
    'Professional shop front installation and repair specialists. We provide aluminium shop fronts, roller shutters, security doors, automatic doors, bi-fold doors, fire doors, and emergency callout services across the UK.',
  url: 'https://www.sigmashopfronts.com',
  telephone: ['+447414779594', '+447397066538'],
  email: 'sales@sigmashopfronts.com',
  foundingDate: '2024',
  priceRange: '££',
  image: 'https://www.sigmashopfronts.com/assets/sigma-hero-1.jpeg',
  logo: 'https://www.sigmashopfronts.com/assets/sigma-hero-1.jpeg',
  identifier: {
    '@type': 'PropertyValue',
    name: 'Company Number',
    value: '16794487',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4 Thornwood Close',
    addressLocality: 'Oldbury',
    addressRegion: 'West Midlands',
    postalCode: 'B68 9LX',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.4912,
    longitude: -2.0150,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+447414779594',
      contactType: 'customer support',
      contactOption: 'TollFree',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    {
      '@type': 'ContactPoint',
      telephone: '+447397066538',
      contactType: 'sales',
      availableLanguage: 'English',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'City', name: 'London' },
    { '@type': 'City', name: 'Birmingham' },
    { '@type': 'City', name: 'Manchester' },
    { '@type': 'City', name: 'Leeds' },
    { '@type': 'City', name: 'Liverpool' },
    { '@type': 'City', name: 'Bristol' },
    { '@type': 'City', name: 'Sheffield' },
    { '@type': 'City', name: 'Glasgow' },
    { '@type': 'City', name: 'Cardiff' },
    { '@type': 'City', name: 'Newcastle upon Tyne' },
    { '@type': 'City', name: 'Nottingham' },
    { '@type': 'City', name: 'Leicester' },
    { '@type': 'City', name: 'Edinburgh' },
    { '@type': 'City', name: 'Southampton' },
    { '@type': 'City', name: 'Brighton' },
    { '@type': 'City', name: 'Coventry' },
    { '@type': 'City', name: 'Aberdeen' },
    { '@type': 'City', name: 'Bath' },
    { '@type': 'City', name: 'Bolton' },
    { '@type': 'City', name: 'Bournemouth' },
    { '@type': 'City', name: 'Bradford' },
    { '@type': 'City', name: 'Cambridge' },
    { '@type': 'City', name: 'Canterbury' },
    { '@type': 'City', name: 'Chelmsford' },
    { '@type': 'City', name: 'Chester' },
    { '@type': 'City', name: 'Colchester' },
    { '@type': 'City', name: 'Derby' },
    { '@type': 'City', name: 'Doncaster' },
    { '@type': 'City', name: 'Dundee' },
    { '@type': 'City', name: 'Exeter' },
    { '@type': 'City', name: 'Gloucester' },
    { '@type': 'City', name: 'Hull' },
    { '@type': 'City', name: 'Ipswich' },
    { '@type': 'City', name: 'Lancaster' },
    { '@type': 'City', name: 'Lincoln' },
    { '@type': 'City', name: 'Luton' },
    { '@type': 'City', name: 'Maidstone' },
    { '@type': 'City', name: 'Milton Keynes' },
    { '@type': 'City', name: 'Northampton' },
    { '@type': 'City', name: 'Norwich' },
    { '@type': 'City', name: 'Oxford' },
    { '@type': 'City', name: 'Peterborough' },
    { '@type': 'City', name: 'Plymouth' },
    { '@type': 'City', name: 'Portsmouth' },
    { '@type': 'City', name: 'Preston' },
    { '@type': 'City', name: 'Reading' },
    { '@type': 'City', name: 'Rotherham' },
    { '@type': 'City', name: 'Salford' },
    { '@type': 'City', name: 'Slough' },
    { '@type': 'City', name: 'Stoke-on-Trent' },
    { '@type': 'City', name: 'Sunderland' },
    { '@type': 'City', name: 'Swansea' },
    { '@type': 'City', name: 'Swindon' },
    { '@type': 'City', name: 'Wakefield' },
    { '@type': 'City', name: 'Wolverhampton' },
    { '@type': 'City', name: 'Worcester' },
    { '@type': 'City', name: 'York' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Shop Front Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aluminium Shop Fronts', url: 'https://www.sigmashopfronts.com/services/aluminium-shopfronts' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roller Shutters', url: 'https://www.sigmashopfronts.com/services/roller-shutters' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Security Doors', url: 'https://www.sigmashopfronts.com/services/security-doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatic Doors', url: 'https://www.sigmashopfronts.com/services/automatic-doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bi-Fold Doors', url: 'https://www.sigmashopfronts.com/services/bi-fold-doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fire Doors', url: 'https://www.sigmashopfronts.com/services/fire-doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shop Front Repairs', url: 'https://www.sigmashopfronts.com/services/shopfront-repairs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Callout', url: 'https://www.sigmashopfronts.com/services/emergency-callout' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shutter Repair', url: 'https://www.sigmashopfronts.com/services/shutter-repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Glass Replacement', url: 'https://www.sigmashopfronts.com/services/glass-replacement' } },
    ],
  },
  knowsAbout: [
    'Aluminium shopfront installation',
    'Commercial roller shutter installation',
    'Security door installation LPS 1175',
    'Automatic door systems BS EN 16005',
    'Bi-fold door systems',
    'Fire door installation FD30 FD60',
    'Shopfront repairs and emergency glazing',
    'Emergency shopfront boarding',
    'Conservation area shopfront planning',
    'Listed building shopfront consent',
    'Building Regulations Part L compliance',
    'PAS 24 security glazing',
    'DDA compliant entrances',
    'Thermally broken aluminium profiles',
    'Commercial entrance solutions UK',
    'Roller shutter repair and spring replacement',
    'Commercial glass replacement BS 6262',
  ],
  slogan: 'Professional Shopfront Installation, Built to Last',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 10,
    maxValue: 50,
  },
  paymentAccepted: 'Cash, Bank Transfer, Card',
  currenciesAccepted: 'GBP',
  isicV4: '4330',
  sameAs: [
    'https://wa.me/447397066538',
    'https://www.facebook.com/sigmashopfronts',
    'https://www.linkedin.com/company/sigma-shop-fronts',
    'https://g.co/kgs/sigmashopfronts',
    'https://www.yell.com/biz/sigma-shop-fronts',
    'https://www.checkatrade.com/trades/sigmashopfronts',
  ],
  hasMap: 'https://maps.google.com/?q=4+Thornwood+Close+Oldbury+B68+9LX',
  parentOrganization: { '@id': 'https://www.sigmashopfronts.com/#organization' },
  additionalType: 'https://en.wikipedia.org/wiki/Shopfront',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.sigmashopfronts.com/#organization',
  name: 'Sigma Shop Fronts',
  legalName: 'Sigma Shopfronts and Shutter Limited',
  url: 'https://www.sigmashopfronts.com',
  logo: 'https://www.sigmashopfronts.com/assets/sigma-hero-1.jpeg',
  description: defaultLocalBusiness.description,
  telephone: defaultLocalBusiness.telephone,
  email: defaultLocalBusiness.email,
  address: defaultLocalBusiness.address,
  foundingDate: defaultLocalBusiness.foundingDate,
  numberOfEmployees: defaultLocalBusiness.numberOfEmployees,
  sameAs: defaultLocalBusiness.sameAs,
  contactPoint: defaultLocalBusiness.contactPoint,
  areaServed: defaultLocalBusiness.areaServed,
  knowsAbout: defaultLocalBusiness.knowsAbout,
  slogan: defaultLocalBusiness.slogan,
  identifier: defaultLocalBusiness.identifier,
};

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  if (type === 'LocalBusiness') {
    const schema = data || defaultLocalBusiness;
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {!data && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
        )}
      </>
    );
  }

  let schema: Record<string, unknown>;

  if (type === 'Service') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Sigma Shop Fronts',
        url: 'https://www.sigmashopfronts.com',
        telephone: '+447414779594',
        address: defaultLocalBusiness.address,
        geo: defaultLocalBusiness.geo,
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
      },
      ...data,
    };
  } else {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
