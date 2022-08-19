import { createApp } from 'vue'
import App from '/src/App.vue'

// @ts-ignore
const app = createApp(App)

// Vuex4 
import { store, key } from '/src/store/index'
app.use(store, key)

// Роуты в приложении
import router from '/src/plugins/router'
app.use(router)

//WebSocket со стором
// import VueNativeSock from 'vue-native-websocket-vue3'
// app.use(VueNativeSock, import.meta.env.VITE_APP_WS_LOCATION, {store: store})

export const globalProperties = app.config.globalProperties.$socket



app.mount('#app')
