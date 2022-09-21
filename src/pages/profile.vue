<template>
    <div class="profile">
        <TopNav></TopNav>


        <div class="profile-wrap">
           <ProfileCard :profile="profile" @save="savePersonal()"></ProfileCard>
        </div>

        <SnackBar v-model="showNotification" :message="'Информация обновлена'" notification :timeout="3000"/>
    </div>    
</template>

<script setup lang="ts">
    import SnackBar from '/src/components/ui/SnackBar.vue'
    import ProfileCard from '/src/components/cards/Profile/ProfileCard.vue'
    import TopNav from '/src/components/nav/TopNav.vue'

    import { onMounted, computed, ref } from 'vue';
    import { useStore } from '/src/store'
    import { ProfileActions } from '../store/profile/actions'

    let store = useStore()
    const showNotification = ref(false)
    
    onMounted (()=>{
        store.dispatch(ProfileActions.GET_PROFILE)
            .then(()=>{
					store.dispatch(ProfileActions.GET_IMAGE)
				})

			
    })
    const profile = computed(()=> store.getters.getProfilePersonal)

    const savePersonal = () =>{
        showNotification.value = true
    }
</script>