const userApi = require('../controllers/users');
const router = require('koa-router')();

router.get('/user/:id', userApi.getUserInfo);
router.post('/login', userApi.postUserAuth);
router.post('/register', userApi.postUserRegister);

module.exports = router;