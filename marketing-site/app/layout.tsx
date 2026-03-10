import './styles/globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'FrameSentinel - AI Video KYC Fraud Detection Platform',
  description: 'Enterprise-grade AI fraud detection for video KYC. Detect deepfakes, replay attacks, face swaps, and identity fraud in real-time with 99.9% accuracy.',
  keywords: 'KYC, fraud detection, deepfake detection, video verification, identity verification, AI security, face swap detection, replay attack detection, video KYC, biometric verification',
  authors: [{ name: 'FrameSentinel' }],
  creator: 'FrameSentinel',
  publisher: 'FrameSentinel',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://framesentinel.com',
    siteName: 'FrameSentinel',
    title: 'FrameSentinel - AI Video KYC Fraud Detection Platform',
    description: 'Enterprise-grade AI fraud detection for video KYC. Detect deepfakes, replay attacks, and identity fraud in real-time.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FrameSentinel - AI Video KYC Fraud Detection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrameSentinel - AI Video KYC Fraud Detection',
    description: 'Enterprise-grade AI fraud detection for video KYC. Detect deepfakes, replay attacks, and identity fraud in real-time.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://framesentinel.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
