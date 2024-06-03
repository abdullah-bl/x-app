/** @type {import('next').NextConfig} */
const nextConfig = {
   logging: {
    fetches: {
      fullUrl: true,
    },
  },
    typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    reactCompiler: true,
    
  }
};

export default nextConfig;
