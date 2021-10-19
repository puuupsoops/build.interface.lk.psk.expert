<template>

		
<transition appear name="slide-fade">
	<div class="notification" v-if="modelValue">
		<div class="notification-card">  
			<div class="notification-text">
					{{message}}
			</div>
			<div class="notification-close" @click="$emit('update:modelValue', !modelValue)"></div>
		</div>
	</div>
</transition>

</template>

<script>
import { ref } from 'vue'

export default {
		props: {
			modelValue: {
				type: Boolean,
				required: true
			},
			message: {
				type: String
			},
		},
		emits: ['update:modelValue'],
		setup(){
				let show = ref(true)
				return {
						show
				}
		}
}
</script>

<style lang="sass">

.slide-fade-enter-from 
	transform: translateY(50px)
	opacity: 0

.slide-fade-enter-active 
	transition: all 0.5s ease 0.5s

.slide-fade-enter-to 
	transform: translateY(0px)
	opacity: 1

.slide-fade-leave-from 
	/* default opacity: 1;*/

.slide-fade-leave-active 
	transition: opacity .5s

.slide-fade-leave-to 
	opacity: 0



</style>