<template>

<Preloader v-if="loader"></Preloader>
<div v-if="isAuth">
	<SideMenu ></SideMenu>

	<div :class="collapsed? 'sidebarOpen' :''">
		<div class="content" @click="collapsed=false">
			<Debug></Debug>
			<router-view v-slot= "{ Component }">
				<transition name="show" mode="out-in">
					<component :is="Component"/>
				</transition>
			</router-view>
		</div>
	</div>
</div>
<router-view v-else></router-view>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, provide } from 'vue';
import SideMenu from '@/components/nav/SideMenu.vue';
import Preloader from '@/components/Preloader';
import Debug from '@/components/nav/Debug';
//import Main from './pages/main.vue'
//import Catalog from './pages/catalog.vue';

//Composition API = On
export default {
	name: 'App',
	components: {
		SideMenu,
		Preloader,
		Debug
	},

setup() {
		let store = useStore();
		store.dispatch('CHECK_AUTH')
		let loader = ref(false);
		let collapsed = ref(false);
		let isDebug = ref(true);
		provide('loader', loader ); 
		provide('collapsed', collapsed ); 
		provide('isDebug', isDebug ); 

		return {
			//возвращаем данные
			isAuth: computed(() => store.getters.isAuthenticated),
			loader,
			collapsed,
			isDebug,
			
		}
	}
}
</script>

<style lang="sass">
@import "@/assets/sass/main.sass"

.show-enter-active, .show-leave-active 
  transition: all .2s ease

.show-enter-from, .show-leave-to 
  transform: translateX(-100px)
  opacity: 0


</style>
