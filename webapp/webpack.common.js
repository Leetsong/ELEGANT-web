const path = require('path');
const marked = require('marked');
const Prism = require('prismjs');
const prismLoadLanguages = require('prismjs/components/index.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const project = require('./project.config.js');

// prism - load languages for highlighting, prism supports 
//  1. Markup - markup
//  2. CSS - css
//  3. C-like - clike
//  4. JavaScript - javascript
// by default
prismLoadLanguages([ 'java', 'json', 'bash' ]);

// rewrite marked's default render's code block,
// to make it compatible with prism
const markdownRenderer = new marked.Renderer();
markdownRenderer.code = function (code, lang, escaped) {
  function escape(html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '"><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

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
      routers: path.resolve(project.srcDir, 'routers'),
      services: path.resolve(project.srcDir, 'services'),
      components: path.resolve(project.srcDir, 'components'),
      utils: path.resolve(project.srcDir, 'utils')
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
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: 'markdown-loader',
            options: {
              renderer: markdownRenderer, // rewrite the renderer
              langPrefix: 'language-',    // change lang- to language-
              gfm: true,                  // add support for github md
              headerIds: true,            // add ids for h1, h2, ...
              tables: true,               // add support for github table
              highlight: function (code, lang) { // highlight using prismjs
                return Prism.highlight(code, Prism.languages[lang], lang);
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    cleanWebpackPlugin,
    htmlWebpackPlugin,
  ]
};