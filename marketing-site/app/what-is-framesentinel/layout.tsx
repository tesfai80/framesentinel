import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is FrameSentinel? AI Video Fraud Detection Platform',
  description: 'FrameSentinel is an AI fraud detection platform that detects deepfakes, replay attacks and face swaps during video KYC verification. Learn how it works, use cases, and pricing.',
  keywords: ['what is framesentinel', 'framesentinel', 'ai video fraud detection platform', 'deepfake detection platform', 'video kyc fraud detection', 'identity verification fraud prevention'],
  openGraph: {
    title: 'What is FrameSentinel? AI Video Fraud Detection Platform',
    description: 'FrameSentinel is an AI fraud detection platform that detects deepfakes, replay attacks and face swaps during video KYC verification.',
    url: 'https://framesentinel.com/what-is-framesentinel',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is FrameSentinel? AI Video Fraud Detection Platform',
    description: 'FrameSentinel is an AI fraud detection platform that detects deepfakes, replay attacks and face swaps during video KYC verification.',
  },
  alternates: {
    canonical: 'https://framesentinel.com/what-is-framesentinel',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
