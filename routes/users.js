const Router = require('koa-router');
const router = new Router();
router.prefix('/users')



router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router



