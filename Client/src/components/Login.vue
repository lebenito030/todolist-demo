<template>
    <div id="login">
        <img src="../assets/logo.png" alt="Logo" id="logo">
        <p>LOGIN AND TODO IT</p>
        <el-form ref="login_form" status-icon :model="login_form" :rules="rules">
            <el-form-item prop="email">
                <el-input type="text" placeholder="请输入邮箱" v-model="login_form.email">
                    <template slot="prepend">邮箱</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="login_form.password" auto-complete="off">
                    <template slot="prepend">密码</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit('login_form')">登录</el-button>
                <router-link to="/register">
                    <el-button type="info">注册</el-button>
                </router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
#login {
    width: 300px; height: 400px;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    margin: auto;
}
#logo {
    width: 5rem;
}
</style>

<script>
    export default {
        name: 'Login',
        data: function() {
            var checkEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            var checkUsername = function(rule, value, callback) {
                if (!value) {
                    callback(new Error('用户名不能为空'));
                } else if (!checkEmail.test(value)) {
                    callback(new Error('错误的邮箱格式'));
                } else {
                    callback();
                }
            };
            var checkPassword = function(rule, value, callback) {
                if (!value) {
                    callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };
            return {
                login_form: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: [
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submit: function(formName) {
                this.$refs[formName].validate(function(valid) {
                    if (valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit');
                        return false;
                    }
                });
            }
        }
    }
</script>