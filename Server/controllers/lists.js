const list = require('../models/lists');

const getBoxInfo = async function (ctx) {
    const data = ctx.request.body;
    const result = await list.customizeBoxInfo(data.username).then(function (result) {
        return result;
    });
    if (result[0] != undefined) {
        ctx.body = {
            success: true,
            result: result
        };
    } else {
        ctx.body = {
            success: false
        };
    }
};

const deleteCustomizeBox = async function (ctx) {
    const data = ctx.request.body;
    if (data.name == 'Inbox' || data.name == 'Today') {
        ctx.body = {
            success: false
        }
    } else {
        const result = await list.deleteCustomizeBox(data.user, data.name).then(function (result) {
            return result;
        });
        if (result.affectedRows > 0) {
            ctx.body = {
                success: true
            };
        } else {
            ctx.body = {
                success: false
            };
        }
    }
};

const createCustomizeBox = async function (ctx) {
    const data = ctx.request.body;
    if (data.name == 'Inbox' || data.name == 'Today') {
        ctx.body = {
            success: false
        }
    } else {
        await list.createCustomizeBox(data.user, data.name).then(function (result) {
            if (result.affectedRows > 0) {
                ctx.body = {
                    success: true
                };
            } else {
                ctx.body = {
                    success: false
                };
            }
        }).catch(function (result) {
            ctx.body = {
                success: false, //SQL 错误
                info: result
            }
        });
    }
};

const getListInfo = async function (ctx) {
    const data = ctx.request.body;
    const result = await list.listInfo(data.username).then(function (result) {
        return result;
    });
    if (result[0] != undefined) {
        ctx.body = {
            success: true,
            result: result
        };
    } else {
        ctx.body = {
            success: false
        };
    }
};

const addList = async function (ctx) {
    const data = ctx.request.body;
    const result = await list.addList(data).then(function (result) {
        return result;
    });
    if (result.affectedRows > 0) {
        ctx.body = {
            success: true
        };
    } else {
        ctx.body = {
            success: false
        };
    }
}

const changeStatus = async function (ctx) {
    const data = ctx.request.body;
    const result = await list.changeStatus(data).then(function (result) {
        return result;
    });
    if (result.affectedRows > 0) {
        ctx.body = {
            success: true
        };
    } else {
        ctx.body = {
            success: false
        };
    }
}

const editBox = async function (ctx) {
    const data = ctx.request.body;
    await list.editBox(data.user, data.old_box_name, data.new_box_name).then(function (result) {
        if (result.affectedRows > 0) {
            ctx.body = {
                success: true
            };
        } else {
            ctx.body = {
                success: false,
                info: result
            };
        }
    }).catch(function (result) {
        ctx.body = {
            success: false, //SQL 错误
            info: result
        }
    });
}

const editList = async function (ctx) {
    const data = ctx.request.body;
    await list.editList(data.list_id, data.new_content).then(function (result) {
        if (result.affectedRows > 0) {
            ctx.body = {
                success: true
            };
        } else {
            ctx.body = {
                success: false,
                info: result
            };
        }
    }).catch(function (result) {
        ctx.body = {
            success: false, //SQL 错误
            info: result
        }
    });
}

const deleteList = async function (ctx) {
    const data = ctx.request.body;
    const result = await list.deleteList(data.list_id).then(function (result) {
        return result;
    });
    if (result.affectedRows > 0) {
        ctx.body = {
            success: true
        };
    } else {
        ctx.body = {
            success: false
        };
    }
}

module.exports = {
    getBoxInfo,
    deleteCustomizeBox,
    createCustomizeBox,
    getListInfo,
    addList,
    changeStatus,
    editBox,
    editList,
    deleteList
}