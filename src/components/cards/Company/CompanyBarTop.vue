<template>

		<div class="top-line-card scroll-elem">
						<div class="top-line-card-more-info active"></div>
						<div class="top-line-card-wrap">
							<a 
									v-for="(company, i) in data" 
									:key="i"
									:class="getClassA(company)"
									@click="$emit('update:modelValue', company.id)"
									href="#">
								{{ company.name}}
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
			return company.id===props.modelValue ?
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