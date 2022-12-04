<template>
    <div class="kp-step" :class="{'active': active}">
        <div class="kp-step-title">Собрать КП на основании</div>
        <div class="kp-step-body">
            <div>* Заказа</div>
            <div>* Черновика</div>
            <div>* Позиций из католога</div>
        </div>
        <div class="kp-step-actions ">
            <div class="kp-step-actions-link right" @click="$emit('next')">Далее</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
     const props = defineProps({
        active: {
            type: Boolean,
            default: false
        }
    })
    const emits = defineEmits(['next','prev'])
</script>
