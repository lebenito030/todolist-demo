const userModel = require('../config/db');

let userData = function(username) {
    let sql = `select * from users where username="${username}"`;
    userModel.query(sql).then(function(result) {
        return result;
    });
};

module.exports = {
    userData
}