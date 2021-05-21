import Vue from 'vue'
import VueRouter from 'vue-router'
import Deathratepage from '../views/Deathratepage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Deathratepage',
    component: Deathratepage
  }
]

const router = new VueRouter({
  routes
})

export default router
