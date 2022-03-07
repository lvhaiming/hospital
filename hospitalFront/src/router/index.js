import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/main/home.vue'
import Login from '@/view/login/index.vue'
import User from '@/view/personnel/user/list.vue'
import UserAction from '@/view/personnel/user/action.vue'
import Auth from '@/view/personnel/auth.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/personnel/user/list',
      children: [
        {
            path: '/personnel/user/list',
            name: 'personnel_user',
            component: User,
        },
        {
            path: '/personnel/user/:action',
            name: 'personnel_user_action',
            component: UserAction
        },
        {
            path: '/personnel/auth',
            name: 'personnel_auth',
            component: Auth
        }
      ]
    }
  ]
})
