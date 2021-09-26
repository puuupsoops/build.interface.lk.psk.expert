<template>
  <div class="company-card">
    <div class="company-card-wrap">
      <CompanyStorageCard 
        v-for="item in data" 
        :key="item.id"
        :data = "item"
      />
    </div>
  </div>
</template>

<script>
import CompanyStorageCard from '@/components/cards/CompanyStorageCard.vue';
export default {
  props:{
    data: {
      type: Array
    }
  },
  components:{
    CompanyStorageCard
  }
}
</script>

<style>
</style>