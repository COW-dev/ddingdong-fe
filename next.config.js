/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ddingdong-file.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://eb.ddingdong.club/server/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
