<script setup lang="ts">
import { DeleteButton } from '../../ui';
import { ref } from 'vue'
import { useStore } from '/src/store';
import { ModalActions } from '/src/store/modal/actions'

const store = useStore()

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
        required: true
    }
});

const emits = defineEmits(['update:modelValue']);

const close = () => {
        store.dispatch(ModalActions.VALUE, false)
		emits('update:modelValue', false);
	}

</script>
<template>
    <div v-if="modelValue" class="order-modal">
        <div class="order-modal-dialog draft">
            <div class="order-modal-content draft" >
                <div class="order-modal-header">
                    Обратите внимание на наши новинки! <DeleteButton @onClick="close()"/>
                </div>
                <div class="order-modal-body draft">
                    Текст предложения!
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>