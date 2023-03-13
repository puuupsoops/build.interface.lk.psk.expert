<template>
    <div class="kp-step" :class="{'active': active}">
        <div class="kp-step-title">Файл сгенерирован</div>
        <div class="kp-step-body">
            <div @click="save()" class="kp-step-actions-link" :style="'text-align: center'">Скачать</div>
        </div>
        <div class="kp-step-actions ">
            <div class="kp-step-actions-link" @click="$emit('prev')">Назад</div>
        </div>
    </div>
</template>

<script lang="ts" setup>


// eslint-disable-next-line no-unused-vars
const props = defineProps({
        active: {
            type: Boolean,
            default: false
        }
    })

    const emits = defineEmits(['save','prev'])
    const save = () => {
        emits('save')
    }

</script>