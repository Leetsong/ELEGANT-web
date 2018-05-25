const router = new require('koa-router')();
const acpairDB = require('../dbs/acpair');

router.get('/', async (ctx, next) => {
  const acpairs = await acpairDB.findAll();
  if (acpairs) {
    ctx.body = acpairs;
  } else {
    ctx.throw(500, 'server is busy, please try again');
  }
});

module.exports = {
  base: 'acpairs',
  router
};
