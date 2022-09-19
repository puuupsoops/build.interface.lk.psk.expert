<template>
	<div>
		
		<top-nav></top-nav>

					<div class="claim-success">
					<div v-if="id == 0">
							<PreloaderLocal></PreloaderLocal>
						</div>
					<div class="claim-success-wrap" v-else>
						<div class="claim-succes-img"><img src="/src/../public/upload/icon/success.svg" alt=""></div>
						<div class="claim-success-text">Спасибо, заявка на отгрузку №{{id}} принята.</div>
						<div class="claim-success-text"> <router-link to="/shipments" tag="a">Перейти к отгрузкам</router-link></div>
					</div>
				</div>
	</div>
</template>

<script  setup lang="ts">
	import TopNav from '/src/components/nav/TopNav.vue'
	import PreloaderLocal from '/src/components/PreloaderLocal.vue'

	import { useStore } from '/src/store'
	
	import { computed  }from 'vue'

	const store = useStore()
	const id = computed(() => store.getters.getShipmentsSuccess)
		
</script>

<style>

</style>