import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Скрыть плавающую кнопку (молния) в dev — см. devIndicators в доке Next.js
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  async redirects() {
    // Старый favicon.ico кэшируется агрессивно; редирект на актуальный /icon.png
    return [{ source: "/favicon.ico", destination: "/icon.png", permanent: false }];
  },
};

export default nextConfig;
