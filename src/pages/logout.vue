<template>
	<div class="not-found">
		<h2>
			<div class="title">Logout</div>
		</h2>
	</div>
</template>

<script setup lang="ts">

import { useStore } from 'vuex'
import { AuthActions } from '../store/auth/actions'
import { key } from '/src/store'
const store = useStore(key);
store.dispatch(AuthActions.LOGOUT)
</script>

<style scoped lang="sass">


</style>