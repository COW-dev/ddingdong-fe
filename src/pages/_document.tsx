import { Html, Head, Main, NextScript } from 'next/document';
import * as Sentry from '@sentry/react';
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable.css"
        />
        <meta
          http-equiv="content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <body>
        <Sentry.ErrorBoundary>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </Sentry.ErrorBoundary>
      </body>
    </Html>
  );
}
