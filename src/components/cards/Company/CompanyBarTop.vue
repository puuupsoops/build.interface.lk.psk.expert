<template>

		<div class="top-line-card scroll-elem">
						<div class="top-line-card-more-info active"></div>
						<div class="top-line-card-wrap">
							<a 
									v-for="(company, i) in data" 
									:key="i"
									:class="getClassA(company)"
									@click="$emit('update:modelValue', company.uid)"
									href="#">
								{{ company.name
										.replace(/Общество с ограниченной ответственностью/, 'ООО')
										.replace(/Акционерное общество/, 'АО')}}
							</a>
						
							<a class="top-line-card-add" href="#"></a>
						</div>
			</div>
</template>

<script>

export default {
	props:{
		data: {
			type: Array
		},
		modelValue: {
			type: String,
			required: true
		}
	},
	emits: ['update:modelValue'],
	setup(props){
		let getClassA = (company) => {
			return company.uid===props.modelValue ?
					'top-line-card-item orange'
					:'top-line-card-item green'
		};

		return {
				getClassA,
			}
	}
}
</script>

<style>
</style>