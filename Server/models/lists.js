const db = require('../config/mysql');

const listData = function(user_id, box_name) {
    let findList = function() {
        let sql = `select * from lists where resides_box_name="${box_name}" AND resides_user_id="${user_id}"`;
        return db.query(sql);
    };
    findList.then(function(result) {
        return result;
    });
}

module.exports = {
    listData
}