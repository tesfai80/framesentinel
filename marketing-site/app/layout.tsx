import './styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FrameSentinel - AI Video KYC Fraud Detection',
  description: 'Enterprise-grade AI fraud detection for video KYC. Detect deepfakes, replay attacks, and identity fraud in real-time.',
  keywords: 'KYC, fraud detection, deepfake detection, video verification, identity verification, AI security',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
