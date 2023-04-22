import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/layout';
import { Analytics } from '@vercel/analytics/react';

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
}
