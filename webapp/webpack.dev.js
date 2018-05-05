const fs = require('fs');
const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const merge = require('webpack-merge');

const common = require('./webpack.common.js');
const project = require('./project.config.js');

// plugins
const definePlugin = new DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

// dev server
const devServer = {
  // open: true,
  port: 8080,
  compress: true,
  contentBase: project.distDir
};

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1
            }
          },
          'less-loader'
        ]
      },
      { // disable css module for node_modules (especially antd)
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "less-loader",
            options: {
              // set javascriptEnabled when using less@3.x
              javascriptEnabled: true,
              modifyVars: project.theme
            }
          }
        ]
      }
    ],
  },
  plugins: [
    definePlugin
  ],
  devServer
});