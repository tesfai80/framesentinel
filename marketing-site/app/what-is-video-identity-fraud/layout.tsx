import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is Video Identity Fraud? Deepfake & KYC Attacks Explained',
  description: 'Learn what video identity fraud is, how deepfake identity attacks work, and how to detect video KYC fraud. Comprehensive guide to deepfake, replay, and face swap attacks.',
  keywords: ['video identity fraud', 'deepfake identity attack', 'video KYC fraud', 'what is video identity fraud', 'deepfake attacks explained', 'KYC fraud types'],
  openGraph: {
    title: 'What is Video Identity Fraud? Deepfake & KYC Attacks Explained',
    description: 'Learn what video identity fraud is and how deepfake identity attacks work.',
    url: 'https://framesentinel.com/what-is-video-identity-fraud',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is Video Identity Fraud? Deepfake & KYC Attacks Explained',
    description: 'Comprehensive guide to video identity fraud and deepfake KYC attacks.',
  },
  alternates: { canonical: 'https://framesentinel.com/what-is-video-identity-fraud' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
