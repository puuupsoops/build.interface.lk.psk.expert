<template>
  <a
    :class="{ 'active': (amount > 0) }"
    href="#">
    <svgBell class="svg"/>
      <div class="sidebar-btn-notification draft" v-if="(amount > 0)">
          {{amount}}
      </div>
  </a>
</template>

<script setup lang="ts">
import svgBell from '/src/assets/img/icon/bell.svg'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    amount:{
      type: Number,
      require: true
    }
  })
</script>

<style>
</style>