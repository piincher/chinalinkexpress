import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chinalinkexpress.nyc3.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Transpile Three.js related packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Webpack configuration for shader support and optimization
  webpack: (config, { isServer }) => {
    // Handle shader files if needed
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // Optimize three.js imports
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three$': 'three/build/three.module.js',
      };
    }

    return config;
  },
  
  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', 'gsap', '@react-three/drei'],
  },
};

// Create next-intl plugin with the request config path
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
