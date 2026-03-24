'use client';

import * as Sentry from '@sentry/nextjs';
import { CookiesProvider } from 'react-cookie';

import { ChannelTalk } from '@/_components/common/ChannelTalk';
import { ToasterWithMax } from '@/_components/common/ToasterWithMax';
import VideoUploadProgress from '@/_components/common/VideoUploadProgress';

import { ClientQueryProvider } from './_api/ClientQueryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary>
      <CookiesProvider>
        <ClientQueryProvider>
          {children}
          <VideoUploadProgress />

          <ToasterWithMax />
          <ChannelTalk />
        </ClientQueryProvider>
      </CookiesProvider>
    </Sentry.ErrorBoundary>
  );
}
