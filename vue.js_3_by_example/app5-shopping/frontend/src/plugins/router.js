import { createRouter, createWebHashHistory } from 'vue-router'
import Shop from '@/views/Shop.vue'
import OrderForm from '@/views/OrderForm.vue'
import Success from '@/views/Success.vue'

const routes = [
  { path: '/', component: Shop },
  { path: '/order-form', component: OrderForm },
  { path: '/success', component: Success },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
