<template>
    <div id="login">
        <img src="../assets/logo.png" alt="Logo">
        <p>Login</p>
        <el-form ref="login_form" :model="form">
            <el-form-item>
                <el-input placeholder="请输入邮箱" v-model="input.email" id="input-email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" v-model="input.password" id="input-password"></el-input>
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
#input-email {
    margin-bottom: 1rem;
}
</style>

<script>
    export default {
        name: 'Login',
        data: function() {
            return {
                input: {
                    email: '',
                    password: ''
                }
            }
        }
    }
</script>