import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/main/home.vue'
import Welcome from '@/view/login/welcome.vue'
import Login from '@/view/login/index.vue'
import Register from '@/view/login/register.vue'
import ForgetPassword from '@/view/login/forgetPassword.vue'

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

import Pharmacy from '@/view/pharmacy/pharmacy/list.vue'
import PharmacyAction from '@/view/pharmacy/pharmacy/action.vue'
import TakeMedicine from '@/view/pharmacy/takeMedicine/list.vue'

import My from '@/view/my/my/list.vue'
import MyInfo from '@/view/my/myInfo/list.vue'
import MyInfoAction from '@/view/my/myInfo/action.vue'

import DoctorMessage from '@/view/doctorMessage/message/list.vue'
import DoctorMessageDetail from '@/view/doctorMessage/message/action.vue'

import Bed from '@/view/bed/bed/list.vue'
import BedAction from '@/view/bed/bed/action.vue'
import BedPatient from '@/view/bed/patient/list.vue'
import BedPatientAction from '@/view/bed/patient/action.vue'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword
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

        // ????????????
            // ????????????
        {
            path: '/personnel/user/list',
            name: 'personnel_user',
            component: User,
            meta: {
              keepAlive: true // ????????????
            }
        },
        {
            path: '/personnel/user/:action',
            name: 'personnel_user_action',
            component: UserAction,
            meta: {
              keepAlive: true // ???????????????
            }
        },
            // ????????????
        {
            path: '/personnel/auth/list',
            name: 'personnel_auth',
            component: Auth,
            meta: {
              keepAlive: true // ????????????
            }
        },
        {
            path: '/personnel/auth/action',
            name: 'personnel_auth_action',
            component: AuthAction,
            meta: {
              keepAlive: true // ???????????????
            }
        },

        // ????????????
          // ??????
        {
          path: '/check/check/list',
          name: 'check_check',
          component: Check,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/check/check/:action',
          name: 'check_check_action',
          component: CheckAction,
          meta: {
            keepAlive: true // ????????????
          }
        },
            // ????????????
        {
          path: '/patient/patient/list',
          name: 'patient_patient',
          component: Patient,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/patient/patient/:action',
          name: 'patient_patient_action',
          component: PatientAction,
          meta: {
            keepAlive: true // ???????????????
          }
        },

        // ????????????
          // ?????????
        {
          path: '/scheduling/emergency/list',
          name: 'scheduling_emergency',
          component: Emergency,
          meta: {
            keepAlive: true // ????????????
          }
        },
          // ??????
        {
          path: '/scheduling/internal/list',
          name: 'scheduling_internal',
          component: Internal,
          meta: {
            keepAlive: true // ????????????
          }
        },
          // ??????
        {
          path: '/scheduling/surgery/list',
          name: 'scheduling_surgery',
          component: Surgery,
          meta: {
            keepAlive: true // ????????????
          }
        },
          // ??????
        {
          path: '/scheduling/pediatrics/list',
          name: 'scheduling_pediatrics',
          component: Pediatrics,
          meta: {
            keepAlive: true // ????????????
          }
        },
          // ?????????
        {
          path: '/scheduling/obstetrics/list',
          name: 'scheduling_obstetrics',
          component: Obstetrics,
          meta: {
            keepAlive: true // ????????????
          }
        },
          // ?????????
        {
          path: '/scheduling/oncology/list',
          name: 'scheduling_oncology',
          component: Oncology,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/scheduling/edit',
          name: 'scheduling_action',
          component: SchedulingAction,
          meta: {
            keepAlive: true // ????????????
          }
        },
        // ????????????
          // ????????????
        {
          path: '/pharmacy/pharmacy/list',
          name: 'pharmacy_pharmacy',
          component: Pharmacy,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/pharmacy/pharmacy/:action',
          name: 'pharmacy_pharmacy_action',
          component: PharmacyAction,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/pharmacy/takeMedicine/list',
          name: 'pharmacy_takeMedicine',
          component: TakeMedicine,
          meta: {
            keepAlive: true // ????????????
          }
        },
        // ????????????
          // ????????????
        {
          path: '/my/my/list',
          name: 'my_my',
          component: My,
          meta: {
            keepAlive: true // ????????????
          }
        },
          // ????????????
        {
          path: '/myInfo/myInfo/list',
          name: 'my_myInfo',
          component: MyInfo,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/myInfo/myInfo/action',
          name: 'my_myInfo_action',
          component: MyInfoAction,
          meta: {
            keepAlive: true // ????????????
          }
        },
        // ????????????
          // ????????????
        {
          path: '/doctorMessage/message/list',
          name: 'doctorMessage_message',
          component: DoctorMessage,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/doctorMessage/message/detail',
          name: 'doctorMessage_message_detail',
          component: DoctorMessageDetail,
          meta: {
            keepAlive: true // ????????????
          }
        },
        // ????????????
          // ????????????
        {
          path: '/bed/bed/list',
          name: 'bed_bed',
          component: Bed,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/bed/bed/:action',
          name: 'bed_bed_action',
          component: BedAction,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/bed/patient/list',
          name: 'bed_patient',
          component: BedPatient,
          meta: {
            keepAlive: true // ????????????
          }
        },
        {
          path: '/bed/patient/:action',
          name: 'bed_patient_action',
          component: BedPatientAction,
          meta: {
            keepAlive: true // ????????????
          }
        },
      ]
    }
  ]
})
