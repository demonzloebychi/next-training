import type { NextConfig } from "next";

const nextConfig: NextConfig = {



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



  
