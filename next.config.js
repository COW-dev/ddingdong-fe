/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ddn4vjj3ws13w.cloudfront.net',
      'd2syrtcctrfiup.cloudfront.net',
      'ddingdong-converted-file.s3.ap-northeast-2.amazonaws.com',
      'ddingdong-file.s3.ap-northeast-2.amazonaws.com',
      'github.com',
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
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
  },
);
