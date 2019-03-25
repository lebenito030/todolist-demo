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
        <el-row 
            type="flex" 
            justify="center" 
            v-for="(item, index) in todoBox" 
            v-if="item.list_status === 0 && item.resides_box_name === $route.params.id"
            :key="index + 1">
            <el-col :span="22" class="item-box item-middle">
                <i class="el-icon-circle" @click="changeCompleteStatus(index)"></i>
                <input class="item-message" type="text" :value="item.list_content" @change="editList(index, $event)">
                <span class="item-date">{{ item.date }}</span>
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
                <span class="item-date">{{ item.date }}</span>
            </el-col>
        </el-row>
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
        font-size: 14px;
        text-align: center;
        background: none;
        border: 0;
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
                const changeStatus = self.$axios.post('/api/changestatus', {
                    status: self.todoBox[index].list_status,
                    id: self.todoBox[index].id
                }).then(function(response) {
                    if (!response.data.success) {
                        self.$message({
                            type: 'error',
                            message: '与服务器连接失败'
                        })
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
                this.todoBox[index].list_content = newVal;
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