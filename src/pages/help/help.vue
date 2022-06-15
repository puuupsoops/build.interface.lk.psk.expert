<template>
	<div class="help">
		<div class="help-wrap">
			<transition name="show" mode="out-in">
				<component :is="'help'+data.card" />
			</transition>
			
			<div class="help-btn">
				<router-link class="help-btn-close"
					tag="a"
					to="/" 
				>
					Закрыть
				</router-link>
				
				<div class="help-btn-next"
					:class="{disabled:  data.card >=  data.max_card}"
					@click=" data.card < data.max_card ? data.card = data.card + 1: false">
					<span>Далее</span>
				</div>
				<div class="help-btn-back"
					:class="{disabled:  data.card == 1}"
					@click=" data.card > 1 ? data.card = data.card - 1: false">
					<span>назад</span>
				</div>
			</div>
		</div>	
		<div>
			<div class="help-slider-controls">
				<span
					v-for="key in [...Array(data.max_card).keys()]"
					:key="key"
				>
					<input type="radio" :id="key" @click="data.card = key+1">
					<label :for="key" :class="{checked: data.card == key+1 }" ></label>
					
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import help1 from '@/components/cards/Help/help1.vue'
import help2 from '@/components/cards/Help/help2.vue'
import help3 from '@/components/cards/Help/help3.vue'
import help4 from '@/components/cards/Help/help4.vue'
import help5 from '@/components/cards/Help/help5.vue'
import help6 from '@/components/cards/Help/help6.vue'
import help7 from '@/components/cards/Help/help7.vue'
import help8 from '@/components/cards/Help/help8.vue'
import help9 from '@/components/cards/Help/help9.vue'
import help10 from '@/components/cards/Help/help10.vue'

export default defineComponent({
	components: {
		help1,
		help2,
		help3,
		help4,
		help5,
		help6,
		help7,
		help8,
		help9,
		help10,
	},
	setup(){
		const data = ref({
			card: 1,
			max_card: 10,
		})
	
		return{
			data
		}
	}
})
</script>

<style>

</style>