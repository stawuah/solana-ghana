/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the development manifest separate from production builds. This prevents
  // a running `next dev` process from reading a manifest being replaced by build/start.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
}

module.exports = nextConfig
