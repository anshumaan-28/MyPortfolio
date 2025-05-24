/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add a rule to handle PDF.js worker
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[name].[hash][ext]',
      },
    });

    // Enable JSON imports
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });

    // Ignore canvas module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };

    return config;
  },
  // Add redirects for simplified blog routes
  async redirects() {
    return [
      {
        source: '/blog/perplexity',
        destination: '/blog/wtf-is-perplexity',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig 