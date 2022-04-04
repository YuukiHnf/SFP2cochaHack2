/** @type {import('next').NextConfig} */
const urlPrefix = process.env.URL_PREFIX ? "/" + process.env.URL_PREFIX : "";
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
]);

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },
};

module.exports = withTM(nextConfig);
