const withPlugins = require('next-compose-plugins');

const withImages = require('next-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withCSS = require('@zeit/next-css');

const withFonts = require('next-fonts');

module.exports = withPlugins([withImages, withCSS, withBundleAnalyzer, withFonts], {
  // https://github.com/zeit/next.js/pull/9138
  typescript: {
    transpileOnly: true,
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
});
