interface SchemaMarkupProps {
  type: 'LocalBusiness' | 'Service' | 'FAQPage';
  data?: Record<string, unknown>;
}

const defaultLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
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
    addressCountry: 'GB',
    addressRegion: 'England',
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
      telephone: '+447397225530',
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
      telephone: '+447414779594',
      contactType: 'sales',
      availableLanguage: 'English',
    },
  ],
  areaServed: [
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
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://wa.me/447397225530',
    'https://www.facebook.com/sigmashopfronts',
    'https://www.linkedin.com/company/sigma-shop-fronts',
    'https://g.co/kgs/sigmashopfronts',
  ],
};

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schema: Record<string, unknown>;

  if (type === 'LocalBusiness') {
    schema = data || defaultLocalBusiness;
  } else if (type === 'Service') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Sigma Shop Fronts',
        url: 'https://www.sigmashopfronts.com',
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
