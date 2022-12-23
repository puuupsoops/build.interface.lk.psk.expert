<template>
    <div class="kp-step" :class="{'active': active}">
        <div class="kp-step-title">Собрать КП на основании</div>
        <div class="kp-step-body step1">
            <div class="kp-step-body-elem">
                    <CheckButton v-model="order" @onClick="select('order')"/> 
                    <div class="kp-step-body-elem-text" >
                        Заказа
                        <div class="kp-step-body-elem-text-sub" >
                            Создать коммерческое предложение на основе уже умеющегося заказа.
                        </div>
                    </div>
                    
            </div>
            <div class="kp-step-body-elem"  tooltip="Отсутвуют сохраненные черновики" :flow="!isDraft ? 'left':''">
                <CheckButton v-model="draft" @onClick="select('draft')" :disabled="!isDraft"/>
                <div class="kp-step-body-elem-text" :class="{'disablsed': !isDraft }" >
                    Черновика
                    <div class="kp-step-body-elem-text-sub" >
                        Создать коммерческое предложение на основе сохраненного черновика.
                    </div>
                </div>    
            </div>
            <div class="kp-step-body-elem" tooltip="Соберите заказ и возвращайтесь в конструктор предложений" :flow="!isOrder ? 'left':''">
                <CheckButton v-model="order_pos" @onClick="select('order_pos')" :disabled="!isOrder "/>
                <div class="kp-step-body-elem-text" :class="{'disablsed': !isOrder }" >
                    Позиций из католога
                    <div class="kp-step-body-elem-text-sub" >
                        Коммерческое предложение из собранного, но еще не оформленного заказа. 
                        <span v-if="!isOrder">Для этого сформируйте заказ и вариант станет активным.</span>
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
        isOrder: {
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
    
    
    const select = (s: string) => {
        if (s == 'order'){
            draft.value = false
            order_pos.value = false
            emits('update:modelValue', KP_TYPES.ORDER)
        } else if (s == 'draft' && props.isDraft){
            order.value = false
            order_pos.value = false
            emits('update:modelValue', KP_TYPES.DRAFT)
        } else if (props.isOrder){
            order.value = false
            draft.value = false
            emits('update:modelValue', KP_TYPES.ORDER_POS)
        }

       
    }
</script>
