import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // ============================================================================
  // Image Optimization
  // ============================================================================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chinalinkexpress.nyc3.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimize images up to 4K
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL (1 day)
    minimumCacheTTL: 86400,
    // Disable unoptimized images in production for better performance
    unoptimized: false,
  },

  // ============================================================================
  // Redirects - SEO URL Structure
  // ============================================================================
  async redirects() {
    return [
      // Redirect old URLs to new structure
      {
        source: '/home',
        destination: '/fr/',
        permanent: true,
      },
      {
        source: '/air-freight',
        destination: '/fr/services/air-freight',
        permanent: true,
      },
      {
        source: '/sea-freight',
        destination: '/fr/services/sea-freight',
        permanent: true,
      },
      {
        source: '/sourcing',
        destination: '/fr/services/sourcing',
        permanent: true,
      },
      // Force lowercase URLs
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-original-path',
            value: '(?i)^.*[A-Z].*$',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
    ];
  },

  // ============================================================================
  // Headers - Security & Performance
  // ============================================================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Performance Headers
          {
            key: 'Accept-CH',
            value: 'DPR, Width, Viewport-Width, ECT, Save-Data',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
        ],
      },
      {
        // Cache static assets
        source: '/:all*(svg|jpg|png|webp|avif|gif|ico|css|js|woff|woff2|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache sitemap and robots
        source: '/(sitemap.xml|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // ============================================================================
  // Rewrites - Clean URL Structure
  // ============================================================================
  async rewrites() {
    return [
      // Optional: Clean URLs without locale prefix for default locale
      // {
      //   source: '/services/:path*',
      //   destination: '/fr/services/:path*',
      //   locale: false,
      // },
    ];
  },

  // ============================================================================
  // Webpack Configuration
  // ============================================================================
  webpack: (config, { isServer, nextRuntime }) => {
    // Handle shader files if needed
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // Optimize three.js imports for client only
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three$': 'three/build/three.module.js',
      };
    }

    // Tree-shake unused locales from moment.js (if used)
    config.plugins.push(
      new (require('webpack')).IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );

    return config;
  },

  // ============================================================================
  // Experimental Features
  // ============================================================================
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      'framer-motion',
      'gsap',
      '@react-three/drei',
      'lucide-react',
      'three',
    ],
    // Server Actions optimization
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // React compiler for better performance (disabled - requires babel plugin)
    // reactCompiler: true,
  },

  // ============================================================================
  // TypeScript & Build
  // ============================================================================
  typescript: {
    // Disable type checking during build (run separately for CI/CD)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Disable ESLint during build (run separately for CI/CD)
    ignoreDuringBuilds: false,
  },

  // ============================================================================
  // Power Usage & Performance
  // ============================================================================
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
  generateEtags: true, // Enable ETag generation
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // ============================================================================
  // Transpile Packages
  // ============================================================================
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/postprocessing',
    'next-intl',
  ],

  // ============================================================================
  // Environment Variables Validation
  // ============================================================================
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },

  // ============================================================================
  // Logging
  // ============================================================================
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // ============================================================================
  // Trailing Slash (SEO - consistent URL structure)
  // ============================================================================
  trailingSlash: false, // Keep URLs without trailing slash
};

// Create next-intl plugin with the request config path
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
