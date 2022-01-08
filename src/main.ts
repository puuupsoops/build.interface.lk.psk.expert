import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { store } from './store'
import { actions } from "@/store/auth/actions"
console.log(actions)


//import jQuery from 'jquery'
//window.$ = window.jQuery = jQuery;

createApp(App)
	.use(router)
	.use(store)
	.mount('#app');