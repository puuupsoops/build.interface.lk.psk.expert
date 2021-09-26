
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
	{ 
		path: '/', 
		component: () => import('@/pages/main') 
	},
	{ 
		path: '/catalog',
		component: () => import('@/pages/catalog') 
	},
	{ 
		path: '/company', 
		component: () => import('@/pages/company') }
];

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router;
