import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
})(config as any);
