const merge = require('webpack-merge');
const DefinePlugin = require('webpack').DefinePlugin;
const ExtractTextWepbackPlugin = require('extract-text-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');
const project = require('./project.config.js');

// plugins
const antdExtractTextWebpackPlugin = new ExtractTextWepbackPlugin(project.distCssAntd);
const stylesExtractTextWebpackPlugin = new ExtractTextWepbackPlugin(project.distCssOthers);
const definePlugin = new DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
});
const uglifyWebpackPlugin = new UglifyWebpackPlugin({
  uglifyOptions: {
    compress: {
      unused: true,
      dead_code: true,
      warnings: false
    }
  }
});

module.exports = merge(common, {
  mode: 'production',
  devtool: undefined,
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: stylesExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                module: true,
                importLoaders: 1
              }
            },
            'less-loader'
          ]
        })
      },
      { // disable css module for node_modules (especially antd)
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: antdExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      }
    ],
  },
  plugins: [
    definePlugin,
    uglifyWebpackPlugin,
    antdExtractTextWebpackPlugin,
    stylesExtractTextWebpackPlugin
  ]
});