<template>
	<nav class="nav">
		<ul class="nav-list">
			<li 
				v-for="(item, index) in menu" :key="index"
			>
				<router-link
							tag="a"
							class="nav-link" 
							active-class="nav-link active"
							:to="item.link">{{ item.title }}</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	setup(){
		const menu = [
			{title: 'Поиск товара', link: '/product'},
			{title: 'Заказы', link: '/order'},
			{title: 'Отгрузки', link: '/shipments'},
			{title: 'Претензии', link: '/claims'},
			{title: 'Возвраты', link: '/returns'},
			{title: 'Договоры', link: '/agreements'},
			{title: 'Взаиморасчеты', link: '/settlements'},
		];
		return {
			menu
		}
	}
}
</script>