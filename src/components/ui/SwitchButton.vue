<template>
    <div style="display: inline-flex">
        <label class="switch-btn" @click="onClick()">
            <input id="input"
                   @click="onClick()"
                   :checked="modelValue"
                   @input="$emit('update:modelValue', $event.target.checked)"
                   type="checkbox" />
            <div></div>
            
        </label>
    </div>
</template>


<script setup lang="ts">
    
    const props = defineProps({
      disabled:{
          type: Boolean,
          default: false
      },
      modelValue: {
          type: Boolean,
      },
    })
    const emits = defineEmits(['update:modelValue', 'onInput', 'onClick'])
    
    const onClick = () =>{
       // emits('update:modelValue', !props.disabled ? !props.modelValue : props.modelValue)
        emits('onClick')
    }
    

    </script>