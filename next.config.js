/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddn4vjj3ws13w.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'd2syrtcctrfiup.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'ddingdong-converted-file.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'ddingdong-file.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  reactStrictMode: true,
};

export default withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: 'ddingdong-ng',
    project: 'ddingdong-fe',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    experimental: {
      instrumentationHook: true,
    },
  },
);
