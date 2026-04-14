
import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // Importa el store desde src/store/index.js

const app = createApp(App)

// 🚀 PASO 1: Inyectar el store PRIMERO
app.use(store) 

// 🚀 PASO 2: Montar la app DESPUÉS
app.mount('#app')