const userModel = require('../config/db');

const listData = function(username, box_name) {
    let sql = `select * from lists where resides_box_name="${box_name}" AND resides_user_name="${username}"`;
    return userModel.query(sql);
};

const customizeBoxInfo = function(username) {
    let sql = `select distinct resides_box_name from lists where (resides_user_name="${username}" and resides_box_name != "Inbox") and resides_box_name != "Today"`;
    return userModel.query(sql);
};

const deleteCustomizeBox = function(box_name) {
    let sql = `delete from lists where resides_box_name ="${box_name}"`;
    return userModel.query(sql);
};

const createCustomizeBox = function(box_name) {
    // let sql = ``
}

module.exports = {
    listData,
    customizeBoxInfo,
    deleteCustomizeBox
    // createCustomizeBox
}