<template>
	<div
		class="top-line-account"
		@click="menu = !menu"
	>
		<div class="top-line-account-img-box">
			<img class="top-line-account-img" src="/src/assets/img/user.png" alt="" />
		</div>
		<div
				ref="target"
				:class="'top-line-dropdown ' + (menu ? ' active': '')"
			>
					<router-link 
						tag="a"
						class="top-line-dropdown-link"
						to="/profile"
					>Профиль</router-link>
					<a class="top-line-dropdown-link lock">Уведомления
								<span class="tooltip">
									<img src="/src/assets/img/icon/lock.svg"/>
									<span style="left: -120px;top: -20px" class="tooltiptext">Раздел находится в разработке</span>
								</span>
					</a>
					<a class="top-line-dropdown-delimiter"></a>
					<a class="top-line-dropdown-link" @click="logout" >Выход</a>
				
			</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onClickOutside } from '@vueuse/core'

	import { useStore } from '/src/store'
	import { AuthActions } from '/src/store/auth/actions'

	const props = defineProps({
							image:{
								type: String,
							}
						})
	const store = useStore()
	const menu = ref(false)
	const target = ref(null)

	onClickOutside(target, () => {
		menu.value = false
	})

	const logout = ()=>store.dispatch(AuthActions.LOGOUT)

</script>

<style>
</style>