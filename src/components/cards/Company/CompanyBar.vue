<template>
  <div class="company-card">
    <div class="company-card-wrap">
        <PreloaderLocal v-if="loading"/>
        <CompanyAboutSmallCard 
            v-else
            v-for="item in data" 
            :key="item.id"
            :data = "item"
        />

    </div>
  </div>
</template>

<script lang="ts">
import CompanyAboutSmallCard from '/src/components/cards/Company/CompanyAboutSmallCard.vue'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
export default {
  props:{
    data: {
      type: Array
    },
    loading: {
        type: Boolean,
        default: false
    }
  },
  components:{
    CompanyAboutSmallCard,
    PreloaderLocal
  }
}
</script>

<style>
</style>