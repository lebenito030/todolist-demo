const user = require('../models/users');

const getUserInfo = async function (ctx) {
    const id = ctx.params.id;
    const result = await user.userData(id);
    ctx.body = result;
}

module.exports = {
    getUserInfo
}