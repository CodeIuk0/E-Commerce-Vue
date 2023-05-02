import { createRouter, createWebHistory } from 'vue-router'
import MarketView from '../views/MarketView.vue'
import MyMarketView from '../views/MyMarketView.vue'
import _404View from '../views/_404View.vue'

// On crée les routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Market',
      component: MarketView
      
    },

    {
      path: '/MyMarket',
      name: 'MyMarket',
      component: MyMarketView
      
    },

    // renvoei un erreur 404 si aucune page ne match
    {
      path: '/:pathMatch(.*)*',
      component: _404View
      
    },

  ]
})

export default router
