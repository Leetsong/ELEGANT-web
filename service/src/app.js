const Koa = require('koa');
const compose = require('koa-compose');
const body = require('koa-body');
const serve = require('koa-static');
const logger = require('koa-logger');

const app = new Koa();
const router = require('./routers');
const on404 = require('./routers/404');
const onError = require('./onerror');
const resources = require('../resources');

app.use(compose([
  logger(),
  body({
    multipart: true
  }),
  on404,
  onError,
  serve(resources.publicDir),
  router.routes(),
  router.allowedMethods()
]));

module.exports = app;