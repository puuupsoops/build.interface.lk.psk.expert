<template>
<div>
	<top-nav></top-nav>
	<div class="not-found">
		<h2>
			<div class="title">500 Internal Server Error</div>
		</h2>
		
		<div class="subtitle">Упс, случилась ошибка. Но мы скоро все поправим.</div>
		<div class="subtitle"> <router-link to="/" tag="a">на главную</router-link></div>
	</div>
</div>
</template>

<script lang="ts">
import TopNav from '/src/components/nav/TopNav.vue'

import { defineComponent } from 'vue'

export default defineComponent({
	components:{
		TopNav
	},
	setup() {
		
	},
})
</script>

<style lang="sass" scoped>
.not-found
	min-height: 50vh
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column

.title
	padding: 40px
</style>