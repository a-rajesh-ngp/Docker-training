import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vUppercase } from './directives/uppercase'
import { vAutoFocus } from './directives/autoFocus'
import { vuetify } from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { useThemeStore } from './stores/theme.store'


const app = createApp(App)

app.use(createPinia())

const themeStore = useThemeStore()
themeStore.$subscribe((mutation, state) => {
    localStorage.setItem('theme', state.theme)
})

app.use(router)
app.directive('uppercase', vUppercase)
app.directive('autofocus', vAutoFocus)
app.use(vuetify)
app.mount('#app')