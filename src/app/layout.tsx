import localFont from 'next/font/local';
import { headers } from 'next/headers';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { type Metadata } from 'next';

import '../styles/globals.css';
import LayoutClient from '@/components/layout';

import Providers from './providers';

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
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
      type: 'image/svg+xml',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/favicon-dark.svg',
      type: 'image/svg+xml',
      media: '(prefers-color-scheme: dark)',
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const isAdminHost = host.startsWith('admin.');

  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body>
        <Providers>
          <LayoutClient isAdminHost={isAdminHost}>{children}</LayoutClient>
        </Providers>
        {process.env.NODE_ENV === 'production' &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        <Analytics />
      </body>
    </html>
  );
}
