import Vue from 'vue'
import Router from 'vue-router'
import Dazzle from '@/Dazzle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dazzle',
      component: Dazzle
    },
    {
      path: '/dazzle',
      name: 'Dazzle',
      component: Dazzle
    }
  ]
})
