<template>
	<div class="top-line-button">
			<Mail />
			<Bell :amount = "msgCnt" tooltip="Открыть оповещения" @click="showNotificationBar = !showNotificationBar"/>
			<Avatar :image = "''"/>
	</div>
	<div class="popup-wrap" v-if="!showNotificationBar">
		<div v-if="popMsgCnt != 0" class="popup clear-btn" @click="removeAllPopup()">Закрыть все</div> 
		<Popup 
			v-for="(msg) in popMsg" 
			:class="{'close': remove_all_popap_class}"
			:key="msg.id"
			:message="msg"
			@close="removePopup(msg.id)"
			auto_close
		/>
	</div>

	
</template>

<script setup lang="ts">
import Mail   from '/src/components/ui/personal/buttons/Mail.vue'
import Bell   from '/src/components/ui/personal/buttons/Bell.vue'
import Avatar from '/src/components/ui/personal/buttons/Avatar.vue'
import Popup  from '/src/components/ui/personal/notifcation/Popup.vue'


import { computed, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '/src/store'
import { wsStoreMutations } from '/src/plugins/wsStore'

const store = useStore(key)
const remove_all_popap_class =ref(false)
const showNotificationBar = ref(inject<boolean>('showNotificationBar') ?? false)

//methods
const removePopup =  (id: number)=>{
	store.commit(wsStoreMutations.REMOVE_POPUP, id)			
}
const removeAllPopup =  ()=>{
	remove_all_popap_class.value = true
	setTimeout(()=>{
		store.commit(wsStoreMutations.REMOVE_ALL_POPUP)
		remove_all_popap_class.value = false
	}, 300)
}
//computed
const msgCnt = computed(()=> store.getters.getWSMessageCnt)
const popMsg = computed(()=> store.getters.getWSMessagePopup)
const popMsgCnt = computed(()=> store.getters.getWSMessagePopupCnt)

</script>

<style>
</style>