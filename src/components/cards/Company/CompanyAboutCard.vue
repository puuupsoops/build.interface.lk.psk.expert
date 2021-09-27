<template>

		<div class="company-head-about content-elem">
			<div class="company-head-about-info">
				<div class="company-head-about-title">{{data.name}}</div>
				<div class="company-head-about-wrap">
					<a class="company-head-about-add" href="">
						<img
							class="company-head-about-add-img"
							src="img/icon/doc-add.svg"
							alt=""
						/>Добавить заказ
					</a>
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">Город</span
						><span class="company-head-about-text-bottom">{{data.city}}</span>
					</div>
				</div>
				<div class="company-head-about-text-wrap">
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">ИНН </span
						><span class="company-head-about-text-bottom">{{data.inn}}</span>
					</div>
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">Телефон</span
						><span class="company-head-about-text-bottom">{{data.phone}}</span>
					</div>
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">БИК </span
						><span class="company-head-about-text-bottom">{{data.bik}}</span>
					</div>
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">E-mail</span
						><span class="company-head-about-text-bottom">{{data.email}}</span>
					</div>
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">Р/сч</span
						><span class="company-head-about-text-bottom"
							>{{data.payment}}</span
						>
					</div>
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">Адрес</span
						><span class="company-head-about-text-bottom"
							>{{data.address}}</span
						>
					</div>
					<div class="company-head-about-text">
						<span class="company-head-about-text-top">К/сч</span
						><span class="company-head-about-text-bottom"
							>{{data.correspondent}}</span
						>
					</div>
				</div>
			</div>
			<div class="company-head-about-btn-wrap">
				<a class="company-head-about-btn" href="#" 
						>Договора</a
				><a class="company-head-about-btn"  href="#" 
						>Редактировать</a>
			</div>
		</div>

</template>

<script>
export default {
		props: {
				data: {
						type: Object,
						required: true
				}
		},
		setup(){
			return {}
		}
};
</script>

<style>
</style>