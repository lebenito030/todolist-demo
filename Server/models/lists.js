const userModel = require('../config/db');

const listInfo = function(username) {
    let sql = `select id, resides_box_name, list_content, list_status from lists where resides_user_name="${username}" order by id desc`;
    return userModel.query(sql);
};

const customizeBoxInfo = function(username) {
    let sql = `select box_name from boxes where resides_user_name="${username}" order by box_name`;
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

const addList = function(list) {
    let sql = `insert into lists (resides_box_name, list_content, list_status, resides_user_name) values ('${list.resides_box_name}', '${list.list_content}', '${list.list_status}', '${list.username}')`;
    return userModel.query(sql);
}

const changeStatus = function(list) {
    let sql = `update lists set list_status='${list.status? 0 : 1}' WHERE id='${list.id}'`;
    return userModel.query(sql);
}

const editBox = function(username, old_box_name, new_box_name) {
    let sql = `update boxes left join lists on ((boxes.resides_user_name = lists.resides_user_name) and (boxes.box_name = lists.resides_box_name)) set boxes.box_name = '${new_box_name}', lists.resides_box_name = '${new_box_name}' where (boxes.box_name = '${old_box_name}' and boxes.resides_user_name = '${username}')`;
    return userModel.query(sql);
}

const editList = function(list_id, new_content) {
    let sql = `update lists set lists.list_content = '${new_content}' where lists.id = '${list_id}'`;
    return userModel.query(sql);
}

const deleteList = function(list_id) {
    let sql = `delete from lists where lists.id = '${list_id}'`;
    return userModel.query(sql);
}

module.exports = {
    listInfo,
    customizeBoxInfo,
    deleteCustomizeBox,
    createCustomizeBox,
    addList,
    changeStatus,
    editBox,
    editList,
    deleteList
}