import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import GameLayout from './views/GameLayout.vue'
import GuessNumberPage from './views/GuessNumberPage.vue'
import AdjacentSwapPage from './views/AdjacentSwapPage.vue'
import TowerOfHanoiPage from './views/TowerOfHanoiPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games',
      component: GameLayout,
      redirect: '/games/guess-number',
      children: [
        {
          path: 'guess-number',
          name: 'guess-number',
          component: GuessNumberPage,
        },
        {
          path: 'adjacent-swap',
          name: 'adjacent-swap',
          component: AdjacentSwapPage,
        },
        {
          path: 'tower-of-hanoi',
          name: 'tower-of-hanoi',
          component: TowerOfHanoiPage,
        },
      ],
    },
  ],
})

export default router
