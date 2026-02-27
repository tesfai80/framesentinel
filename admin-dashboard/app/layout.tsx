import '../styles/globals.css';

export const metadata = {
  title: 'FrameSentinel Admin',
  description: 'AI Video KYC Fraud Detection Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
