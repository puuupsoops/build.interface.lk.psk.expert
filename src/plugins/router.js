
import { createRouter, createWebHistory } from 'vue-router';
//import { useStore } from 'vuex';
import store from '@/plugins/store'

const routes = [
	{
		path: '/', 
		component: () => import('@/pages/main'),
		name: 'Main',
		meta:{
				auth: true,
			}
	},
	{
		path: '/catalog',
		component: () => import('@/pages/catalog'),
		name: 'Catalog',
		meta:{
				auth: true,	
			}
	},
	{
		path: '/company', 
		component: () => import('@/pages/company'),
		name: 'Company',
		meta:{
				auth: true,
			}
	},
	{
		path: '/404',
		component: () => import('@/pages/404'),
		name: '404',
		meta:{
				auth: true,
			}
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		meta:{
				auth: true,
			}
	},
	{
		path: '/login', 
		component: () => import('@/pages/login'),
		name: 'Login'
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	//console.log(to, from)
	if (to.path === '/login' && store.getters.isAuthenticated)  {
		return next({ name: 'Main',  });
	}
	if (to.matched.some(m => m.meta.auth) && !store.getters.isAuthenticated) {
		next({ name: 'Login',  });
	}
	else {
		next();
	}
});

export default router;
