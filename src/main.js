import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import Modal from './components/modals/Modal.vue'

import App from './App.vue'
import router from './router'
import WelcomeItem from './components/WelcomeItem.vue'

const app = createApp(App)
const components = import.meta.glob(`./components/icons/*.vue`, { eager: true })
Object.entries(components).forEach(([path, definition]) => {
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  console.log('name: ', componentName)
  // Register component on this Vue instance
  app.component(componentName, definition.default)
})
app.use(createPinia())

app.use(router)
// app.component('the-modal', Modal)
app.component('WelcomeItem', WelcomeItem)
app.mount('#app')
