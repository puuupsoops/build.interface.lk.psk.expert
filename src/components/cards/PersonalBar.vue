<template>
	<div class="top-line-button">
			<Mail />
			<Bell :amount = "msgCnt" tooltip="Открыть оповещения" @click="showNotificationBar = !showNotificationBar"/>
			<Avatar :image = "image" :loading="personalLoading" @click="menu=!memu"/>
			<Name :personal="personal" :loading="personalLoading" @click="menu=!memu"></Name>
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

	<div class="top-line-dropdown"
			:class="{'active': menu }"
			ref="target"
		>
			<router-link class="top-line-dropdown-link" tag="a" to="/profile">Профиль</router-link>
			<a class="top-line-dropdown-link lock">Уведомления
				<span class="tooltip">
					<img src="/src/assets/img/icon/lock.svg"/>
					<span style="left: -120px;top: -20px" class="tooltiptext">Раздел находится в разработке</span>
				</span>
			</a>
			<a class="top-line-dropdown-delimiter"></a>
			<a class="top-line-dropdown-link" @click="logout()" >Выход</a>
		
		</div>
	
</template>

<script setup lang="ts">
	import Mail   from '/src/components/ui/personal/buttons/Mail.vue'
	import Bell   from '/src/components/ui/personal/buttons/Bell.vue'
	import Avatar from '/src/components/ui/personal/buttons/Avatar.vue'
	import Popup  from '/src/components/ui/personal/notifcation/Popup.vue'
	import Name   from '/src/components/ui/personal/buttons/Name.vue'

	import axios from 'axios'
	import { computed, inject, onMounted, ref } from 'vue'
	import { useStore } from '/src/store'
	import { onClickOutside } from '@vueuse/core'

	import { wsStoreMutations } from '/src/plugins/wsStore'
	import { ProfileActions } from '/src/store/profile/actions'
	import { AuthActions } from '/src/store/auth/actions'
	import { ProfileMutations } from '/src/store/profile/mutations'
	import { defaultProfilePersonal } from '/src/store/profile/types'


	const store = useStore()
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
	const logout = () => {
		store.dispatch(AuthActions.LOGOUT)
	}
	//computed
	const msgCnt = computed(()=> store.getters.getWSMessageCnt)
	const popMsg = computed(()=> store.getters.getWSMessagePopup)
	const popMsgCnt = computed(()=> store.getters.getWSMessagePopupCnt)
	const personalLoading = computed(() => store.getters.isProfileLoading)
	const personal = computed(() => store.getters.getProfilePersonal)
	const image = computed(() => store.getters.getProfileImage)

	const menu = ref(false)
	const target = ref(null)

	onClickOutside(target, () => {
		menu.value = false
	})


	onMounted (()=>{
		if (!store.getters.isProfileLoad) 
			store.dispatch(ProfileActions.GET_PROFILE)
				.then(()=>{
					store.dispatch(ProfileActions.GET_IMAGE)
				})
	})
	
	const onLoadImg = () => {
		
  	}

</script>

<style>
</style>