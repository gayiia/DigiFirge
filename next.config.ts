import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Baseline security headers — OWASP Top 10:2025 A02 (Security Misconfiguration).
  // A full Content-Security-Policy is deliberately deferred: it needs to
  // correctly allow Payload's admin origins and media domains, and a
  // wrong CSP silently breaks the admin panel rather than failing loudly —
  // safer to add once the production media host (Phase 8) is finalized.
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

export default withPayload(nextConfig);
