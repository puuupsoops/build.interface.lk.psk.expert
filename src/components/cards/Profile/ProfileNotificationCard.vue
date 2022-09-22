<template>
    <div class="profile-notification-wrap content-elem" >
        <div class="profile-notification">
            <div class="profile-notification">
                <div class="profile-notification-title">Уведомления</div>
            </div>

            <div class="profile-notification-tab">
                <div class="profile-notification-tab-bar-box">
                    <div class="profile-notification-tab-bar"
                        :class="{'active': tab=='order'}"
                        @click="tab='order'"
                    >
                        Заказ
                    </div>
                    <div class="profile-notification-tab-bar"
                        :class="{'active': tab=='shipment'}"
                        @click="tab='shipment'"
                    >
                        Отгрузки
                    </div>
                    <div class="profile-notification-tab-bar"
                        :class="{'active': tab=='claim'}"
                        @click="tab='claim'"
                    >
                        Претензии
                    </div>
                </div>
                <div class="profile-notification-tab-tabs-box">
                    <div :class="'profile-notification-tab-tabs ' + tab">
                        <div class="tab">
                            <div class="name">
                                
                                <div class="name-title">Создание</div>
                                <div class="name-title">Изменение</div>
                                <div class="name-title">Статус</div>
                            </div>
                            <div class="lk">
                                <div class="profile-notification-title">ЛК</div>
                                <div class="value">
                                    <SwitchButton v-model="notification.order.lk.changed"></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton v-model="notification.order.lk.created"></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton v-model="notification.order.lk.states"></SwitchButton>
                                </div>
                            </div>
                            <div  class="email">
                                <div class="profile-notification-title">email</div>
                                <div class="value">
                                    <SwitchButton v-model="notification.order.email.changed"></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton v-model="notification.order.email.created"></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton v-model="notification.order.email.states"></SwitchButton>
                                </div>
                            </div>
                        </div>
                        <div class="tab disabled">
                            <div class="name">
                                
                                <div class="name-title">Создание</div>
                                <div class="name-title">Изменение</div>
                                <div class="name-title">Статус</div>
                            </div>
                            <div class="lk">
                                <div class="profile-notification-title">ЛК</div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                            </div>
                            <div  class="email">
                                <div class="profile-notification-title">email</div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                            </div>
                        </div>
                        <div class="tab disabled"
                         
                        >
                            <div class="name">
                                
                                <div class="name-title">Создание</div>
                                <div class="name-title">Изменение</div>
                                <div class="name-title">Статус</div>
                            </div>
                            <div class="lk">
                                <div class="profile-notification-title">ЛК</div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                            </div>
                            <div  class="email">
                                <div class="profile-notification-title">email</div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                                <div class="value">
                                    <SwitchButton></SwitchButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="profile-notification-edit-box">
            <div class="profile-personal-edit"
                :class="{'disabled': disabled}"
                @click="disabled ? null: $emit('save')"
            >
                Сохранить
            </div>
        </div>
        <!-- {{notification}} -->
    </div>
</template>

<script setup lang="ts">
    import SwitchButton from '/src/components/ui/SwitchButton.vue'
    
    import { computed, onMounted, PropType, ref, watch } from 'vue';
    import { ProfileNotificationsList } from '/src/models/Propfile'
    
    
    const props = defineProps(
        {
            notification:{
                type: Object as PropType<ProfileNotificationsList>,
                required: true
            },
            disabled: {
                type: Boolean,
                default: true
            },
            loading: {
               type: Boolean
            }
        }
    )
    const emits = defineEmits(['save'])
    
    const tab = ref('order')
    


</script>