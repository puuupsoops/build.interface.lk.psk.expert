<template>
  <a
    :class="{ 'active': (amount > 0) }"
    href="#">
    <svgBell class="svg"/>
    <div v-if="(amount > 0)"
         class="absolute inline-flex items-center justify-center w-6 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2 dark:border-gray-900">
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