<template>

<div class="company-head-item documents">
	<div class="content-elem">
		<div class="company-head-item-title">Документы</div>
		<ul class="company-head-list">
			<li class="company-head-list-elem"
					v-for="(document, id) in data"
					:key="id"
					>
				<img class="company-head-list-img" src="img/icon/doc.svg" alt="">
				<a class="company-head-list-link" href="#">ЭС - счёт №{{document.number}} от {{document.date_str}}</a>
			</li>
			</ul><a class="company-head-btn" href="">Подробнее</a>
	</div>
</div>

</template>

<script>
export default {
	props:{
		data: {
			type: Array
		}
	},
};
</script>

<style>
</style>