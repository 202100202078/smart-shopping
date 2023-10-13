import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import LayOut from '@/views/layout/index'
import MyOrder from '@/views/myorder/index'
import Pay from '@/views/pay/index'
import ProductDetail from '@/views/productdetail/index'
import Search from '@/views/search/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/layout' },
    { path: '/layout', component: LayOut },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/productdetail', component: ProductDetail },
    { path: '/search', component: Search }
  ]
})

export default router
