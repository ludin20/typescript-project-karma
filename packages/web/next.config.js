const withPlugins = require('next-compose-plugins');

const withImages = require('next-images');

// Tell webpack to compile other packages
// https://www.npmjs.com/package/next-transpile-modules
const withTranspileModules = require('next-transpile-modules')(['@karma/ui', '@karma/mock']);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withCSS = require('@zeit/next-css');

const withFonts = require('next-fonts');

module.exports = withPlugins([withTranspileModules, withImages, withCSS, withBundleAnalyzer, withFonts], {
  // https://github.com/zeit/next.js/pull/9138
  typescript: {
    transpileOnly: true,
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
});
