const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();
const {
  getArticles,createArticle ,getArticleInfoById ,addReadCount,findArticleByUid
} = require('../controllers/articles')
const { secret } = require('../config')
const auth = jwt({ secret });
router.prefix('/articles')
router.get('/getArticles',getArticles)
router.post('/createArticle',createArticle)
router.get('/getArticleInfoById',getArticleInfoById)
router.get('/addReadCount',addReadCount)
router.get('/findArticleByUid',findArticleByUid)

module.exports = router