/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimizations
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Netlify compatibility
  trailingSlash: false,
  output: 'standalone',
  
  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.framework = {
        chunks: 'all',
        name: 'framework',
        test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
        priority: 40,
        enforce: true,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
