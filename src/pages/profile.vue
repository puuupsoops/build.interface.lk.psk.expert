<template>
    <div class="profile">
        <TopNav></TopNav>


        <div class="profile-wrap">
           <ProfileCard :profile="profile"></ProfileCard>
        </div>

    </div>    
</template>

<script setup lang="ts">
    import { onMounted, computed } from 'vue';
    import { ProfilePersonal } from '../models/Propfile';
    import { useStore } from '/src/store'
    import ProfileCard from '/src/components/cards/Profile/ProfileCard.vue'
    import TopNav from '/src/components/nav/TopNav.vue'
import { ProfileActions } from '../store/profile/actions';

    let store = useStore()

    onMounted (()=>{
	if (!store.getters.isProfileLoad)
			store.dispatch(ProfileActions.GET_PROFILE)
			
    })
    const profile = computed(()=> store.getters.getProfilePersonal)
</script>