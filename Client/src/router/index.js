import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import User from '@/components/User'
import TodoBox from '@/components/User/todoBox'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'User',
      component: User,
      meta: {
        required: true
      },
      children: [
        {
          path: ':id',
          name: 'todoBox',
          component: TodoBox
        }
      ]
    }
  ]
});