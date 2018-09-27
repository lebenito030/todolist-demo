const auth = require('../controllers/users');
const router = require('koa-router')();

router.get('/user/:id', auth.getUserInfo);

module.exports = router;