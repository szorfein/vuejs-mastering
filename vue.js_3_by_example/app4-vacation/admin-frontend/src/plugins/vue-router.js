import { createWebHashHistory, createRouter } from 'vue-router'
import Login from '../views/Login.vue'
import Catalog from '../views/Catalog.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/catalog', component: Catalog },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
