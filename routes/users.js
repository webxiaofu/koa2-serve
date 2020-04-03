const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();
const {
  register,
  findAllUsers,login,deleteArticle,FocusOnOthers,updateUserInfo,updatePassword
} = require('../controllers/users');
const { sendMailFn } = require('../controllers/sendcode');
const { secret } = require('../config')
const auth = jwt({ secret });
router.prefix('/users');



router.post('/register', register);
router.get('/findAllUsers' ,findAllUsers);
router.post('/login',login);
router.post('/login/sendcode',sendMailFn)
router.get('/deleteArticle',deleteArticle)
router.post('/FocusOnOthers',FocusOnOthers)
router.post('/updateUserInfo',updateUserInfo)
router.post('/updatePassword',updatePassword)
module.exports = router