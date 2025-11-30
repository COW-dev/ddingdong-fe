'use client';

import * as Sentry from '@sentry/react';
import { CookiesProvider } from 'react-cookie';

import { ChannelTalk } from '@/components/common/ChannelTalk';
import { ToasterWithMax } from '@/components/common/ToasterWithMax';
import VideoUploadProgress from '@/components/common/VideoUploadProgress';

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
