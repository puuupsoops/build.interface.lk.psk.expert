<template>
<div class="ui-datepicker-date" ref="target" >
	<div >
		<input
			:class="active ? ' active' : ''"
			type="text" placeholder="Выберите дату"
			name="date" 
			autocomplete="off" 
			readonly
			:value="dateText"
			@focus="active = true"
		>
	</div>

	<div
		:class="'ui-datepicker' + (active ? ' active' : '')" 
	>
		<div class="ui-datepicker-header">
			<svg
				class="ui-datepicker-prev"
				title="<Пред"
				@click="delta=delta-1" 
				width="13" height="24" viewBox="0 0 13 24" xmlns="http://www.w3.org/2000/svg">
				<rect width="1.68273" height="16.8273" rx="0.841366"  transform="matrix(0.702321 0.71186 -0.702321 0.71186 11.8181 0)" fill="#53565B"/>
				<rect width="1.68273" height="16.8273" rx="0.841366" transform="matrix(0.702321 -0.71186 -0.702321 -0.71186 11.8181 24)" fill="#53565B"/>
			</svg>

			<div class="ui-datepicker-title">
				<span class="ui-datepicker-month">{{genDay.month.month}}</span>&nbsp;<span class="ui-datepicker-year">{{genDay.year}}</span>
			</div>
			
			<svg
				class="ui-datepicker-next" 
				title="След>"
				@click="delta=delta+1"
				width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="1.68273" height="16.8273" rx="0.841366" transform="matrix(-0.702322 0.71186 0.702322 0.71186 1.73828 0)" fill="#53565B"/>
				<rect width="1.68273" height="16.8273" rx="0.841366" transform="matrix(-0.702322 -0.71186 0.702322 -0.71186 1.73828 24)" fill="#53565B"/>
			</svg>

		</div>
		<table class="ui-datepicker-calendar">
			<thead>
				<tr>
					<th scope="col"><span title="понедельник">Пн</span></th>
					<th scope="col"><span title="вторник">Вт</span></th>
					<th scope="col"><span title="среда">Ср</span></th>
					<th scope="col"><span title="четверг">Чт</span></th>
					<th scope="col"><span title="пятница">Пт</span></th>
					<th scope="col"><span title="суббота">Сб</span></th>
					<th scope="col" class="ui-datepicker-week-end"><span title="воскресенье">Вс</span></th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, key) in genDay.dateArr"
					:key="key"
				>
					<td 
						v-for="(dt, k) in item"
						:key="k"
						:class="(dt.disable ? ' disable':'') + (dt.today ? ' today':'') + (dt.select ? ' select':'')"
						@click="!dt.disable ? select_date(genDay.year, genDay.month.month_int, dt.day) : ''"
					>
						<span
						>
							{{dt.day}}
						</span>
					</td>
				
				</tr>

			</tbody>
		</table>
	</div>
</div>
</template>

<script>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
	props:{
		modelValue: {
			type: Date,
			default: null,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const delta = ref(0);
		const target = ref(null);
		const active = ref(false);
	
		onClickOutside(target, () => active.value=false);
	
		const dateText = computed(()=>props.modelValue ? props.modelValue.toLocaleString().substr(0, 10) : '');
		const genDay = computed( () => {
			//вернет массив с датами за текущий месяц + дельта
			let now = new Date();
			now.setHours(0, 0, 0, 0);
			let dt = new Date();
	
			if (props.modelValue) dt= new Date(props.modelValue);

	
			dt.setMonth(dt.getMonth() + delta.value);
			dt = new Date(dt.toISOString().substr(0, 7) + '-01');
			let month = dt.toLocaleString('default', { month: 'long' });
			month=month.charAt(0).toUpperCase() + month.slice(1);
			let month_int = dt.getMonth();
			let year = dt.getFullYear();
			let dateArr = [];
			let el = [];
			dt = new Date(dt.getFullYear(), dt.getMonth(),  dt.getDay() == 1 ? -6 : 2-dt.getDay());
			for (let i=1; i<=42; i++){
				let day = dt.getDate()
				let select = false;
				if (props.modelValue) 
					select = dt.getTime()  === props.modelValue.getTime()
				
				el.push({
					day,
					disable: (dt < now ||  dt.getMonth() != month_int),
					today: dt.getMonth() == now.getMonth()&& dt.getDate() == now.getDate() && dt.getFullYear() == now.getFullYear(),
					select,
				});
	

				dt=new Date(dt.getFullYear(), dt.getMonth(), day+1);
				if (i % 7 == 0){
					dateArr.push(el);
					el = [];
				}
			}
			return {year, month: {month, month_int}, dateArr}
		})

		const select_date = (year, month, day) => {
			let dt= new Date(year, month, day);
			emit('update:modelValue', dt);
			active.value = false;
		}

		return{
			select_date,
			dateText,
			genDay,
			active,
			target,
			delta
		}
	}
}

</script>