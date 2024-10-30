import './assets/main.css'

import { createApp } from 'vue'
import router from './plugins/vue-router'
import { Form, Field } from 'vee-validate'
import PrimeVue from 'primevue/config'
import InputText from "primevue/inputtext"
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import TextArea from 'primevue/textarea'
import Card from 'primevue/card'

import './plugins/axios'

import App from './App.vue'

createApp(App)
  .component('InputText', InputText)
  .component('Button', Button)
  .component('Dialog', Dialog)
  .component('TextArea', TextArea)
  .component('Card', Card)
  .component('Form', Form)
  .component('Field', Field)
  .use(PrimeVue)
  .use(router)
  .mount('#app')
