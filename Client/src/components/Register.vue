<template>
    <div id="register">
        <img src="../assets/logo.png" alt="Logo" id="logo">
        <p>REGISTER AND TODO IT</p>
        <el-form ref="register_form" :model="register_form" :rules="rules">
            <el-form-item prop="email">
                <el-input type="text" placeholder="请输入邮箱" v-model="register_form.email" auto-complete="off">
                    <template slot="prepend">邮箱</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="register_form.password" auto-complete="off">
                    <template slot="prepend">密码</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password2">
                <el-input type="password" placeholder="请再次输入密码" v-model="register_form.password2" auto-complete="off">
                    <template slot="prepend">确认密码</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register('register_form')">注册</el-button>
                <router-link to="/">
                    <el-button>取消</el-button>
                </router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
#register {
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
        name: 'Register',
        data: function() {
            var checkEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            var checkUsername = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('用户名不能为空'));
                } else if (!checkEmail.test(value)) {
                    callback(new Error('错误的邮箱格式'));
                } else {
                    callback();
                }
            };
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };
            var checkPassword2 = (rule, value, callback) => {
                if(!value) {
                    callback(new Error('密码不能为空'));
                } else if (value !== this.register_form.password) {
                    callback(new Error('请输入两个相同的密码'));
                } else {
                    callback();
                }
            };
            return {
                register_form: {
                    email: '',
                    password: '',
                    password2: ''
                },
                rules: {
                    email: [
                        {validator: checkUsername, trigger: 'blur'}
                    ],
                    password: [
                        {validator: checkPassword, trigger: 'blur'}
                    ],
                    password2: [
                        {validator: checkPassword2, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            register: function(formName) {
                let registerMessage = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        console.log("注册成功");
                        registerMessage.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                    } else {
                        console.log("注册失败");
                        registerMessage.$message.error('注册失败');
                        return false;
                    }
                });
            }
        }
    }
</script>