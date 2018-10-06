import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import User from '@/components/User'
import TodoBox from '@/components/User/todoBox'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (to.path == '/' || to.path == '/register') {
    if (token != 'null' && token != null) {
      next('/user/inbox'); //有 token 就跳转到 inbox
    }
    next();
  } else {
    if(token != 'null' && token != null) {
      next();
    } else {
      next('/'); //回到登录界面
    }
  }
});

export default router;