<script setup lang="ts">
import { Manager } from '/src/models/Manager';
import ManagerCard from '/src/components/cards/ManagerCard.vue';

defineProps({
	managers: {
		type: Array<Manager>,
		required: true,
        default: []
	},
});
</script>
<template>
    <div class="company-consultant" style="display: flex; flex-direction: column; row-gap: 16px;">
        <ManagerCard v-for="(manager, idx) in managers" :key="idx" :manager="manager" />
    </div>
</template>