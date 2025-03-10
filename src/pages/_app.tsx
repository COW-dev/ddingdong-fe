import '@/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { loadScript, boot } from '@channel.io/channel-web-sdk-loader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { CookiesProvider } from 'react-cookie';
import VideoUploadProgress from '@/components/common/VideoUploadProgress';
import Layout from '@/components/layout';
import ToasterWithMax from '@/components/toast/ToasterWithMax';
import * as gtag from '@/lib/gtag';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

let channelTalkDidInit = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (typeof window !== 'undefined' && !channelTalkDidInit) {
    channelTalkDidInit = true;
    loadScript();
    boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN ?? '',
    });
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/x-icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon_dark.svg"
          type="image/x-icon"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="description"
          content="명지대학교의 모든 동아리, 띵동에서 확인해 보세요!"
        />
        <title>띵동</title>
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
            <VideoUploadProgress />
          </Layout>
          <ReactQueryDevtools />
          <Analytics />
        </QueryClientProvider>
      </CookiesProvider>

      <ToasterWithMax />
    </>
  );
}
