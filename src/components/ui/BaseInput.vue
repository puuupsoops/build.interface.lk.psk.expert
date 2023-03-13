<template>
  <div class="input-text-field-wrap">
    <div class="input-text-field">
      <input type="text"
             placeholder=" "
             class=""
             :class="{ error }"
             :value="modelValue"
             @input="onInput($event.target.value)"
      >
      <label>{{ label }}</label>
    </div>
    <PreloaderLocal small v-if="loading" class="last"/>
  </div>
</template>

<script setup lang="ts">

import PreloaderLocal from '/src/components/PreloaderLocal.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  error: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'input'])
const onInput = (s: string)=>{
  emit('update:modelValue', s)
  emit('input')
}
</script>

<style lang="sass">

</style>