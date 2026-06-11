import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  allowedDevOrigins: ["192.168.56.1", "192.168.1.67", "192.168.1.80"],
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;