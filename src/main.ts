import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/scss/common/index.scss'
import { VDateInput } from 'vuetify/labs/VDateInput'
import Notifications from '@kyvg/vue3-notification'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

app.component('VDateInput', VDateInput)
app.use(Notifications)
app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
