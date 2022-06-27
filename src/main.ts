import { createApp } from 'vue'
import App from './App.vue'

export const app = createApp(App)

// Роуты в приложении
import router from './plugins/router'
app.use(router)

// Vuex4 
import { store, key } from './store'
app.use(store, key)

//WebSocket со стором
import VueNativeSock from 'vue-native-websocket-vue3'

app.use(VueNativeSock, process.env.VUE_APP_WS_LOCATION, {store: store})


app.mount('#app');

