import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import PhotoFormPage from './components/PhotoFormPage.vue';
import SearchPage from './components/SearchPage.vue';
import HomePage from './components/HomePage.vue';

const routes = [
  { path: '/add-photo-form', component: PhotoFormPage },
  { path: '/edit-photo-form/:id', component: PhotoFormPage },
  { path: '/search', component: SearchPage },
  { path: '/', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
