import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot:
    process.env.VERCEL === "1"
      ? undefined
      : path.join(process.cwd(), "../.."),
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.finotech.xyz",
          },
        ],
        destination: "https://finotech.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
