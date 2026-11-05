import type { NextConfig } from "next";

const configuredImageHost = process.env.NEXT_PUBLIC_IMAGE_HOST?.trim();
const imageHostUrl = configuredImageHost
  ? new URL(
      configuredImageHost.includes("://")
        ? configuredImageHost
        : `https://${configuredImageHost}`,
    )
  : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 90],
    remotePatterns: imageHostUrl
      ? [
          {
            protocol: "https",
            hostname: imageHostUrl.hostname,
            port: imageHostUrl.port,
            pathname: "/**",
          },
        ]
      : [],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
