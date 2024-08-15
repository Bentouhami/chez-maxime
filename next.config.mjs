/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.langelys.com',
                port: '',
                pathname: '/**',
            },
        ],

        dangerouslyAllowSVG: true, // This allows SVG images
    },
};

export default nextConfig;
