<template>
	<div>
		<div class="top-line product-page">
			<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid" />
			<Notification />
			<PersonalBar />
		</div>
		<top-nav></top-nav>

					<div class="claim-success">
					<div class="claim-success-wrap">
						<div class="claim-succes-img"><img src="@/../public/upload/icon/success.svg" alt=""></div>
						<div class="claim-success-text">Спасибо, заявка на отгрузку принята.</div>
						<div class="claim-success-text"> <router-link to="/shipments" tag="a">Перейти к отгрузкам</router-link></div>
					</div>
				</div>
	</div>
</template>

<script>
import PersonalBar from "@/components/cards/PersonalBar";
import Notification from "@/components/cards/Notification";
import CompanyBarTop from "@/components/cards/Company/CompanyBarTop";
import TopNav from "@/components/nav/TopNav";

import { useStore } from 'vuex'
import { key } from '@/store'
import { ref,computed,onMounted, defineComponent }from 'vue';
import { CompanyActions } from "@/store/company/actions";

export default defineComponent({
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
	},
	setup() {
		const store = useStore(key);
		const activeCompanyUid = ref('');

		onMounted(() => {
			if (!store.getters.isCompanysLoad) store.dispatch(CompanyActions.GET_COMPANYS)
		});

		return {
			companyBarTopData: computed(() => store.getters.getCompanysList),
			activeCompanyUid,
		}
	},
})
</script>

<style>

</style>