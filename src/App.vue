<template>
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
				<li><router-link tag="a" to="#" @click="logout" class="nav-link">Выход (тест)</router-link></li>

			</ul>
		</nav>
		<router-view></router-view>
	</div>

</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue';
import SideMenu from './components/SideMenu.vue';
import SideNavigation from './components/nav/SideNavigation.vue';
import SideCatalogMenu from './components/nav/SideCatalogMenu.vue';

//import Main from './pages/main.vue'
//import Catalog from './pages/catalog.vue';

//Composition API = On
export default {
	name: 'App',
	components: {
		SideMenu,
		SideNavigation,
		SideCatalogMenu,

	},

	setup() {
		let store = useStore();
		store.dispatch('CHECK_AUTH')

		return {
			//возвращаем данные
			isAuth: computed(() => store.getters.isAuthenticated),
			logout: ()=>store.dispatch('LOGOUT'),
		}
	}
}
</script>

<style>
 
</style>
