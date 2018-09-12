<template>
    <div id="message">
        <el-row v-for="(item, index) in todoBox" :key="index">
            <el-col :span="22">
                <div id="todoListCard">
                    
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>

</style>

<script>
    export default {
        data: function() {
            return {
                todoBox: [
                    {isComplete: true, msg: 'First', date: '2018/9/13'}
                ]
            }
        }
    }
</script>