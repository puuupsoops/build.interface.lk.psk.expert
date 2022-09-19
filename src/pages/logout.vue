<template>
	<div class="not-found">
		<h2>
			<div class="title">Logout</div>
		</h2>
	</div>
</template>

<script setup lang="ts">

import { useStore } from '/src/store'
import { AuthActions } from '../store/auth/actions'

const store = useStore();
store.dispatch(AuthActions.LOGOUT)
</script>

<style scoped lang="sass">


</style>