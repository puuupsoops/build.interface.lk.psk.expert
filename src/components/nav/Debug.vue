<template>

	<transition name="fade" >
		
		<div class="top-line-info" v-if="isDebug">
			<nav >
				<ul class="nav-list">
					<li><router-link tag="a" to="/" class="nav-link" active-class="nav-link active">Главнаяя (тест)</router-link></li>
					<li><router-link tag="a" to="/catalog" class="nav-link" active-class="nav-link active">Каталог (тест)</router-link></li>
					<li><router-link tag="a" to="/company" class="nav-link" active-class="nav-link active">Страница компании (тест)</router-link></li>
					<li><router-link tag="a" to="/product" class="nav-link" active-class="nav-link active">Страница продукт (тест)</router-link></li>
					<li><router-link tag="a" to="/product" class="nav-link" active-class="nav-link active">Страница продукт (тест)</router-link></li>
					<li><router-link tag="a" to="#" @click="logout" class="nav-link">Выход (тест)</router-link></li>
				</ul>
			</nav>
			<div class="top-line-info-close" @click="isDebug=!isDebug"></div>
		</div>
	</transition>


</template>

<script>

import { inject } from 'vue';
import { useStore } from 'vuex'

export default {
	
	setup(){
		let store = useStore();
		let isDebug = inject('isDebug');
		return{
			isDebug,
			logout: ()=>store.dispatch('LOGOUT'),
		}
	}	
}
</script>


<style lang="sass" scoped>

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter,.fade-leave-to
  opacity: 0

</style>
