/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({})
const nextConfig = {
  // reactStrictMode: true,
  // styledComponents: true,
}

module.exports = nextConfig
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// module.exports = withBundleAnalyzer({
//   useFileSystemPublicRoutes: false,
//   webpack: (config, options) => {
//     if (!options.isServer) {
//       config.resolve.alias['@sentry/node'] = '@sentry/browser';
//     }

//     return config;
//   }
// });