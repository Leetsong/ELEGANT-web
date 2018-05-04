require('../.settings.js');

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello, world';
});

app.listen(3000, '127.0.0.1', null, () => {
  console.log('started');
});