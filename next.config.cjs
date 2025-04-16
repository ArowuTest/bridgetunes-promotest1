module.exports = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/opt-in': { page: '/opt-in' },
      '/admin': { page: '/admin' },
      '/draw-management': { page: '/draw-management' },
    }
  },
}
