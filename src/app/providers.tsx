'use client';

import * as Sentry from '@sentry/react';
import { CookiesProvider } from 'react-cookie';

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
        </ClientQueryProvider>
      </CookiesProvider>
    </Sentry.ErrorBoundary>
  );
}
