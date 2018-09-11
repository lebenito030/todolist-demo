<template>
    <div id="user">
        <el-container id="full-page">
            <el-header id="header">
                <div id="menu-button" @click="hamburgerMenu">
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
                    <el-button type="text" @click="logout">Logout</el-button>
                </div>
            </el-header>
            <el-container>
                <el-menu class="el-menu-vertical" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-menu-item index="1">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">Inbox</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-date"></i>
                        <span slot="title">Today</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-news"></i>
                            <span slot="title">Personal</span>
                        </template>
                        <el-menu-item v-for="item in userCostomizeBox" :key="item.id" :index="'3-' + item.id">
                            <i class="el-icon-document"></i>
                            <span slot="title">{{ item.name }}</span>
                            <i class="el-icon-edit el-icon-edit-button" @click="editBox( item.id )"></i>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">Setting</span>
                    </el-menu-item>
                    <el-menu-item index="0" @click="createNewList">
                        <i class="el-icon-plus"></i>
                        <span slot="title">Create New List</span>
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
        border-right: 1px solid #e6e6e6;
    }
    #full-page {
        height: 100%;
    }
    #main-box-title {
        margin-left: 20px;
    }
    #top-nav {
        display: flex;
        align-items: center;
        color: #FFFFFF;
    }
    .el-menu-vertical {
        text-align: left;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 279px;
    }
    .el-icon-edit-button {
        position: absolute;
        text-align: center;
        top: 30%; right: 20px;
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
                defaultBox: [
                    {id: "1", name: "Index"},
                    {id: "2", name: "Today"},
                    {id: "4", name: "Setting"}
                ],
                userCostomizeBox: [
                    {id: "1", name: 'Home'},
                    {id: "2", name: 'Work'}
                ],
                isCollapse: true
            };
        },
        methods: {
            hamburgerMenu: function() {
                if (this.isCollapse === true) {
                    this.isCollapse = false;
                } else {
                    this.isCollapse = true;
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
                    let defaultUrl = this.defaultBox[parseInt(key)];
                    this.$router.push("/user/" + defaultUrl.name);
                } 
            },
            logout: function() {
                console.log("注销成功");
                this.$router.push("/");
            },
            createNewList: function() {
                this.$prompt('List Name', 'Create New List', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel'
                }).then(( { value } ) => {
                    this.userCostomizeBox.push({id: this.userCostomizeBox.length, name: value});
                })
            },
            editBox: function(editBoxId) {
                let editName = this.userCostomizeBox[editBoxId - 1].name;
                this.$prompt('List Name', 'Reset List Name', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    inputPlaceholder: editName
                }).then(( { value } ) => {
                    this.userCostomizeBox[editBoxId - 1].name = value;
                })
            }
        }
    }
</script>