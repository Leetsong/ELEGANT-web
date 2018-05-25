const path = require('path');

const libDir = path.resolve(__dirname, 'lib');
const resDir = path.resolve(__dirname, 'dbs');
const publicDir = path.resolve(__dirname, 'public');
const distDir = path.resolve(__dirname, 'dist');
const platformsDir = path.resolve(__dirname, 'android-platforms');

const elegantResDir = path.resolve(resDir, 'elegant');

const ELEGANTJarFile = path.resolve(libDir, 'ELEGANT.jar');
const modelsFile = path.resolve(elegantResDir, 'models.json');

const ELEGANTWebDir = path.resolve(distDir);

module.exports = {
  libDir,
  resDir,
  distDir,
  publicDir,
  platformsDir,
  elegantResDir,
  ELEGANTJarFile,
  ELEGANTWebDir,
  modelsFile
};
