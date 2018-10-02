const user = require('../models/users');
const jwt = require('koa-jwt');

const getUserInfo = async function (ctx) {
    const id = ctx.params.id;
    const result = await user.userData(id).then(function (result) {
        return result[0];
    });
    ctx.body = result;
}

const postUserAuth = async function (ctx) {
    const data = ctx.request.body;
    const userInfo = await user.userData(data.email).then(function (result) {
        return result[0];
    });
    if(userInfo != null) {
        if(userInfo.password != data.password) {
            ctx.body = {
                success: false //密码错误
            }
        } else {
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            };
            const secret = 'todolist-demo';
            const token = jwt.toString(userToken, secret);
            ctx.body = {
                success: true,
                token: token
            }
        }
    } else {
        ctx.body = {
            success: false //用户不存在
        }
    }
}

const postUserRegister = async function (ctx) {
    const data = ctx.request.body;
    await user.insertUser(data).then(function(result) {
        if (result.affectedRows > 0) {
            ctx.body = {
                success: true //SQL执行成功
            }
        } else {
            ctx.body = {
                success: false //SQL执行但无更改
            }
        }
    }).catch(function(result) {
        ctx.body = {
            success: false, //注册信息输入失败
            info: result
        }
    });
}

module.exports = {
    getUserInfo,
    postUserAuth,
    postUserRegister
}