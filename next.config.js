/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
});

module.exports = nextConfig;
