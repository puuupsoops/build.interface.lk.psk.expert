<template>

		
<transition appear name="slide-fade">
	<div class="notification" v-if="modelValue">
		<div class="notification-card">  
			<div class="notification-text">
					<span v-html="message"></span>
			</div>
			<div class="notification-close" @click="$emit('update:modelValue', !modelValue)"></div>
		</div>
	</div>
</transition>

</template>

<script>
import { watch } from 'vue'

export default {
		props: {
			modelValue: {
				type: Boolean,
				required: true
			},
			message: {
				type: String
			},
			timeout: {
				default: 10000,
				type: Number,
			}
		},
		emits: ['update:modelValue'],
		setup(props, { emit }){				
			watch(() => props.modelValue, () => {
				if (props.modelValue) 
					setTimeout(()=>{emit('update:modelValue',false)}, props.timeout)
			})
			return {
			}
		}
}
</script>

<style lang="sass">

.slide-fade-enter-from 
	transform: translateY(50px)
	opacity: 0

.slide-fade-enter-active 
	transition: all 0.3s ease 0.3s

.slide-fade-enter-to 
	transform: translateY(0px)
	opacity: 1

.slide-fade-leave-from 
	/* default opacity: 1;*/

.slide-fade-leave-active 
	transition: opacity .3s

.slide-fade-leave-to 
	opacity: 0



</style>