/** @type {import('next').NextConfig} */
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async redirects() {
      return [
        {
          source: '/support',
          destination: 'https://patreon.com/Everthorn?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink',
          permanent: true,
        },
        {
          source: '/youtube',
          destination: 'https://www.youtube.com/@everthornMC',
          permanent: true,
        },
        {
          source: '/',
          destination: '/home',
          permanent: true
        }
      ]
    },
  async rewrites() {
    return [
      {
        source: '/nexuscore-api/:path*',
        destination: 'https://api.everthorn.net/:path*'
      }
    ]
  }
}

module.exports = nextConfig
