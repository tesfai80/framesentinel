import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deepfake Detection API – Detect AI Video Manipulation',
  description: 'Deepfake detection API for video verification. Detect AI video manipulation, face swaps, and replay attacks via REST API. Sub-2-second processing. Free tier available.',
  keywords: ['deepfake detection API', 'AI video fraud detection API', 'deepfake verification API', 'video fraud detection API', 'identity verification API'],
  openGraph: {
    title: 'Deepfake Detection API – Detect AI Video Manipulation',
    description: 'Deepfake detection API for video verification by FrameSentinel.',
    url: 'https://framesentinel.com/deepfake-detection-api',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepfake Detection API – Detect AI Video Manipulation',
    description: 'Deepfake detection API for video verification by FrameSentinel.',
  },
  alternates: { canonical: 'https://framesentinel.com/deepfake-detection-api' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
