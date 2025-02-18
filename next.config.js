import { withPayload } from "@payloadcms/next/withPayload";

// Cache for Payload client
let cachedPayload = null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "aztaclub.ir",
      },
      {
        protocol: "https",
        hostname: "bimarz.aztaclub.ir",
      },
    ],
  },
};

export default withPayload(nextConfig, {
  // Override the default payload init to implement singleton pattern
  initPayload: async (args) => {
    if (cachedPayload) {
      return cachedPayload;
    }

    const payload = await args.payload.init({
      ...(args.payload.config || {}),
      local: process.env.NEXT_PUBLIC_PAYLOAD_URL ? false : true,
    });

    cachedPayload = payload;
    return payload;
  },
});
