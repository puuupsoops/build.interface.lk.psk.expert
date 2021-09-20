<template>
  <div class="company-card">
    <div class="company-card-wrap">
      <CompanyBarCard 
        v-for="item in data" 
        :key="item.id"
        :data = item
      />
    </div>
  </div>
</template>

<script>
import CompanyBarCard from './CompanyBarCard.vue';

export default {
  props:{
    data: {
      type: Array
    }
  },
  components:{
    CompanyBarCard
  }
}
</script>

<style>

</style>