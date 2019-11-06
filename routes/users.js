const Router = require('koa-router');
const router = new Router();
const {
  register,
  findAllUsers,login
} = require('../controllers/users');

router.prefix('/users');



router.post('/register', register);
router.get('/findAllUsers', findAllUsers);
router.post('/login',login)
module.exports = router