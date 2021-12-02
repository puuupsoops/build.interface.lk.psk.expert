
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
		path: '/catalog/:id?',
		component: () => import('@/pages/catalog'),
		name: 'Catalog',
		props: true,
		meta:{
				auth: true,	
			}
	},
	
	{
		path: '/company/:id?', 
		component: () => import('@/pages/company'),
		name: 'Company',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/product/:article?', 
		component: () => import('@/pages/product'),
		name: 'Product',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/order/:article?', 
		component: () => import('@/pages/order/order'),
		name: 'Order',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/orders', 
		component: () => import('@/pages/order/orders'),
		name: 'Orders',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments', 
		component: () => import('@/pages/shipment/shipments'),
		name: 'Shipments',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments/request', 
		component: () => import('@/pages/shipment/request'),
		name: 'ShipmentsRequest',
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
		path: '/500',
		component: () => import('@/pages/500'),
		name: '500',
		meta:{
				auth: true,
			}
	},
	{
		path: '/personal',
		component: () => import('@/pages/tmp_personal'),
		name: 'Personal',
		meta:{
				auth: true,
			}
	},
	{
		path: '/claims',
		component: () => import('@/pages/claim/tmp_claim_main'),
		name: 'ClaimMain',
		meta:{
				auth: true,
			}
	},
	{
		path: '/claim',
		component: () => import('@/pages/claim/tmp_claim'),
		name: 'Claim',
		meta:{
				auth: true,
			}
	},
	{
		path: '/claim_success',
		component: () => import('@/pages/claim/tmp_claim_success'),
		name: 'ClaimSuccess',
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
