const userModel = require('../config/db');

const listData = function(user_id, box_name) {
    let sql = `select * from lists where resides_box_name="${box_name}" AND resides_user_id="${user_id}"`;
    return userModel.query(sql);
};

module.exports = {
    listData: listData
}