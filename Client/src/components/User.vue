<template>
    <div id="user">
        <el-menu mode="horizontal" @select="handleSelect">
            <el-menu-item index="calendar">
                <i class="el-icon-date"></i>
            </el-menu-item>
            <el-menu-item index="index">Index</el-menu-item>
            <el-menu-item :index="item.name" v-for="item in userCostomizeBox" :key="item.id">
                {{ item.name }}
            </el-menu-item>
            <el-submenu index="0" id="user-panel">
                <template slot="title">个人中心</template>
                <el-menu-item index="0-1" @click="logout">注销</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<style scoped>
#user-panel {
    float: right;
}
</style>

<script>
    export default {
        name: 'User',
        data: function() {
            return {
                userCostomizeBox: [
                    {id: 1, name: 'Home'},
                    {id: 2, name: 'Work'}
                ]
            }
        },
        methods: {
            handleSelect: function(key, keyPath) {
                console.log(key, keyPath);
                this.$router.push("/user/" + key);
            },
            logout: function() {
                console.log("注销成功");
                this.$router.push("/");
            }
        }
    }
</script>