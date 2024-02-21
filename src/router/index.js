import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      children: [
        {
          path: '',
          name: 'user',
          component: () => import('../views/userList.vue')
        },
        {
          path: '/create',
          name: 'create-user',
          component: () => import('../views/userCreate.vue')
        },
        {
          path: '/edit/:id',
          name: 'edit-user',
          component: () => import('../views/userCreate.vue')
        }
      ]
    },
  ]
})

export default router
