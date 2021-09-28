<template>

<div class="company-calendar-wrap">
					<div class="company-calendar-box content-elem">
						<form class="company-search-wrap" action="">
							<div class="company-search-input-wrap">
								<input class="company-search-input" type="text" placeholder="Поиск">
									<img class="company-search-input-clear" src="img/icon/cross.svg" alt="">
							</div>
							<button class="company-search-btn gradient-btn"><img class="company-search-btn-img" src="img/icon/search.svg" alt=""></button>
						</form>
						<FullCalendar ref="fullCalendar" :options='calendarOptions'></FullCalendar>
					</div>
					<div class="company-consultant">
						<div class="company-consultant-wrap content-elem">
							<div class="company-consultant-info">
								<div class="company-consultant-img-box"><img class="company-consultant-img" src="img/consultant.jpg" alt=""></div>
								<div class="company-consultant-info-box">
									<div class="company-consultant-info-about"> 
										<div class="company-consultant-name">Приходько Катерина Павловна</div>
										<div class="company-consultant-position">Персональный менеджер</div>
									</div>
									<div class="company-consultant-contact"><a class="company-consultant-phone" href="tel:+89081234567">8 908 123 45 67</a><a class="company-consultant-phone" href="tel:+89081234567">8 908 123 45 67</a></div>
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
				</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ref, computed, onUpdated } from 'vue';

export default {
	components:{
		FullCalendar
	},
	props:{
		data: {
			type: Array
		}
	},
	setup(props){
		const fullCalendar = ref(null);

		onUpdated(()=>{
			//console.log(fullCalendar.value);
			let calendarApi = fullCalendar.value.getApi();
			calendarApi.today();
		});

		let calendarOptions = computed( () => ({
				plugins: [ dayGridPlugin, interactionPlugin ],
				initialView: 'dayGridMonth',
				locale: ruLocale,
				events: props.data.map(doc => ({
														"title": 'Счёт №' + doc.number + '\n от ' + doc.date_str,
														"start": doc.expires,
														"backgroundColor": '#378006',
														"allDay": true,
														"display": 'block',
													
														})),
				
			}));
		return {
			calendarOptions,
			fullCalendar
		}
	},
};
</script>

<style>

.fc-event-title {
	white-space: normal;
}

</style>