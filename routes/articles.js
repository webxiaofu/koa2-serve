const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();
const {
  getArticles,createArticle ,getArticleInfoById ,addReadCount,
  findArticleByUid,recommendArticle,updateArticle
} = require('../controllers/articles')
const { secret } = require('../config')
const auth = jwt({ secret });
router.prefix('/articles')
router.get('/getArticles',getArticles)
router.post('/createArticle',createArticle)
router.get('/getArticleInfoById',getArticleInfoById)
router.get('/addReadCount',addReadCount)
router.get('/findArticleByUid',findArticleByUid)
router.get('/recommendArticle',recommendArticle)
router.post('/updateArticle',updateArticle)

module.exports = router