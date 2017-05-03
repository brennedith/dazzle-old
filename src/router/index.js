import Vue from 'vue'
import Router from 'vue-router'
import Dazzle from '@/Dazzle'
import Home from '@/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dazzle',
      name: 'Dazzle',
      component: Dazzle,
      props: true
    }
  ]
})
