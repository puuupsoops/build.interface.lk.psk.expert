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
					<div 
						:class="'sidebar-nav-text' + (modelValue==id ? ' active' : '') + (item.lock ? ' lock' : '')"
					>
						{{ item.title }} 
						<span
							v-if="item.lock"
							class="tooltip"
						>
							<img src="@/assets/img/icon/lock.svg"/>
							<span class="tooltiptext">Раздел находится в разработке</span>
						</span>

					</div>
			
			
			
				</div>
				<div v-if="item.children" :class="modelValue===id ? 'sidebar-nav-dropdown active':'sidebar-nav-dropdown'">
					<ul class="sidebar-nav-dropdown-list">
						<li
							v-for="(child, i) in item.children"
							:key="i"
						>
							<router-link
								tag="a"
								:to="child.link" 
								:class="'sidebar-nav-dropdown-link' + (child.lock ? ' lock':'')" 
								active-class="sidebar-nav-dropdown-link active"
							>
								{{ child.title }}
								<span
									v-if="child.lock"
									class="tooltip"
								>
									<img src="@/assets/img/icon/lock.svg"/>
									<span class="tooltiptext">Раздел находится в разработке</span>
								</span>
							</router-link>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<div class="sidebar-logo">
			<img src="@/assets/img/lamp.png"/>
			<div class="sidebar-logo-text">
				<span>Сделай лучше<br>наше сотрудничество</span>
			</div>
		</div>
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
				{title: 'Мои компании', link: null, lock: false, children: [
				]},
				{title: 'Рабочий стол', link: null, lock: false, children: [
					{title: 'Поиск товара', link: '/product', lock: false},
					{title: 'Заказы', link: '/orders', lock: false},
					{title: 'Отгрузки', link: '/shipments', lock: false},
					{title: 'Претензии', link:'/claims', lock: true},
					{title: 'Конструктор КП', link: '/kp', lock: true},
					{title: 'История', link: '/history', lock: true},
					
				]},
				{title: 'Логистика', link: '/settlements', lock: false, children: [
					{title: 'Заявка на отгрузку', link: '/shipments/request', lock: false},
					{title: 'Адреса Доставки', link: '/', lock: true},
				]},
				{title: 'Сертификаты', link: null, lock: true, children: [
					{title: 'Разрешительная', link: '/permissive', lock: true},
					{title: 'Нормативная', link: '/regulatory', lock: true},
					{title: 'Доп.Информация', link: '/dop_info', lock: true},
				]},
				{title: 'Взаиморасчеты', link: '/settlements', lock: true, children: [
					{title: 'Счета', link: '/bills', lock: true},
					{title: 'Реализации', link: '/realization', lock: true},
					{title: 'Корректировки', link: '/adjustments', lock: true},
					{title: 'Акты сверки', link: '/acts', lock: true},
					{title: 'ЭДО', link: '/edo', lock: true},
				]},
				{title: 'Каталог', link: null, lock: false, children: [
					{title: 'Электронный', link: '/catalog', lock: false},
					{title: 'Интерактивный', link: '/dop_info', lock: true},
				]},
				{title: 'Маркетинг', link: null, lock: true, children: [
					{title: 'Баннеры', link: '/banners', lock: true},
					{title: 'Фотографический материал', link: '/photo_mat', lock: true},
					{title: 'Обучающий материал', link: '/ed_mat', lock: true},
					{title: 'Интеграции', link: '/ingration', lock: true},
				]},
				{title: 'Novelty', link: '/Novelty', lock: true, children: null },
				{title: 'Контакты', link: '/contacts', lock: true, children: null},
				{title: 'Help', link: '/help', lock: true, children: null},
			]
			let arr = [];
			if (!store.getters.isCompanysLoad) {
				store.dispatch('GET_PARTNER');
			}
			store.getters.getCompanys.forEach(element => {
				arr.push({title: element.name
											.replace(/Общество с ограниченной ответственностью/, 'ООО')
											.replace(/Акционерное общество/, 'АО'),
						link: '/company/'+element.uid,
						lock: false,
						})	
			});
			arr.push({title: 'Договоры', link: '/agreements', lock: true});
			arr.push({title: 'Аналитика', link: '/analytics', lock: true});
			arr.push({title: 'Программа лояльности', link: '/loyalty', lock: true});
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
