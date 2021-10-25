<template>
	<div class="sidebar-menu">
		<div style="margin: 0 0 0 170px; display: inline-flex;">
			Debug
			<label class="sidebar-switch">
				<input id="input" v-model="isDebug" type="checkbox" />
				<div></div>
			</label>
		</div>
		<div class="sidebar-heading">{{modelValue==-1 ? 'Мои компании': menu[modelValue].title}}</div>
		<ul class="sidebar-nav">
			<li
				class="sidebar-nav-elem "
				v-for="(item, id) in menu"
				:key="id"
			>
				<div class="sidebar-nav-elem-wrap"
					@click="modelValue === id ? $emit('update:modelValue', -1) : $emit('update:modelValue',  id) "
				>
					<div class="sidebar-nav-arrow" v-if="item.children">
						<img
							:class="modelValue===id ? 'sidebar-nav-arrow active': 'sidebar-nav-arrow'"
							src="@/assets/img/icon/arrow-nav-r.svg"
							alt=""
							/>
					</div>
					<div :class="modelValue===id ? 'sidebar-nav-text active' : 'sidebar-nav-text'">{{item.title}}</div>
				</div>
					<div v-if="item.children" :class="modelValue===id ? 'sidebar-nav-dropdown active':'sidebar-nav-dropdown'">
						<ul class="sidebar-nav-dropdown-list">
							<li
								v-for="(child, i) in item.children"
								:key="i"
							>
								<router-link tag="a" :to="child.link" class="sidebar-nav-dropdown-link">{{child.title}}</router-link>
							</li>
						</ul>
					</div>

			</li>	
		</ul>
		
	</div>

</template>

<script>
import { computed, inject } from 'vue';
import { useStore } from 'vuex';

export default {
	props: {
		modelValue: {
			type: Number,
			reqired: true
		}
	},
	emits: ['update:modelValue'],
	setup(){
		const store = useStore();
		let isDebug = inject('isDebug');
		let menu = computed(() => {
			let menu_start = [
				{title: 'Мои компании', link: null , children: [
				]},
				{title: "Рабочий стол", link: null, children: [
					{title: "Заказы", link: '/orders'},
					{title: "Отгрузки", link: '/shipments'},
					{title: "Претензии", link: '/claims'},
					{title: "Возвраты", link: '/returns'},
					{title: "Аналитика", link: '/analytics'},
				]},
				{title: 'Взаиморасчеты', link: null, children: [
					{title: "Счета", link: '/bills'},
					{title: "Реализации", link: '/realization'},
					{title: "Корректировки", link: '/adjustments'},
					{title: "Акты", link: '/acts'},
					{title: "ЭДО", link: '/edo'},
				]},
				{title: 'Сертификаты', link: null, children: [
					{title: "Разрешительная", link: '/permissive'},
					{title: "Нормативная", link: '/regulatory'},
					{title: "Доп.Информация", link: '/dop_info'},
				]},
				{title: 'Каталог', link: null, children: [
					{title: "Электронный", link: '/dop_info'},
					{title: "Интерактивный", link: '/dop_info'},
				]},
				{title: 'Акции и Предложения', link: '/promotions', children: null},
				{title: 'Скидки', link: '/sale', children: null},
				{title: 'Контакты', link: '/contacts', children: null},
				{title: 'Помощь', link: '/help', children: null},
			]
			let arr = [];
			if (!store.getters.isCompanysLoad) {
				store.dispatch('GET_PARTNER');
			}
			store.getters.getCompanys.forEach(element => {
				arr.push({title: element.name
											.replace(/Общество с ограниченной ответственностью/, 'ООО')
											.replace(/Акционерное общество/, 'АО'),
							link: '/agreements'})	
			});
			arr.push({title: 'Договоры', link: '/company'})
			menu_start[0].children = arr;
			return menu_start;
		});
		return {
			menu,
			isDebug
		}
	}
}
</script>

<style lang="sass" scoped>
.expand-enter-active 
	animation: finished .5s reverse

.expand-leave-active 
	animation: finished .3s

@keyframes finished
	0%
		opacity: 1 
		top: 0
	50%
		opacity: 1 
		top: 0
	60% 
		opacity: 1
	100% 
		opacity: 0 
		top: -100vh

</style>