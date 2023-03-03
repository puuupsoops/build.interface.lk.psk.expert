<script setup lang="ts">
//страница с конфигуратором нанесения логотипа
import { ref } from 'vue'
import { useStore } from '/src/store'
import { Sliders } from '/src/models/Components'
import LogoApplicationSinglePage from '/src/components/cards/LogoApplication/LogoApplicationSinglePage.vue'
import PersonalBar from '/src/components/cards/PersonalBar.vue'

const store = useStore()
const images = ref<Sliders[]>([])
store.getters.getProductImages?.forEach( (v:string, i:number) => images.value.push(<Sliders>{ id: i, src: v }))

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
  
  <LogoApplicationSinglePage :images="images"></LogoApplicationSinglePage>
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