import './assets/style/base.css'
import './assets/style/main.css'
import './assets/style/layout.css'
import './assets/style/text.css'
import 'tailwindcss/tailwind.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import router from './router'

const app = createApp(App)
app.use(VueSweetalert2)

app.use(createPinia())
app.use(router)

app.mount('#app')
