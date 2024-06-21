import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import GoogleCallback from '@/views/auth/GoogleCallback.vue'
import HomeView from '@/views/home/HomeView.vue'
import WodView from '@/views/management/wod/WodView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/management',
      children: [
        {
          path: 'wod',
          component: WodView
        }
      ]
    },
    {
      path: '/auth/login',
      component: LoginView,
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/auth/login/google/callback',
      component: GoogleCallback
    }
  ]
})

export default router
