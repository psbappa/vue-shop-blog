import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard'
import Products from '../views/Products.vue'
import Setting from '../views/Setting.vue'
import PathNotFound from '../components/templates/PathNotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
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
  { path: '/:pathMatch(.*)*', component: PathNotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
