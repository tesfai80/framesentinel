import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video KYC Fraud Detection – Detect Deepfake Identity Attacks',
  description: 'AI video KYC fraud detection platform. Detect deepfake identity attacks, replay attacks, and face swaps in video verification sessions. Sub-2-second processing via REST API.',
  keywords: ['video KYC fraud detection', 'video identity fraud detection', 'deepfake KYC detection', 'video verification fraud', 'KYC deepfake prevention'],
  openGraph: {
    title: 'Video KYC Fraud Detection – Detect Deepfake Identity Attacks',
    description: 'AI video KYC fraud detection platform. Detect deepfake identity attacks, replay attacks, and face swaps.',
    url: 'https://framesentinel.com/video-kyc-fraud-detection',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video KYC Fraud Detection – Detect Deepfake Identity Attacks',
    description: 'AI video KYC fraud detection platform by FrameSentinel.',
  },
  alternates: { canonical: 'https://framesentinel.com/video-kyc-fraud-detection' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
