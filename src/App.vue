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
			<SnackBar v-model="error" :message="errorMsg"></SnackBar>
		</div>
	</div>
</div>
<router-view v-else></router-view>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { key } from './store'
import { computed, defineComponent } from 'vue'
import SideMenu from '@/components/nav/SideMenu.vue'
import Preloader from '@/components/Preloader.vue'
import Debug from '@/components/nav/Debug.vue'
import SnackBar from '@/components/ui/SnackBar.vue'
import { AuthActions } from './store/auth/actions'
import { AuthMutations } from './store/auth/mutations'
import { KeysMutations } from './store/keys/mutations'

//Composition API = On
export default defineComponent({
	name: 'App',
	components: {
		SideMenu,
		Preloader,
		Debug,
		SnackBar
	},

	setup() {
		let store = useStore(key)
		store.dispatch(AuthActions.CHECK_AUTH)

		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})
		const isDebug = computed<boolean>({
			get: () => store.getters.getIsDebug,
			set: (val: boolean) => store.commit(KeysMutations.SET_COLLAPSED, val)
		})
		const collapsed = computed<boolean>({
			get: () => store.getters.getCollapsed,
			set: (val: boolean) => store.commit(KeysMutations.SET_COLLAPSED, val)
		})


		
		const error  = computed({
			get: () => store.getters.getError,
			set: () => store.commit(AuthMutations.CLEAR_ERROR)
		})
		return {
			//возвращаем данные
			isAuth: computed(() => store.getters.isAuthenticated),
			loader,
			collapsed,
			isDebug,
			error,
			errorMsg: computed(() => store.getters.getErrorMsg),
		}
	}
})
</script>

<style lang="sass">
@import "@/assets/sass/main.sass"

.show-enter-active, .show-leave-active 
  transition: all .2s ease

.show-enter-from, .show-leave-to 
  transform: translateX(-100px)
  opacity: 0


</style>
