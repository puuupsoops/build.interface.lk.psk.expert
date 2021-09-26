import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store/store'


import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;

createApp(App)
	.use(router)
	//.use(axios)
	.use(store)
	.mount('#app');
