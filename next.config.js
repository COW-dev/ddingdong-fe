/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ddingdong-file.s3.ap-northeast-2.amazonaws.com', 'github.com'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

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
