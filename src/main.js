

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import Modal from './components/modals/Modal.vue'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/authStore'
import { useReservationFormStore } from '@/stores/reservationFormStore'
const pinia = createPinia()

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
app.component('VueDatePicker', VueDatePicker)

import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'
app.component('VSelect', vSelect)
import './assets/main.css'
//initialize components in @components as global
const components = import.meta.glob(`./components/icons/*.vue`, { eager: true })
Object.entries(components).forEach(([path, definition]) => {
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  app.component(componentName, definition.default)
})

app.use(pinia)

app.use(router)
const authStore = useAuthStore()
app.use(authStore)
const reservationFormStore = useReservationFormStore()
app.use(reservationFormStore)

app.mount('#app')
