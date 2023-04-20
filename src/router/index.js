import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>  import('../views/HomeView.vue')
  },
  {
    path: '/character',
    name: 'character',
    component: () =>  import('../views/CharacterView.vue')
  },
  {
    path: '/character/:id',
    name: 'character',
    component: () =>  import('../views/CharacterView.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
