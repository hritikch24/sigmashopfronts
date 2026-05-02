interface SchemaMarkupProps {
  type: 'LocalBusiness' | 'Service' | 'FAQPage';
  data?: Record<string, unknown>;
}

const defaultLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sigma Shop Fronts',
  legalName: 'Sigma Shop Fronts Ltd',
  description:
    'Professional shop front installation and repair specialists. We provide aluminium shop fronts, roller shutters, security doors, automatic doors, bi-fold doors, fire doors, and emergency callout services across the UK.',
  url: 'https://www.sigmashopfronts.com',
  telephone: ['+447414779594', '+447397066538'],
  email: 'sales@sigmashopfronts.com',
  foundingDate: '2024',
  identifier: {
    '@type': 'PropertyValue',
    name: 'Company Number',
    value: '16794487',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
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
    },
    {
      '@type': 'ContactPoint',
      telephone: '+447414779594',
      contactType: 'sales',
      availableLanguage: 'English',
    },
  ],
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Shop Front Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aluminium Shop Fronts' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roller Shutters' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Security Doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatic Doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bi-Fold Doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fire Doors' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shop Front Repairs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Callout' } },
    ],
  },
  sameAs: [
    'https://wa.me/447397225530',
  ],
};

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schema: Record<string, unknown>;

  if (type === 'LocalBusiness') {
    schema = data
      ? { '@context': 'https://schema.org', '@type': 'LocalBusiness', ...data }
      : defaultLocalBusiness;
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
