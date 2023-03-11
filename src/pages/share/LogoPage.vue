<script setup lang="ts">
//страница с конфигуратором нанесения логотипа


import { ref,computed } from 'vue'
import { useStore } from '/src/store'
import { Sliders } from '/src/models/Components'
import { ProductActions } from "/src/store/product/actions";
import { KeysMutations } from "/src/store/keys/mutations";

import LogoApplicationSinglePage from '/src/components/cards/LogoApplication/LogoApplicationSinglePage.vue'
import PersonalBar from '/src/components/cards/PersonalBar.vue'
import ProductSearchInput from "/src/components/cards/Product/ProductSearchInput.vue";

const store = useStore()
const images = ref<Sliders[]>([])
store.getters.getProductImages?.forEach( (v:string, i:number) => images.value.push(<Sliders>{ id: i, src: v }))

const article = ref("")
const productUId = ref('0')
const title = ref("Наименование продукта")

const loader = computed<boolean>({
  get: () => store.getters.getLoader,
  set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val),
});

const search_str = ref("");

const doSearch = (arg: string) => {
  console.log("search",arg);

  loader.value = true;
  article.value = arg
  images.value = []
  
  store
    .dispatch(ProductActions.SEARCH_PRODUCT, article.value)
    .then(() => {
      console.log(store.getters.getProduct);
      let product = store.getters.getProduct
      title.value = product.NAME
      productUId.value = product.UID
      store.getters.getProductImages?.forEach( (v:string, i:number) => images.value.push(<Sliders>{ id: i, src: v }))
      //getImages(productUId.value)
    })
    .finally(() => {
        loader.value = false;
    });
};

</script>

<template>
<div>
    <div class="top-line product-page">
        <div class="top-line-card-wrap header-lable">
            Макет нанесения логотипа
        </div>
      <!--<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>-->
      <PersonalBar></PersonalBar>
    </div>
    <div style="position: relative; z-index: 100;">
        <ProductSearchInput v-model="search_str" @catch="doSearch" />
    </div>

    <div v-if="images.length > 0">
        <LogoApplicationSinglePage :images="images"></LogoApplicationSinglePage> 
    </div>
</div>
</template>

<style lang="sass" scoped>
.header-lable
    font-family: "Muli", sans-serif
    font-size: 33px
    color: #ffffff
    font-weight: 400
    font-style: normal
    cursor: default
</style>