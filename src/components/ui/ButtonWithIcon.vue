
<script lang="ts">
import { PropType } from 'vue'
import { ButtonState } from '/src/components/ui/button/state'
import { IconsSVG } from '/src/components/ui/button/icons'
import PreloaderLocal from '/src/components/PreloaderLocal.vue'

export default {
	props:{
        // текст отображаемый на кнопке
		text: {
			type: String,
            required: true
		},

        // иконка кнопки
        icon: {
            type: String as PropType<IconsSVG>,
            required: false,
        },

        // состояние кнопки 
        // @see /src/components/ui/button/state
        state: {
            type: String as PropType<ButtonState>,
            required: false,
            default: ButtonState.Active
        }
	},
    components: { PreloaderLocal },
	//emits:['onClick'],
	setup() {
        return {
            IconsSVG,
            ButtonState
        }
	},
}
</script>

<template>
  <button
    :class="'c-button'"
    :disabled="state == ButtonState.Disabled || state == ButtonState.InProgress "
  >
   <span v-if = "state == ButtonState.InProgress">
        <PreloaderLocal
        :small="true" 
        />
    </span>
    <span v-else v-html="icon">

    </span>

    <span
     :class="'c-text'"
     :style="icon ? '' : 'padding: 0 0 0 20px;'"
    >{{ text }}</span>
  </button>
</template>

<style lang="sass" scoped>
.c-button
  -webkit-appearance: none
  -moz-appearance: none
  appearance: none
  display: flex
  border: 0
  border-radius: 4px
  background: #8444FC
  min-width: 100px
  padding: 0 20px 0 5px 
  font-family: inherit
  cursor: pointer
  
  &:hover
    background: #FAC12E
  &:disabled
    color: #A5A7A9
    background: none
    cursor: not-allowed
    border: 1px solid #292C32
    

.c-icon
  display: inline-block
  vertical-align: middle
  fill: #fff
  stroke: #fff
  width: 20px
  height: 20px
  margin-right: 0.25rem

.c-text
  color: #ffffff
  font-size: 16px
  line-height: 25px
  text-align: center
  font-weight: 600
</style>