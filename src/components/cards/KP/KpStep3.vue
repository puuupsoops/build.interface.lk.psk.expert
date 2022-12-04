<template>
    <div class="kp-step" :class="{'active': active}">
        <div class="kp-step-title">Сохраните файл</div>
        <div class="kp-step-body">
            <div @click="save()" class="kp-step-actions-link" :style="'text-align: center'">Сохранить</div>
           
        </div>
        <div class="kp-step-actions ">
            <div class="kp-step-actions-link" @click="$emit('prev')">Назад</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '/src/store'
import { KPActions } from '/src/store/kp/actions';

const store = useStore()    
    const props = defineProps({
            active: {
                type: Boolean,
                default: false
            }
        })

    const emits = defineEmits(['next','prev'])
    const save = () => {
        store.dispatch(KPActions.SAVE_KP)
    }

</script>