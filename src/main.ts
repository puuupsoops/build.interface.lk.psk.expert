import { createApp } from 'vue'
import { store, key } from '/src/store'
import router from '/src/plugins/router'
import App from '/src/App.vue'
// import 'windi.css'

// @ts-ignore
const app = createApp(App)

// Vuex4 

app.use(store, key)

// Роуты в приложении

app.use(router)

// WebSocket со стором
import VueNativeSock from 'vue-native-websocket-vue3'
app.use(VueNativeSock, import.meta.env.VITE_APP_WS_LOCATION, {store: store,format: "json"})

export const globalProperties = app.config.globalProperties.$socket
import { useDark } from '@vueuse/core';

const isDark = useDark();
isDark.value = localStorage.getItem("darkMode") == "true";

app.mount('#app')
