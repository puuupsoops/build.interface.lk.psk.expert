<template>
	<div class="not-found">
		<h2>
			<div class="title">404 Not found</div>
		</h2>
		
		<div class="subtitle"> Сейчас на этой странице ничего нет, но скоро появится</div>
		<div class="subtitle"> <router-link to="/" tag="a">на главную</router-link></div>
	</div>
</template>
<script>
	
</script>
<style lang="sass" scoped>
.not-found
	min-height: 50vh
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column

.title
	padding: 40px
</style>