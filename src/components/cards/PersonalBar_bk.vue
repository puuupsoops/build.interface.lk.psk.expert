<template>
	<div class="flex items-center justify-end gap-4 ml-auto">
      <ThemeSwitcher/>
			<MailIcon />
			<BellIcon :amount = "msgCnt" tooltip="Открыть оповещения" @click="showNotificationBar = !showNotificationBar"/>
			<AvatarIcon :image = "image" :loading="personalLoading" @click="menu=!menu"/>
			<NameIcon :personal="personal" :loading="personalLoading" @click="menu=!menu"></NameIcon>
	</div>

	<div class="popup-wrap" v-if="!showNotificationBar">
		<div v-if="popMsgCnt != 0" class="popup clear-btn" @click="removeAllPopup()">Закрыть все</div> 
		<Popup 
			v-for="(msg) in popMsg" 
			:class="{'close': remove_all_popup_class}"
			:key="msg.id"
			:message="msg"
			@close="removePopup(msg.id)"
			auto_close
		/>
	</div>

<!--	<div class="top-line-dropdown"-->
<!--			:class="{'active': menu }"-->
<!--			ref="target"-->
<!--		>-->
<!--			<router-link class="top-line-dropdown-link" tag="a" to="/profile">Профиль</router-link>-->
<!--			<a class="top-line-dropdown-link lock">Уведомления-->
<!--				<span class="tooltip">-->
<!--					<svgLock></svgLock>-->
<!--					<span style="left: -120px;top: -20px" class="tooltiptext">Раздел находится в разработке</span>-->
<!--				</span>-->
<!--			</a>-->
<!--			<a class="top-line-dropdown-delimiter"></a>-->
<!--			<a class="top-line-dropdown-link" @click="logout()" >Выход</a>-->
<!--		-->
<!--  </div>-->


  <div class="absolute z-10 rounded-lg shadow w-44 top-150px right-15px
              bg-light-bg-color divide-y divide-gray-100
              dark:bg-dark-bg-color2 dark:divide-gray-600"
       :class="{ 'hidden': !menu }"
       ref="target"
  >
    <ul class="py-2 text-sm text-light-font-color dark:text-dark-font-color">
      <li>
        <router-link to="/profile"
                     class="block px-4 py-2
                            hover:light-accent-color
                            dark:hover:bg-gray-600 dark:hover:dark-accent-color">
          Профиль
        </router-link>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Уведомления</a>
      </li>
    </ul>
    <div class="py-2">
      <a href="#"
         @click="logout()"
         class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
        Выход</a>
    </div>
  </div>
</template>

<script setup lang="ts">
	import { MailIcon, BellIcon, AvatarIcon, Popup, NameIcon, ThemeSwitcher} from '/src/components/ui'

	import { computed, inject, onMounted, ref } from 'vue'
	import { useStore } from '/src/store'
	import { onClickOutside } from '@vueuse/core'

	import { wsStoreMutations } from '/src/plugins/wsStore'
	import { ProfileActions } from '/src/store/profile/actions'
	import { AuthActions } from '/src/store/auth/actions'

	import svgLock from '/src/assets/img/icon/lock.svg'

	const store = useStore()
	const remove_all_popup_class =ref(false)
	const showNotificationBar = ref(inject<boolean>('showNotificationBar') ?? false)

	//methods
	const removePopup =  (id: number)=>{
		store.commit(wsStoreMutations.REMOVE_POPUP, id)			
	}
	const removeAllPopup =  ()=>{
    remove_all_popup_class.value = true
		setTimeout(()=>{
			store.commit(wsStoreMutations.REMOVE_ALL_POPUP)
      remove_all_popup_class.value = false
		}, 300)
	}
	const logout = () => {
		store.dispatch(AuthActions.LOGOUT)
	}
	//computed
	const msgCnt = computed(()=> store.getters.getWSMessageCnt)
  //const msgCnt = 20
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

</script>

<style>
</style>