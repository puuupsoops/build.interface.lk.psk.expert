<template>

<div :class="'company-head-item documents' + (disabled ? ' disable' : '')">
	<div class="content-elem">
		<div class="company-head-item-title" style="height: 3em">Документы</div>
			<div class="company-head-list-content" >
				<ul class="company-head-list" v-if="data">
					<li class="company-head-list-elem"
							v-for="(document, id) in data"
							:key="id"
							
							>
						<img class="company-head-list-img" src="@/assets/img/icon/doc.svg" alt="">
						<a class="company-head-list-link" href="#CompanyCalendar" @click="docDate = document.expires">Cчёт от {{document.date_str}}</a>
					</li>
				</ul>
			</div>
			<router-link
					class="company-head-btn"
					tag="a"
					to="/orders" 
			>Подробнее</router-link>
	</div>
	
</div>

</template>

<script>
import { inject } from 'vue'
export default {
	props:{
		data: {
			type: Array
		},
		disabled:{
			type: Boolean,
			default: false
		}
	},
	setup(){
		
		let docDate = inject('docDate');
		return {
			docDate,
		}
	}
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;

}

/* Track */
::-webkit-scrollbar-track {
  background: #1f2227; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #8d8f92; 
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>