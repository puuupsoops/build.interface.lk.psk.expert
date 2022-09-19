
<template>

	<Preloader v-if="loader"></Preloader>
	<div v-if="isAuth">
		<SideMenu v-model="showMenu" :orderPositionLength="orderPositionLength"></SideMenu>
		<NotificationBar v-model="showNotificationBar"></NotificationBar>
		<div class="content"
			:class="{'blur': showMenu | showNotificationBar}"
		>

			<router-view v-slot= "{ Component }">
				<transition name="show" mode="out-in">
					<component :is="Component"/>
				</transition>
			</router-view>
			<SnackBar v-model="error" :message="errorMsg"></SnackBar>
		</div>

	</div>
	<router-view v-else></router-view>
</template>

<script setup lang="ts">
	import SideMenu from './components/nav/SideMenu.vue'
	import Preloader from './components/Preloader.vue'
	import NotificationBar from './components/cards/NotificationBar.vue'
	import SnackBar from './components/ui/SnackBar.vue'

	import { useStore } from '/src/store'
	import { computed, provide, ref } from 'vue'
	import { AuthActions } from './store/auth/actions'
	import { AuthMutations } from './store/auth/mutations'
	import { KeysMutations } from './store/keys/mutations'


	let store = useStore()
	store.dispatch(AuthActions.CHECK_AUTH)

	const loader = computed<boolean>({
		get: () => store.getters.getLoader,
		set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
	})

	const showMenu =ref(false)
	const showNotificationBar =ref(false)
	provide('showNotificationBar', showNotificationBar ) //Открыть из другого копонента

	const error  = computed({
		get: () => store.getters.getError,
		set: () => store.commit(AuthMutations.CLEAR_ERROR)
	})
	const isAuth = computed(() => store.getters.isAuthenticated)
	const errorMsg = computed(() => store.getters.getErrorMsg)
	const orderPositionLength = computed(() => store.getters.getOrderPositionLength)
	
</script>

<style lang="sass">
@import "./assets/sass/main.sass"

.show-enter-active, .show-leave-active 
  transition: all .2s ease

.show-enter-from, .show-leave-to 
  transform: translateX(-100px)
  opacity: 0


</style>
