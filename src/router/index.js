import Vue from 'vue'
import Router from 'vue-router'
import Chartmogul from '@/components/Chartmogul'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chartmogul',
      component: Chartmogul
    }
  ]
})
