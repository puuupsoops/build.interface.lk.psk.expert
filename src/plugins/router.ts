
import { createRouter, createWebHistory } from 'vue-router';
//import { useStore } from 'vuex';
import { store } from '@/store'

const routes = [
	{
		path: '/', 
		component: () => import('@/pages/main.vue'),
		name: 'Main',
		meta:{
				auth: true,
			}
	},
	{
		path: '/catalog/:id?',
		component: () => import('@/pages/catalog.vue'),
		name: 'Catalog',
		props: true,
		meta:{
				auth: true,	
			}
	},
	
	{
		path: '/company/:id?', 
		component: () => import('@/pages/company.vue'),
		name: 'Company',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/product/:article?', 
		component: () => import('@/pages/product.vue'),
		name: 'Product',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/order/:article?', 
		component: () => import('@/pages/order/order.vue'),
		name: 'Order',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/orders', 
		component: () => import('@/pages/order/orders.vue'),
		name: 'Orders',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments', 
		component: () => import('@/pages/shipment/shipments.vue'),
		name: 'Shipments',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments/request', 
		component: () => import('@/pages/shipment/request.vue'),
		name: 'ShipmentsRequest',
		meta:{
				auth: true,
			}
	},

	{
		path: '/404',
		component: () => import('@/pages/404.vue'),
		name: '404',
		meta:{
				auth: true,
			}
	},
	{
		path: '/500',
		component: () => import('@/pages/500.vue'),
		name: '500',
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
		component: () => import('@/pages/login.vue'),
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
