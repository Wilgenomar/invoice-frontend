import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Products" */ '../views/Products.vue')
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import(/* webpackChunkName: "customers" */ '../views/Customers.vue')
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import(/* webpackChunkName: "invoices" */ '../views/Invoices.vue')
  },
  {
    path: '/customers/add',
    name: 'AddCustomer',
    component: () => import(/* webpackChunkName: "add-customer" */ '../views/AddCustomer.vue')
  },
  {
    path: '/customer/details/:customerId',
    name: 'CustomerDetails',
    component: () => import(/* webpackChunkName: "customers" */ '../views/CustomerDetails.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
