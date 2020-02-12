const withPlugins = require('next-compose-plugins');

const withImages = require('next-images');

// Tell webpack to compile other packages
// https://www.npmjs.com/package/next-transpile-modules
const withTranspileModules = require('next-transpile-modules')(['@karma/ui', '@karma/mock']);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([withTranspileModules, withImages, withBundleAnalyzer], {
  // https://github.com/zeit/next.js/pull/9138
  typescript: {
    transpileOnly: true,
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
});
