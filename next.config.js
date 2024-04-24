/** @type {import('next').NextConfig} */
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async redirects() {
      return [
        {
          source: '/support',
          destination: 'https://patreon.com/Everthorn?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink',
          permanent: true,
        },
        {
          source: '/wiki/pages',
          destination: '/wiki',
          permanent: true,
        },
      ]
    },
}

module.exports = nextConfig
