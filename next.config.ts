import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old generated article pages were removed; send any bookmarked or
      // indexed links to the live newsroom instead of a 404.
      { source: "/news/:slug", destination: "/news", permanent: true },
      // URLs from the previous chromevisa.ca site that are still indexed.
      { source: "/about-us.html", destination: "/about", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/services.html", destination: "/#services", permanent: true },
      { source: "/contact-us.php", destination: "/#contact", permanent: true },
      { source: "/contact-us.html", destination: "/#contact", permanent: true },
      { source: "/assessment-form.php", destination: "/assessment", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/blog/:path*", destination: "/news", permanent: true },
    ];
  },
};

export default nextConfig;
