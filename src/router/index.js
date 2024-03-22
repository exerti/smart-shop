import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout/index.vue'
import Search from '../views/search'
import SearchList from '../views/search/list.vue'
import Prodetail from '../views/prodetail'
import Pay from '../views/pay'
import Myorder from '../views/myorder'

import Home from '../views/layout/home.vue'
import Category from '../views/layout/category'
import Cart from '../views/layout/cart'
import User from '../views/layout/user'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]

  },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  { path: '/prodetail/:id', component: Prodetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: Myorder }
]

const router = new VueRouter({
  routes
})

const authUrl = ['/pay', '/myorder']

router.beforeEach(
  (to, from, next) => {
    // 非权限页面直接放行
    const token = store.getters.token
    if (!authUrl.includes(to.path)) {
      console.log('非权限页面')
      next()
      return
    }
    // 权限页面，根据是否拥有token进行判断，是否放行
    if (token) {
      console.log('放行')
      next()
    } else {
      console.log('拦截到')
      next('/login')
    }
  })

export default router
