const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const project = require('./project.config.js');

// plugins
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: project.app.name,
  filename: project.distHtml,
  template: project.srcHtml
});
const cleanWebpackPlugin = new CleanWebpackPlugin(['dist']);

module.exports = {
  entry: project.entry,
  output: {
    filename: project.dist,
    path: project.distDir
  },
  resolve: {
    extensions: [ '.js', '.jsx', 'es6' ],
    alias: {
      root: project.rootDir,
      assets: project.assetsDir,
      src: project.srcDir,
      layout: path.resolve(project.srcDir, 'layout'),
      models: path.resolve(project.srcDir, 'models'),
      routers: path.resolve(project.srcDir, 'routers')
    }
  },
  module: {
    rules: [
      // { // javascript - eslint
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       cache: true // allow eslint to cache its temp result into node_modules/.cache
      //     }
      //   }
      // },
      { // javascript
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'env', 'react' ],
              plugins: [
                'transform-class-properties',
                'transform-object-rest-spread',
                'transform-async-generator-functions',
                [ // dynamic loading for antd
                  'import', {
                    'libraryName': 'antd', 
                    'libraryDirectory': 'es', 
                    'style': true
                  }
                ]
              ]
            }
          }
        ]
      },
      { // images
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      },
      { // fonts
        test: /\.(woff|woff2|ttf|eot|tof)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },
  plugins: [
    cleanWebpackPlugin,
    htmlWebpackPlugin,
  ]
};