// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config) => {
//     config.resolve.alias.canvas = false
//     return config
//   },
// }

// // module.exports = nextConfig
// module.exports = {
//   turbopack:{}
// }


/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},

  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

module.exports = nextConfig