import { createWebHashHistory, createRouter } from 'vue-router'
import Login from '@/views/Login.vue'
import Catalog from '@/views/Catalog.vue'
import Bookings from '@/views/Bookings.vue'

const beforeEnter = (to, from, next) => {
  try {
    const token = localStorage.getItem('token');
    if (to.fullPath !== '/' && !token) {
      return next({ fullPath: '/' })
    }
    return next();
  } catch(error) {
    return next({ fullPath: '/' })
  }
};

const routes = [
  { path: '/', component: Login },
  { path: '/catalog', component: Catalog, beforeEnter },
  { path: '/bookings', component: Bookings, beforeEnter },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
