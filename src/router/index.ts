import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AgendamentoView from '@/views/AgendamentoView.vue'
import ListaAgendamentoView from '@/views/ListaAgendamentoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/agendamento',
      name: 'agendamento',
      component: AgendamentoView,
    },
    {
      path: '/lista_agendamento',
      name: 'lista_agendamento',
      component: ListaAgendamentoView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwtToken')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' })
    } else {
      const isExpired = checkTokenExpiration(token)
      if (isExpired) {
        localStorage.removeItem('jwtToken')
        next({ name: 'login' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

function checkTokenExpiration(token : any) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000 // Convertendo para milissegundos
    return Date.now() > exp
  } catch (error) {
    return true
  }
}

export default router
