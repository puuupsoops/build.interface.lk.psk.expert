<template>
    <div class="profile">
        <TopNav></TopNav>


        <div class="profile-wrap">
            <ProfileCard :profile="profile"
                         :loading="loading"
                         @save="savePersonal()"/>
            <ProfileNotificationCard :notification="editNotice"
                                     :loading="loading"
                                     :disabled="changeNotice"
                                     @save="saveNotification()"/>
        </div>

        <SnackBar v-model="showNotification" :message="'Информация обновлена'" notification :timeout="3000"/>
    </div>    
</template>

<script setup lang="ts">
  import { SnackBar } from '/src/components/ui'
  import { ProfileCard, ProfileNotificationCard } from '/src/components/cards/Profile'
  import { TopNav } from '/src/components/nav'

  import { onMounted, computed, ref } from 'vue'
  import _ from 'lodash'
  import { useStore } from '/src/store'
  import { ProfileActions } from '../store/profile/actions'
  import { ProfileNotificationsList } from '../models/Propfile'

  let store = useStore()
  const showNotification = ref(false)
  const editNotice = ref<ProfileNotificationsList>()

  onMounted (()=>{
      store.dispatch(ProfileActions.GET_PROFILE).then(()=>{
        store.dispatch(ProfileActions.GET_IMAGE)
        editNotice.value = _.cloneDeep( notification.value)
      })


  })
  const profile = computed(()=> store.getters.getProfilePersonal)
  const notification = computed(()=> store.getters.getProfileNotifications)
  const loading = computed(() => store.getters.isProfileLoading)
  const changeNotice= computed(()=> _.isEqual(editNotice.value, notification.value))
  editNotice.value = _.cloneDeep(notification.value)
  const savePersonal = () =>{
      showNotification.value = true
  }
  const saveNotification = () =>{
      store.dispatch(ProfileActions.UPD_NOTIFICATION, editNotice.value )
      showNotification.value = true
  }
</script>