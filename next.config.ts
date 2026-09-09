import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // Baseline security headers — OWASP Top 10:2025 A02 (Security Misconfiguration).
  // A full Content-Security-Policy is deliberately deferred: it needs to
  // correctly allow Sanity's Studio origins and CDN image domains, and a
  // wrong CSP silently breaks the Studio rather than failing loudly — safer
  // to add once the real Sanity project domains are finalized (Phase 1).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Only takes effect over HTTPS (Vercel serves production over HTTPS
          // by default) — harmless as a no-op locally over http.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
