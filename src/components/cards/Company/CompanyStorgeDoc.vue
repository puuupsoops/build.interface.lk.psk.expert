<template>

<div class="company-head-item documents">
	<div class="content-elem">
		<div class="company-head-item-title">Документы</div>
			<div class="company-head-list-content" >
				<ul class="company-head-list">
					<li class="company-head-list-elem"
							v-for="(document, id) in data"
							:key="id"
							>
						<img class="company-head-list-img" src="img/icon/doc.svg" alt="">
						<a class="company-head-list-link" href="#">ЭС - счёт №{{document.number}} от {{document.date_str}}</a>
					</li>
				</ul>
			</div>
			<a class="company-head-btn" href="">Подробнее</a>
	</div>
	
</div>

</template>

<script>
export default {
	props:{
		data: {
			type: Array
		}
	},
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