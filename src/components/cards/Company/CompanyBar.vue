<template>
  <div class="company-card">
    <div class="company-card-wrap">
      <CompanyAboutSmallCard 
        v-for="item in data" 
        :key="item.id"
        :data = "item"
      />
    </div>
  </div>
</template>

<script>
import CompanyAboutSmallCard from '@/components/cards/Company/CompanyAboutSmallCard';
export default {
  props:{
    data: {
      type: Array
    }
  },
  components:{
    CompanyAboutSmallCard 
  }
}
</script>

<style>
</style>