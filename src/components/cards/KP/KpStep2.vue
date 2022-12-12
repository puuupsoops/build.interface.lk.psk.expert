<template>
    <div class="kp-step" :class="{'active': active}">
        <div class="kp-step-title">Выберите заказ</div>
        <div class="kp-step-body">
           
            <!-- <div v-if="companyUID == '' ">Выберите контрагента</div> -->
            <div   class="shipment-heading-select">
                <div class="base-select-wrap">
                    <select class="base-select" style="width: 100%" v-model="order">
                        <option value="-1">Выберите заказ</option>
                        <option v-for="(order, key) in orders"
                            :key="key"
                            :value="order.n"
                        >{{order.name}}</option>
                    </select>
                </div>
            </div>
            <div v-if="order!=-1" :style="'padding: 30px'">
                <div v-if="loading" style="display: flex; justify-content: center">
					<PreloaderLocal ></PreloaderLocal>
				</div>
                <div class="order-list-bottom scroll-elem"  v-else>
				
                    <div class="order-list-bottom-wrap"> 
                        
                        <div class="order-list-row order-list-heading" v-if="order_detail.position.length>0">
                            <div class="order-list-elem">№</div>
                            <div class="order-list-elem">Артикул</div>
                            <div class="order-list-elem">Наименование</div>
                            <div class="order-list-elem">{{ open.length != 0 ? 'Цена':'' }}</div>
                            <div class="order-list-elem">Кол-во</div>
                            <div class="order-list-elem">Стоимость</div>
                            <div class="order-list-elem"></div>
                            
                        </div>
                        <div 
                            :class="open.indexOf(key) !== -1 ? 'order-list-item active' : 'order-list-item'"
                            v-for="(item, key) in order_detail.position"
                            :key="key"
                        >
                            <div 
                                class="order-list-row order-list-main-row"
                                @click="open.indexOf(key) === -1 ? open.push(key) : open.splice(open.indexOf(key),1)"
                            >
                                <div class="order-list-elem">
                                    {{key+1}}
                                
                                </div>
                                <div class="order-list-elem">{{ item.article }}</div>
                                <div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
                                <div class="order-list-elem"></div>
                                <div class="order-list-elem">{{ item.count }}</div>
                                <div class="order-list-elem">{{ Number(item.total).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>

                                <div class="order-list-elem-delete">
                                
                            </div>
                        </div>
                            <div
                                :class="open.indexOf(key) !== -1 ? 'order-list-sublist active' : 'order-list-sublist'"
                            >
                                <div
                                    v-for="(characteristic, k) in item.characteristics"
                                    :key="k"
                                    class="order-list-row"
                                >
                                    <div class="order-list-elem"> </div>
                                    <div class="order-list-elem"> </div>
                                    <div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
                                    <div class="order-list-elem" :style="'display: flex;align-items: center;gap: 10px'"> <amount-input v-model="characteristic.PRICE" ></amount-input>  ₽</div>
                                    <div class="order-list-elem"> 
                                        <amount-input v-model="characteristic.count" ></amount-input> 
                                    </div>
                                    <div class="order-list-elem">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
                                    
                                    <div class="order-list-elem-delete">
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                    
                </div>
                </div>
				<!-- <OrderDraftCard v-else :data="order_detail" no_total no_presail></OrderDraftCard> -->

                <div class="kp-step-body-input">
                    <div class="profile-personal-info-item-edit">
                        <div class="input-textfield">
                            <input name="lastname" type="text" placeholder=" " class="" v-model="NewKP.offer.executor">
                            <label>Поставщик</label>
                        </div>
                    </div>
                    <div class="profile-personal-info-item-edit" :style="'display: flex; align-items: center;'">
                        <div class="input-textfield" v-if="!loading_inn" :style="'width: 100%'" >
                            <input name="lastname" type="text" placeholder=" " :class="{'error': inn_error}" v-model="NewKP.offer.customer">
                            <label>Покупатель</label>
                        </div>
                        <PreloaderLocal v-else/>
                        <div
                            class="kp-step-body-button"
                            tooltip="Поиск по ИНН"
                            :flow="showCustomer? '' :'up'" 
                            @click.capture="(showCustomer=true)"
                        >
                          <modal-input-full v-model="customer" v-model:show="showCustomer" show-ok @on-ok="doSearch()" :label="'Введите ИНН'"></modal-input-full>
                            <svg  width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="2.17029" height="21.7029" rx="1.08514" transform="matrix(0.999975 -0.00708126 -0.00708126 0.999975 11.097 1.26186)" fill="#A5A7A9"/>
                                    <rect width="2.17029" height="21.7029" rx="1.08514" transform="matrix(0.00708126 -0.999975 -0.999975 0.00708126 22.7798 12.9446)" fill="#A5A7A9"/>
                            </svg>
                        </div>
                       
                    </div>
                    <div class="profile-personal-info-item-edit">
                        <div class="input-textfield">
                            <input name="lastname" type="text" placeholder=" " class="" v-model="NewKP.offer.n">
                            <label>Номер документа</label>
                        </div>
                    </div>
                    <div class="shipment-form-item">
                            <div class="shipment-form-elem-title"><span>Дата</span></div>
                            <div class="shipment-form-row" :style="'display:flex; align-items: center;'">
                                <div class="shipment-form-date">
                            
                                    <DatePicker
                                        v-model="date"
                                    
                                    />
                                    
                                </div>
                                    <CheckButton v-model="PDF" @onClick="PDF=true; WORD=false; NewKP.as='PDF'"  :style="'margin-left: 30px'"/>
                                    <div :style="'margin-left: 10px'">PDF</div>
                                    <CheckButton v-model="WORD" @onClick="PDF=false; WORD=true; NewKP.as='WORD'" :style="'margin-left: 30px'"/>
                                    <div :style="'margin-left: 10px'">Word</div>
                            </div>
                           
                        
                       
                    </div>
                                
                    <div class="order-comment-form show">
                    
                        <div class="order-comment-title"><span>Комментарий</span></div>
                        <textarea class="order-comment-textarea" v-model="NewKP.offer.comment"  ></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="kp-step-actions ">
            <div class="kp-step-actions-link" @click="$emit('prev')">Назад</div>
            <PreloaderLocal v-if="loading_next"></PreloaderLocal>
            <div v-else class="kp-step-actions-link" :class="{'disabled': order==-1}" @click="next()">Далее</div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import DatePicker from '/src/components/ui/DatePicker.vue'
import AmountInput from '/src/components/ui/AmountInput.vue'
import ModalInputFull from '/src/components/ui/ModalInputFull.vue'
import CheckButton from '/src/components/ui/CheckButton.vue'


import { computed, ref, watch } from 'vue'
import { useStore } from '/src/store'
import { OrderActions } from '/src/store/order/actions'
import { KPActions } from '/src/store/kp/actions'
import { KP } from '/src/models/KP'
import { DefaultKP } from '/src/store/kp/types'


    const store = useStore()    

    const emits = defineEmits(['next','prev'])
    const props = defineProps({
        active: {
            type: Boolean,
            default: false
        }
    })
    const loading = ref(false)
    const loading_next = ref(false)
    const loading_inn = ref(false)
    const inn_error = ref(false)
    const customer = ref('')
    const showCustomer = ref(false)
    const order = ref<number>(-1)
    const open = ref<number[]>([])
    const orders = computed(() => store.getters.getOrders)
    const order_detail = computed(() => store.getters.getOrderDetail)


    const NewKP = ref<KP>(JSON.parse(JSON.stringify(DefaultKP)))
    const PDF = ref(true)
    const WORD = ref(false)
    const date = ref(new Date().toLocaleString('ru').substr(0, 10))

    watch(order, ()=>{
        if (order.value!=-1){
			loading.value=true
			store.dispatch(OrderActions.GET_ORDER_DETAIL, order.value ).finally(()=>{loading.value = false})
		}
    })

    const next = () => {
        if (order.value != -1 ){
            NewKP.value.offer.date = (new Date(date.value)).getTime()
            NewKP.value.offer.position = JSON.parse(JSON.stringify(order_detail.value.position))
        
            loading_next.value=true
            store.dispatch(KPActions.SEND_KP, NewKP.value ).finally(()=>{
                emits('next')
                loading_next.value = false})
            }
        //$emit('next')
    }
    
    const doSearch = () =>{
        
        if ( customer.value.length >=2) {
            NewKP.value.offer.customer = ''
            loading_inn.value = true        
            inn_error.value = false
            showCustomer.value=false
            store.dispatch(KPActions.GET_ORG_BY_INN, customer.value)
                    .then( ()=> {
                        loading_inn.value=false
                        NewKP.value.offer.customer = store.getters.getKPOrgName
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
 