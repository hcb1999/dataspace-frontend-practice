const path = require('path');

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.m?js$/,
    exclude: /node_modules\/(?!@mediapipe\/tasks-vision)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-class-properties',
        ],
      },
    },
  });
  return config;
};


