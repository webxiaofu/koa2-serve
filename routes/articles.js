const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();
const {
  getArticles  
} = require('../controllers/articles')
const { secret } = require('../config')
const auth = jwt({ secret });
router.prefix('/articles')
router.get('/getArticles',getArticles)


module.exports = router