const db = require('../config/mysql');

const userData = function(username) {
    let findByUsername = function() {
        let sql = `select * from users where username="${username}"`;
        return db.query(sql);
    };
    findByUsername.then(function(result) {
        return result;
    })
};

module.exports = {
    userData
}