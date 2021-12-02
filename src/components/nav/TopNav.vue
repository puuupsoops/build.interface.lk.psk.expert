<template>
	<nav class="nav">
		<ul class="nav-list">
			<li 
				v-for="(item, index) in menu" :key="index"
			>
				<router-link
					tag="a"
					:class="'nav-link' +(item.lock ? ' lock':'')" 
					active-class="nav-link active"
					:to="item.link"
				>
							{{ item.title }}
							<span
									v-if="item.lock"
									class="tooltip"
								>
									<img src="@/assets/img/icon/lock.svg"/>
									<span class="tooltiptext">Раздел находится в разработке</span>
								</span>
							</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	setup(){
		const menu = [
			{title: 'Поиск товара', link: '/product', lock: false},
			{title: 'Заказы', link: '/orders', lock: false},
			{title: 'Отгрузки', link: '/shipments', lock: false},
			{title: 'Претензии', link: '/claims', lock: false},
			{title: 'Претензия', link: '/claim', lock: false},
			{title: 'Претензия-страница-успешно', link: '/claim_success', lock: false},
			//{title: 'Возвраты', link: '/returns', lock: true},
			{title: 'Договоры', link: '/agreements', lock: true},
			{title: 'Взаиморасчеты', link: '/settlements', lock: true},
		];
		return {
			menu
		}
	}
}
</script>