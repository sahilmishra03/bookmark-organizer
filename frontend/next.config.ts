import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/maintenance",
        destination: "/",
        permanent: false,
      },
    ];
  },
  /* config options here */
  allowedDevOrigins:['192.168.1.32'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "ghostmark.openforge.in",
      },
      {
        protocol: "https",
        hostname: "speaktechenglish.com",
      },
    ],
    localPatterns: [
      {
        pathname: "/dashboard.png",
        search: "",
      },
      {
        pathname: "/dashboard-copy.png", 
        search: "",
      },
    ],
  },
};

export default nextConfig;
