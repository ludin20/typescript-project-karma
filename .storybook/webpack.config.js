module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' },
    },
  });

  config.resolve.extensions = ['.web.js', '.js', '.json', '.web.jsx', '.jsx'];

  // typescript support
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: ['@babel/preset-typescript', '@babel/preset-react'],
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
