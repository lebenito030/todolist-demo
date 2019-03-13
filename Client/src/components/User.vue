<template>
    <div id="user">
        <el-container id="full-page">
            <el-header id="header">
                <div id="menu-button" @click="hamburgerMenu" class="menu-button">
                    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
                        <g>
                            <path d="M0.5,3.5l19,0" style="fill:none;stroke-width:1px;stroke:#FFFFFF;"></path>
                            <path d="M0.5,9.53l19,0" style="fill:none;stroke-width:1px;stroke:#FFFFFF;"></path>
                            <path d="M0.5,15.5l19,0" style="fill:none;stroke-width:1px;stroke:#FFFFFF;"></path>
                        </g>
                    </svg>
                </div>
                <span style="color: #FFFFFF;">{{ $route.params.id }}</span>
                <el-dropdown trigger="click" id="menu-more" class="el-icon-pointer">
                    <span class="el-dropdown-link">
                        {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="logout">注销</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-menu class="el-menu-vertical" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-menu-item index="0">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">Inbox</span>
                    </el-menu-item>
                    <el-menu-item index="1">
                        <i class="el-icon-date"></i>
                        <span slot="title">Today</span>
                    </el-menu-item>
                    <el-submenu index="3" v-if="hasCostomBox">
                        <template slot="title">
                            <i class="el-icon-news"></i>
                            <span slot="title">自定义标签</span>
                        </template>
                        <el-menu-item v-for="(item, index) in userCostomizeBox" :key="index" :index="'3-' + index">
                            <div @mouseenter="showDeleteButton(index)" @mouseleave="hiddenDeleteButton(index)">
                                <span slot="title">{{ item.box_name }}</span>
                                <i class="el-icon-delete el-icon-delete-button" @click="deleteBox(index)"></i>
                            </div>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="5" @click="createNewList">
                        <i class="el-icon-plus"></i>
                        <span slot="title">创建新标签</span>
                    </el-menu-item>
                </el-menu>
                <el-main>
                    <router-view/>
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
        justify-content: space-between;
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
    #menu-more {
        margin-right: 20px;
        color: #FFFFFF;
    }
    .el-icon-pointer {
        cursor: pointer;
    }
    .el-menu-vertical {
        text-align: left;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 279px;
    }
    .el-icon-delete-button {
        position: absolute;
        top: 34%; right: 10px;
        visibility: hidden;
    }
</style>

<script>
    import jwt from 'jsonwebtoken';
    export default {
        name: 'User',
        data: function() {
            return {
                search: '',
                defaultBox: [
                    {resides_box_name: "Inbox"},
                    {resides_box_name: "Today"}
                ],
                userCostomizeBox: [],
                isCollapse: true,
                addToDoInput: '',
                name: '',
                id: '',
                hasCostomBox: true
            };
        },
        methods: {
            showDeleteButton: function(index) {
                const lists = document.querySelectorAll('ul[role=menu] > li');
                lists[index].querySelector('i').style.visibility = 'visible';
            },
            hiddenDeleteButton: function(index) {
                const lists = document.querySelectorAll('ul[role=menu] > li');
                lists[index].querySelector('i').style.visibility = 'hidden';
            },
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
                let url = this;
                if (parseInt(key) === 3) {
                    let trueKey = key[2];
                    console.log(trueKey, url);
                    this.$router.push(url.userCostomizeBox[trueKey].box_name);
                } else if (key !== "5") {
                    this.$router.push(url.defaultBox[parseInt(key)].resides_box_name);
                }
            },
            logout: function() {
                console.log('退出');
                localStorage.removeItem('token');
                this.$router.push("/");
            },
            createNewList: function() {
                this.$prompt('标签名', '创建新标签', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass: 'message-box-small'
                }).then(( { value } ) => {
                    let self = this;
                    const user = self.getUserInfo();
                    self.$axios.post('/api/createBox', {
                        user: user.name,
                        name: value
                    }).then(function(response) {
                        if (response.data.success) {
                            const defaultBoxInfo = self.$axios.post('/api/boxinfo', {
                                username: self.name
                            }).then(function(response) {
                                if (response.data.success) {
                                    self.hasCostomBox = true;
                                    self.userCostomizeBox = response.data.result;
                                } else {
                                    self.hasCostomBox = false;
                                }
                            });
                            self.$message({
                                type: 'info',
                                message: '新标签栏创建成功'
                            });
                        } else {
                            self.$message({
                                type: 'error',
                                message: '新标签栏创建失败'
                            });
                        }
                    });
                });
            },
            deleteBox: function(deleteBoxId) {
                this.$confirm('这会永久删除标签以及其中的所有内容，你确定吗？', 'Warning', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: 'message-box-small'
                }).then(() => {
                    let self = this;
                    const user = self.getUserInfo();
                    self.$axios.post('/api/deleteBox', {
                        user: user.name,
                        name: self.userCostomizeBox[deleteBoxId].box_name
                    }).then(function(response) {
                        if (response.data.success) {
                            const defaultBoxInfo = self.$axios.post('/api/boxinfo', {
                                username: self.name
                            }).then(function(response) {
                                if (response.data.success) {
                                    self.hasCostomBox = true;
                                    self.userCostomizeBox = response.data.result;
                                } else {
                                    self.hasCostomBox = false;
                                }
                            });
                            self.$router.push('/user');
                            self.$message({
                                type: 'success',
                                message: '标签已删除'
                            });
                        } else {
                            self.$message({
                                type: 'info',
                                message: '删除失败，请重试'
                            });
                        }
                    });
                });
            },
            getUserInfo: function() {
                const token = localStorage.getItem('token');
                if (token != 'null' && token != null) {
                    let decode = jwt.verify(token, 'todolist-demo');
                    return decode;
                } else {
                    return null;
                }
            }
        },
        created: function() {
            const userInfo = this.getUserInfo();
            if (userInfo != null) {
                this.name = userInfo.name;
                this.id = userInfo.id;
            } else {
                this.name = '',
                this.id = ''
            }
            let self = this;
            const defaultBoxInfo = self.$axios.post('/api/boxinfo', {
                username: self.name
            }).then(function(response) {
                if (response.data.success) {
                    self.hasCostomBox = true;
                    self.userCostomizeBox = response.data.result;
                } else {
                    self.hasCostomBox = false;
                }
            });
        }
    }
</script>