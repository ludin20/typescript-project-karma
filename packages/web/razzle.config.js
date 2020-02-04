const path = require('path');

const siblingPackages = ['ui', 'relay-ssr', 'relay-web'];

module.exports = {
  plugins: [
    {
      func: require('@karma/razzle-plugin'),
      options: { include: siblingPackages.map(package => path.join(__dirname, '..', package)) },
    },
  ],
};
