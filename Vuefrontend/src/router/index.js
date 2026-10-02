import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
  path: '/login',
  name: 'login',
  component: Login
},

 {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },


]

const router = createRouter({
  history: createWebHistory(),

  routes,

  scrollBehavior(to, from, savedPosition) {

    // Browser back/forward position
    if (savedPosition) {
      return savedPosition
    }

    // About / Services jese hash sections
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 90
          })
        }, 100)
      })
    }

    // Home ya kisi new page par top
    return {
      top: 0,
      left: 0,
      behavior: 'smooth'
    }
  }
})

export default router