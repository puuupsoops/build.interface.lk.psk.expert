<template>

		<div class="top-line-card scroll-elem">
						<div class="top-line-card-more-info active"></div>
						<div class="top-line-card-wrap">
							<a 
									v-for="company in data" 
									:key="company.uid"
									:class="getClassA(company)"
									@click="$emit('update:modelValue', company.uid)"
									href="#">
								{{company.name}}
							</a>
							
							<a class="top-line-card-add" href=""></a>
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
					'top-line-card-item active'
					:'top-line-card-item ' + ['orange', 'green', 'red'][Math.floor(Math.random()*3)]
		};

		return {
				getClassA,
			}
	}
}
</script>

<style>
</style>