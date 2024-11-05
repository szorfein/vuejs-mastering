import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Orders from '@/views/Orders.vue';
import ShopItems from '@/views/ShopItems.vue';

const beforeEnter = (to, from, next) => {
  try {
    const token = localStorage.getItem('token');
    if (to.fullPath !== '/' && !token) {
      return next({ fullPath: '/' });
    }
    return next();
  } catch(err) {
    return next({ fullPath: '/' });
  }
};

const routes = [
  { path: '/', component: Login },
  { path: '/orders', component: Orders, beforeEnter },
  { path: '/shop-items', component: ShopItems, beforeEnter },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
