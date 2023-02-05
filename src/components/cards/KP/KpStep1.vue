<template>
    <div class="kp-step" :class="{'active': active}">
        <div class="kp-step-title">Собрать КП на основании</div>
        <div class="kp-step-body step1">
            <div class="kp-step-body-elem">
                  <CheckButton v-model="order" @onClick="select(KP_TYPES.ORDER)"/>
                  <div class="kp-step-body-elem-text" >
                      Заказа
                      <div class="kp-step-body-elem-text-sub" >
                          Создать коммерческое предложение на основе уже имеющегося заказа.
                      </div>
                  </div>
            </div>
            <div class="kp-step-body-elem"  tooltip="Отсутвуют сохраненные черновики" :flow="!isDraft ? 'left':''">
                <CheckButton v-model="draft" @onClick="select(KP_TYPES.DRAFT)" :disabled="!isDraft"/>
                <div class="kp-step-body-elem-text" :class="{'disablsed': !isDraft }" >
                    Черновика
                    <div class="kp-step-body-elem-text-sub" >
                        Создать коммерческое предложение на основе сохраненного черновика.
                    </div>
                </div>    
            </div>
            <div class="kp-step-body-elem">
                <CheckButton v-model="order_pos" @onClick="select(KP_TYPES.CATALOG_POS)"/>
                <div class="kp-step-body-elem-text" >
                    Позиций из католога
                    <div class="kp-step-body-elem-text-sub" >
                        Коммерческое предложение из позиций каталога
                     </div>
                </div>    
            </div>
        </div>
        <div class="kp-step-actions ">
            <div class="kp-step-actions-link right" @click="$emit('next')">Далее</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, PropType } from 'vue'
    import CheckButton from '../../ui/CheckButton.vue'
    import { KP_TYPES } from '/src/models/KP'

    const props = defineProps({
        modelValue: {
          type: String as PropType<KP_TYPES>,
          required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        isDraft: {
            type: Boolean,
            default: false
        }
    })
    const emits = defineEmits(['update:modelValue','next'])
    const order = ref(true)
    const draft = ref(false)
    const order_pos = ref(false)
    
    const select = (s: KP_TYPES) => {
        if (s == KP_TYPES.ORDER){
          order.value = true
          draft.value = false
          order_pos.value = false
        } else if (s == KP_TYPES.DRAFT && props.isDraft) {
          order.value = false
          draft.value = true
          order_pos.value = false
        } else  {
          order.value = false
          draft.value = false
          order_pos.value = true
        }
      emits('update:modelValue', s)
       
    }
</script>
