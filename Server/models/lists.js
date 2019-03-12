const userModel = require('../config/db');

const listData = function(username, box_name) {
    let sql = `select * from lists where resides_box_name="${box_name}" AND resides_user_name="${username}"`;
    return userModel.query(sql);
};

const customizeBoxInfo = function(username) {
    let sql = `select box_name from boxes where resides_user_name="${username}"`;
    return userModel.query(sql);
};

const deleteCustomizeBox = function(username, box_name) {
    let sql = `delete from lists where (resides_box_name ="${box_name}" and resides_user_name="${username}")`;
    return userModel.query(sql);
};

const createCustomizeBox = function(username, box_name) {
    let sql = `insert into boxes (resides_user_name, box_name) VALUES ('${username}', '${box_name}')`;
    return userModel.query(sql);
}

module.exports = {
    listData,
    customizeBoxInfo,
    deleteCustomizeBox,
    createCustomizeBox
}