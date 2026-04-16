import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import App from './App.vue'
import router from './router'
import './style.css'

inject()

createApp(App).use(router).mount('#app')
