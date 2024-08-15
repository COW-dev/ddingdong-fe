import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { CookiesProvider } from 'react-cookie';
import Layout from '@/components/layout';
import Head from '@/components/layout/Head';
import ToasterWithMax from '@/components/toast/ToasterWithMax';

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
      <Head />
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
          <Analytics />
        </QueryClientProvider>
      </CookiesProvider>

      <ToasterWithMax />
    </>
  );
}
