import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="description"
          content="명지대학교의 모든 동아리, 띵동에서 확인해 보세요!"
        />
        <title>띵동</title>
      </Head>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </CookiesProvider>

      <Toaster
        containerStyle={{
          position: 'fixed',
          overflow: 'hidden',
          maxHeight: '5rem',
        }}
        toastOptions={{
          style: {
            fontWeight: 600,
            padding: '0.75rem 1rem',
            marginTop: '0.5rem',
          },
        }}
      />
    </>
  );
}
