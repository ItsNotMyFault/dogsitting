import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import Modal from './components/modals/Modal.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//initialize components in @components as global
const components = import.meta.glob(`./components/icons/*.vue`, { eager: true })
Object.entries(components).forEach(([path, definition]) => {
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  app.component(componentName, definition.default)
})

app.use(createPinia())

app.use(router)
app.mount('#app')
