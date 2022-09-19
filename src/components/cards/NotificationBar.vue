<template>
<div class="notification-bar-wrap">
    <div class="notification-bar" :class="{'show': modelValue}" ref="targetModal" >
        
        <div class="notification-bar-close" @click="$emit('update:modelValue', false)">Закрыть</div>
        <div v-if="popMsg.length != 0" class="popup clear-btn" @click="removeAllMessages()">Удалить всё ({{popMsg.length}})</div> 
        <div v-else class="notification-bar-empty"><p>Уведомления отсутствуют</p></div>
        <div class="notification-bar-messages">
            <Popup 
                v-for="(msg) in popMsg" 
                :class="{'close': remove_all_messages_class}"
                :key="msg.id"
                :message="msg"
                more
                @close="removeMessage(msg.id)"
            />
        </div>
    </div>
    <div  class="sidebar-menu-bg" v-if="modelValue"></div>
</div>
</template>

<script setup lang="ts">

import Popup  from '/src/components/ui/personal/notifcation/Popup.vue'

import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore } from '/src/store'

import { wsStoreMutations } from '/src/plugins/wsStore'

const props = defineProps({
		modelValue: {
			type: Boolean,
			required: true
		},
	})
const emits = defineEmits(['update:modelValue'])
const store = useStore()

const targetModal = ref(null)
const remove_all_messages_class =ref(false)


onClickOutside(targetModal, () => {
        emits('update:modelValue', false)
    })

//methods
const removeMessage = (id: number) => {
    store.commit(wsStoreMutations.REMOVE_MESSAGE, id)
}
const removeAllMessages = () => {
    remove_all_messages_class.value = true
	setTimeout(()=>{
		store.commit(wsStoreMutations.REMOVE_ALL_MESSAGE)
		remove_all_messages_class.value = false
	}, 300)

}

//computed
const popMsg = computed(()=> store.getters.getWSMessage)


</script>