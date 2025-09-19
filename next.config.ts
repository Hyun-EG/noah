import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
})(config as any);
