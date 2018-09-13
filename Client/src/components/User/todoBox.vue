<template>
    <div id="message">
        <el-row type="flex" justify="center">
            <el-col :span="22">
                <el-input placeholder="Add a TODO" v-model="addToDoInput">
                    <i slot="prefix" class="el-input__icon el-icon-plus el-icon-pointer"></i>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row type="flex" align="middle" justify="center" v-for="(item, index) in todoBox" :key="index">
            <el-col :span="22" class="item-box item-middle">
                <i class="el-icon-circle-check-outline"></i>
                <div>
                    <span>{{ item.msg }}</span>
                    <span>{{ item.date }}</span>
                </div>
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
    .el-icon-pointer {
        cursor: pointer;
    }
    .item-box {
        padding: 0 10px;
        justify-content: space-between;
        min-height: 40px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }
    .item-middle {
        display: flex;
        align-items: center;
    }
</style>

<script>
    export default {
        data: function() {
            return {
                addToDoInput: '',
                todoBox: [
                    {isComplete: true, msg: 'First', date: '2018/9/13'},
                    {isComplete: false, msg: 'TWO', date: '2018/9/12'}
                ]
            }
        }
    }
</script>