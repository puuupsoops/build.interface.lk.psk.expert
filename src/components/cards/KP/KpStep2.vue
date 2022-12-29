<template>
    <div class="kp-step" :class="{'active': active}">
        <div class="kp-step-title"  v-if="type == KPTYPES.ORDER">Выберите заказ</div>
        <div class="kp-step-title"  v-if="type == KPTYPES.DRAFT">Выберите черновик</div>
        <div class="kp-step-body">
           
            
            <div   class="shipment-heading-select" v-if="type == KPTYPES.ORDER">
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
            <div   class="shipment-heading-select" v-if="type == KPTYPES.DRAFT">
                <div class="base-select-wrap">
                    <select class="base-select" style="width: 100%" v-model="draft">
                        <option value="-1">Выберите черновик</option>
                        <option v-for="(draft, key) in drafts"
                            :key="key"
                            :value="draft.id"
                        >{{draft.name}}</option>
                    </select>
                </div>
            </div>
            <div class="kp-step-body-input" v-if="order!=-1 || draft != -1 || type == KP_TYPES.ORDER_POS">
                <div class="kp-step-body-row" :style="'align-items: flex-end;'">
                    <div class="profile-personal-info-item-edit" :style="'padding-bottom: 0px'">
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
                        </div>
                    </div>
                </div>
                <div class="kp-step-body-row">
                    <div class="profile-personal-info-item-edit">
                        <div class="input-textfield">
                            <input name="lastname" type="text" placeholder=" " class="" v-model="NewKP.offer.executor" @input="NewKP.offer.executorUID = ''">
                            <label>Поставщик</label>
                        </div>
                    </div>
                    <SelectInput 
                                :data="companyList"
                                v-model="NewKP.offer.executorUID"
                                @on-input="NewKP.offer.executor =  companyList.find(x => x.id == NewKP.offer.executorUID)?.name || ''"
                            />
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
            </div>
            

            <div v-if="order != -1 || draft != -1 || type==KP_TYPES.ORDER_POS " :style="'padding: 30px'">
                <div v-if="loading" style="display: flex; justify-content: center">
					<PreloaderLocal ></PreloaderLocal>
				</div>
                <div v-else>
                    <div class="order-list-bottom scroll-elem" v-if="order_detail" >
                        <div class="order-list-bottom-wrap"> 
                            <div class="content-heading-wrap order-draft" :style="'background-color: #1F2227'" >
                                <div class="content-heading-price"> 
                                    <div class="content-heading-price" > 
                                        <div class="content-heading-price-text">Сумма заказа: </div>
                                        
                                        <div class="content-heading-price-value">{{Number(order_detail.total).toLocaleString('ru', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.')}} ₽</div>
                                    </div>

                                </div>
                                
                            </div>
                        <div>
                    </div>
				
                    <div class="order-list-bottom-wrap" v-if="order_detail"> 
                        
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
                                    <div class="order-list-elem" :style="'display: flex;align-items: center;gap: 10px'">
                                        <amount-input v-model="characteristic.PRICE"  :min="1" @on-input="calcOrder()"></amount-input>  ₽
                                    </div>
                                    <div class="order-list-elem"> 
                                        <amount-input v-model="characteristic.count" :min="1" @on-input="calcOrder()" ></amount-input> 
                                    </div>
                                    <div class="order-list-elem">{{ Number(characteristic.PRICE * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽</div>
                                    
                                    <div class="order-list-elem-delete">
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>

                <div class="kp-step-body-input">                    
                   
                    <div class="orders-list-item" :class="{'active': additionally}">
                        <div class="orders-list-row " @click="additionally=!additionally">
                            
                            <div class="orders-list-elem"> <div class="table-arrow"></div> 	</div>
                            <div class="orders-list-elem"> Дополнительные условия</div>
                        </div>
                        <div class="orders-list-info"  :class="{'active': additionally}">
                            <div class="kp-step-body-row">
                                <span class="kp-step-body-row-elem">Условия доставки</span>
                                <CheckButton v-model="NewKP.additionally.pickup" @onClick="NewKP.additionally.delivery=false; NewKP.additionally.deliveryValue=0"  :style="'margin-left: 30px'"/>
                                <div>Самовывоз</div>
                                <CheckButton v-model="NewKP.additionally.delivery"   @onClick="NewKP.additionally.pickup=false" :style="'margin-left: 30px'"/>
                                <div>Доставка</div>
                                <AmountInput v-if="NewKP.additionally.delivery" :min="0" :step="10" v-model="NewKP.additionally.deliveryValue" :style="'margin-left: 30px'"/>
                                <div v-if="NewKP.additionally.delivery">₽  <span class="kp-step-body-elem-text-sub">Стоимость</span></div>
                                <SelectInput  v-if="NewKP.additionally.pickup"
                                    :data="addressList"
                                    v-model="NewKP.additionally.deliveryValue"
                                    :style="'max-width: 300px'"
                                /> 
                                
                            </div>
                            <div class="kp-step-body-row">
                                <span  class="kp-step-body-row-elem">Предоплата</span>
                                <CheckButton v-model="NewKP.additionally.prepayment" @onClick="NewKP.additionally.prepaymentValue=0"  :style="'margin-left: 30px'"/>
                                
                                <AmountInput v-if="NewKP.additionally.prepayment" :min="0" :max="100" :step="0.1" v-model="NewKP.additionally.prepaymentValue" :style="'margin-left: 30px'"/>
                                <div v-if="NewKP.additionally.prepayment" :style="'margin-left: 10px'">%</div>
                                <div class="kp-step-body-elem-text-sub"  v-if="NewKP.additionally.prepayment && order_detail" :style="'margin-left: 10px'" >
                                    {{  Number((order_detail?.total / 100 ) * NewKP.additionally.prepaymentValue).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }}₽  
                                </div>
                            </div>
                            <div class="kp-step-body-row">
                                <span  class="kp-step-body-row-elem">Отсрочка</span>
                                <CheckButton v-model="NewKP.additionally.delay" @onClick="NewKP.additionally.delayWorkValue=0; NewKP.additionally.delayCalendarValue=0"  :style="'margin-left: 30px'"/>
                                <div v-if="NewKP.additionally.delay" :style="'margin-left: 30px'">Количество<br>рабочих дней</div>
                                <AmountInput v-if="NewKP.additionally.delay" :min="0" v-model="NewKP.additionally.delayWorkValue" />
                                <div v-if="NewKP.additionally.delay" :style="'margin-left: 30px'">Количество <br>календарных дней</div>
                                <AmountInput v-if="NewKP.additionally.delay" :min="0" v-model="NewKP.additionally.delayCalendarValue" />
                                
                            </div>
                        </div>
                    </div>
                    <div class="orders-list-item" :class="{'active': NewKP.header}">
                        <div class="orders-list-row " @click="NewKP.header=!NewKP.header">
                            
                            <div class="orders-list-elem"> <div class="table-arrow"></div> 	</div>
                            <div class="orders-list-elem">Заголовок</div>
                        </div>
                        <div class="orders-list-info"  :class="{'active': NewKP.header}">
                            <div class="kp-step-body-row">
                                <span class="kp-step-body-row-elem"></span>
                                <CheckButton v-model="headerText" @onClick="headerLogo=false"  :style="'margin-left: 30px'"/>
                                <div>Текст</div>
                                <CheckButton v-model="headerLogo"   @onClick="headerText=false" :style="'margin-left: 30px'"/>
                                <div>Лого</div>
                            </div>
                            <div class="kp-step-body-row" v-if="headerText">
                                <textarea class="order-comment-textarea" v-model="NewKP.headerText" placeholder="Текст заголовка коммерческого предложения..." ></textarea>
                            </div>
                            <div class="kp-step-body-row" v-if="headerLogo" :style="'justify-content: center'"><div v-if="logoList.length>0" > Лого #{{ logoList[0].id  }} </div></div>
                            <div class="kp-step-body-row" v-if="headerLogo">
                                <div>
                                    
                                    <div class="product-slider-wrap" >

                                        <button class='product-slider-arrow prev' @click="prevLogo"></button>

                                        <transition-group name="product-slider-trans" class='product-slider' :style="'align-items: center'"  tag="div">
                                                <div v-for="slide in logoList" class='product-slider-slide' :key="slide.id">
                                                    <img
                                                        v-if="slide.image"
                                                        :src="slide.image" 
                                                    
                                                    />
                                                </div>
                                        </transition-group>
                                        <div class='product-slider-arrow next' @click="nextLogo"></div>

                                    
                                    </div>
                                </div>

                                <div class="" >
                                    
                                    <label class="kp-step-body-add-file-label" for="file-upload">
                                          
                                        <input @change="handleFileUpload( $event )" class="kp-step-body-add-file-input" id="file-upload" type="file" accept="image/*">
                                    </label>
                                    
                                    <PreloaderLocal v-if="loadingLogo"></PreloaderLocal>
                                  
                                </div>
                                
                            </div>
                            <div class="kp-step-body-row" v-if="headerLogo">
                            
                            </div>
                        </div>
                    </div>

                    <div class="order-comment-form show">
                    
                        <div class="order-comment-title"><span>Комментарий</span></div>
                        <textarea class="order-comment-textarea" v-model="NewKP.offer.comment"  ></textarea>

                    </div>
                    <div class="kp-step-body-row" :style="'justify-content: flex-end'">
                        <CheckButton v-model="PDF" @onClick="PDF=true; WORD=false; NewKP.as='PDF'"  :style="'margin-left: 30px'"/>
                        <div :style="'margin-left: 10px'">PDF</div>
                        <CheckButton v-model="WORD" @onClick="PDF=false; WORD=true; NewKP.as='WORD'" :style="'margin-left: 30px'"/>
                        <div :style="'margin-left: 10px'">Word</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="kp-step-actions ">
            <div class="kp-step-actions-link" @click="prev()">Назад</div>
            <PreloaderLocal v-if="loading_next"></PreloaderLocal>
            <div v-else class="kp-step-actions-link" :class="{'disabled': order==-1 && draft == -1 && type != KP_TYPES.ORDER_POS}" @click="next()">Далее</div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import DatePicker from '/src/components/ui/DatePicker.vue'
import AmountInput from '/src/components/ui/AmountInput.vue'
import ModalInputFull from '/src/components/ui/ModalInputFull.vue'
import CheckButton from '/src/components/ui/CheckButton.vue'
import SwitchButton from '/src/components/ui/SwitchButton.vue'
import SelectInput from '/src/components/ui/SelectInput.vue'

import { computed, PropType, ref, watch } from 'vue'
import { useStore } from '/src/store'
import { OrderActions } from '/src/store/order/actions'
import { KPActions } from '/src/store/kp/actions'
import { KPMutations } from '/src/store/kp/mutations'
import { KP, KP_TYPES, KPLogoList } from '/src/models/KP'
import { DefaultKP } from '/src/store/kp/types'
import { OrderStateOrder } from '/src/store/order/types'
import { Orders } from '/src/models/Orders'
import { DateFromRuLocale, SelectInputData } from '/src/models/Components'


    const store = useStore()    

    const emits = defineEmits(['next','prev'])
    const props = defineProps({
        active: {
            type: Boolean,
            default: false
        },
        type: {
			type: String as PropType<KP_TYPES>,
			required: true
	
        }
    })
    const KPTYPES = computed(()=>KP_TYPES)
    const loading = ref(false)
    const loading_next = ref(false)
    const loading_inn = ref(false)
    const additionally = ref(false)
    const headerLogo = ref(false) // чекбаттон для выбора лого в заголовок
    const headerText = ref(true) // чекбаттон для выбора текста в заголовок

    const inn_error = ref(false)
    const customer = ref('')
    const showCustomer = ref(false)
    const order = ref<number>(-1)
    const draft = ref<number>(-1)
    const open = ref<number[]>([])
    const orders = computed<Orders[]>(() => store.getters.getOrders)
    const drafts = computed<OrderStateOrder[]>(() => store.getters.getOrderDraft)
    const order_detail = ref<OrderStateOrder>()

    const imageBase64 = ref('')
    const loadingLogo = ref(false)
    const logoList = computed<KPLogoList[]>(() => store.getters.getKPLogoList)
    const NewKP = ref<KP>(JSON.parse(JSON.stringify(DefaultKP)))
    const PDF = ref(true)
    const WORD = ref(false)
    const date = ref(new Date().toLocaleString('ru').substr(0, 10))

    const companyList = computed<SelectInputData[]>(() => store.getters.getCompanysListInput().filter((x: SelectInputData) => x.id !== ''))
    const addressList = computed<SelectInputData[]>(() => store.getters.getShipmentsAddressInputData)

    watch(order, ()=>{
        if (order.value!=-1){
			loading.value=true
			store.dispatch(OrderActions.GET_ORDER_DETAIL, order.value ).finally(()=>{
                order_detail.value = JSON.parse(JSON.stringify(store.getters.getOrderDetail))
                calcOrder()
                loading.value = false
            })
		}
    })
    watch(draft, ()=>{
        if (draft.value!=-1){
			order_detail.value = JSON.parse(JSON.stringify(drafts.value.find(x => x.id == draft.value)))
            calcOrder()
		}
    })
    watch(() => props.type, () =>{
        if (props.type == KP_TYPES.ORDER_POS){
            order_detail.value = JSON.parse(JSON.stringify(store.getters.getOrder))
            calcOrder()
        }
        
    })



    const next = () => {
        if (order.value != -1 || draft.value != -1 || props.type == KP_TYPES.ORDER_POS){
            let kp = <KP>JSON.parse(JSON.stringify(NewKP.value))
            kp.offer.date = (new Date(DateFromRuLocale(date.value))).getTime()
            kp.offer.position = JSON.parse(JSON.stringify(order_detail.value?.position))

            if (kp.additionally.prepayment && order_detail.value) kp.additionally.prepaymentValue = NewKP.value.additionally.prepaymentValue / 100
            
            const executorName = companyList.value.find( (x : SelectInputData) => x.id == NewKP.value.offer.executor)
            if (executorName) kp.offer.executor = executorName.name

            if (kp.additionally.pickup ) {
                const pickupValue = addressList.value.find( (x : SelectInputData) => x.id == NewKP.value.additionally.pickupValue)
                if (pickupValue) kp.additionally.pickupValue = pickupValue.name
            }
            if (logoList.value.length>0) kp.headerLogo = logoList.value[0].id
            //console.log(new Date(DateFromRuLocale(date.value)), date.value)
            loading_next.value=true
            store.dispatch(KPActions.SEND_KP, kp ).finally(()=>{
                emits('next')
                loading_next.value = false})
            }
    }
    const prev = () => {
        order.value = -1
        draft.value = -1
        order_detail.value = undefined
        NewKP.value = JSON.parse(JSON.stringify(DefaultKP))
        emits('prev')
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

    const calcOrder = () => {
        
		if (order_detail.value) {
            let total = 0
            order_detail.value.position.forEach(pos => {
                let total_pos = 0
                
                pos.characteristics.forEach( c => {
                    total_pos = total_pos + c.PRICE * c.count
                   
                });
                pos.total = total_pos
                

                total = total + total_pos
            
            });
            order_detail.value.total = total
        }
		
    }

    const handleFileUpload = ( event: any) =>{
        let img = event.target.files[0]
        var reader = new FileReader()
        reader.onloadend =  () => {
            imageBase64.value = <string>reader.result
            loadingLogo.value = true
            store.dispatch(KPActions.ADD_KP_LOGO, imageBase64.value)
            .then(()=>{
                NewKP.value.headerLogo = store.getters.getKPLogoId
                loadingLogo.value = false
            })  
        };
        reader.readAsDataURL(img)

    }
    const nextLogo = () => {
        store.commit(KPMutations.SET_KP_LOGO_LIST_NEXT)
	}
    let prevLogo = () => {
        store.commit(KPMutations.SET_KP_LOGO_LIST_PREV)
    };
    
</script>
 