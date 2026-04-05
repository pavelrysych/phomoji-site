import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Скрыть плавающую кнопку (молния) в dev — см. devIndicators в доке Next.js
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

export default nextConfig;
