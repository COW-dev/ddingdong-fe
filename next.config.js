/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://ddingdong-dev.ap-northeast-2.elasticbeanstalk.com/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
