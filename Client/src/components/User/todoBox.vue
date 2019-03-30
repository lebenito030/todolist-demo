<template>
    <div id="message">
        <el-row type="flex" justify="center">
            <el-col :span="22">
                <el-input placeholder="添加任务事项" v-model="addToDoInput" @keyup.enter.native="addTask(addToDoInput)">
                    <i slot="prefix" class="el-input__icon el-icon-plus el-icon-pointer" @click="addTask(addToDoInput)"></i>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="22" class="button-align-left">
                <button class="show-completed-button" @click="showCompletedLists">
                    <label>显示已完成内容</label>
                </button>
            </el-col>
        </el-row>
        <div v-if="$route.params.id !== 'Inbox'">
            <el-row 
                type="flex" 
                justify="center" 
                v-for="(item, index) in todoBox" 
                v-if="item.list_status === 0 && item.resides_box_name === $route.params.id"
                :key="index + 1">
                <el-col :span="22" class="item-box item-middle">
                    <i class="el-icon-circle" @click="changeCompleteStatus(index)"></i>
                    <input class="item-message" type="text" :value="item.list_content" @change="editList(index, $event)">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span class="deleteList" @click="deleteList(index)"><i class="el-icon-delete"></i>删除</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
            <el-row v-if="isShowCompletedLists">
                <hr>
            </el-row>
            <el-row 
                type="flex" 
                justify="center" 
                v-for="(item, index) in todoBox" 
                v-if="(item.list_status === 1 && isShowCompletedLists) && item.resides_box_name === $route.params.id"
                :key="index + 1">
                <el-col :span="22" class="item-box item-middle">
                    <i class="el-icon-circle-check-outline" @click="changeCompleteStatus(index)"></i>
                    <input class="item-message task-done" type="text" :value="item.list_content" @change="editList(index, $event)">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu class="deleteMenu" slot="dropdown">
                            <el-dropdown-item>
                                <span class="deleteList" @click="deleteList(index)"><i class="el-icon-delete"></i>删除</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
        <div v-if="$route.params.id === 'Inbox'">
            <el-row 
                type="flex" 
                justify="center" 
                v-for="(item, index) in todoBox" 
                v-if="item.list_status === 0"
                :key="index + 1">
                <el-col :span="22" class="item-box item-middle">
                    <i class="el-icon-circle" @click="changeCompleteStatus(index)"></i>
                    <div class="content-box">
                        <input class="item-message" type="text" :value="item.list_content" @change="editList(index, $event)">
                        <span class="resides-box-name">标签：{{ item.resides_box_name }}</span>
                    </div>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span class="deleteList" @click="deleteList(index)"><i class="el-icon-delete"></i>删除</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
            <el-row v-if="isShowCompletedLists">
                <hr>
            </el-row>
            <el-row 
                type="flex" 
                justify="center" 
                v-for="(item, index) in todoBox" 
                v-if="(item.list_status === 1 && isShowCompletedLists)"
                :key="index + 1">
                <el-col :span="22" class="item-box item-middle">
                    <i class="el-icon-circle-check-outline" @click="changeCompleteStatus(index)"></i>
                    <div class="content-box">
                        <input class="item-message task-done" type="text" :value="item.list_content" @change="editList(index, $event)">
                        <span class="resides-box-name">标签：{{ item.resides_box_name }}</span>
                    </div>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu class="deleteMenu" slot="dropdown">
                            <el-dropdown-item>
                                <span class="deleteList" @click="deleteList(index)"><i class="el-icon-delete"></i>删除</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .el-row:last-child {
        margin-bottom: 0;
    }
    .item-box {
        padding: 0 10px;
        justify-content: space-between;
        min-height: 40px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        transition-duration: 0.3s;
    }
    .item-box:hover {
        box-shadow: 0 0 5px #dcdfe6;
    }
    .item-message {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        text-align: left;
        background: none;
        border: 0;
        outline: none;
    }
    .item-date {
        font-size: 12px;
    }
    .item-middle {
        display: flex;
        align-items: center;
    }
    .task-done {
        text-decoration: line-through;
    }
    .show-completed-button {
        height: 25px;
        background-color: transparent;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;
    }
    .button-align-left {
        text-align: left;
    }
    .el-icon-pointer {
        cursor: pointer;
    }
    .el-icon-circle {
        width: 16px; height: 16px;
        margin-left: 1px;
        border: 1px solid #000000;
        border-radius: 10px;
    }
    .el-icon-more {
        transform: rotate(90deg);
    }
    .deleteList {
        white-space: nowrap;
    }
    .deleteList > i {
        margin-right: 5px;
    }
    .resides-box-name {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 6px;
        text-align: left;
    }
    .content-box {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    @media screen and (max-width: 430px) {
        .item-message {
            max-width: 150px;
        }
        .resides-box-name {
            max-width: 150px;
        }
    }
    @media screen and (min-width: 800px) {
        .item-message {
            min-width: 300px;
        }
        .resides-box-name {
            min-width: 300px;
        }
    }
</style>

<script>
    import jwt from 'jsonwebtoken';
    export default {
        name: 'todoBox',
        data: function() {
            return {
                username: '',
                addToDoInput: '',
                todoBox: [
                    
                ],
                isShowCompletedLists: 0
            }
        },
        methods: {
            getUserInfo: function() {
                const token = localStorage.getItem('token');
                if (token != 'null' && token != null) {
                    let decode = jwt.verify(token, 'todolist-demo');
                    return decode;
                } else {
                    return null;
                }
            },
            addTask: function(item) {
                let instance = this;
                this.todoBox.push({
                    list_status: 0,
                    list_content: item,
                    resides_box_name: instance.$route.params.id
                });
                const addList = instance.$axios.post('/api/addlist', {
                    resides_box_name: instance.$route.params.id,
                    list_content: item,
                    list_status: 0,
                    username: instance.username
                }).then(function(response) {
                    if (response.data.success) {
                        const listInfo = instance.$axios.post('/api/listinfo', {
                            username: instance.username
                        }).then(function(response) {
                            const data = response.data.result;
                            instance.todoBox = data;
                        });
                    } else {
                        instance.$message({
                            type: 'error',
                            message: '与服务器连接失败'
                        });
                    }
                })
                this.addToDoInput = '';
            },
            changeCompleteStatus: function(index) {
                let self = this;
                self.$axios.post('/api/changestatus', {
                    status: self.todoBox[index].list_status,
                    id: self.todoBox[index].id
                }).then(function(response) {
                    if (!response.data.success) {
                        self.$message({
                            type: 'error',
                            message: '与服务器连接失败'
                        });
                    }
                })
                if(this.todoBox[index].list_status === 1) {
                    this.todoBox[index].list_status = 0;
                } else {
                    this.todoBox[index].list_status = 1;
                }
            },
            showCompletedLists: function() {
                if(this.isShowCompletedLists === 1) {
                    this.isShowCompletedLists = 0;
                } else {
                    this.isShowCompletedLists = 1;
                }
            },
            editList: function(index, e) {
                let oldVal = e.target._value;
                let newVal = e.target.value;
                if (oldVal === newVal) return;
                this.todoBox[index].list_content = newVal;;
                let self = this;
                self.$axios.post('/api/editlist', {
                    list_id: self.todoBox[index].id,
                    new_content: newVal
                }).then(function(response) {
                    if (!response.data.success) {
                        self.$message({
                            type: 'error',
                            message: '与服务器连接失败'
                        });
                    }
                })
            },
            deleteList: function(index) {
                this.$confirm('这会永久删除任务内容，你确定吗？', 'Warning', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: 'message-box-small'
                }).then(() => {
                    let self = this;
                    self.$axios.post('/api/deletelist', {
                        list_id: self.todoBox[index].id
                    }).then(function(response) {
                        if (!response.data.success) {
                            self.$message({
                                type: 'error',
                                message: '与服务器连接失败'
                            });
                        } else {
                            self.$axios.post('/api/listinfo', {
                                username: self.username
                            }).then(function(response) {
                                const data = response.data.result;
                                self.todoBox = data;
                            });
                        }
                    })
                })
            }
        },
        created: function() {
            const userInfo = this.getUserInfo();
            if (userInfo != null) {
                this.username = userInfo.name
            } else {
                this.username = ''
            }
            let self = this;
            const listInfo = self.$axios.post('/api/listinfo', {
                username: self.username
            }).then(function(response) {
                const data = response.data.result;
                if(data == undefined || "") {
                    self.todoBox = [];
                } else {
                    self.todoBox = data;
                }
            });
        },
        watch: {
            $route(val) {
                let self = this;
                const listInfo = self.$axios.post('/api/listinfo', {
                    username: self.username
                }).then(function(response) {
                    const data = response.data.result;
                    self.todoBox = data;
                });
            }
        },
    }
</script>