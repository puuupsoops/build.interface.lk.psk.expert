<template>
	<div class="order-list content-elem">
    <div class="order-list-bottom scroll-elem" v-if="orderLocal && orderLocal.position && orderLocal.position.length>0">
      <div class="order-list-bottom-wrap">
        <div class="content-heading-wrap"  v-if="orderLocal.total && noTotal===false"
             :class="{ 'order-draft': true, 'kp': isKp }"
        >
          <div class="content-heading-price">
            <div class="content-heading-price" >
              <div class="content-heading-price-text">Сумма заказа:</div>
              <div class="content-heading-price-value" v-if="orderLocal.total!==orderLocal.total_discount && isKp===false">
                <span class="strikethrough">{{ PriceFormat(orderLocal.total, true) }}</span>
                {{ PriceFormat(orderLocal.total_discount, true) }}
              </div>
              <div class="content-heading-price-value" v-else>{{ PriceFormat(orderLocal.total, true) }}</div>
            </div>
          </div>
          <div class="content-heading-info-elem" v-if="orderLocal.delivery.case==='other' && isKp===false" >
            +Доставка: {{orderLocal.delivery.cost}} ₽
          </div>
          <div class="content-heading-info-elem kp" v-if="isKp">
            <BaseButton @on-click="calcOrder(sale_type, true)"
                        style="min-width: 7rem"
                        tooltip="Скидка/Наценка автоматически будет проставлена на каждую позицию ниже"
                        flow="left"
                        :active="sale>0"
            >{{ sale_margin < 0 ? 'Скидка': 'Наценка'}}</BaseButton>
            <AmountInput v-model="sale" @on-input="calcOrder()"/>
            <BaseButton @on-click="calcOrder(SALE_TYPE.PERCENT)"
                         :active="sale_type === SALE_TYPE.PERCENT"
            >%</BaseButton>
            <BaseButton @on-click="calcOrder(SALE_TYPE.ADD)"
                         :active="sale_type === SALE_TYPE.ADD"
            >₽</BaseButton>

          </div>

        </div>

        <div class="order-list-row order-list-heading" v-if="orderLocal.position.length>0">
          <div class="order-list-elem">№</div>
          <div class="order-list-elem">Артикул</div>
          <div class="order-list-elem">Наименование</div>
          <div class="order-list-elem">{{ open.length !== 0 ? 'Цена':'' }}</div>
          <div class="order-list-elem">Кол-во</div>
          <div class="order-list-elem">Стоимость</div>
          <div class="order-list-elem"></div>

        </div>
        <div class="order-list-item"
             :class="{ 'active': open.indexOf(key) !== -1 }"
          v-for="(item, key) in orderLocal.position"
          :key="key"
        >
          <div
            class="order-list-row order-list-main-row"
            @click="open.indexOf(key) === -1 ? open.push(key) : open.splice(open.indexOf(key),1)"
          >
            <div class="order-list-elem">{{key+1}}</div>
            <div class="order-list-elem">{{ item.article }}</div>
            <div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
            <div class="order-list-elem"></div>
            <div class="order-list-elem">{{ item.count }}</div>
            <div class="order-list-elem">
              {{ PriceFormat(item.total, true) }}
            </div>
            <div class="order-list-elem-delete"></div>
          </div>
          <div class="order-list-sublist"
               :class="{'active' : open.indexOf(key) !== -1 }"
          >
            <div v-for="(characteristic, k) in item.characteristics"
              :key="k"
              class="order-list-row"
            >
              <div class="order-list-elem"> </div>
              <div class="order-list-elem"> </div>
              <div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
              <div class="order-list-elem kp" v-if="isKp">
                {{ PriceFormat(characteristic.PRICE, true) }}
                <div class="kp-add"
                     :class="{'active': characteristic.add_sum!==undefined }"
                     @click="showAddSum(characteristic)"
                ></div>
                <template v-if="characteristic.add_sum!==undefined">
                  <span
                      :tooltip="'К этой сумме не применяется '+ (sale_margin < 0 ? 'скидка': 'наценка')"
                      :flow="k+1===item.characteristics.length ? 'right':'down'"
                  >
                    <AmountInput
                      v-model="characteristic.add_sum"
                      @on-input="calcOrder()"
                      :min="-1000000"
                    />
                  </span>
                  <span v-if="characteristic.add_sum!==undefined">=</span>
                  <div class="order-list-elem-text" v-if="characteristic.add_sum!==undefined">{{ PriceFormat(characteristic.PRICE - characteristic.add_sum, true) }}</div>
                </template>

              </div>
              <div class="order-list-elem" v-else>
                {{ PriceFormat(characteristic.PRICE, true) }}
                <div class="order-list-elem-text" v-if="characteristic.discount>0">скидка {{ characteristic.discount }}% </div>
              </div>
              <div class="order-list-elem">
                <AmountInput
                  v-if="isKp"
                  v-model="characteristic.count"
                  @on-input="calcOrder()"
                />
                <span v-else>{{characteristic.count}}</span></div>
              <div class="order-list-elem">
                {{PriceFormat(characteristic.PRICE * characteristic.count, true)}}
              </div>
              <div class="order-list-elem-delete">
                <DeleteButton v-if="isKp"
                              @onClick="orderLocal.position[key].characteristics.splice(k, 1);calcOrder()"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="order-list-bottom-wrap" v-if="orderLocal && orderLocal.position_presail.length > 0 && noPresail===false && isKp===false">

        <div class="order-list-row order-list-subheading">
          <div>Позиции для предзаказа</div>
        </div>
        <div class="content-heading-wrap"  v-if="orderLocal.total_presail && !noTotal"
             :class="{ 'order-draft': true}"
        >
          <div class="content-heading-price">
            <div class="content-heading-price" >
              <div class="content-heading-price-text">Сумма заказа: </div>
              <div class="content-heading-price-value" v-if="orderLocal.total_presail !== orderLocal.total_presail_discount">
                <span class="strikethrough">{{ PriceFormat(orderLocal.total_presail, true) }}</span>
                {{ PriceFormat(orderLocal.total_presail_discount, true) }}
              </div>
              <div class="content-heading-price-value" v-else>{{ PriceFormat(orderLocal.total_presail, true) }}</div>
            </div>
          </div>
        </div>
        <div class="order-list-row order-list-heading">
          <div class="order-list-elem">№</div>
          <div class="order-list-elem">Артикул</div>
          <div class="order-list-elem">Наименование</div>
          <div class="order-list-elem">{{ open_presail.length !== 0 ? 'Цена':'' }}</div>
          <div class="order-list-elem">Кол-во</div>
          <div class="order-list-elem">Стоимость</div>
          <div class="order-list-elem"></div>

        </div>
        <div class="order-list-item"
             :class="{ 'active' : open_presail.indexOf(key) !== -1 }"
          v-for="(item, key) in orderLocal.position_presail"
          :key="key"
        >
          <div
            class="order-list-row order-list-main-row"
            @click="open_presail.indexOf(key) === -1 ? open_presail.push(key) : open_presail.splice(open_presail.indexOf(key),1)"
          >
            <div class="order-list-elem">{{key+1}}</div>
            <div class="order-list-elem">{{ item.article }}</div>
            <div class="order-list-elem"><span v-html = "item.product.NAME"></span></div>
            <div class="order-list-elem"></div>
            <div class="order-list-elem">{{ item.count }}</div>
            <div class="order-list-elem">{{ PriceFormat(item.total, true) }}</div>

          <div class="order-list-elem-delete">

          </div>
          </div>
          <div class="order-list-sublist"
               :class="{ 'active': open_presail.indexOf(key) !== -1 }"
          >
            <div
              v-for="(characteristic, k) in item.characteristics"
              :key="k"
              class="order-list-row"
            >
              <div class="order-list-elem"> </div>
              <div class="order-list-elem"> </div>
              <div class="order-list-elem">{{ characteristic.CHARACTERISTIC }}</div>
              <div class="order-list-elem">{{ PriceFormat(characteristic.PRICE, true) }}</div>
              <div class="order-list-elem"><span>{{characteristic.count}}</span></div>
              <div class="order-list-elem">{{ PriceFormat(characteristic.PRICE * characteristic.count, true) }}</div>
              <div class="order-list-elem-delete"></div>
            </div>

          </div>
        </div>


      </div>
    </div>
    <div class="content-heading-wrap order-draft kp">
      <BaseButton @click="showAddPos = true">Добавить</BaseButton>
    </div>
    <OrderProductAddModal v-model="showAddPos" v-model:add-position="addPos"/>
	</div>


</template>

<script setup lang="ts">
import {ref, PropType, watch} from 'vue'
import _ from 'lodash'

import BaseButton from '/src/components/ui/BaseButton.vue'
import AmountInput from '/src/components/ui/AmountInput.vue'
import DeleteButton from '/src/components/ui/DeleteButton.vue'
import OrderProductAddModal from '/src/components/cards/Product/ProductAddModal.vue'

import { OrderStateOrder, OrderStatePosition, OrderStatePositionOffer } from '/src/store/order/types'
import { PriceFormat } from '/src/models/Components'
import { orderCalc as orderCalcStore} from '/src/store/order/helper'

// eslint-disable-next-line no-unused-vars
const enum SALE_TYPE {
  ADD = 'add',
  PERCENT = 'persent'
}

const props = defineProps( {
		order: {
			type: Object as PropType<OrderStateOrder>,
      required: true
		},
		noTotal: {
			type: Boolean,
			default: false
		},
		noPresail: {
			type: Boolean,
			default: false
		},
    isKp: {
      type: Boolean,
      default: false
    }
  })
const emits = defineEmits(['update:order'])
const open = ref<number[]>([]);
const open_presail = ref<number[]>([]);

const sale = ref(0)
const sale_margin = ref(-1)
const sale_type = ref<SALE_TYPE>(SALE_TYPE.PERCENT)

const showAddPos = ref(false) // окно с добавлением продукта
const orderLocal = ref<OrderStateOrder>(props.order)
const addPos = ref<OrderStatePosition>()

const calcOrder = (type?: SALE_TYPE, change?: boolean):void => {
  sale_margin.value = change ? -sale_margin.value:sale_margin.value
  sale_type.value = type ? type : sale_type.value
  if (orderLocal.value) {
    orderLocal.value = _.cloneDeep(props.order)
    let total = 0
    orderLocal.value.position.forEach((pos, pos_id) => {
      let total_pos = 0
      if (pos.characteristics.length == 0) orderLocal.value.position.splice(pos_id, 1)
      else
      pos.characteristics.forEach( c => {
        if(sale_type.value == SALE_TYPE.PERCENT) {
          c.PRICE = c.fullprice! + (sale_margin.value * c.fullprice! * sale.value/100) + ( c.add_sum?? 0)
          total_pos = total_pos + c.count * c.PRICE
        }
        if(sale_type.value == SALE_TYPE.ADD) {
          c.PRICE = c.fullprice! + sale_margin.value * sale.value + ( c.add_sum?? 0)
          total_pos = total_pos + c.count * c.PRICE
        }
      });
      pos.total = total_pos
      total = total + total_pos
    });
    orderLocal.value.total = total
    emits('update:order', orderLocal.value)
  }
}
const showAddSum = (characteristic: OrderStatePositionOffer) => {
  characteristic.add_sum===undefined ? characteristic.add_sum=0 :characteristic.add_sum=undefined
  calcOrder()
}
watch(addPos, ()=>{
  if (orderLocal.value.position) {
    orderLocal.value.position = orderLocal.value.position.concat(addPos.value ?? [])
  } else {
    orderLocal.value.position.push(addPos.value)
  }
  orderLocal.value = orderCalcStore(orderLocal.value)
})
</script>

