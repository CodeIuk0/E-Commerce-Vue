import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import VueCookies from 'vue-cookies'

import './assets/stylesheet.css'

const app = createApp(App)

// On crée le store Pinia
app.use(createPinia())

// On initialise les routes
app.use(router)

// On initialise l'interface graphique
app.use(ElementPlus)

// On initialise les cookies
app.use(VueCookies)

// On monte l'interface dans la balise HTML qui a un id #app
app.mount('#app')
