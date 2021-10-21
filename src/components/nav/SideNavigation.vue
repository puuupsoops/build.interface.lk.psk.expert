<template>
	<div class="sidebar-menu">
		<div class="sidebar-heading">Моя компания</div>
		<ul class="sidebar-nav">
			<li
				class="sidebar-nav-elem "
				v-for="(item, id) in menu"
				:key="id"
			>
				<div class="sidebar-nav-elem-wrap"
					@click="active === id ? active = -1 : active = id "
				>
					<div class="sidebar-nav-arrow" v-if="item.children">
						<img
							:class="active===id ? 'sidebar-nav-arrow active': 'sidebar-nav-arrow'"
							src="@/assets/img/icon/arrow-nav-r.svg"
							alt=""

							/>
				
					</div>
					<div :class="active===id ? 'sidebar-nav-text active' : 'sidebar-nav-text'">{{item.title}}</div>
				</div>
					<div v-if="item.children" :class="active===id ? 'sidebar-nav-dropdown active':'sidebar-nav-dropdown'">
						<ul class="sidebar-nav-dropdown-list">
							<li
								v-for="(child, i) in item.children"
								:key="i"
							>
								<a class="sidebar-nav-dropdown-link" href="/test/company/contracts/">
									{{child.title}}
								</a>
							</li>
						</ul>
					</div>

			</li>	
		</ul>

	</div>

</template>

<script>
import { ref } from 'vue';

export default {
	setup(){
		let active = ref(-1)
		let menu = ref([
			{title: 'Мои компании', link: null , children: [
				{title: 'Договоры', link: '/agreements'},
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
		])
		return{
			menu,
			active
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