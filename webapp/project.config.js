const fs = require('fs');
const path = require('path');

// app
const app = {
  name: 'ELEGANT',
  discription: 'a tool usEd to LocatE fraGmentAtion iNduced compaTibility issues'
};

// root
const rootDir = __dirname;

// files
const entry = [
  path.resolve(__dirname, 'src', 'index.js'),
  'babel-polyfill'
];
const srcHtml = path.resolve(__dirname, 'index.html');
const dist = 'bundle.js';
const distCssAntd = 'antd.css';
const distCssOthers = 'styles.css';
const distHtml = 'index.html';
const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const assetsDir = path.resolve(__dirname, 'assets');

// theme config
const theme = require('less-vars-to-js')(
  fs.readFileSync(path.join(__dirname, 'theme.less'), 'utf8')
);

module.exports = {
  app,
  rootDir,
  entry,
  srcHtml,
  dist,
  distCssAntd,
  distCssOthers,
  distHtml,
  srcDir,
  distDir,
  assetsDir,
  theme
};