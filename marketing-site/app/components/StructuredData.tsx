export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FrameSentinel',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
    description: 'Enterprise-grade AI fraud detection for video KYC. Detect deepfakes, replay attacks, and identity fraud in real-time.',
    featureList: [
      'Deepfake Detection',
      'Replay Attack Detection',
      'Face Swap Detection',
      'Injection Detection',
      'Metadata Integrity Check',
    ],
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FrameSentinel',
    url: 'https://framesentinel.com',
    logo: 'https://framesentinel.com/logo.png',
    description: 'AI-powered video KYC fraud detection platform',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@framesentinel.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
}
