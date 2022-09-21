<template>
    <div class="top-line-account" @click="$emit('click')">
        <div class="top-line-account-name-box"
        :class="{'loading': loading}"
        >
            <div class="top-line-account-name-fio">{{personal.name}} {{personal.lastname}}</div>
            <div class="top-line-account-name-mail">{{personal.email}}</div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { PropType } from 'vue'
    import { ProfilePersonal } from '/src/models/Propfile'

    const props = defineProps(
        {
            personal:{
                type: Object as PropType<ProfilePersonal>,
            },
            loading:{
                type: Boolean,
                default: false
            }
        })

    const emits = defineEmits(['click'])
							
</script>