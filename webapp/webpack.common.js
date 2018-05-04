const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// plugins
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'ELEGANT',
  filename: 'index.html',
  template: './index.html'
});
const cleanWebpackPlugin = new CleanWebpackPlugin(['dist']);

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.js', '.jsx', 'es6' ]
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
                    'style': 'css'
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