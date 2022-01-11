import Vue from 'vue'
import VueRouter from 'vue-router'

import Products from '../views/Products.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  // {
  //   path: '/setting',
  //   name: 'Setting',
  //   component: () => import('../views/Setting.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
