const userModel = require('../config/db');

const listInfo = function(username) {
    let sql = `select * from lists where resides_user_name="${username}"`;
    return userModel.query(sql);
};

const customizeBoxInfo = function(username) {
    let sql = `select box_name from boxes where resides_user_name="${username}"`;
    return userModel.query(sql);
};

const deleteCustomizeBox = function(username, box_name) {
    let sql = `delete boxes, lists from boxes left join lists on ((boxes.resides_user_name = lists.resides_user_name) and (boxes.box_name = lists.resides_box_name)) where (boxes.box_name = '${box_name}' and boxes.resides_user_name = '${username}')`;
    return userModel.query(sql);
};

const createCustomizeBox = function(username, box_name) {
    let sql = `insert into boxes (resides_user_name, box_name) VALUES ('${username}', '${box_name}')`;
    return userModel.query(sql);
}

module.exports = {
    listInfo,
    customizeBoxInfo,
    deleteCustomizeBox,
    createCustomizeBox
}