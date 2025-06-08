import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA( {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 's4.anilist.co',
            pathname: '/file/anilistcdn/media/anime/cover/medium/**',
        },],
    },
    pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development", // supaya gak ganggu di development
    },
});

export default nextConfig;
