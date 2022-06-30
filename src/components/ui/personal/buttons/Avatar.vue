<template>
	<div
		class="top-line-account"
		@click="menu = !menu"
	>
		<div class="top-line-account-img-box">
			<img class="top-line-account-img" src="/src/assets/img/avatar.png" alt="" />
		</div>
		<div
				ref="target"
				:class="'top-line-dropdown ' + (menu ? ' active': '')"
			>
					<a class="top-line-dropdown-link lock">Профиль
								<span class="tooltip">
									<img src="/src/assets/img/icon/lock.svg"/>
									<span style="left: -120px;top: -20px" class="tooltiptext">Раздел находится в разработке</span>
								</span>
					</a>
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore } from 'vuex'
import { key } from '/src/store'
import { AuthActions } from '/src/store/auth/actions'

export default defineComponent({
		props:{
				image:{
						type: String,
				}
		},
		setup (){
			const store = useStore(key)
			const menu = ref(false)
			const target = ref(null)
			
			onClickOutside(target, () => {
				menu.value = false
			})
			return {
				//data
				menu,
				target,
				//method
				logout: ()=>store.dispatch(AuthActions.LOGOUT),
			}
		}
})
</script>

<style>
</style>