import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@duckdb/node-api"],
  output: "standalone",
  pageExtensions: ["mdx", "ts", "tsx"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });

    return config;
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
