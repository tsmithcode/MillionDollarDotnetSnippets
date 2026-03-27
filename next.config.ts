import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(), browsing-topics=()"
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  }
] as const;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders.map((header) => ({ ...header }))
      }
    ];
  }
};

export default nextConfig;
