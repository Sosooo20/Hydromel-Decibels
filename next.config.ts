import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  allowedDevOrigins: ["192.168.56.1", "192.168.1.67", "192.168.1.80"],
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;