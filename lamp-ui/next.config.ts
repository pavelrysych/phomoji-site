import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    // Старый favicon.ico кэшируется агрессивно; редирект на актуальный /icon.png
    return [{ source: "/favicon.ico", destination: "/icon.png", permanent: false }];
  },
};

export default nextConfig;
