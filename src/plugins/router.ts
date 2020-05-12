import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import { store } from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const user = store.state.user

  if (requiresAuth && !user) {
    next('/')
  } else {
    if (to.path === '/' && user) {
      next('/cabinet')
    } else {
      next()
    }
  }
})

export default router
