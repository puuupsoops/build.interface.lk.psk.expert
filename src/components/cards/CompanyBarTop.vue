<template>

    <div class="top-line-card scroll-elem">
            <div class="top-line-card-more-info active"></div>
            <div class="top-line-card-wrap">
              <a 
                  v-for="company in data" 
                  :key="company.uuid"
                  :class="'top-line-card-item ' + color[Math.floor(Math.random()*color.length)]" href="">
                {{company.name}}
              </a>
              
              <a class="top-line-card-add" href=""></a>
            </div>
      </div>

</template>

<script>

export default {
  props:{
    data: {
      type: Array
    }
  },
  data() {
      return {
        color: ['orange', 'green', 'red'],
      }
  },
  methods:{
   
  }
}
</script>

<style>

</style>