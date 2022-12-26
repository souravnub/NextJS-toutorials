/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "sourav-main-portfolio.netlify.app",
            "picsum.photos",
            "100k-faces.glitch.me",
        ],
    },
};

module.exports = nextConfig;
