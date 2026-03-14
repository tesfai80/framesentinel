import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Video Fraud Detection for KYC | Deepfake & Replay Attack Detection | FrameSentinel',
  description: 'Detect deepfakes, replay attacks, face swaps, and video injection in KYC verification. AI-powered video fraud detection API with 99.7% accuracy and sub-2-second processing.',
  keywords: 'AI video fraud detection, deepfake detection, video KYC fraud detection, replay attack detection, face swap detection, identity verification fraud, KYC fraud prevention, video authentication, biometric fraud detection, synthetic identity detection',
  openGraph: {
    title: 'AI Video Fraud Detection for KYC | FrameSentinel',
    description: 'Detect deepfakes, replay attacks, and face swaps in video KYC. 99.7% accuracy, sub-2s processing.',
    url: 'https://framesentinel.com/ai-video-fraud-detection',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Video Fraud Detection for KYC | FrameSentinel',
    description: 'Detect deepfakes, replay attacks, and face swaps in video KYC. 99.7% accuracy, sub-2s processing.',
  },
  alternates: {
    canonical: 'https://framesentinel.com/ai-video-fraud-detection',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
