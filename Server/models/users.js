const db = require('../config/mysql');

const userData = function() {
    let findByUsername = function(username) {
        let sql = `select * from users where username="${username}"`;
        return db.query(sql);
    };
    findByUsername.then(function() {
        return result;
    })
};

module.exports = {
    userData
}