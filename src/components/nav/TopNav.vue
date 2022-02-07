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
		
			<li  class="nav-link last">
				<router-link v-if="newOrder"
						tag="a" 
						:to="'/order'"
						class="content-heading-btn"
					>
						<svg class="content-heading-btn-img" width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M3 2H18.75C19.3023 2 19.75 2.44772 19.75 3V11.5H21.75V3C21.75 1.34315 20.4069 0 18.75 0H3C1.34315 0 0 1.34315 0 3V21.8571C0 23.514 1.34315 24.8571 3 24.8571H16V22.8571H3C2.44772 22.8571 2 22.4094 2 21.8571V3C2 2.44772 2.44772 2 3 2Z" fill="#A5A7A9"></path>
						<rect class="fill" x="17.6071" y="5.17871" width="1.7" height="13.4643" rx="0.85" transform="rotate(90 17.6071 5.17871)" fill="#A5A7A9"></rect>
						<rect class="fill" x="10" y="13" width="1.7" height="6" rx="0.85" transform="rotate(90 10 13)" fill="#A5A7A9"></rect>
						<rect class="fill" x="14" y="9" width="1.7" height="10" rx="0.85" transform="rotate(90 14 9)" fill="#A5A7A9"></rect>
						<path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M20.8 15C20.2478 15 19.8 15.4477 19.8 16V19H16.8C16.2478 19 15.8 19.4477 15.8 20C15.8 20.5523 16.2478 21 16.8 21H19.8V24C19.8 24.5523 20.2478 25 20.8 25C21.3523 25 21.8 24.5523 21.8 24V21H24.8C25.3523 21 25.8 20.5523 25.8 20C25.8 19.4477 25.3523 19 24.8 19H21.8V16C21.8 15.4477 21.3523 15 20.8 15Z" fill="#A5A7A9"></path>
						</svg>
						<div class="content-heading-btn-text">Новый заказ</div>
				</router-link>
			
				<router-link v-if="shipments"
						tag="a" 
						:to="'/shipments/request'"
						class="content-heading-btn"
					>
						<svg class="content-heading-btn-img" width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="fill" d="M10.8337 20.6667H7.50033C7.04033 20.6667 6.66699 20.2933 6.66699 19.8333C6.66699 19.3733 7.04033 19 7.50033 19H10.8337C11.2937 19 11.667 19.3733 11.667 19.8333C11.667 20.2933 11.2937 20.6667 10.8337 20.6667Z" fill="#A5A7A9"></path>
						<path class="fill" d="M37.9176 20.6665H35.8342C35.3742 20.6665 35.0009 20.2932 35.0009 19.8332C35.0009 19.3732 35.3742 18.9998 35.8342 18.9998H37.2259L38.3492 13.0132C38.3342 9.94984 35.7176 7.33317 32.5009 7.33317H27.0292L24.3776 18.9998H29.1676C29.6276 18.9998 30.0009 19.3732 30.0009 19.8332C30.0009 20.2932 29.6276 20.6665 29.1676 20.6665H23.3342C23.0809 20.6665 22.8409 20.5515 22.6826 20.3532C22.5242 20.1565 22.4642 19.8965 22.5209 19.6498L25.5509 6.3165C25.6376 5.93484 25.9742 5.6665 26.3642 5.6665H32.5009C36.6359 5.6665 40.0009 9.0315 40.0009 13.1665L38.7359 19.9865C38.6626 20.3815 38.3192 20.6665 37.9176 20.6665Z" fill="#A5A7A9"></path>
						<path class="fill" d="M32.4997 23.9998C30.203 23.9998 28.333 22.1315 28.333 19.8332C28.333 17.5348 30.203 15.6665 32.4997 15.6665C34.7963 15.6665 36.6663 17.5348 36.6663 19.8332C36.6663 22.1315 34.7963 23.9998 32.4997 23.9998ZM32.4997 17.3332C31.1213 17.3332 29.9997 18.4548 29.9997 19.8332C29.9997 21.2115 31.1213 22.3332 32.4997 22.3332C33.878 22.3332 34.9997 21.2115 34.9997 19.8332C34.9997 18.4548 33.878 17.3332 32.4997 17.3332Z" fill="#A5A7A9"></path>
						<path class="fill" d="M14.1667 23.9998C11.87 23.9998 10 22.1315 10 19.8332C10 17.5348 11.87 15.6665 14.1667 15.6665C16.4633 15.6665 18.3333 17.5348 18.3333 19.8332C18.3333 22.1315 16.4633 23.9998 14.1667 23.9998ZM14.1667 17.3332C12.7883 17.3332 11.6667 18.4548 11.6667 19.8332C11.6667 21.2115 12.7883 22.3332 14.1667 22.3332C15.545 22.3332 16.6667 21.2115 16.6667 19.8332C16.6667 18.4548 15.545 17.3332 14.1667 17.3332Z" fill="#A5A7A9"></path>
						<path class="fill" d="M10.833 5.66667H4.16634C3.70634 5.66667 3.33301 5.29334 3.33301 4.83334C3.33301 4.37333 3.70634 4 4.16634 4H10.833C11.293 4 11.6663 4.37333 11.6663 4.83334C11.6663 5.29334 11.293 5.66667 10.833 5.66667Z" fill="#A5A7A9"></path>
						<path class="fill" d="M10.8337 10.6667H2.50033C2.04033 10.6667 1.66699 10.2933 1.66699 9.83333C1.66699 9.37333 2.04033 9 2.50033 9H10.8337C11.2937 9 11.667 9.37333 11.667 9.83333C11.667 10.2933 11.2937 10.6667 10.8337 10.6667Z" fill="#A5A7A9"></path>
						<path class="fill" d="M10.8333 15.6667H0.833333C0.373333 15.6667 0 15.2933 0 14.8333C0 14.3733 0.373333 14 0.833333 14H10.8333C11.2933 14 11.6667 14.3733 11.6667 14.8333C11.6667 15.2933 11.2933 15.6667 10.8333 15.6667Z" fill="#A5A7A9"></path>
						<path class="fill" d="M23.3337 20.6665H17.5003C17.0403 20.6665 16.667 20.2932 16.667 19.8332C16.667 19.3732 17.0403 18.9998 17.5003 18.9998H22.6687L26.4553 2.33317H7.50033C7.04033 2.33317 6.66699 1.95984 6.66699 1.49984C6.66699 1.03984 7.04033 0.666504 7.50033 0.666504H27.5003C27.7537 0.666504 27.9937 0.781504 28.152 0.979838C28.3103 1.1765 28.3703 1.4365 28.3137 1.68317L24.147 20.0165C24.0603 20.3982 23.722 20.6665 23.3337 20.6665Z" fill="#A5A7A9"></path>
						</svg>
						<div class="content-heading-btn-text">Создать заявку</div>
				</router-link>

				<router-link  v-if="catalog"
						tag="a" 
						:to="'/catalog'"
						class="content-heading-btn"
					>
						<svg class="content-heading-btn-img" width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect class="fill" x="0.0802612" y="2.04846" width="4.25606" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<rect class="fill" x="3.9931" y="2" width="17.8806" height="2.07613" rx="1.03806" transform="rotate(69.6255 3.9931 2)" fill="#A5A7A9"></rect>
						<rect class="fill" x="8.38477" y="6.20068" width="16.609" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<rect class="fill" x="24" y="3" width="8" height="2" rx="1" fill="#A5A7A9"></rect>
						<rect class="fill" x="29" width="8" height="2" rx="1" transform="rotate(90 29 0)" fill="#A5A7A9"></rect>
						<rect class="fill" x="21.0491" y="19.1241" width="13.0871" height="2.07613" rx="1.03806" transform="rotate(-80.9286 21.0491 19.1241)" fill="#A5A7A9"></rect>
						<rect class="fill" x="7.34668" y="17.6194" width="15.8824" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<rect class="fill" x="6.30865" y="21.7716" width="9.34257" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
						<path class="stroke" d="M8.38477 18.6575C6.82768 18.6575 5.78961 18.9374 5.78961 20.7336C5.78961 22.8097 7.34671 22.8097 7.86574 22.8097" stroke="#A5A7A9" stroke-width="2"></path>
						<circle class="stroke" cx="9.42285" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
						<circle class="stroke" cx="20.8415" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
						</svg>

						<div class="content-heading-btn-text">Каталог</div>
				</router-link>
			</li>
			
		</ul>
	</nav>
</template>

<script>
import { defineComponent } from "vue-demi";

export default defineComponent({
	props:{
		newOrder: {
			type: Boolean,
			default: false,
		},
		shipments: {
			type: Boolean,
			default: false,
		},
		catalog: {
			type: Boolean,
			default: false,
		},
		
	},
	setup(){
		const menu = [
			{title: 'Поиск товара', link: '/product', lock: false},
			{title: 'Заказы', link: '/orders', lock: false},
			{title: 'Отгрузки', link: '/shipments', lock: false},
			{title: 'Претензии', link: '/claims', lock: false},
			//{title: 'Претензия', link: '/claim', lock: false},
			//{title: 'Претензия-страница-успешно', link: '/claim_success', lock: false},
			//{title: 'Возвраты', link: '/returns', lock: true},
			{title: 'Договоры', link: '/agreements', lock: true},
			{title: 'Взаиморасчеты', link: '/settlements', lock: true},
		];
		return {
			menu
		}
	}
})
</script>