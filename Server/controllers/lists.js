const user = require('../models/users');

const getListInfo = async function (ctx) {
    const id = ctx.params.id;
    const result = await user.listData(id).then(function (result) {
        return result;
    });
    ctx.body = result;
}

const createList = async function (ctx) {
    const 
}

module.exports = {
    getListInfo
}