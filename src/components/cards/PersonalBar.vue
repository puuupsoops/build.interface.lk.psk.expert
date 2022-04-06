<template>
	<div class="top-line-button">
			<Mail />
			<Bell 
				:amount = "3"
			/>
			<Avatar 
				:image = null
			/>
	</div>
</template>

<script lang="ts">
import Mail   from '@/components/ui/personal/buttons/Mail.vue'
import Bell   from '@/components/ui/personal/buttons/Bell.vue'
import Avatar from '@/components/ui/personal/buttons/Avatar.vue'

import { defineComponent } from 'vue';

export default defineComponent({
	components: {
		Mail,
		Bell,
		Avatar
	}
})
</script>

<style>
</style>