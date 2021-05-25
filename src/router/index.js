import Vue from 'vue'
import VueRouter from 'vue-router'
import Deathratepage from '@/views/Deathratepage'
import Screenpage from '@/views/Screenpage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Deathratepage',
    component: Deathratepage
  },
  {
    path: '/Screenpage',
    component: Screenpage
  }
]

const router = new VueRouter({
  routes
})
export default router
