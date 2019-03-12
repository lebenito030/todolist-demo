const userApi = require('../controllers/users');
const listApi = require('../controllers/lists');
const router = require('koa-router')();

router.post('/login', userApi.postUserAuth);
router.post('/register', userApi.postUserRegister);
router.post('/boxinfo', listApi.getBoxInfo);
router.post('/deleteBox', listApi.deleteCustomizeBox);
router.post('/createBox', listApi.createCustomizeBox);

module.exports = router;