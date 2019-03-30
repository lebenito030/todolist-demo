const userApi = require('../controllers/users');
const listApi = require('../controllers/lists');
const router = require('koa-router')();

router.post('/login', userApi.postUserAuth);
router.post('/register', userApi.postUserRegister);
router.post('/boxinfo', listApi.getBoxInfo);
router.post('/deleteBox', listApi.deleteCustomizeBox);
router.post('/createBox', listApi.createCustomizeBox);
router.post('/listinfo', listApi.getListInfo);
router.post('/addlist', listApi.addList);
router.post('/changestatus', listApi.changeStatus);
router.post('/editbox', listApi.editBox);
router.post('/editlist', listApi.editList);
router.post('/deletelist', listApi.deleteList);

module.exports = router;