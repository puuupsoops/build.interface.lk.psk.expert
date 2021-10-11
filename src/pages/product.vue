<template>

    <div class="top-line product-page">
        <CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
        <Notification></Notification>
        <PersonalBar></PersonalBar>
        
    </div>
    <nav class="nav">
        <ul class="nav-list">
        <li class="active"><a class="nav-link" href="#">Поиск товара</a></li>
        <li><a class="nav-link" href="#">Заказы</a></li>
        <li><a class="nav-link" href="#">Отгрузки</a></li>
        <li><a class="nav-link" href="#">Возвраты</a></li>
        <li><a class="nav-link" href="#">Претензии</a></li>
        <li><a class="nav-link" href="#">Договора</a></li>
        <li><a class="nav-link" href="#">Взаиморасчеты</a></li>
        </ul>
    </nav>

    
    <div class="product-search-inline" v-if="!loading" >
        <div class="product-search-input" >
            <input type="text" placeholder="Поиск" autocomplete="off" @keyup.enter="doSearch()" v-model="search_str">
            <img src="img/icon/cross.svg" alt="" @click="search_str=''; isLoad=false">
        </div>
        <button class="product-search-btn gradient-btn" @click="doSearch()">
            <div>Поиск</div>
        </button>

    </div>
    <Preloader v-if="loading"></Preloader>
    <ProductHeaderCard :title="'Костюм “Финикс” бежевый/олива'" :price="'1000'" v-if="isLoad"></ProductHeaderCard>

    <div class="content-wrap content-product-wrap" v-if="isLoad">
        <div class="content-wrap-elem">
            <ProductSearchResultCard></ProductSearchResultCard>
            <ProductMoreCard></ProductMoreCard>
            <ProductAddInfoCard></ProductAddInfoCard>
    
        </div>
        <div class="content-wrap-elem">
            <ProductSliderCard></ProductSliderCard>
            <ProductParcelCard></ProductParcelCard>
            <ProductInfoCard></ProductInfoCard>
        </div>
    </div>

</template>

<script>
import PersonalBar from '@/components/cards/PersonalBar'
import Notification from '@/components/cards/Notification'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop'
import ProductHeaderCard from '@/components/cards/Product/ProductHeaderCard'
import ProductSearchResultCard from '@/components/cards/Product/ProductSearchResultCard'
import ProductMoreCard from '@/components/cards/Product/ProductMoreCard'
import ProductAddInfoCard from '@/components/cards/Product/ProductAddInfoCard'
import ProductSliderCard from '@/components/cards/Product/ProductSliderCard'
import ProductParcelCard from '@/components/cards/Product/ProductParcelCard'
import ProductInfoCard from '@/components/cards/Product/ProductInfoCard'
import Preloader from '@/components/Preloader'

import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'

export default {
    components:{
        Preloader,
        PersonalBar,
        Notification,
        CompanyBarTop,
        ProductHeaderCard,
        ProductSearchResultCard,
        ProductMoreCard,
        ProductAddInfoCard,
        ProductSliderCard,
        ProductParcelCard,
        ProductInfoCard,
    },
    setup() {
        let store = useStore();

        let activeCompanyUid = ref('');
        let search_str = ref('')
		let isLoad = ref(false);
		let loading = ref(false);        
        let companyBarTopData = computed(() => store.getters.getCompanys);
        onMounted(() => {
			Promise.all([
						store.dispatch('GET_PARTNER'),
					])
					//.catch(()=>{alert('error')})
					.finally(() => { setTimeout(()=>{
							isLoad.value = false;
							activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
						},500); })
			});
        let doSearch = () => {
            loading.value = true;
            isLoad.value=false;
            store.dispatch('SEARCH_PRODUCT', search_str.value)
                .then(()=>{
                    isLoad.value=true;
                    })
                .finally(() => {loading.value=false})
        }

        return {
            isLoad,
            loading,
            companyBarTopData,
            activeCompanyUid,
            search_str,
            doSearch
        }
    },
}
</script>


<style scoped>

.product-search-inline {
	display: flex;
	margin: 20px 20px 20px 0px;
	align-items: center; }

.product-search-input {
    display: flex;
    align-items: center;
	padding: 16px 30px 14px 30px;
	padding-right: 40px;
    margin-right: 20px;
	width: 100%;
	border: 0;
	border-radius: 60px;
	background-color: #292C32; }
.product-search-input  input{
    
	width: 100%;
	font-size: 16px;
	line-height: 25px;
	color: #ffffff;
	border: 0;

	background-color: #292C32; }

.product-search-input img{
		width: 16px;
		height: 16px;
		transition: 0.35s;
		cursor: pointer; }

.product-search img:hover {
			opacity: 0.5; }

.product-search-btn {
    display: flex;
    justify-content: space-around;
    padding: 16px 10px 14px 10px;
    max-width: 130px;
    align-items: center;
}
.product-search-btn div{
    position: relative;
    z-index: 10;
}
</style>