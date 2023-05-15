<template>


		<div class="company-calendar-box content-elem">
			<form class="company-search-wrap" action="">
				<div class="company-search-input-wrap">
					<input class="company-search-input" type="text" placeholder="Поиск">
						<img class="company-search-input-clear" src="/src/assets/img/icon/cross.svg" alt="">
				</div>
				<button class="company-search-btn gradient-btn"><img class="company-search-btn-img" src="/src/assets/img/icon/search.svg" alt=""></button>
			</form>
			<FullCalendar ref="fullCalendar" :options='calendarOptions'></FullCalendar>
		</div>
</template>

<script setup lang="ts">
import '@fullcalendar/core/vdom' // ! add it
import '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import ruLocale from '@fullcalendar/core/locales/ru'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, computed, onUpdated, watch, inject, PropType } from 'vue'
import { Document } from '/src/models/Partner'

const props = defineProps({
		data: {
			type: Array as PropType<Document[]>
		}
	})
const fullCalendar = ref()
const docDate = ref(inject<string>('docDate') ?? '')

watch(docDate, (v: string)=>{
	const calendarApi = fullCalendar.value.getApi()
	calendarApi.gotoDate(new Date (v) )
})

onUpdated(()=>{
	let calendarApi = fullCalendar.value.getApi()
	calendarApi.today()
})
		
let eventsArr = computed( () => props.data === null ? [] : props.data )

let calendarOptions = computed( () => ({
		plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
		headerToolbar: {
			left: 'today prev,next',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},
		initialView: 'dayGridMonth',
		duration: { days: 3 },
		locale: ruLocale,
		events: eventsArr.value ? eventsArr.value.map(doc => {
												return {
													//"title": `Счёт от ${doc.date} на ${doc.debt}₽`,
													"title": `УПД ${doc.number} на ${doc.debt}₽`,
													"start": doc.expires_date,
													"backgroundColor": '#378006',
													"allDay": true,
													"display": 'block'}
											
												}) : [],
		
	}))
</script>

<style lang="sass">

.fc-event-title
  white-space: normal

</style>