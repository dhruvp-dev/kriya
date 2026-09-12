/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'kriya-dp.netlify.app',
        '*.netlify.app',
        'localhost:3000',
      ],
    },
  },
};

export default nextConfig;
