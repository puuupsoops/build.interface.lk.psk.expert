<template>
  <div class="kp-step" :class="{'active': active}">
    <div class="kp-step-title"  v-if="type === KPTYPES.ORDER">Выберите заказ</div>
    <div class="kp-step-title"  v-if="type === KPTYPES.DRAFT">Выберите черновик</div>
    <div class="kp-step-body">
      <SimpleSelect v-if="type === KPTYPES.ORDER"
                    v-model="order"
                    :select-input-data="orders"
                    :first-element="order === -1 ? firstOrders : null"
      />
      <SimpleSelect v-if="type === KPTYPES.DRAFT"
                    v-model="draft"
                    :select-input-data="drafts"
                    :first-element="draft === -1 ? firstDrafts : null"
      />
      <div class="kp-step-body-input" v-if="order !== -1 || draft !== -1 || type === KP_TYPES.CATALOG_POS">
        <div class="kp-step-body-row">
          <BaseInput v-model="KPLocal.offer.n"
                     label="Номер документа"
                     style="width: 100%"
          />
          <DatePicker
              v-model="date"
          />
        </div>
        <div class="kp-step-body-row">
          <BaseInput v-model="KPLocal.offer.executor"
                     label="Поставщик"
                     @input="KPLocal.offer.executorUID = ''"
                     style="width: 100%"
          />
          <SelectInput
              :data="companyList"
              v-model="KPLocal.offer.executorUID"
              @on-input="KPLocal.offer.executor =  companyList.find(x => x.id === KPLocal.offer.executorUID)?.name || ''"
          />
        </div>
        <div class="kp-step-body-row">
          <BaseInput v-model="KPLocal.offer.customer"
                     label="Покупатель"
                     :error="inn_error"
                     :loading="loading_inn"
                     style="width: 100%"
          />
          <div class="kp-step-body-button"
               tooltip="Поиск по ИНН"
               :flow="showCustomer? '' :'up'"
               @click.capture="(showCustomer=true)"
          >
            <ModalInputFull v-model="customer"
                            v-model:show="showCustomer"
                            show-ok
                            @on-ok="doSearch()"
                            :label="'Введите ИНН'"
                            style="left: -125px"
            />
            <svg  width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="2.17029" height="21.7029" rx="1.08514" transform="matrix(0.999975 -0.00708126 -0.00708126 0.999975 11.097 1.26186)" fill="#A5A7A9"/>
              <rect width="2.17029" height="21.7029" rx="1.08514" transform="matrix(0.00708126 -0.999975 -0.999975 0.00708126 22.7798 12.9446)" fill="#A5A7A9"/>
            </svg>

          </div>
        </div>
      </div>
      <div v-if="order !== -1 || draft !== -1 || type === KP_TYPES.CATALOG_POS ">
        <PreloaderLocal v-if="loading" center/>
        <OrderDraftCard v-else-if="active"
            v-model:order="order_detail"
            is-kp
        />
      </div>
    </div>
    <div class="kp-step-actions ">
      <div class="kp-step-actions-link" @click="prev()">Назад</div>
      <div class="kp-step-actions-link right" @click="next()">Далее</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import PreloaderLocal from '/src/components/PreloaderLocal.vue'
  import DatePicker from '/src/components/ui/DatePicker.vue'
  import ModalInputFull from '/src/components/ui/ModalInputFull.vue'
  import SelectInput from '/src/components/ui/SelectInput.vue'
  import OrderDraftCard from '/src/components/cards/Order/OrderDraftCard.vue'

  import SimpleSelect from '/src/components/ui/SimpleSelect.vue'
  import BaseInput from '/src/components/ui/BaseInput.vue'

  import {computed, onUnmounted, PropType, ref, watch} from 'vue'
  import _ from 'lodash'
  import { useStore } from '/src/store'
  import { OrderActions } from '/src/store/order/actions'
  import { KPActions } from '/src/store/kp/actions'
  import { KP, KP_TYPES } from '/src/models/KP'

  import {DefaultOrder, OrderStateOrder} from '/src/store/order/types'

  import {DateFromRuLocale, SelectInputData} from '/src/models/Components'
  import { DefaultKP } from "/src/store/kp/types";

  const emits = defineEmits(['next','prev','update:kp'])
  const props = defineProps({
    active: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<KP_TYPES>,
      required: true
    },
    kp: {
      type: Object as PropType<KP>,
      required: true
    },
  })
  const store = useStore()

  const KPLocal = ref(props.kp)
  const order = ref<number>(-1)
  const orders = computed<SelectInputData[]>(() => store.getters.getOrdersInputData)
  const firstOrders = <SelectInputData>{ id: -1, name: 'Выберите заказ'}
  const draft = ref<number>(-1)
  const drafts = computed<SelectInputData[]>(() => store.getters.getOrderDraftsInputData)
  const firstDrafts = <SelectInputData>{ id: -1, name: 'Выберите черновик'}

  const KPTYPES = computed(()=>KP_TYPES)
  const loading = ref(false)


  const inn_error = ref(false)
  const loading_inn = ref(false)
  const customer = ref('')
  const showCustomer = ref(false)

  const date = ref(new Date().toLocaleString('ru').substring(0, 10))
  const order_detail = ref<OrderStateOrder>(_.cloneDeep(DefaultOrder))
  order_detail.value.position = _.cloneDeep(props.kp.offer.position)
  console.log(order_detail.value)
  const companyList = computed<SelectInputData[]>(() => store.getters.getCompanysListInput().filter((x: SelectInputData) => x.id !== ''))

  watch(order, ()=>{
    if (order.value!=-1){
      loading.value=true
      store.dispatch(OrderActions.GET_ORDER_DETAIL, order.value ).finally(()=>{
        order_detail.value = _.cloneDeep(store.getters.getOrderDetail)
        loading.value = false
      })
    }
  })
  watch(draft, ()=>{
    if (draft.value!=-1){
      order_detail.value = _.cloneDeep(store.getters.getOrderDrafts.find((orderDraft: OrderStateOrder) => orderDraft.id == draft.value))
    }
  })

  onUnmounted( ()=>{
    if (props.active) {
      KPLocal.value.offer.position = _.cloneDeep(order_detail.value.position)
      emits('update:kp', KPLocal.value)
    }
  })
  const prev = () => {
    order.value = -1
    draft.value = -1
    KPLocal.value = _.cloneDeep(DefaultKP)
    order_detail.value = _.cloneDeep(DefaultOrder)
    emits('update:kp', KPLocal.value)
    emits('prev')
  }
  const next = () => {
    KPLocal.value.offer.date = (new Date(DateFromRuLocale(date.value))).getTime()
    KPLocal.value.offer.position = _.cloneDeep(order_detail.value!.position)
    emits('next')
    emits('update:kp', KPLocal.value)
  }

  const doSearch = () =>{

      if ( customer.value.length >=2) {
        KPLocal.value!.offer.customer = ''
        loading_inn.value = true
        inn_error.value = false
        showCustomer.value=false
        store.dispatch(KPActions.GET_ORG_BY_INN, customer.value)
          .then( ()=> {
              loading_inn.value=false
              KPLocal.value!.offer.customer = store.getters.getKPOrgName
              customer.value = ''
          } )
          .catch(()=>{
            inn_error.value = true
            setTimeout(()=>{inn_error.value = false}, 10000)
            loading_inn.value=false
            customer.value = ''
          })
      }
  }



</script>
 