/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["duckdb-async"],
  },
};

module.exports = nextConfig;
