<template>
  <div class="slider-wrap">
    <div class="slider-main">
      <div class='slider-arrow prev' @click="previous"></div>

      <transition-group
          name="slider-horisont-trans"
          class='slider-horisont' tag="div"
      >
        <div
            v-for="slide in slidesLocal"
            class='slider-horisont-slide'
            :key="slide.id"
        >
          <img v-if="slide.src"
               :src="slide.src"
               alt=""
               @click="$emit('onClick')"
          />
        </div>
      </transition-group>

      <div class='slider-arrow next' @click="next"></div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { onUpdated, PropType, ref } from 'vue';
import { Sliders } from '/src/models/Components';

const props = defineProps({
  data: {
    type: Array as PropType<string[]>
  },
})

const slidesLocal = ref<Sliders[]>([])

const loadSlidesLocal = () => {
  props.data?.forEach((src, id) => slidesLocal.value.push({id, src}))
}
loadSlidesLocal()

onUpdated( () => {
  slidesLocal.value = []
  loadSlidesLocal()
});

const next = () => {
  const first = <Sliders>slidesLocal.value.shift()
  slidesLocal.value = slidesLocal.value.concat(first)
}
const previous = () => {
  const last = <Sliders>slidesLocal.value.pop()
  slidesLocal.value = [last].concat(slidesLocal.value)
}

</script>

<style lang="sass" scoped>
@import '/src/assets/sass/mixin/index.sass'
@import '/src/assets/sass/style.sass'
.slider
  +flex
  flex-basis: 80%
  // +flex-wrap(nowrap)
  +justify-content(flex-start)
  +align-items(flex-start)
  //+flex-direction(column)
  overflow: hidden



  &-main
    +flex
    padding: 30px
      bottom: 0
    +align-items(center)
    +justify-content(space-between)
  &-slide
    +flex
    flex: 0 0 100%
    +align-items(flex-start)
    +prefix(transition, $default-transition)

  & img
    width: 100%
    height: auto
    outline: none
    border-radius: 6px
    position: relative
    margin: 0 auto
    cursor: pointer

  &-close
    position: absolute
    border: 0
    cursor: pointer
    min-width: 25px
    height: 25px
    z-index: 20
    right: 60px
    top: 60px

    background-image: url('/src/assets/img/icon/cross.svg')
    background-size: 100% auto
    background-position: center center
    background-repeat: no-repeat
    cursor: pointer

  &-small
    +flex
    +flex-flow(row)
    +justify-content(flex-start)
    +align-items(center)
    flex: 0 0 25%
    gap: 10px
    padding: 30px
      bottom: 0
    max-height: 570px
    overflow: hidden

    &-slide
      +prefix(transition, all 0.1s ease 0.1s)
      opacity: 0.3

      &:first-child
        opacity: 1

    & img
      min-width: 50px
      max-width: 100px
      height: auto
      outline: none
      border-radius: 6px
      position: relative
      cursor: pointer

  &-arrow
    background-color: transparent
    background-position: center center
    background-repeat: no-repeat
    border: 0
    cursor: pointer
    min-width: 30px
    height: 30px
    z-index: 5
    flex-basis: 5%
    &.prev
      left: -18px
      background-image: url(/src/assets/img/icon/arrow-s-l.svg)

    &.next
      right: -18px
      background-image: url(/src/assets/img/icon/arrow-s-r.svg)

    &.plus
      padding: 20px
      top: -100px
      left: -18px
      background-image: url(/src/assets/img/icon/plus.svg)

    &.minus
      padding: 20px
      left: -18px
      background-image: url(/src/assets/img/icon/minus.svg)

  &-nav
    margin:
      top: -30px
    width: 18%

    &-elem
      margin:
        top: 30px
      max-width: 118px
      height: 100%
      max-height: 205px
      outline: none
      +prefix(transition, $default-transition)
      border-radius: 6px
      overflow: hidden
      opacity: .5

    .slick-current
      opacity: 1

    &-img
      display: block
      width: 100%
      height: auto
      border-radius: 6px

  &-buttons
    +flex
    margin:
      top: 30px
    padding: 0 30px
    width: 100%
    background-color: #292C32
    +justify-content(space-between)

  &-link
    display: inline-block
    padding: 11px 10px
    width: 33.33%
    font-size: 18px
    line-height: 28px
    color: $font-light-color
    text-align: center
    +prefix(transition, $default-transition)

    &:hover
      color: $accent-color
      cursor: pointer

  &-controls
    position: absolute
    top: 20px
    left: 50%
    text-align: center
    transform: translateX(-50%)
    transition-timing-function: ease-out
    z-index: 20
    &.kp
      position: unset
      transform: none

    & label
      display: inline-block
      width: 15px
      height: 15px
      margin: 0 3px
      background-color: $font-light-color
      border: 2px solid $white
      border-radius: 50%
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.8)
      transition: background-color 0.2s
      cursor: pointer

      &.checked
        background-color: $bg-default-color

    & input[type=radio]
      display: none

  &-actions
    position: absolute
    display: inline-flex
    top: 90%
    left: 50%
    z-index: 20
    transform: translateX(-50%)
    opacity: 0.6
    &:hover
      opacity: 1
    &-btn
      background-color: $white
      width: 30px
      height: 30px
      margin:
        left: 1px
        right: 1px
      cursor: pointer
      border-radius: 3px

      &:hover
        background-color: #e5e5e7

      &-img
        display: inline-block
        padding: 3px
.slider-horisont
  +flex
  +flex-direction
  +flex-wrap(nowrap)
  +justify-content(flex-start)
  +align-items(flex-start)
  overflow: hidden


  &-slide
    +flex
    flex: 0 0 100%
    +align-items(flex-start)
    +prefix(transition, $default-transition)

    & img
      width: 100%
      //max-width: 150px
      margin:
        right: 10px
      height: auto
      outline: none
      border-radius: 6px
      position: relative
      cursor: pointer

  &-small
    +flex
    flex: 0 0 25%
    +flex-flow(column)
    +justify-content(flex-start)
    +align-items(center)
    max-height: 570px
    overflow: hidden

    &-slide
      +prefix(transition, all 0.1s ease 0.1s)
      opacity: 0.3

      &:first-child
        opacity: 1
</style>