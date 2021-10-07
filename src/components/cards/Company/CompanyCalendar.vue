<template>

<div id="CompanyCalendar">
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
		<ManagerCard></ManagerCard>
	</div>
</div>
</template>

<script>
import ManagerCard from '@/components/cards/ManagerCard';
import FullCalendar from '@fullcalendar/vue3';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ref, computed, onUpdated, watch, inject } from 'vue';

export default {
	components:{
		FullCalendar,
		ManagerCard,
	},
	props:{
		data: {
			type: Array
		}
	},
	setup(props){
		const fullCalendar = ref(null);
		const docDate = inject('docDate');

		watch(docDate, (v)=>{
			let calendarApi = fullCalendar.value.getApi();
			calendarApi.gotoDate(new Date (v) );
			});

		onUpdated(()=>{
			let calendarApi = fullCalendar.value.getApi();
			calendarApi.today();
		});
		
		let eventsArr = computed( () => props.data === null ? [] : props.data );

		let calendarOptions = computed( () => ({
				plugins: [ dayGridPlugin, interactionPlugin ],
				initialView: 'dayGridMonth',
				locale: ruLocale,
				events: eventsArr.value.map(doc => ({
														"title": `Счёт №${doc.number} от ${doc.date_str} на ${doc.debt}₽`,
														"start": doc.expires,
														"backgroundColor": '#378006',
														"allDay": true,
														"display": 'block',
													
														})),
				
			}));
		return {
			calendarOptions,
			fullCalendar,
			eventsArr,
			docDate
		}
	},
};
</script>

<style>

.fc-event-title {
	white-space: normal;
}

</style>