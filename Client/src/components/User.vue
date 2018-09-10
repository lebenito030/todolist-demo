<template>
    <div id="user">
        <div id="navbar-horizontal">
            <div id="menu-button">
                
            </div>
        </div>
        <div id="navbar-vertical">
            <el-menu class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-menu-item index="1">
                    <span slot="title">Inbox</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">Today</span>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">
                        <span slot="title">Personal</span>
                    </template>
                    <el-menu-item v-for="item in userCostomizeBox" :key="item.id" :index="item.name">
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
    #user {
        width: 100%;
    }
    #navbar-horizontal {
        height: 60px;
        background-color: 
    }
    .el-menu-vertical {
        width: 10%;
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