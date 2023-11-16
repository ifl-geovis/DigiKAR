/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["duckdb-async"],
  },
  output: "standalone",
};

module.exports = nextConfig;
