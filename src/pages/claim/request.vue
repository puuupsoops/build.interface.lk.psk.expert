<template>
<div>
	<!-- <div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid" />
		<Notification />
		<PersonalBar /> 
	</div> -->
	<top-nav></top-nav>

	<div
		v-for="claim, key in calimArr"
		:key="key"
	>

		<ClaimCard 
			v-model="calimArr[key]"
			:cardId="key"
			@close="del(key)"
		></ClaimCard>
	</div>
	
	<div class="claim-bottom">
		<div class="claim-add-basis" @click="add">Добавить</div>
		
		<div
			class="gradient-btn claim-submit"
			@click="send()"
		>
			<div class="gradient-btn-text">Оформить претензию</div>
		
		</div>
		
	</div>
	<preloader v-if="loading"></preloader>
</div>
</template>

<script lang="ts">

import TopNav from "@/components/nav/TopNav.vue"
import Preloader from '@/components/Preloader.vue'

import ClaimCard from '@/components/cards/Claim/ClaimCard.vue'


import { useStore } from 'vuex'
import { key } from '@/store'
import { defineComponent, ref,onMounted }from 'vue';
import { CompanyActions } from "@/store/company/actions"
import { Claim }  from "@/models/Claim"
import { OrdersActions } from "@/store/orders/actions"
import { ClaimActions } from "@/store/claims/actions"
import { useRouter } from 'vue-router'
import { ClaimMutations } from "@/store/claims/mutations"
import { OrderActions } from "@/store/order/actions"



export default defineComponent({
	components: {
		TopNav,
		Preloader,
		ClaimCard,
	},
	setup() {    
		const store = useStore(key)
		const router = useRouter()

		const loading = ref(false)
		const calimDefault = ref<Claim>({
			title: '',
			partner_name: '',
			partner_guid: '',
			id: 0,
			case: 1, //Причина притензии. [0 - другое, 1 - недосдача, 2 - пересорт , 3 - качество ]
			products: [],
			message: '',
			files: []
		})
		const calimArr = ref<Claim[]>([])
		calimArr.value.push(Object.assign({}, calimDefault.value))
		
		onMounted(() => {
			if (!store.getters.isCompanysLoad) store.dispatch(CompanyActions.GET_COMPANYS)
			if (!store.getters.isOrders) {
				loading.value = true
				store.dispatch(OrdersActions.GET_ORDERS).then(()=>{ 
					store.dispatch(OrderActions.GET_ORDER_DETAIL, store.getters.getOrders[0].n).then(()=>{
						loading.value = false})
				})
			}
			store.commit(ClaimMutations.SET_CLEAR_SUCCESS)
		})
		
		const add = () => {
			calimArr.value.push(Object.assign({}, calimDefault.value))
		}
		const del = (id:number) => {

			calimArr.value.splice(id, 1)
		}
		
		const send = async () => {
			loading.value = true
			await calimArr.value.forEach((claim: Claim) =>{
				let formData = new FormData();
				claim.files.forEach((x:any, index:number) => {formData.append('files['+index+']',x)})
				
				formData.append('title', claim.title)
				formData.append('partner_name', claim.partner_name)
				formData.append('partner_guid', claim.partner_guid)
				formData.append('id', claim.id.toString())
				formData.append('case', claim.case.toString())
				formData.append('products', JSON.stringify(claim.products))
				formData.append('message', claim.message)
				store.dispatch(ClaimActions.ADD_CLAIMS, formData)
				router.push({name:'ClaimsSuccess'})
			})
			loading.value = false
		}
		
	return {
		calimArr,
		loading,
		
		//methods
		add,
		del,
		send
	}},
})
</script>

<style>

</style>