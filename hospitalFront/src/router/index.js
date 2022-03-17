import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/main/home.vue'
import Welcome from '@/view/login/welcome.vue'
import Login from '@/view/login/index.vue'
import User from '@/view/personnel/user/list.vue'
import UserAction from '@/view/personnel/user/action.vue'
import Auth from '@/view/personnel/auth/list.vue'
import AuthAction from '@/view/personnel/auth/action.vue'

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
            path: '/welcome',
            name: 'welcome',
            component: Welcome,
        },

        // 人员管理
            // 用户管理
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
            // 权限管理
        {
            path: '/personnel/auth/list',
            name: 'personnel_auth',
            component: Auth,
        },
        {
            path: '/personnel/auth/action',
            name: 'personnel_auth_action',
            component: AuthAction,
        },
      ]
    }
  ]
})
