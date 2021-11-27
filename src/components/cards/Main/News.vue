<template>

		<a class="news" href="https://psk.expert/novosti/" v-if="isLoad">
			
			<div class="news-img-box">
				<img class="news-img" :src="news.image" alt="">
			</div>
			<div class="news-text">
				<div class="news-heading">
					<div class="news-heading-text">
						<span v-html="news.title"></span>
					</div>
					<div class="news-heading-date">
						<span v-html="news.date"></span>
					</div>
				</div>
				<div class="news-description">
					<span v-html="news.text"></span>
				</div>
			</div>
		</a>
		

</template>

<script>

import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();
		const loader = ref(false);
		
		onMounted(() => {
			if (!store.getters.isNews) {
				loader.value=true;
				store.dispatch('GET_NEWS')
					.finally(() => {
						loader.value=false;
					})
			}
		});
		return {
			isLoad: computed(() => store.getters.isNews),
			news: computed(() => store.getters.getOneNews),
		}
	}
}
</script>
