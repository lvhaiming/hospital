import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/main/home.vue'
import Welcome from '@/view/login/welcome.vue'
import Login from '@/view/login/index.vue'

import User from '@/view/personnel/user/list.vue'
import UserAction from '@/view/personnel/user/action.vue'

import Auth from '@/view/personnel/auth/list.vue'
import AuthAction from '@/view/personnel/auth/action.vue'

import Patient from '@/view/patient/patient/list.vue'
import PatientAction from '@/view/patient/patient/action.vue'

import Check from '@/view/patient/check/list.vue'
import CheckAction from '@/view/patient/check/action.vue'

import Emergency from '@/view/scheduling/emergency/list.vue'
import Internal from '@/view/scheduling/internal/list.vue'
import Surgery from '@/view/scheduling/surgery/list.vue'
import Pediatrics from '@/view/scheduling/pediatrics/list.vue'
import Obstetrics from '@/view/scheduling/obstetrics/list.vue'
import Oncology from '@/view/scheduling/oncology/list.vue'

import SchedulingAction from '@/view/scheduling/baseAction'



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
            meta: {
              keepAlive: true // 需要缓存
            }
        },
        {
            path: '/personnel/user/:action',
            name: 'personnel_user_action',
            component: UserAction,
            meta: {
              keepAlive: true // 不需要缓存
            }
        },
            // 权限管理
        {
            path: '/personnel/auth/list',
            name: 'personnel_auth',
            component: Auth,
            meta: {
              keepAlive: true // 需要缓存
            }
        },
        {
            path: '/personnel/auth/action',
            name: 'personnel_auth_action',
            component: AuthAction,
            meta: {
              keepAlive: true // 不需要缓存
            }
        },

        // 入院管理
          // 挂号
        {
          path: '/patient/check/list',
          name: 'patient_check',
          component: Check,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/patient/check/:action',
          name: 'patient_check_action',
          component: CheckAction,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
            // 病患管理
        {
          path: '/patient/patient/list',
          name: 'patient_patient',
          component: Patient,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/patient/patient/:action',
          name: 'patient_patient_action',
          component: PatientAction,
          meta: {
            keepAlive: true // 不需要缓存
          }
        },

        // 排班管理
          // 急诊科
        {
          path: '/scheduling/emergency/list',
          name: 'scheduling_emergency',
          component: Emergency,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
          // 内科
        {
          path: '/scheduling/internal/list',
          name: 'scheduling_internal',
          component: Internal,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        // 外科
        {
          path: '/scheduling/surgery/list',
          name: 'scheduling_surgery',
          component: Surgery,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
          // 儿科
        {
          path: '/scheduling/pediatrics/list',
          name: 'scheduling_pediatrics',
          component: Pediatrics,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        // 妇产科
        {
          path: '/scheduling/obstetrics/list',
          name: 'scheduling_obstetrics',
          component: Obstetrics,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
          // 肿瘤科
        {
          path: '/scheduling/oncology/list',
          name: 'scheduling_oncology',
          component: Oncology,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/scheduling/edit',
          name: 'scheduling_action',
          component: SchedulingAction,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        
      ]
    }
  ]
})
