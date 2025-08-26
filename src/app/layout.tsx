import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import Providers from './providers';

const pretendard = localFont({
  src: './(assets)/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '띵동',
  description: '명지대학교의 모든 동아리, 띵동에서 확인해 보세요!',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.svg',
      type: 'image/x-icon',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/favicon_dark.svg',
      type: 'image/x-icon',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        <Analytics />
      </body>
    </html>
  );
}
