<template>
    <div class="kp">
      <div class="top-line product-page">
        <CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"/>
        <Notification/>
        <PersonalBar/>
      </div>
        <top-nav/>

        <div class="kp-head-card">
            <div class="kp-head-card-title">Конструктор коммерческих предложений</div>
            <div class="kp-head-card-subtitle">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path  fill="#A5A7A9" d="M11.875 18Q12.5 18 12.95 17.55Q13.4 17.1 13.4 16.475Q13.4 15.85 12.95 15.412Q12.5 14.975 11.875 14.975Q11.25 14.975 10.8 15.412Q10.35 15.85 10.35 16.475Q10.35 17.1 10.8 17.55Q11.25 18 11.875 18ZM10.7 14.15H13.05Q13.05 13.425 13.25 12.925Q13.45 12.425 14.2 11.7Q14.775 11.15 15.137 10.525Q15.5 9.9 15.5 9.025Q15.5 7.525 14.525 6.737Q13.55 5.95 12.15 5.95Q10.625 5.95 9.613 6.825Q8.6 7.7 8.2 8.9L10.4 9.725Q10.575 9.225 10.95 8.725Q11.325 8.225 12.025 8.225Q12.525 8.225 12.8 8.537Q13.075 8.85 13.075 9.225Q13.075 9.6 12.812 10Q12.55 10.4 12.275 10.625Q11.275 11.55 10.988 12.137Q10.7 12.725 10.7 14.15ZM12 22.85Q9.75 22.85 7.763 22Q5.775 21.15 4.312 19.688Q2.85 18.225 2 16.25Q1.15 14.275 1.15 12Q1.15 9.725 2 7.75Q2.85 5.775 4.312 4.312Q5.775 2.85 7.763 2Q9.75 1.15 12 1.15Q14.275 1.15 16.25 2Q18.225 2.85 19.688 4.312Q21.15 5.775 22 7.75Q22.85 9.725 22.85 12Q22.85 14.275 22 16.25Q21.15 18.225 19.688 19.688Q18.225 21.15 16.25 22Q14.275 22.85 12 22.85ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 19.7Q15.2 19.7 17.45 17.462Q19.7 15.225 19.7 12Q19.7 8.775 17.45 6.537Q15.2 4.3 12 4.3Q8.8 4.3 6.55 6.537Q4.3 8.775 4.3 12Q4.3 15.225 6.55 17.462Q8.8 19.7 12 19.7Z"/>
                </svg>
                <div>На этой странице Вы сможете на основании совершенного заказа, черновика или товара сформировать коммерческое предложение со своим логотипом и ценами.</div>
            </div>
        </div>
        <div class="kp-form">
            <div class="kp-form-stepper-wrap">
                <div class="kp-form-stepper">
                    <div class="kp-form-stepper-bar" :style="'width:' + (33.33 * (step-1)) + '%'"></div>
                    <ul class="kp-form-stepper-list">
                        <li class="kp-form-stepper-item"
                            :class="{'active': step>=1}"
                            tooltip="Выберите основание"
                            flow="up"
                        >1</li>
                        <li class="kp-form-stepper-item"
                            :class="{'active': step>=2}"
                            tooltip="Заполните основные поля"
                            flow="up"
                        >2</li>
                        <li class="kp-form-stepper-item"
                            :class="{'active': step>=3}"
                            tooltip="Дополнительные настройки"
                            flow="up"
                        >3</li>
                        <li class="kp-form-stepper-item with-image"
                            :class="{'active': step>=4}"
                            tooltip="Сохраните файл"
                            flow="up"
                        ></li>
                    </ul>
                </div>  
            </div>
            <div class="kp-form-stepper-content">
                <div class="kp-form-stepper-content-tabs-box">
                    <div :class="`kp-form-stepper-content-tabs step${step}`">
                        <KpStep1
                            @next="nextStep"
                            v-model="kpType"
                            :active="step === 1"
                            :isDraft="isDraft"
                        />
                        <KpStep2
                            :type="kpType"
                            @next="nextStep"
                            @prev="prevStep"
                            v-model:kp="NewKP"
                            :active="step === 2"
                        />
                        <KpStep3
                            @next="nextStep"
                            @prev="prevStep"
                            v-model:kp="NewKP"
                            :active="step === 3"
                        />
                        <KpStep4
                            @prev="prevStep"
                            @save="save"
                            :active="step === 4"
                        />
                    </div>
                </div>
            </div>
        </div>

      <Preloader v-if="loading_send_kp"/>
    </div>
</template>

<script setup lang="ts">
import PersonalBar from '/src/components/cards/PersonalBar.vue'
import Notification from '/src/components/cards/Notification.vue'
import CompanyBarTop from '/src/components/cards/Company/CompanyBarTop.vue'
import TopNav from '/src/components/nav/TopNav.vue'
import KpStep1 from '/src/components/cards/KP/KpStep1.vue'
import KpStep2 from '/src/components/cards/KP/KpStep2.vue'
import KpStep3 from '/src/components/cards/KP/KpStep3.vue'
import KpStep4 from '/src/components/cards/KP/KpStep4.vue'
import Preloader from '/src/components/Preloader.vue'


import {useStore} from '/src/store'
import {computed, ref, watch} from 'vue'
import _ from 'lodash'
import {OrdersActions} from '/src/store/orders/actions'
import {CompanyActions} from '/src/store/company/actions'
import {KP, KP_TYPES} from '/src/models/KP'
import {KPActions} from '/src/store/kp/actions'
import {ShipmentsActions} from '/src/store/shipments/actions'
import {DefaultKP} from '/src/store/kp/types'
import {KPMutations} from "/src/store/kp/mutations";


const store = useStore()
const companyBarTopData = computed(() => store.getters.getCompanysList)
const activeCompanyUid = ref('')
const NewKP = ref<KP>(_.cloneDeep(DefaultKP))
const step = ref(1)

const loading = ref(false)
const loading_send_kp = ref(false)
const kpType = ref(KP_TYPES.ORDER)


if (!store.getters.isCompanysLoad) store.dispatch(CompanyActions.GET_COMPANYS)
if (!store.getters.isOrders) {
  loading.value = true
  store.dispatch(OrdersActions.GET_ORDERS).then(()=>{ loading.value = false})
}
store.dispatch(KPActions.GET_KP_LOGO)
store.dispatch(ShipmentsActions.GET_SHIPMENTS_ADDRESS)

NewKP.value = store.getters.getKP

step.value = store.getters.getKPStep
if (step.value != 1) kpType.value = KP_TYPES.CATALOG_POS

const isDraft = computed(()=> store.getters.getOrderDraftCount > 0) // есть ли черновики

const nextStep = () => {
  if (step.value < 4) step.value = step.value + 1
  if (step.value == 4) {
    let kp = _.cloneDeep(NewKP.value)
    if (kp.additionally.prepayment) kp.additionally.prepaymentValue = kp.additionally.prepaymentValue / 100

    loading_send_kp.value = true
    store.dispatch(KPActions.SEND_KP, kp).finally(() => {
      loading_send_kp.value = false
    })
    store.commit(KPMutations.SET_KP_STEP, 1)
  }
  store.commit(KPMutations.SET_KP_STEP, step.value)
}
const prevStep = () =>{
  if( step.value > 1) step.value = step.value - 1
  store.commit(KPMutations.SET_KP_STEP, step.value)
}
const save = () => {
  store.dispatch(KPActions.SAVE_KP)
}

watch(NewKP, ()=>{
  store.commit(KPMutations.SET_KP, NewKP.value)
})


</script>

