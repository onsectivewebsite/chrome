import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old generated article pages were removed; send any bookmarked or
    // indexed links to the live newsroom instead of a 404.
    return [{ source: "/news/:slug", destination: "/news", permanent: true }];
  },
};

export default nextConfig;
