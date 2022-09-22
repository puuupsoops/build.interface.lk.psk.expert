<template>
    <div style="display: inline-flex">
                                    
        <label class="switch-btn" @click="onClick()">
            
            <input id="input" @click="onClick()" v-model="modelValue" type="checkbox" />
            <div></div>
            
        </label>
    </div>
</template>


<script setup lang="ts">
    import { computed } from 'vue'
    
    const props = defineProps({
            disabled:{
                type: Boolean,
                default: false
            },
            modelValue: {
                type: Boolean,
                default: false
            },
    })
    const emits = defineEmits(['update:modelValue','onClick'])
    
    const onClick = () =>{
        emits('update:modelValue', !props.disabled ? !props.modelValue : props.modelValue)
        emits('onClick')
    }
    

    </script>