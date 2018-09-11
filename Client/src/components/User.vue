<template>
    <div id="user">
        <el-container id="full-page">
            <el-header id="header">
                <div id="menu-button" :class="menuButtonCollapse" @click="hamburgerMenu">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
                        <g>
                            <path d="M0.5,3.5l19,0" style="fill:none;stroke-width:1px;stroke:#FFFFFF;"></path>
                            <path d="M0.5,9.53l19,0" style="fill:none;stroke-width:1px;stroke:#FFFFFF;"></path>
                            <path d="M0.5,15.5l19,0" style="fill:none;stroke-width:1px;stroke:#FFFFFF;"></path>
                        </g>
                    </svg>
                </div>
                <div id="top-nav">
                    <div id="main-box-title">
                        {{ $route.params.id }}
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-menu class="el-menu-vertical" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-menu-item index="Inbox">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">Inbox</span>
                    </el-menu-item>
                    <el-menu-item index="Today">
                        <i class="el-icon-date"></i>
                        <span slot="title">Today</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-news"></i>
                            <span slot="title">Personal</span>
                        </template>
                        <el-menu-item v-for="item in userCostomizeBox" :key="item.id" :index="item.name">
                            <i class="el-icon-document"></i>
                            <span slot="title">{{ item.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="0" @click="createNewList">
                        <i class="el-icon-plus"></i>
                        <span>Create New List</span>
                    </el-menu-item>
                </el-menu>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
    #user {
        height: 100%;
    }
    #header {
        display: flex;
        align-items: center;
        background-color: #409EFF;
        padding: 0;
    }
    #menu-button {
        width: 64px;
        line-height: 60px;
        background-color: #2f89e4;
    }
    .menuButtonCollapse {
        width: 280px;
    }
    #full-page {
        height: 100%;
    }
    #main-box-title {
        margin-left: 20px;
    }
    .el-menu-vertical {
        text-align: left;
        min-height: 100%;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 279px;
    }
    .edit-button {
        text-align: right;
    }
</style>

<script>
    export default {
        name: 'User',
        data: function() {
            return {
                search: '',
                userCostomizeBox: [
                    {id: 1, name: 'Home'},
                    {id: 2, name: 'Work'}
                ],
                isCollapse: true,
                menuButtonCollapse: true
            };
        },
        methods: {
            createNewList: function() {
                this.$prompt('List Name', 'Create New List', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                }).then(( { value } ) => {
                    this.userCostomizeBox.push({id: this.userCostomizeBox.length + 1, name: value});
                    this.$router
                })
            },
            hamburgerMenu: function() {
                if (this.isCollapse === true) {
                    this.isCollapse = false;
                    this.menuButtonCollapse = false;
                } else {
                    this.isCollapse = true;
                    this.menuButtonCollapse = true;
                }
            },
            handleOpen: function(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose: function(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect: function(key, keyPath) {
                console.log(key, keyPath);
                if (key !== "0") {
                    this.$router.push("/user/" + key);
                }
            },
            logout: function() {
                console.log("注销成功");
                this.$router.push("/");
            }
        }
    }
</script>