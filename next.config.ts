import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async redirects() {
    return [
      {
        source: '/',
        destination: '/moscow',
        permanent: false,
      },
    ];
  },

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vethome24.ru',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'clinical.vet',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },




};



export default nextConfig;



  
