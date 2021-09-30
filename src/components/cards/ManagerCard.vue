<template>
	<div class="company-consultant">
		<div class="company-consultant-wrap content-elem">
			<div class="company-consultant-info">
				<div class="company-consultant-img-box"><img class="company-consultant-img" src="img/consultant.jpg" alt=""></div>
				<div class="company-consultant-info-box">
					<div class="company-consultant-info-about"> 
						<div class="company-consultant-name">{{data.name}}</div>
						<div class="company-consultant-position">Персональный менеджер</div>
					</div>
					<div class="company-consultant-contact">
						<a v-for="(phone, i) in data.phones"
							:key="i"
							class="company-consultant-phone" :href="'tel:'+phone">{{phone}}
						</a>
					</div>
					<div class="company-consultant-time">
						<div class="company-consultant-time-title">Режим работы</div>
						<div class="company-consultant-time-val">Пн-Пт, 9:00 - 18:00 МСК</div>
					</div>
				</div>
			</div>
				<a class="company-consultant-mail" href="mailto:test@text.com">
					<img class="company-consultant-mail-img" src="img/icon/mail-send.svg" alt="">Написать
			</a>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		data: {
			type: Object
		}
	},
	setup(){

	}
}
</script>

<style>
	
</style>