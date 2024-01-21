/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "m.media-amazon.com"],
  },
  plugins: [require("@tailwindcss/forms")],
};

module.exports = nextConfig;
