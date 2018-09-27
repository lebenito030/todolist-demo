const userModel = require('../config/db');

let findList = function(user_id, box_name) {
    let sql = `select * from lists where resides_box_name="${box_name}" AND resides_user_id="${user_id}"`;
    return userModel.query(sql);
};

const listData = function(user_id, box_name) {
    findList(user_id, box_name).then(function(result) {
        return result;
    });
}

module.exports = {
    listData
}