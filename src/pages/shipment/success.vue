<template>
	<div>
		
		<top-nav></top-nav>

					<div class="claim-success">
					<div class="claim-success-wrap">
						<div class="claim-succes-img"><img src="@/../public/upload/icon/success.svg" alt=""></div>
						<div class="claim-success-text">Спасибо, заявка на отгрузку №{{id}} принята.</div>
						<div class="claim-success-text"> <router-link to="/shipments" tag="a">Перейти к отгрузкам</router-link></div>
					</div>
				</div>
	</div>
</template>

<script>
import TopNav from "@/components/nav/TopNav";

import { useStore } from 'vuex'
import { key } from '@/store'
import { computed, defineComponent }from 'vue';

export default defineComponent({
	components: {
		TopNav,
	},
	setup() {
		const store = useStore(key);

		return {
			id: computed(() => store.getters.getShipmentsSuccess)
		}
	},
})
</script>

<style>

</style>