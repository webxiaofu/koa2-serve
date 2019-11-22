const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();

const { UploadArticlePicture } = require('../controllers/uploads')
router.post('/upload', UploadArticlePicture)

module.exports = router


/* TODO 11.18 */
/* 1、上传文件接口  完成
 2、前端富文本编辑器
*/