import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Another lockfile higher up the tree confuses root inference.
  turbopack: { root: process.cwd() },

  // Only our own images; nothing is hot-linked from elsewhere.
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 65, 75],
  },

  trailingSlash: false,
  // proxy.ts strips trailing slashes itself, so an old URL reaches its final page in one hop.
  skipTrailingSlashRedirect: true,

  // Strict mode catches common bugs during development
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Improve build output logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },


  // Security headers applied to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Speak-to-create on /admin/documents records from the microphone. Public
        // pages keep it blocked; this later entry overrides the one above for
        // admin pages only.
        source: '/admin/:path*',
        headers: [{ key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' }],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
