import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Deepfake Detection Tools for 2026',
  description: 'Top deepfake detection platforms for identity verification: FrameSentinel, Reality Defender, Sensity AI, Truepic. Compare features, pricing, and detection capabilities.',
  keywords: ['best deepfake detection tools', 'deepfake detection platforms', 'ai deepfake detection', 'video fraud detection tools', 'deepfake detection software', 'identity fraud detection'],
  openGraph: {
    title: 'Best Deepfake Detection Tools for 2026',
    description: 'Top deepfake detection platforms for identity verification and video fraud prevention.',
    url: 'https://framesentinel.com/best-deepfake-detection-tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Deepfake Detection Tools for 2026',
    description: 'Top deepfake detection platforms for identity verification and video fraud prevention.',
  },
  alternates: {
    canonical: 'https://framesentinel.com/best-deepfake-detection-tools',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
