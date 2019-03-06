const userModel = require('../config/db');

//获取用户
const userData = function(username) {
    let sql = `select * from users where username="${username}"`;
    return userModel.query(sql);
};

//添加用户
const insertUser = function(registerInfo) {
    let sql = `insert into users (username, password) values ("${registerInfo.email}", "${registerInfo.password}")`;
    return userModel.query(sql);
};

module.exports = {
    userData: userData,
    insertUser: insertUser
}