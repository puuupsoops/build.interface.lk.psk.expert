import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'



//import jQuery from 'jquery'
//window.$ = window.jQuery = jQuery;

createApp(App)
	.use(router)
	.use(store)
	.mount('#app');