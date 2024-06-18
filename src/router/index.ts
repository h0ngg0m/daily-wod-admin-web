import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import GoogleCallback from '@/views/auth/GoogleCallback.vue'
import HomeView from '@/views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
