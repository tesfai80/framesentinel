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

  const productData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'FrameSentinel',
    description: 'FrameSentinel is an AI fraud detection platform that detects deepfakes, replay attacks and face swaps during video KYC verification.',
    brand: {
      '@type': 'Brand',
      name: 'FrameSentinel',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '149',
      priceCurrency: 'USD',
      offerCount: '5',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is FrameSentinel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FrameSentinel is an AI fraud detection platform that detects deepfakes, replay attacks and face swaps during video KYC verification. It provides a REST API and TypeScript SDK for real-time video authenticity analysis.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is video KYC fraud detection?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Video KYC fraud detection is the process of analyzing video identity verification sessions to detect manipulation attempts such as deepfakes, face swaps, replay attacks, and video injection.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to detect deepfake identity fraud?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FrameSentinel uses AI neural networks to analyze facial micro-expressions, skin texture, and temporal consistency across video frames to detect deepfake identity fraud with 99.7% accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'What tools detect video identity fraud?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FrameSentinel is an AI platform specifically designed to detect video identity fraud. It runs 5 parallel detection modules including deepfake detection, replay attack prevention, face swap detection, injection detection, and metadata integrity checks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast is FrameSentinel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FrameSentinel processes videos in under 2 seconds. It extracts up to 15 frames and runs all 5 detection modules in parallel.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does FrameSentinel store videos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Videos are automatically deleted immediately after processing. FrameSentinel does not permanently store user videos.',
        },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
