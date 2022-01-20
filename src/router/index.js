import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard'
import Products from '../views/Products.vue'
import ViewProduct from '../components/products/ViewProduct.vue'
import AddProduct from '../components/products/AddProduct.vue'
import Color from '../components/products/colors/Color.vue'
import Category from '../components/products/categories/Category.vue'
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
    path: '/view-product/:id',
    name: 'ViewProduct',
    component: ViewProduct
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/categories',
    name: 'Category',
    component: Category
  },
  {
    path: '/colors',
    name: 'Color',
    component: Color
  },
  {
    path: '/settings',
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
