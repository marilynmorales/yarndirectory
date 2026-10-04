import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hide the development indicator entirely
  devIndicators: {
    position: 'bottom-right', // Options: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  }
};

export default nextConfig;
