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
          path: ':id',
          name: 'todoBox',
          component: TodoBox
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { //check if needs login
    if (localStorage.getItem('token')) { //check if logged in
      next();
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
})
