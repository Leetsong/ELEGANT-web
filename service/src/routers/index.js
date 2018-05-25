const router = new require('koa-router')();

// get all subrouters
const subRouters = [
  require('./acpair'),
  require('./elegant')
]

const BASE_URL = '/api';
const toUrl = base => `${BASE_URL}/${base}`;

// use all subrouters
subRouters.forEach(sr => {
  router.use(toUrl(sr.base), 
    sr.router.routes(), 
    sr.router.allowedMethods())
});

module.exports = router;
