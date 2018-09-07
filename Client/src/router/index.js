import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import User from '@/components/User'
import UserIndex from '@/components/User/Index'
import UserHome from '@/components/User/Home'
import UserWork from '@/components/User/Work'
import UserCalendar from '@/components/User/calendar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
        {
          path: 'index',
          name: 'userIndex',
          component: UserIndex
        },
        {
          path: 'home',
          name: 'userHome',
          component: UserHome
        },
        {
          path: 'work',
          name: 'userWork',
          component: UserWork
        },
        {
          path: 'calendar',
          name: 'userCalendar',
          component: UserCalendar
        }
      ]
    }
  ]
})
