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
        destination: `${process.env.BASE_URL}:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
