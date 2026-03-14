import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deepfake KYC Detection – Prevent Identity Verification Fraud',
  description: 'Detect deepfake attacks in KYC verification. AI-powered deepfake KYC detection prevents identity verification fraud with 99.7% accuracy. Sub-2-second processing via API.',
  keywords: ['deepfake KYC detection', 'identity verification fraud detection', 'AI identity fraud detection', 'KYC deepfake prevention', 'deepfake identity verification'],
  openGraph: {
    title: 'Deepfake KYC Detection – Prevent Identity Verification Fraud',
    description: 'Detect deepfake attacks in KYC verification with FrameSentinel.',
    url: 'https://framesentinel.com/deepfake-kyc-detection',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepfake KYC Detection – Prevent Identity Verification Fraud',
    description: 'AI-powered deepfake KYC detection by FrameSentinel.',
  },
  alternates: { canonical: 'https://framesentinel.com/deepfake-kyc-detection' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
