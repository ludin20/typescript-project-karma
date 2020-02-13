/* eslint-disable no-console */
const pkg = require('../package');

module.exports = () => {
  console.log(`\n\n🧪  ${pkg.name.split('/')[1].toUpperCase()} TEST SETUP\n`);
};
