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
            

            <div v-if="order != -1 || draft != -1 || type==KP_TYPES.ORDER_POS ">
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
                            <div :style="'display: flex;align-items: center;justify-content: flex-end;'">
                                <div>
                                    <span class="tooltip">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" st>
                                            <path  fill="#A5A7A9" d="M11.875 18Q12.5 18 12.95 17.55Q13.4 17.1 13.4 16.475Q13.4 15.85 12.95 15.412Q12.5 14.975 11.875 14.975Q11.25 14.975 10.8 15.412Q10.35 15.85 10.35 16.475Q10.35 17.1 10.8 17.55Q11.25 18 11.875 18ZM10.7 14.15H13.05Q13.05 13.425 13.25 12.925Q13.45 12.425 14.2 11.7Q14.775 11.15 15.137 10.525Q15.5 9.9 15.5 9.025Q15.5 7.525 14.525 6.737Q13.55 5.95 12.15 5.95Q10.625 5.95 9.613 6.825Q8.6 7.7 8.2 8.9L10.4 9.725Q10.575 9.225 10.95 8.725Q11.325 8.225 12.025 8.225Q12.525 8.225 12.8 8.537Q13.075 8.85 13.075 9.225Q13.075 9.6 12.812 10Q12.55 10.4 12.275 10.625Q11.275 11.55 10.988 12.137Q10.7 12.725 10.7 14.15ZM12 22.85Q9.75 22.85 7.763 22Q5.775 21.15 4.312 19.688Q2.85 18.225 2 16.25Q1.15 14.275 1.15 12Q1.15 9.725 2 7.75Q2.85 5.775 4.312 4.312Q5.775 2.85 7.763 2Q9.75 1.15 12 1.15Q14.275 1.15 16.25 2Q18.225 2.85 19.688 4.312Q21.15 5.775 22 7.75Q22.85 9.725 22.85 12Q22.85 14.275 22 16.25Q21.15 18.225 19.688 19.688Q18.225 21.15 16.25 22Q14.275 22.85 12 22.85ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 19.7Q15.2 19.7 17.45 17.462Q19.7 15.225 19.7 12Q19.7 8.775 17.45 6.537Q15.2 4.3 12 4.3Q8.8 4.3 6.55 6.537Q4.3 8.775 4.3 12Q4.3 15.225 6.55 17.462Q8.8 19.7 12 19.7Z"/>
                                        </svg>
                                        <span class="tooltiptext" :style="'background-color: rgb(0,0,0,0.5) !important;'">Скидка/Наценка автоматически будет проставлена на каждую позицию ниже.</span>
                                    </span>
                                </div>
                                <button 
                                    :class="'product-parcel-btn' + (parcel_type === 'percent' ? ' active':'')"
                                    :style="'width: auto; min-width: 7em;'"
                                    @click="sale_type=-sale_type;calcOrder()"
                                ><div class="product-parcel-text">{{ sale_type< 0 ? 'Скидка': 'Наценка'}}</div></button>
                                
								<AmountInput v-model="addAmount" :style="'margin: 5px'" @on-input="calcOrder()"></AmountInput>
                                <button 
											:class="'product-parcel-btn' + (parcel_type === 'percent' ? ' active':'')"
											@click="parcel_type='percent';calcOrder()"
								>%</button>
                                <button 
											:class="'product-parcel-btn' + (parcel_type === 'add' ? ' active':'')"
											@click="parcel_type='add';calcOrder()"
								>₽</button>

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
                                    <div class="order-list-elem" v-if="parcel_type == 'percent'">
                                        {{ Number((characteristic.PRICE + sale_type * characteristic.PRICE * addAmount/100) * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽
                                    </div>
                                    <div class="order-list-elem" v-else>
                                        {{ Number((characteristic.PRICE + sale_type * addAmount) * characteristic.count).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') }} ₽
                                    </div>

                                    <div class="order-list-elem-delete">
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div :style="'display: flex;align-items: center;justify-content: flex-end;'">
                        <button 
                            class="product-parcel-btn"
                            style="width: auto; min-width: 7em;"
                            @click="$emit('update:showAddPos', true)"
                        >Добавить</button>
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
                        <div class="kp-step-body-row-group"  :class="{'active': additionally}">
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
                                    v-model="NewKP.additionally.pickupValue"
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
                            <div v-show="NewKP.additionally.prepaymentValue != 100" class="kp-step-body-row">
                                <span  class="kp-step-body-row-elem">Отсрочка</span>
                                <CheckButton v-model="NewKP.additionally.delay" @onClick="NewKP.additionally.delayWorkValue=0; NewKP.additionally.delayCalendarValue=0"  :style="'margin-left: 30px'"/>
                                <div v-if="NewKP.additionally.delay" :style="[!isDelayType ? 'color: #FFFFFF':'color: #292C32','margin-left: 30px']">Количество <br>календарных дней</div>
                                <AmountInput v-if="NewKP.additionally.delay" :min="0" v-model="NewKP.additionally.delayCalendarValue" :disabled="isDelayType" />
                                <div v-show="NewKP.additionally.delay" :style="'margin-left: 30px'">
                                    <SwitchButton v-model="isDelayType"></SwitchButton>
                                </div>
                                <div v-if="NewKP.additionally.delay" :style="[isDelayType ? 'color: #FFFFFF':'color: #292C32','margin-left: 30px']">Количество<br>рабочих дней</div>
                                <AmountInput v-if="NewKP.additionally.delay" :min="0" v-model="NewKP.additionally.delayWorkValue" :disabled="!isDelayType" />
                            </div>
                        </div>
                    </div>
                    <div class="orders-list-item" :class="{'active': NewKP.header}">
                        <div class="orders-list-row " @click="NewKP.header=!NewKP.header">    
                            <div class="orders-list-elem"> <div class="table-arrow"></div> 	</div>
                            <div class="orders-list-elem">Заголовок</div>
                        </div>
                        <div class="kp-step-body-row-group"  :class="{'active': NewKP.header}">

                            <div class="kp-step-body-row" >
                                <span class="kp-step-body-row-elem">Текст</span>
                                <CheckButton v-model="headerText" :style="'margin-left: 30px'"/>
                                <div class="kp-step-body-row-group"  :class="{'active': headerText}">
                                    <textarea
                                        class="order-comment-textarea"
                                        style="min-width: 500px"
                                        v-model="NewKP.headerText" 
                                        placeholder="Текст заголовка коммерческого предложения..." 
                                    ></textarea>
                                </div>
                            </div>
                            <div class="kp-step-body-row">
                                <span class="kp-step-body-row-elem">Лого</span>
                                <CheckButton v-model="headerLogo" style="margin-left: 30px"/>
                                <label v-if="headerLogo" class="kp-step-body-add-file-label" for="file-upload">
                                    <input @change="handleFileUpload( $event )" class="kp-step-body-add-file-input" id="file-upload" type="file" accept="image/*">
                                </label>
                                <div v-if="headerLogo" class="kp-step-body-elem-header-align-wrap">
                                    <div class="kp-step-body-elem-text-sub">Выравнивание:</div>
                                    <div class="header-button" 
                                        :class="{'active': NewKP.headerLogoAlign==KPHEADERLOGOALIGN.LEFT}"
                                        @click="NewKP.headerLogoAlign=KPHEADERLOGOALIGN.LEFT"
                                    >
                                        Слева
                                    </div>
                                    <div class="header-button" 
                                        :class="{'active': NewKP.headerLogoAlign==KPHEADERLOGOALIGN.CENTER}"
                                        @click="NewKP.headerLogoAlign=KPHEADERLOGOALIGN.CENTER"
                                    >
                                        По центру
                                    </div>
                                    <div class="header-button" 
                                        :class="{'active': NewKP.headerLogoAlign==KPHEADERLOGOALIGN.RIGHT}"
                                        @click="NewKP.headerLogoAlign=KPHEADERLOGOALIGN.RIGHT"
                                    >
                                        Справа
                                    </div>

                                </div>
                            </div>
                            <div class="kp-step-body-row-group"  :class="{'active': headerLogo}">
                                    <div v-if="logoList.length>0" style="text-align: center"> Лого #{{ logoList[0].id }} </div>
                                    <PreloaderLocal v-if="loadingLogo" style="margin:auto"></PreloaderLocal>
                                    <div class="kp-step-body-column" v-if="headerLogo&&!loadingLogo" :style="'justify-content: center'">
                                        <div class="product-slider-controls kp">
                                            <span v-for="(slide, key) in logoListOrigin">
                                                <input type="radio" :id="String(slide.id)" >
                                                <label 
                                                    :for="String(slide.id)" 
                                                    :tooltip="`#${slide.id}`"
                                                    flow="up"
                                                    :class="{'checked': currentLogoId == key}" 
                                                    @click="shiftLogo(key)"
                                                ></label>
                                                
                                            </span>
                                        </div>
                                        <div class="product-slider-wrap" >
                                            <button class='product-slider-arrow prev' @click="prevLogo"></button>
                                            <transition-group name="product-slider-trans" class='product-slider' :style="'align-items: center; height: 500px;'"  tag="div">
                                                <div v-for="slide in logoList" class='product-slider-slide' :key="slide.id">
                                                    <img v-if="slide.image" :src="slide.image"  />
                                                </div>
                                            </transition-group>
                                            <div class='product-slider-arrow next' @click="nextLogo"></div>
                                        </div>
                                    
                                    </div>
                                
                                </div>
                        </div>
                    </div>

                    <div class="order-comment-form show">
                    
                        <div class="order-comment-title"><span>Комментарий</span></div>
                        <textarea class="order-comment-textarea" v-model="NewKP.offer.comment"  ></textarea>

                    </div>
                    <div class="kp-step-body-row" :style="'justify-content: flex-end'">
                        Скачать документ в формате: 
                        <CheckButton v-model="PDF" @onClick="PDF=true; WORD=false; NewKP.as='PDF'"  :style="'margin-left: 30px'"/>
                        <div :style="'margin-left: 10px'">PDF</div>
                        <!--<CheckButton disabled v-model="WORD" @onClick="PDF=false; WORD=true; NewKP.as='WORD'" :style="'margin-left: 30px'"/>
                        <div :style="'margin-left: 10px;'">Word</div>-->
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


import { computed, inject, PropType, ref, watch, onMounted } from 'vue'
import _ from 'lodash'
import { useStore } from '/src/store'
import { OrderActions } from '/src/store/order/actions'
import { KPActions } from '/src/store/kp/actions'
import { KPMutations } from '/src/store/kp/mutations'
import { KP, KP_TYPES, KP_HEADER_LOGO_ALIGN, KPLogoList } from '/src/models/KP'
import { DefaultKP } from '/src/store/kp/types'
import { OrderStateOrder } from '/src/store/order/types'
import { Orders } from '/src/models/Orders'
import { DateFromRuLocale, SelectInputData } from '/src/models/Components'
import { ShipmentsAddress } from '/src/models/Shipments'


    const store = useStore()    

    const emits = defineEmits(['next','prev','update:showAddPos'])
    const props = defineProps({
        active: {
            type: Boolean,
            default: false
        },
        type: {
			type: String as PropType<KP_TYPES>,
			required: true
	
        },
        showAddPos: {
            type: Boolean,
            default: false
        }
    })
    const KPTYPES = computed(()=>KP_TYPES)
    const KPHEADERLOGOALIGN = computed(()=>KP_HEADER_LOGO_ALIGN)
    const loading = ref(false)
    const loading_next = ref(false)
    const loading_inn = ref(false)
    const additionally = ref(false)
    const headerLogo = ref(false) // чекбаттон для выбора лого в заголовок
    const headerText = ref(true) // чекбаттон для выбора текста в заголовок
    const isDelayType = ref(false) // переключатель выбора типа отсрочки

    const inn_error = ref(false)
    const customer = ref('')
    const showCustomer = ref(false)
    const order = ref<number>(-1)
    const tempOrderId = ref(inject<number|null>('tempOrderId'))
    const draft = ref<number>(-1)
    const open = ref<number[]>([])
    const orders = computed<Orders[]>(() => store.getters.getOrders)
    const drafts = computed<OrderStateOrder[]>(() => store.getters.getOrderDraft)
    const order_detail = ref<OrderStateOrder>()

    const imageBase64 = ref('')
    const loadingLogo = ref(false)
    const logoList = computed<KPLogoList[]>(() => store.getters.getKPLogoList) //Список загруженных лого для карусели
    const logoListOrigin = computed<KPLogoList[]>(() => store.getters.getKPLogoListOrigin) // Копия списка агруженных лого которая не меняется для списка контрол-бар
    const NewKP = ref<KP>(JSON.parse(JSON.stringify(DefaultKP)))
    const PDF = ref(true)       //Флаги 
    const WORD = ref(false)
    const date = ref(new Date().toLocaleString('ru').substr(0, 10))

    const companyList = computed<SelectInputData[]>(() => store.getters.getCompanysListInput().filter((x: SelectInputData) => x.id !== ''))
    const addressList = computed<SelectInputData[]>(() => store.getters.getShipmentsAddressInputData)

    // Переменные для калькулятора
    const addAmount = ref(0)
    const parcel_type = ref('percent')
    const sale_type = ref(-1)
    //для панели выбора лого из карусели
    const currentLogoId = ref(0)
   


    watch(order, ()=>{
        if (order.value!=-1){
			loading.value=true
			store.dispatch(OrderActions.GET_ORDER_DETAIL, order.value ).finally(()=>{
                order_detail.value = _.cloneDeep(store.getters.getOrderDetail)
                calcOrder()
                loading.value = false
            })
		}
    })
    watch(draft, ()=>{
        if (draft.value!=-1){
			order_detail.value = _.cloneDeep(drafts.value.find(x => x.id == draft.value))
            calcOrder()
		}
    })
    watch(() => props.type, () =>{
        if (props.type == KP_TYPES.ORDER_POS){
            order_detail.value = _.cloneDeep(store.getters.getOrder)
            calcOrder()
        }
        
    })
    onMounted(()=>{
        if (tempOrderId.value) {
            order.value=tempOrderId.value
            tempOrderId.value = null
        }
    })

    const next = () => {
        if (order.value != -1 || draft.value != -1 || props.type == KP_TYPES.ORDER_POS){
            let kp = _.cloneDeep(NewKP.value)
            kp.offer.date = (new Date(DateFromRuLocale(date.value))).getTime()
            kp.offer.position = _.cloneDeep(order_detail.value!.position)
            kp.offer.position.forEach(pos => {
                pos.characteristics.forEach( c => {
                    if(parcel_type.value == "percent") {
                        c.PRICE = c.PRICE + sale_type.value * c.PRICE * addAmount.value/100
                    }
                    if(parcel_type.value == "add") {
                        c.PRICE = c.PRICE + sale_type.value * addAmount.value
                    }
                });
            });
                   
            if (kp.additionally.prepayment && order_detail.value) kp.additionally.prepaymentValue = NewKP.value.additionally.prepaymentValue / 100
            
            const executorName = companyList.value.find( (x : SelectInputData) => x.id == NewKP.value.offer.executor)
            if (executorName) kp.offer.executor = executorName.name

            if (kp.additionally.pickup ) {
                const pickupValue = store.getters.getShipmentsAddress.find((x: ShipmentsAddress) =>  x.index == parseInt(NewKP.value.additionally.pickupValue)).address

                if (pickupValue) kp.additionally.pickupValue = pickupValue
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
                    if(parcel_type.value == "percent") {
                        total_pos = total_pos + c.count * (c.PRICE + sale_type.value * c.PRICE * addAmount.value/100)
                    }
                    if(parcel_type.value == "add") {
                        total_pos = total_pos + c.count * (c.PRICE + sale_type.value * addAmount.value)
                    }
                });
                pos.total = total_pos
                total = total + total_pos
            });
            order_detail.value.total = total
        }
    }
    const handleFileUpload = ( event: any) =>{
        if (!loadingLogo.value) {
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

    }
    const nextLogo = () => {
        store.commit(KPMutations.SET_KP_LOGO_LIST_NEXT)
        ++currentLogoId.value
        if (currentLogoId.value >= logoList.value.length){
            currentLogoId.value = 0
        }
	}
    let prevLogo = () => {
        store.commit(KPMutations.SET_KP_LOGO_LIST_PREV)
        --currentLogoId.value
        if (currentLogoId.value < 0 ){
            currentLogoId.value = logoList.value.length-1
        }
    };
    const shiftLogo = (n: number):void => {
		store.commit(KPMutations.SET_KP_LOGO_LIST_SIFT, n-currentLogoId.value)
        currentLogoId.value = n
    }
    
    
</script>
 