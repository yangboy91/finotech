import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot:
    process.env.VERCEL === "1"
      ? undefined
      : path.join(process.cwd(), "../.."),
};

export default nextConfig;
