import { createRouter, createWebHistory } from 'vue-router'
import { store } from '/src/store/index'

const routes = [
	{
		path: '/', 
		component: () => import('/src/pages/main.vue'),
		name: 'Main',
		meta:{
				auth: true,
			}
	},
	{
		path: '/catalog/catalog/:id?',
		component: () => import('/src/pages/catalog/catalog.vue'),
		name: 'Catalog',
		props: true,
		meta:{
				auth: true,	
			}
	},
	{
		path: '/catalog/interactive',
		component: () => import('/src/pages/catalog/interactive.vue'),
		name: 'CatalogInfo',
		props: true,
		meta:{
				auth: true,	
			}
	},
	{
		path: '/company/:id?', 
		component: () => import('/src/pages/company.vue'),
		name: 'Company',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/product/:article?', 
		component: () => import('/src/pages/product.vue'),
		name: 'Product',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/order/:article?', 
		component: () => import('/src/pages/order/order.vue'),
		name: 'Order',
		props: true,
		meta:{
				auth: true,
			}
	},
	{
		path: '/orders', 
		component: () => import('/src/pages/order/orders.vue'),
		name: 'Orders',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments', 
		component: () => import('/src/pages/shipment/shipments.vue'),
		name: 'Shipments',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments/request', 
		component: () => import('/src/pages/shipment/request.vue'),
		name: 'ShipmentsRequest',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments/request/success', 
		component: () => import('/src/pages/shipment/success.vue'),
		name: 'ShipmentsRequestSuccess',
		meta:{
				auth: true,
			}
	},
	{
		path: '/shipments/address', 
		component: () => import('/src/pages/shipment/address.vue'),
		name: 'ShipmentsAdresss',
		meta:{
				auth: true,
			}
	},
	{
		path: '/claims', 
		component: () => import('/src/pages/claim/claims.vue'),
		name: 'Claims',
		meta:{
				auth: true,
			}
	},
	{
		path: '/claims/request', 
		component: () => import('/src/pages/claim/request.vue'),
		name: 'ClaimsRequest',
		meta:{
				auth: true,
			}
	},
	{
		path: '/claims/success', 
		component: () => import('/src/pages/claim/success.vue'),
		name: 'ClaimsSuccess',
		meta:{
				auth: true,
			}
	},
	{
		path: '/help', 
		component: () => import('/src/pages/help/help.vue'),
		name: 'Help',
		meta:{
				auth: true,
			}
	},
	{
		path: '/profile', 
		component: () => import('/src/pages/profile.vue'),
		name: 'Profile',
		meta:{
				auth: true,
			}
	},
	{
		path: '/kp', 
		component: () => import('/src/pages/kp/KpPage.vue'),
		name: 'KP',
		meta:{
				auth: true,
			}
	},
	{
		path: '/404',
		component: () => import('/src/pages/404.vue'),
		name: '404',
		meta:{
				auth: true,
			}
	},
	{
		path: '/500',
		component: () => import('/src/pages/500.vue'),
		name: '500',
		meta:{
				auth: true,
			}
	},
	// {
	// 	path: '/personal',
	// 	component: () => import('/src/pages/tmp_personal'),
	// 	name: 'Personal',
	// 	meta:{
	// 			auth: true,
	// 		}
	// },
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		meta:{
				auth: true,
			}
	},
	{   path: '/logout',
		name: 'logout',
		component: () => import('/src/pages/logout.vue'),
		meta:{
			auth: true,
		}
	},
	{
		path: '/login', 
		component: () => import('/src/pages/login.vue'),
		name: 'Login'
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	
	if (to.path === '/login' && store.getters.isAuthenticated)  {
		return next({ name: 'Main',  });
	}
	if (to.matched.some(m => m.meta.auth) && !store.getters.isAuthenticated) {
		return next({ name: 'Login',  });
	}
	

	next();
});

export default router;
