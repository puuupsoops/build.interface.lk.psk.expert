<template>
	<div
		class="top-line-account"
		@click="$emit('click')"
	>
		<div class="top-line-account-img-box"
			:class="{'loading': loading}"
		>
			<img class="top-line-account-img" :src="image" v-if="image!=''"/>
			<img class="company-consultant-img" src="/src/assets/img/user.png" alt=""  v-else/>
		</div>

	</div>
</template>

<script setup lang="ts">
	import { ref, } from 'vue';

	const props = defineProps(
		{
			image:{
				type: String,
			},
			
			loading:{
				type: Boolean,
				default: false
			}
		})
	const emits = defineEmits(['click'])



</script>

<style>
</style>