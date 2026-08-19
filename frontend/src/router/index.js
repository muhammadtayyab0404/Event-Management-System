import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }

  // Baad mein add karenge:
  //
  // {
  //   path: '/gallery',
  //   name: 'gallery',
  //   component: () => import('../views/Gallery.vue')
  // },
  //
  // {
  //   path: '/packages',
  //   name: 'packages',
  //   component: () => import('../views/Packages.vue')
  // },
  //
  // {
  //   path: '/contact',
  //   name: 'contact',
  //   component: () => import('../views/Contact.vue')
  // }
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