<template>
<Preloader v-if="loader"></Preloader>
	<div  v-if="isAuth">
		<SideMenu></SideMenu>

		<div class="sidebar-menu" style="display: none;">
			<SideCatalogMenu v-if="this.$route.path === '/catalog'" />
			<SideNavigation  v-else />
		</div>
	</div>
	<div class="content">
		<nav class="nav" v-if="isAuth">
			<ul class="nav-list">
				<li><router-link tag="a" to="/" class="nav-link">Главнаяя (тест)</router-link></li>
				<li><router-link tag="a" to="/catalog" class="nav-link">Каталог (тест)</router-link></li>
				<li><router-link tag="a" to="/company" class="nav-link">Страница компании (тест)</router-link></li>
				<li><router-link tag="a" to="/product" class="nav-link">Страница продукт (тест)</router-link></li>
				<li><router-link tag="a" to="#" @click="logout" class="nav-link">Выход (тест)</router-link></li>

			</ul>
		</nav>
		<router-view></router-view>
	</div>

</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, provide } from 'vue';
import SideMenu from './components/SideMenu.vue';
import SideNavigation from './components/nav/SideNavigation.vue';
import SideCatalogMenu from './components/nav/SideCatalogMenu.vue';
import Preloader from '@/components/Preloader';

//import Main from './pages/main.vue'
//import Catalog from './pages/catalog.vue';

//Composition API = On
export default {
	name: 'App',
	components: {
		SideMenu,
		SideNavigation,
		SideCatalogMenu,
		Preloader,
	},

setup() {
		let store = useStore();
		store.dispatch('CHECK_AUTH')
		let loader = ref(false);
		provide('loader', loader ); 

		return {
			//возвращаем данные
			isAuth: computed(() => store.getters.isAuthenticated),
			loader,
			logout: ()=>store.dispatch('LOGOUT'),
		}
	}
}
</script>

<style>
 
</style>
