<template>
    <div class="notification-bar" :class="{'open': modelValue}" v-if="modelValue">
        <div class="notification-bar-wrap" :class="{'open': modelValue, 'close' : data.close_class}"  ref="targetModal" >
            notification-bar
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { onClickOutside } from '@vueuse/core'


export default defineComponent({
    props: {
		modelValue: {
			type: Boolean,
			required: true
		},
        
	},
    emits: ['update:modelValue'],
    setup(props, {emit }){
        const targetModal = ref(null)
        const data = ref({
            close_class: false
        })
        onClickOutside(targetModal, () => {
            data.value.close_class = true
            setTimeout( ()=>{
                emit('update:modelValue', false)
                data.value.close_class = false
            }, 300)
		});
        return {
            targetModal,
            data,
        }
    }
})
</script>