import { reactive } from 'vue'
import Modal from './Modal.vue'

const
current = reactive({ name: '', resolve: null, reject: null }),
api = {
  active() {
    return current.name
  },
  show(name) { // because Promise, you should use this function with '.then'
    current.name = name
    return new Promise((resolve = () => {}, reject = () => {}) => {
      current.resolve = resolve
      current.reject = reject
    })
  },
  accept() {
    console.log(`current name: ${current.name}`) // myModal
    current.resolve()
    current.name = ''
  },
  cancel() {
    console.log(`current name: ${current.name}`) // myModal
    current.reject()
    current.name = ''
  }
},
plugin = {
  install(App, options) {
    App.component('Modal', Modal)
    App.provide("$modals", api) // provide (from root) and inject (use on child) works together
    // you can inject with "const $modals = inject('$modals')" and use the current api
  }
}

export default plugin
