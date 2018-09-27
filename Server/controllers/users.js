const user = require('../models/users');

const getUserInfo = async function (name) {
    const id = this.params.id;
    const result = await user.userData(id);
    this.body = result;
}

module.exports = {
    getUserInfo
}