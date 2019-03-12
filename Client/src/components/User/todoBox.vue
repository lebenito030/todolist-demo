<template>
    <div id="message">
        <el-row type="flex" justify="center">
            <el-col :span="22">
                <el-input placeholder="Add a TODO" v-model="addToDoInput" @keyup.enter.native="addTask(addToDoInput)">
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
            v-if="item.isComplete === false && item.index === $route.params.id"
            :key="index + 1">
            <el-col :span="22" class="item-box item-middle">
                <i class="el-icon-circle" @click="changeCompleteStatus(index)"></i>
                <span class="item-message">{{ item.msg }}</span>
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
            v-if="(item.isComplete === true && isShowCompletedLists) && item.index === $route.params.id"
            :key="index + 1">
            <el-col :span="22" class="item-box item-middle">
                <i class="el-icon-circle-check-outline" @click="changeCompleteStatus(index)"></i>
                <span class="item-message task-done">{{ item.msg }}</span>
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
    }
    .item-message {
        font-size: 14px;
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
    export default {
        name: 'todoBox',
        data: function() {
            return {
                addToDoInput: '',
                todoBox: [
                    {isComplete: true, msg: 'First',index: 'Inbox'},
                    {isComplete: true, msg: 'First',index: 'Inbox'},
                    {isComplete: false, msg: 'TWO',index: 'Today'},
                    {isComplete: false, msg: 'One',index: 'Home'},
                    {isComplete: true, msg: 'One',index: 'Work'}
                ],
                isShowCompletedLists: false
            }
        },
        methods: {
            addTask: function(item) {
                let instance = this;
                this.todoBox.push({
                    isComplete: false,
                    msg: item,
                    index: instance.$route.params.id
                });
                this.addToDoInput = '';
            },
            changeCompleteStatus: function(index) {
                if(this.todoBox[index].isComplete === true) {
                    this.todoBox[index].isComplete = false;
                } else {
                    this.todoBox[index].isComplete = true;
                }
            },
            showCompletedLists: function() {
                if(this.isShowCompletedLists === true) {
                    this.isShowCompletedLists = false;
                } else {
                    this.isShowCompletedLists = true;
                }
            }
        }
    }
</script>