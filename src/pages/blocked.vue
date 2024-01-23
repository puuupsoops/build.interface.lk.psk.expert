<script setup lang="ts">
import BlockedOverlayModal from "/src/components/BlockedOverlayModal.vue";
import { computed } from 'vue'
import { useStore } from '/src/store'

const props = defineProps({
    data: {
        type: Array,
        default: [],
        requred: false
    }
})

const store = useStore()
const contracts = store.getters.getCompanys
if(contracts.length > 0){
    const managerId = contracts[0].managerUid
    if(managerId)
    store.dispatch('GET_MANAGER', managerId)
}

const manager = computed(() => { return store.getters.getManager })
</script>

<template>
    <div>
        <BlockedOverlayModal :model-value="data" :manager="manager"/>
    </div>
</template>

<style lang="sass" scoped></style>