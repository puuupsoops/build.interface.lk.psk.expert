<template>
  <div class="base-select-wrap">
    <select class="base-select"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)">
      <option v-if="firstElement"
              :value="firstElement.id">
        {{firstElement.name}}
      </option>
      <option v-for="selectInput in selectInputData"
              :key="selectInput.id"
              :value="selectInput.id"
      >
        {{ selectInput.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

import { PropType } from 'vue'
import { SelectInputData } from '/src/models/Components'

// eslint-disable-next-line no-unused-vars
const props = defineProps(	{
  modelValue: {
    type: [String, Number]
  },
  selectInputData: {
    type: Array as PropType<SelectInputData[]>,
    require: true
  },
  firstElement: {
    type: Object as PropType<SelectInputData>
  }
})


</script>

<style lang="sass">
@import '/src/assets/sass/mixin/index.sass'
@import '/src/assets/sass/style.sass'
.base
  &-select
    font-size: 21px
    font-weight: 400
    line-height: 30px
    color: #9E6CFD
    background-color: transparent
    border: 0
    cursor: pointer

    option
      font-size: 16px
      color: $white
      background-color: $bg-default-color
      border: 0
      outline: none
      cursor: pointer
  &-wrap
    +flex
    +align-items(center)
    margin:
      top: 5px
    font-size: 21px
    font-weight: 400
    line-height: 30px



</style>