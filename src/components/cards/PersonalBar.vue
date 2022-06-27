<template>
	<div class="top-line-button">
			<Mail />
			<Bell :amount = "msgCnt" tooltip="Открыть оповещения" @click="data.show_notification_bar=true"/>
			<Avatar :image = "''"/>
	</div>
	<NotificationBar v-model="data.show_notification_bar"/>
	<div class="popup-wrap">
		<div v-if="popMsgCnt != 0" class="popup clear-btn" @click="removeAllPopup()">Закрыть все</div> 
		<Popup 
			v-for="(msg) in popMsg" 
			:class="{'close': data.remove_all_popap_class}"
			:key="msg.id"
			:message="msg"
			@close="removePopup(msg.id)"
		/>
	</div>

	
</template>

<script lang="ts">
import Mail   from '@/components/ui/personal/buttons/Mail.vue'
import Bell   from '@/components/ui/personal/buttons/Bell.vue'
import Avatar from '@/components/ui/personal/buttons/Avatar.vue'
import Popup from '@/components/ui/personal/notifcation/Popup.vue'
import NotificationBar from '@/components/ui/personal/notifcation/NotificationBar.vue'


import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { wsStoreMutations } from '@/plugins/wsStore'

export default defineComponent({
	
	setup(){
		const store = useStore(key)
		const data =ref({
			remove_all_popap_class: false, 
			show_notification_bar: false,
		})
		const removePopup =  (id: number)=>{
			store.commit(wsStoreMutations.REMOVE_POPUP, id)			
		}
		const removeAllPopup =  ()=>{
			data.value.remove_all_popap_class = true
			setTimeout(()=>{
				store.commit(wsStoreMutations.REMOVE_ALL_POPUP)
				data.value.remove_all_popap_class = false
			}, 300)
			
		}
		return {
			//data
			data,
			//computed
			msgCnt: computed(()=> store.getters.getWSMessageCnt),
			popMsg: computed(()=> store.getters.getWSMessage),
			popMsgCnt: computed(()=> store.getters.getWSMessagePopupCnt),

			//methods
			removePopup,
			removeAllPopup,
		}
	},
	components: {
		Mail,
		Bell,
		Avatar,
		Popup,
		NotificationBar,
	},

})
</script>

<style>
</style>