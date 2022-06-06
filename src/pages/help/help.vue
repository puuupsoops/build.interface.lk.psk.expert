<template>
	<div class="help">
		<transition name="show" mode="out-in">
			<component 
					:is="'help'+data.card" 
					@next="data.card = data.card + 1"
				/>
		</transition>
		<div>
			pagination
		</div>
	</div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import help1 from '@/components/cards/help/help1.vue'
import help2 from '@/components/cards/help/help2.vue'

export default defineComponent({
	components: {
		help1,
		help2,
	},
	setup(){
		const data = ref({
			card: 1,
		})
		return{
			data
		}
	}
})
</script>

<style>

</style>