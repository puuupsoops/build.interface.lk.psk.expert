<template>
	<div>

		<top-nav></top-nav>
					<div class="claim-success">
						<div v-if="id.length == 0">
							<PreloaderLocal></PreloaderLocal>
						</div>

						<div v-else class="claim-success-wrap">
							<div class="claim-succes-img">
								<img src="@/../public/upload/icon/success.svg" alt="">
							</div>
							<div class="claim-success-text">Спасибо, пртензия <span v-for="i, key in id" :key="key">№{{i}}{{key!=id.length-1 ? ', ':''}}</span> принята к рассмотрению.</div>
							<div class="order-list-buttons-wrap">
								<div class="order-list-buttons-item later">
									<svg class="order-list-buttons-item-img" width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.5H18.75C19.3023 4.5 19.75 4.94772 19.75 5.5V14.0173C20.2318 13.9356 20.727 13.8931 21.2321 13.8931C21.406 13.8931 21.5786 13.8981 21.75 13.908V5.5C21.75 3.84315 20.4069 2.5 18.75 2.5H3C1.34315 2.5 0 3.84315 0 5.5V24.3571C0 26.014 1.34315 27.3571 3 27.3571H13.762C13.3748 26.7379 13.0625 26.067 12.8377 25.3571H3C2.44772 25.3571 2 24.9094 2 24.3571V5.5C2 4.94772 2.44772 4.5 3 4.5Z" fill="#A5A7A9"></path>
										<circle cx="21.2321" cy="22.6961" r="7.80357" stroke="#A5A7A9" stroke-width="2"></circle>
										<rect x="19.6786" y="18.0356" width="1.7" height="6.21429" rx="0.85" fill="#A5A7A9"></rect>
										<rect x="24.8571" y="22.6001" width="1.7" height="5.17857" rx="0.85" transform="rotate(90 24.8571 22.6001)" fill="#A5A7A9"></rect>
										<rect x="6" y="8" width="2" height="2" rx="1" transform="rotate(90 6 8)" fill="#A5A7A9"></rect>
										<rect x="6" y="12" width="2" height="2" rx="1" transform="rotate(90 6 12)" fill="#A5A7A9"> </rect>
										<rect x="6" y="16" width="2" height="2" rx="1" transform="rotate(90 6 16)" fill="#A5A7A9"></rect>
										<rect x="6" y="20" width="2" height="2" rx="1" transform="rotate(90 6 20)" fill="#A5A7A9"></rect>
										<rect x="10" y="8" width="2" height="2" rx="1" transform="rotate(90 10 8)" fill="#A5A7A9"></rect>
										<rect x="10" y="12" width="2" height="2" rx="1" transform="rotate(90 10 12)" fill="#A5A7A9"></rect>
										<rect x="10" y="16" width="2" height="2" rx="1" transform="rotate(90 10 16)" fill="#A5A7A9"></rect>
										<rect x="14" y="16" width="2" height="2" rx="1" transform="rotate(90 14 16)" fill="#A5A7A9"></rect>
										<rect x="10" y="20" width="2" height="2" rx="1" transform="rotate(90 10 20)" fill="#A5A7A9"></rect>
										<rect x="14" y="8" width="2" height="2" rx="1" transform="rotate(90 14 8)" fill="#A5A7A9"></rect>
										<rect x="14" y="12" width="2" height="2" rx="1" transform="rotate(90 14 12)" fill="#A5A7A9"></rect>
										<rect x="18" y="8" width="2" height="2" rx="1" transform="rotate(90 18 8)" fill="#A5A7A9"></rect>
										<rect x="18" y="12" width="2" height="2" rx="1" transform="rotate(90 18 12)" fill="#A5A7A9"></rect>
										<rect x="5" y="0.5" width="2" height="6" rx="1" fill="#A5A7A9"></rect>
										<rect x="10" y="0.5" width="2" height="6" rx="1" fill="#A5A7A9"></rect>
										<rect x="15" y="0.5" width="2" height="6" rx="1" fill="#A5A7A9"></rect>
									</svg>
								</div>
								<div class="order-list-buttons-item mail">
									<svg class="order-list-buttons-item-img" width="41" height="20" viewBox="0 0 41 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M37.4649 2H18.5787L26.6432 9.10183L37.4649 2ZM16.7388 3.03554L14.7128 15.9112C14.6173 16.518 15.0864 17.0667 15.7007 17.0667H35.6268C36.1191 17.0667 36.5382 16.7084 36.6147 16.2221L38.5935 3.64601L27.2621 11.0824C27.2165 11.1123 27.1693 11.138 27.1209 11.1596C26.7546 11.4186 26.2422 11.4065 25.8863 11.0931L16.7789 3.07285C16.7651 3.06071 16.7517 3.04827 16.7388 3.03554ZM14.7931 2.53369C15.0227 1.07482 16.2798 0 17.7567 0H37.6829C39.5257 0 40.9328 1.6459 40.6464 3.46631L38.5904 16.533C38.3608 17.9918 37.1037 19.0667 35.6268 19.0667H15.7007C13.8579 19.0667 12.4507 17.4208 12.7371 15.6004L14.7931 2.53369Z" fill="#A5A7A9"></path>
										<rect x="3.7" y="4" width="8" height="2" rx="1" fill="#A5A7A9"></rect>
										<rect y="8" width="11" height="2" rx="1" fill="#A5A7A9"></rect>
										<rect x="5.30003" y="12" width="5" height="2" rx="1" fill="#A5A7A9"></rect>
									</svg>
								</div>
								<div class="order-list-buttons-item print">
									<svg class="order-list-buttons-item-img" width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M21 7H3C2.44772 7 2 7.44772 2 8V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V8C22 7.44772 21.5523 7 21 7ZM3 5C1.34315 5 0 6.34315 0 8V17C0 18.6569 1.34315 20 3 20H21C22.6569 20 24 18.6569 24 17V8C24 6.34315 22.6569 5 21 5H3Z" fill="#A5A7A9"></path>
										<rect class="notfill" x="4" y="13" width="16" height="7" fill="#1F2227"></rect>
										<path fill-rule="evenodd" clip-rule="evenodd" d="M17 2H7C6.44772 2 6 2.44772 6 3V5C6 5.55228 6.44772 6 7 6H17C17.5523 6 18 5.55228 18 5V3C18 2.44772 17.5523 2 17 2ZM7 0C5.34315 0 4 1.34315 4 3V5C4 6.65685 5.34315 8 7 8H17C18.6569 8 20 6.65685 20 5V3C20 1.34315 18.6569 0 17 0H7Z" fill="#A5A7A9"></path>
										<rect class="notfill" x="3" y="7" width="18" height="7" fill="#1F2227"></rect>
										<path fill-rule="evenodd" clip-rule="evenodd" d="M17 15H7C6.44772 15 6 15.4477 6 16V24C6 24.5523 6.44772 25 7 25H17C17.5523 25 18 24.5523 18 24V16C18 15.4477 17.5523 15 17 15ZM7 13C5.34315 13 4 14.3431 4 16V24C4 25.6569 5.34315 27 7 27H17C18.6569 27 20 25.6569 20 24V16C20 14.3431 18.6569 13 17 13H7Z" fill="#A5A7A9"></path>
										<rect x="16" y="17" width="2" height="8" rx="1" transform="rotate(90 16 17)" fill="#A5A7A9"></rect>
										<rect x="16" y="21" width="2" height="8" rx="1" transform="rotate(90 16 21)" fill="#A5A7A9"></rect>
										<rect x="20" y="9" width="2" height="3" rx="1" transform="rotate(90 20 9)" fill="#A5A7A9"></rect>
									</svg>
								</div>
								<div class="order-list-buttons-item save">
									<svg class="order-list-buttons-item-img" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path class="stroke" d="M1 3.5C1 2.39543 1.89543 1.5 3 1.5H16C19.866 1.5 23 4.63401 23 8.5V21.5C23 22.6046 22.1046 23.5 21 23.5H3C1.89543 23.5 1 22.6046 1 21.5V3.5Z" stroke="#A5A7A9" stroke-width="2"></path>
										<rect x="4" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"></rect>
										<rect x="18" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"></rect>
										<rect x="4" y="15.5" width="2" height="16" rx="1" transform="rotate(-90 4 15.5)" fill="#A5A7A9"></rect>
										<rect x="6" y="9.5" width="2" height="12" rx="1" transform="rotate(-90 6 9.5)" fill="#A5A7A9"></rect>
										<rect x="8" y="9.5" width="2" height="8" rx="1" transform="rotate(180 8 9.5)" fill="#A5A7A9"></rect>
										<rect x="18" y="9.5" width="2" height="8" rx="1" transform="rotate(180 18 9.5)" fill="#A5A7A9"></rect>
										<rect x="15" y="6.5" width="2" height="3" rx="1" transform="rotate(-180 15 6.5)" fill="#A5A7A9"></rect>
									</svg>
								</div>
							</div>
						</div>
				</div>
	</div>
</template>

<script>

import TopNav from "@/components/nav/TopNav";
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import PreloaderLocal from '@/components/PreloaderLocal.vue'

export default defineComponent({
	components: {
		TopNav,
		PreloaderLocal,
	},
	setup() {
		const store = useStore(key)
		

		return {
			id: computed(() => store.getters.getClaimSuccess)
		}
	},
})
</script>

<style>

</style>