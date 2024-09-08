/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'gaxoslabs.ai/api/connect',        
        'localhost:3000',
      ],
    },
  },
}

export default nextConfig
