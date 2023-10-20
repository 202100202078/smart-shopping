import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 首页5个页面无需懒加载
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import Category from '@/views/layout/category'
import Home from '@/views/layout/home'
import LayOut from '@/views/layout/index'

const Login = () => import('@/views/login/index')
const MyOrder = () => import('@/views/myorder/index')
const Pay = () => import('@/views/pay/index')
const ProductDetail = () => import('@/views/productdetail/index')
const Search = () => import('@/views/search/index')
const SearchList = () => import('@/views/search/list')
const Address = () => import('@/views/address/index')
const CreateAddress = () => import('@/views/address/create.vue')

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
    { path: '/prodetail/:goodsId', component: ProductDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/address', component: Address },
    { path: '/create', component: CreateAddress }
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
