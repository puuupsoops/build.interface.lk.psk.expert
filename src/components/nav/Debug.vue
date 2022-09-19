<template>

	<transition name="fade" >
		
		<div class="top-line-info" v-if="isDebug">
			<nav >
				<ul class="nav-list" style="flex-wrap: nowrap;">
					<li><router-link tag="a" to="/" class="nav-link" active-class="nav-link active">Главная</router-link></li>
					<li><router-link tag="a" to="/catalog" class="nav-link" active-class="nav-link active">Каталог</router-link></li>
					<li><router-link tag="a" to="/company" class="nav-link" active-class="nav-link active">Компании</router-link></li>
					<li><router-link tag="a" to="/product" class="nav-link" active-class="nav-link active">Продукт</router-link></li>
					<li><router-link tag="a" to="/order" class="nav-link" active-class="nav-link active">Заказ</router-link></li>
					<li><router-link tag="a" to="/orders" class="nav-link" active-class="nav-link active">Заказы</router-link></li>
					<li><router-link tag="a" to="/personal" class="nav-link" active-class="nav-link active">Личное</router-link></li>
					<li><router-link tag="a" to="/shipments" class="nav-link" active-class="nav-link active">Отгрузки</router-link></li>
					<li><router-link tag="a" to="#" @click="logout" class="nav-link">Выход</router-link></li>
				</ul>
			</nav>
			<div class="top-line-info-close" @click="isDebug=!isDebug"></div>
		</div>
	</transition>


</template>

<script lang="ts">

;
import { AuthActions } from '/src/store/auth/actions';
import { KeysMutations } from '/src/store/keys/mutations';
import { computed, defineComponent } from 'vue';
import { useStore } from '/src/store'

export default defineComponent({
	
	setup(){
		const store = useStore()
		const isDebug = computed<boolean>({
			get: () => store.getters.getIsDebug,
			set: (val: boolean) => store.commit(KeysMutations.SET_IS_DEBUG, val)
		})
		return{
			isDebug,
			logout: ()=>store.dispatch(AuthActions.LOGOUT),
		}
	}	
})
</script>


<style lang="sass" scoped>

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter,.fade-leave-to
  opacity: 0

</style>
