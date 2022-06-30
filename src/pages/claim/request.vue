<template>
<div>
	<!-- <div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid" />
		<Notification />
		<PersonalBar /> 
	</div> -->
	<top-nav></top-nav>

	<div
		
	>

		<ClaimCard
			v-for="claim, key in calim_new"
			:key="key"
			v-model="calim_new[key]"
			:cardId="key"
			@close="del(key)"
		></ClaimCard>
	</div>
	
	<div class="claim-bottom">
		<preloader-local v-if="loading_claim"></preloader-local>
		<div class="claim-add-basis" v-else @click="add">Добавить</div>
		
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

import TopNav from "/src/components/nav/TopNav.vue"
import Preloader from '/src/components/Preloader.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'

import ClaimCard from '/src/components/cards/Claim/ClaimCard.vue'


import { useStore } from 'vuex'
import { key } from '/src/store'
import { defineComponent, ref,onMounted, computed }from 'vue';
import { CompanyActions } from "/src/store/company/actions"
import { Claim }  from "/src/models/Claim"
import { OrdersActions } from "/src/store/orders/actions"
import { ClaimActions } from "/src/store/claims/actions"
import { useRouter } from 'vue-router'
import { ClaimMutations } from "/src/store/claims/mutations"



export default defineComponent({
	components: {
		TopNav,
		Preloader,
		PreloaderLocal,
		ClaimCard,
	},
	setup() {    
		const store = useStore(key)
		const router = useRouter()

		const loading = ref(false)
		const loading_claim = ref(false)
		
		onMounted(() => {
			if (!store.getters.isCompanysLoad) store.dispatch(CompanyActions.GET_COMPANYS)
			if (!store.getters.isOrders) {
				loading.value = true
				store.dispatch(OrdersActions.GET_ORDERS).then(()=>{ 
					if (store.getters.getClaimNew.length == 0)
						store.dispatch(ClaimActions.ADD_CLAIMS_NEW, store.getters.getOrdersMaxId).then(()=>{loading.value = false})
					else
						loading.value = false
				})
			} else {
				if (store.getters.getClaimNew.length == 0) {
					loading.value=true
					store.dispatch(ClaimActions.ADD_CLAIMS_NEW, store.getters.getOrdersMaxId).then(()=>{loading.value=false})
				}
			}
			
			store.commit(ClaimMutations.CLEAR_CLAIMS_SUCCESS)
		})
		
		const add = () => {
			loading_claim.value=true
			store.dispatch(ClaimMutations.ADD_CLAIMS_NEW, store.getters.getOrdersMaxId).then(()=>{loading_claim.value=false})
		}
		const del = (id:number) => {
		
			store.commit(ClaimMutations.DEL_CLAIMS_NEW, id)
		}
		
		const send = async () => {
			loading.value = true
			await store.getters.getClaimNew.forEach((claim: Claim) =>{
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
		loading,
		loading_claim,
		//computed
		calim_new: computed( ()=> store.getters.getClaimNew ),
		//methods
		add,
		del,
		send
	}},
})
</script>

<style>

</style>