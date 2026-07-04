import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // research now lives at the bottom of the lab page
      { source: "/research", destination: "/lab#research", permanent: true },
    ];
  },
};

export default nextConfig;
