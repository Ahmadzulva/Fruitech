import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import ProdukView from '@/views/ProdukView.vue'
import KeranjangView from '@/views/KeranjangView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProdukView,
    },
    {
      path: '/keranjang',
      name: 'keranjang',
      component: KeranjangView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: { name: 'index' }
    }
  ]
})

export default router
