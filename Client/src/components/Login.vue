<template>
    <div id="login">
        <h1>Todo List</h1>
        <form ref="loginForm" id="login-form">
            <input type="text" name="username" v-model="input.username" placeholder="Username">
            <input type="password" name="password" v-model="input.password" placeholder="Password">
        </form>
        <button @click="login()">Login</button>
        <button @click="register()">Register</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if (this.input.username != "" && this.input.password != "") {

                }
            }
        }
    }
</script>

<style>
    #login {
        position: absolute;
        width: 50%;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
    }
    #login-form {
        width: 15rem;
        margin: 0 auto;
    }
    #login-form > input {
        float: left;
        width: 100%; height: 2rem;
        margin-bottom: 1rem;
        border-radius: 5px;
    }
</style>