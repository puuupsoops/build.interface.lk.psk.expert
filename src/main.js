import { createApp } from 'vue'
import App from './App.vue'
import routes from './router/routes'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;

//import Vuex from 'vuex';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//const app = createApp(App);
//app.use(Vuex);

//app.use(router);
/*
const store = new Vuex.Store({
    state: {},
    mutations: {}
});
*/

//app.mount('#app');

createApp(App)
    .use(router)
    .mount('#app');