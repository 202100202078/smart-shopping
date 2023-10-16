import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import LayOut from '@/views/layout/index'
import MyOrder from '@/views/myorder/index'
import Pay from '@/views/pay/index'
import ProductDetail from '@/views/productdetail/index'
import Search from '@/views/search/index'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'
import SearchList from '@/views/search/list'

const authUrl = ['/pay', '/myorder']

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: LayOut,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/productdetail', component: ProductDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

router.beforeEach((to, from, next) => {
  // 非权限页面
  if (!authUrl.includes(to.path)) {
    next()
    return
    // 直接放行
  }
  // 权限页面
  // 检查token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
