<template>
<div
	class="order-modal" 
	v-if="modelValue"
>
	<div :class="'order-modal-dialog draft' + (shake? ' shake' : '')" ref="targetModal" >
		<div class="order-modal-content draft" >
			<div class="order-modal-header">
				<h3 class="order-modal-header-title">Детали заявки на отгрузку</h3>
				<DeleteButton @onClick="$emit('update:modelValue', false)"/>
			</div>
			<div class="order-modal-body draft">
				Заявка № {{ data.bitrix_id }} от {{data.date_create.substring(0, 10)}}
				<br>
				<br>
				<div class="nav-tab"><span>Вид отгрузки:</span>
					<div class="nav-tab-wrap" style="justify-content: space-around;">
						
						<a :class="'nav-tab-elem gradient-btn' + ( data.case == 'Самовывоз' ? ' active' : '' )" >
							<div class="gradient-btn-text">Самовывоз</div>
						</a>
						<a :class="'nav-tab-elem gradient-btn' + ( data.case == 'Доставка' ? ' active' : '' )" >
							<div class="gradient-btn-text">Доставка</div>
						</a>
						<a :class="'nav-tab-elem gradient-btn' + ( data.case == 'До транспортной' ? ' active' : '' )" >
							<div class="gradient-btn-text">До транспортной</div>
						</a>
					</div>
				</div>
				<div class="" v-if="data">
					<div class="shipment-form-item">
						<div class="shipment-form-elem-title"><span>Представление</span></div>
						
						<div class="shipment-form-info shipment-form-info-text" >
							<p
								v-for="(p, k) in  view_message"
								:key="k"					
							> <span v-html="p"></span></p>
							
						</div>
					</div>
				</div>
			
			</div>
			<div class="order-modal-action">
			</div>
		</div>
	</div>
</div>
	
</template>

<script lang="ts">
import DeleteButton from '@/components/ui/DeleteButton.vue'

import { Shipments } from '@/models/Shipments'

import {computed, defineComponent, PropType, ref} from 'vue'
import { onClickOutside } from '@vueuse/core'


export default defineComponent({
	name: 'ShipmentDetailModal',
	components:{
		DeleteButton
	},
	props:{
		modelValue:{
			type: Boolean,
			required: true,
		},
		data:{
			type: Object as PropType<Shipments>,
			required: true,
		},
	},
	emits: ['update:modelValue'],
	setup(props) {
		const targetModal = ref(null)
		const shake = ref(false)
		
		onClickOutside(targetModal, () => {
			shake.value = true
			setTimeout(() => {shake.value=false;}, 500)
		});
		
		const view_message = computed(()=>{
			let res = <String[]>[]
			res.push( (props.data.order ? props.data.order.name: ''))
			res.push( 'Контрагент: ' + (props.data.partner_name))
			res.push( 'Желаемая дата отгрузки: ' + (props.data.date))
			if (props.data.case == 'До транспортной') {
				if (props.data.carriers == '2') res.push( 'Транспортная компания: ПЭК')
				if (props.data.carriers == '3') res.push( 'Транспортная компания: Деловые линии')
				if (props.data.carriers == '4') res.push( 'Транспортная компания: Байкал')
				if (props.data.carriers == '1') res.push( 'Транспортная компания: Другая')
				if (props.data.carriers == '1') res.push( `Адрес ТК: ${props.data.address}`)

				res.push( String(props.data.extra) )
			}
			if (props.data.case == 'Самовывоз') {
				res.push( `Адрес самовывоза: ${props.data.address}`)
				
			}
			if (props.data.case == 'Доставка') {
				res.push( `Адрес доставки: ${props.data.address}`)
			}
			
			res.push( 'Комментрий: '+ props.data.comment)
		
			
			return res
		})
		
		return {
			//data
			targetModal,
			shake,
			//computed
			view_message,
			
		}
	}
})


</script>

<style>

</style>