/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ddingdong-file.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: `http://ddingdong-dev.ap-northeast-2.elasticbeanstalk.com/api/:path*`,
//       },
//     ];
//   },
 };

module.exports = nextConfig;
