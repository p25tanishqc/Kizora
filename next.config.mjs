/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site builds to /out and can be hosted on Vercel, Netlify or any static host.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
