const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();
const { secret } = require('../config')
const auth = jwt({ secret });
const { addComments,getCommentsById,deleteComments } = require('../controllers/comments')
router.prefix('/comments')
router.post('/addComments',auth,addComments)
router.get('/getCommentsById',getCommentsById)
router.post('/deleteComments',deleteComments)
module.exports = router