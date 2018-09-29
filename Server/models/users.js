const userModel = require('../config/db');

const userData = function(username) {
    let sql = `select * from users where username="${username}"`;
    return userModel.query(sql);
};

const insertUser = function(registerInfo) {
    let sql = `insert into users values ("${registerInfo.name}", "${registerInfo.password}")`;
    return userModel.query(sql);
}

module.exports = {
    userData: userData,
    insertUser: insertUser
}