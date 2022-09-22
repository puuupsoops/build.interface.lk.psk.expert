<template>
    <div class="profile">
        <TopNav></TopNav>


        <div class="profile-wrap">
            <ProfileCard :profile="profile" :loading="loading" @save="savePersonal()"></ProfileCard>
            <ProfileNotificationCard :notification="editNotice" :loading="loading" :disabled="changeNotice" @save="saveNotification()"></ProfileNotificationCard>
        </div>

        <SnackBar v-model="showNotification" :message="'Информация обновлена'" notification :timeout="3000"/>
    </div>    
</template>

<script setup lang="ts">
    import SnackBar from '/src/components/ui/SnackBar.vue'
    import ProfileCard from '/src/components/cards/Profile/ProfileCard.vue'
    import ProfileNotificationCard from '../components/cards/Profile/ProfileNotificationCard.vue'
    import TopNav from '/src/components/nav/TopNav.vue'

    import { onMounted, computed, ref } from 'vue'
    import { useStore } from '/src/store'
    import { ProfileActions } from '../store/profile/actions'
    import { ProfileNotificationsList } from '../models/Propfile'

    let store = useStore()
    const showNotification = ref(false)
    const editNotice = ref<ProfileNotificationsList>()
    
    onMounted (()=>{
        store.dispatch(ProfileActions.GET_PROFILE)
            .then(()=>{
					store.dispatch(ProfileActions.GET_IMAGE)
                    editNotice.value = Object.assign({}, JSON.parse(JSON.stringify( notification.value)))
				})

			
    })
    const profile = computed(()=> store.getters.getProfilePersonal)
    const notification = computed(()=> store.getters.getProfileNotifications)
    const loading = computed(() => store.getters.isProfileLoading)
    const changeNotice= computed(()=> JSON.stringify(editNotice.value) === JSON.stringify( notification.value))
    editNotice.value = Object.assign({}, JSON.parse(JSON.stringify( notification.value)))
    const savePersonal = () =>{
        showNotification.value = true
    }
    const saveNotification = () =>{
        store.dispatch(ProfileActions.UPD_NOTIFICATION, editNotice.value )
        showNotification.value = true
        
    }
</script>