<template>
  <button
      :tooltip="tooltip"
      :flow="tooltipFlow"
      class="base-btn"
      :class="{ 'active': active }"
      @click="$emit('onClick')"
  >
    <div class="base-btn-text">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: String
  },
  tooltipFlow: {
    type: String,
    default: 'up'
  }
})
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['onClick'])
</script>

<style lang="sass">
@import '/src/assets/sass/mixin/index.sass'
@import '/src/assets/sass/style.sass'
.base
  &-btn
    width: auto
    min-width: 40px
    height: 40px
    font-size: 16px
    line-height: 25px
    padding:
      left: 10px
      right: 10px
    color: $white
    background-color: $bg-color2
    border: 0
    border-radius: 6px
    +prefix(transition, $default-transition)
    cursor: pointer
    html:not(.dark) &
      color: $light-font-color
      background-color: $light-bg-color2
    &:hover
      color: $accent-color

    &.active
      .base-btn-text
        color: $active-color
    &-text
      color: $font-light-color
      html:not(.dark) &
        color: $light-font-color
</style>
