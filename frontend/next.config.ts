import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
