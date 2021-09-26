
<template>

    <div class="company-head-wrap">
      <CompanyStorageCard 
        v-for="(item, id) in data" 
        :key="id"
        :data="item"
      ></CompanyStorageCard>

      <CompanyStorgeDoc></CompanyStorgeDoc>
    </div>
    <div class="company-head-nav">
          <nav class="company-head-nav-list">
            <li><a class="company-head-nav-link" href="">Рабочий стол</a></li>
            <li><a class="company-head-nav-link" href="">Взаиморасчёты</a></li>
            <li><a class="company-head-nav-link" href="">Сертефикаты</a></li>
            <li><a class="company-head-nav-link" href="">Комерческие предложения</a></li>
          </nav>
    </div>

</template>

<script>
//Таблицас данными по сделкам со складами

import CompanyStorageCard from '@/components/cards/CompanyStorageCard.vue';
import CompanyStorgeDoc from '@/components/cards/CompanyStorgeDoc.vue';

export default {
  props:{
    data: {
      type: Array
    }
  },
  components:{
    CompanyStorageCard,
    CompanyStorgeDoc,
  }
}
</script>

<style>

</style>