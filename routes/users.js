const Router = require('koa-router');
const jwt = require('koa-jwt');
const router = new Router();
const {
  register,
  findAllUsers,login
} = require('../controllers/users');
const { sendMailFn } = require('../controllers/sendcode');
const { secret } = require('../config')
const auth = jwt({ secret });
router.prefix('/users');



router.post('/register', register);
router.get('/findAllUsers' ,findAllUsers);
router.post('/login',login);
router.post('/login/sendcode',sendMailFn)
module.exports = router