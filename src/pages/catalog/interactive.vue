<template>
<div>
	<top-nav newOrder></top-nav>
	<div style="min-height: 800px; padding-top: 30px">
		<iframe
			width="100%" height="800vh"
			src="/catalog/mobile/index.html"
			frameborder="0" >
		</iframe>
	</div>
</div>
</template>

<script lang="ts">
import TopNav from "@/components/nav/TopNav.vue"

import {defineComponent } from 'vue'

export default defineComponent({
		components:{
			TopNav,
		},

		setup(){
			
			return {
				
			}
		}
})
</script>

<style scoped>
</style>