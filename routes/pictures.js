const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();
const {
  UploadPicture, SavePicture, addImgType, getPicturesByType, getImgTypes
} = require('../controllers/pictures')
const { secret } = require('../config')
const auth = jwt({ secret });
router.prefix('/pictures')
router.post('/UploadPicture',UploadPicture)
router.post('/SavePicture',SavePicture)
router.post('/addImgType',addImgType)
router.get('/getPicturesByType',getPicturesByType)
router.get('/getImgTypes',getImgTypes)
module.exports = router