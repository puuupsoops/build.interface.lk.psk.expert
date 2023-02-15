<template>
  <div class="kp-step" :class="{'active': active}">
    <div class="kp-step-title">Параметры коммерческого предложения</div>
    <div class="kp-step-body">
      <div class="kp-step-body-input">

        <div class="orders-list-item" :class="{'active': additionally}">
          <div class="orders-list-row " @click="additionally=!additionally">
            <div class="orders-list-elem"> <div class="table-arrow"></div> 	</div>
            <div class="orders-list-elem"> Дополнительные условия</div>
          </div>
          <div class="kp-step-body-row-group"  :class="{'active': additionally}">
            <div class="kp-step-body-row">
              <span class="kp-step-body-row-elem">Условия доставки</span>
              <CheckButton v-model="KPLocal.additionally.pickup"
                           @onClick="KPLocal.additionally.delivery=false;
                           KPLocal.additionally.deliveryValue=0"
                           style="margin-left: 30px"
              />
              <div>Самовывоз</div>
              <CheckButton v-model="KPLocal.additionally.delivery"
                           @onClick="KPLocal.additionally.pickup=false"
                           style="margin-left: 30px"
              />
              <div>Доставка</div>
              <AmountInput v-if="KPLocal.additionally.delivery"
                           :min="0" :step="10"
                           v-model="KPLocal.additionally.deliveryValue"
                           style="margin-left: 30px"
              />
              <div v-if="KPLocal.additionally.delivery">₽  <span class="kp-step-body-elem-text-sub">Стоимость</span></div>
              <SelectInput  v-if="KPLocal.additionally.pickup"
                            :data="addressList"
                            v-model="KPLocal.additionally.pickupValue"
                            :style="'max-width: 300px'"
              />

            </div>
            <div class="kp-step-body-row">
              <span  class="kp-step-body-row-elem">Предоплата</span>
              <CheckButton v-model="KPLocal.additionally.prepayment" @onClick="KPLocal.additionally.prepaymentValue=0"  :style="'margin-left: 30px'"/>

              <AmountInput v-if="KPLocal.additionally.prepayment" :min="0" :max="100" :step="0.1" v-model="KPLocal.additionally.prepaymentValue" :style="'margin-left: 30px'"/>
              <div v-if="KPLocal.additionally.prepayment" :style="'margin-left: 10px'">%</div>
              <div class="kp-step-body-elem-text-sub"  v-if="KPLocal.additionally.prepayment && total" :style="'margin-left: 10px'" >
                {{ PriceFormat(Number((total / 100 ) * KPLocal.additionally.prepaymentValue), true) }} от {{PriceFormat(total, true)}}
              </div>
            </div>
            <div v-show="KPLocal.additionally.prepaymentValue !== 100" class="kp-step-body-row">
              <span  class="kp-step-body-row-elem">Отсрочка</span>
              <CheckButton v-model="KPLocal.additionally.delay" @onClick="KPLocal.additionally.delayWorkValue=0; KPLocal.additionally.delayCalendarValue=0"  :style="'margin-left: 30px'"/>
              <div v-if="KPLocal.additionally.delay" :style="[!isDelayType ? 'color: #FFFFFF':'color: #292C32','margin-left: 30px']">Количество <br>календарных дней</div>
              <AmountInput v-if="KPLocal.additionally.delay" :min="0" v-model="KPLocal.additionally.delayCalendarValue" :disabled="isDelayType" />
              <div v-show="KPLocal.additionally.delay" :style="'margin-left: 30px'">
                <SwitchButton v-model="isDelayType"></SwitchButton>
              </div>
              <div v-if="KPLocal.additionally.delay" :style="[isDelayType ? 'color: #FFFFFF':'color: #292C32','margin-left: 30px']">Количество<br>рабочих дней</div>
              <AmountInput v-if="KPLocal.additionally.delay" :min="0" v-model="KPLocal.additionally.delayWorkValue" :disabled="!isDelayType" />
            </div>
          </div>
        </div>
        <div class="orders-list-item" :class="{'active': KPLocal.header}">
          <div class="orders-list-row " @click="KPLocal.header=!KPLocal.header">
            <div class="orders-list-elem"> <div class="table-arrow"></div> 	</div>
            <div class="orders-list-elem">Заголовок</div>
          </div>
          <div class="kp-step-body-row-group"  :class="{'active': KPLocal.header}">

            <div class="kp-step-body-row" >
              <span class="kp-step-body-row-elem">Текст</span>
              <CheckButton v-model="headerText" :style="'margin-left: 30px'"/>
              <div class="kp-step-body-row-group"  :class="{'active': headerText}">
                                    <textarea
                                        class="order-comment-textarea"
                                        style="min-width: 500px"
                                        v-model="KPLocal.headerText"
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
                <div class="header-button left"
                     :class="{'active': KPLocal.headerLogoAlign === KPHEADERLOGOALIGN.LEFT}"
                     @click="KPLocal.headerLogoAlign=KPHEADERLOGOALIGN.LEFT"
                     tooltip="Слева"
                     flow="up"
                     v-html="ALIGN_LEFT"
                ></div>
                <div class="header-button center"
                     :class="{'active': KPLocal.headerLogoAlign === KPHEADERLOGOALIGN.CENTER}"
                     @click="KPLocal.headerLogoAlign=KPHEADERLOGOALIGN.CENTER"
                     tooltip="По центру"
                     flow="up"
                     v-html="ALIGN_CENTER"
                ></div>
                <div class="header-button right"
                     :class="{'active': KPLocal.headerLogoAlign === KPHEADERLOGOALIGN.RIGHT}"
                     tooltip="Справа"
                     flow="up"
                     @click="KPLocal.headerLogoAlign=KPHEADERLOGOALIGN.RIGHT"
                     v-html="ALIGN_RIGHT"
                ></div>

              </div>
            </div>
            <div v-if="logoList.length>0" class="kp-step-body-row-group"  :class="{'active': headerLogo}">
              <div :style="'text-align: center;'"> Лого #{{ logoList[0].id }} </div>
              <PreloaderLocal v-if="loadingLogo" style="margin:auto"></PreloaderLocal>
              <div class="kp-step-body-column" v-if="headerLogo&&!loadingLogo" :style="'justify-content: center'">
                <!--<div class="product-slider-controls kp">
                  <span v-for="(slide, key) in logoListOrigin" :key="key">
                    <input type="radio" :id="String(slide.id)" >
                    <label
                        :for="String(slide.id)"
                        :tooltip="`#${slide.id}`"
                        flow="up"
                        :class="{'checked': currentLogoId === key}"
                        @click="shiftLogo(key)"
                    ></label>
                  </span>
                </div>-->
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
              <div :style="'text-align: center; margin-top: -50px;'">
                <BaseButton
                 @click="deleteLogo(currentLogoId)"
                >Удалить</BaseButton>
              </div>
            </div>
            <div v-else class="kp-step-title kp-step-body-row-group" :class="{'active': headerLogo}">
              <span>Логотипов нет. Добавьте логотип.</span>
            </div>
          </div>
        </div>
        <div class="order-comment-form show">
          <div class="order-comment-title"><span>Комментарий</span></div>
          <textarea class="order-comment-textarea" v-model="KPLocal.offer.comment"  ></textarea>
        </div>
        <div class="kp-step-body-row" :style="'justify-content: flex-end'">
          Скачать документ в формате:
          <CheckButton v-model="PDF" @onClick="PDF=true; WORD=false; KPLocal.as='PDF'"  :style="'margin-left: 30px'"/>
          <div :style="'margin-left: 10px'">PDF</div>

        </div>
      </div>
    </div>
    
    <div :class="'kp-canvas-controller'">
      <span>
        <input ref="file" type="file" @change="uploadLogo()">
      </span>

      <span>
        <base-button @onClick="moveRight()">Вправо</base-button>
        <base-button @onClick="moveLeft()">Влево</base-button>
        <base-button @mousedown="moveUp()">Вверх</base-button>
        <base-button @onClick="moveDown()">Вниз</base-button>
      </span>

      <span>
        <base-button @onClick="zoomUp()">Увеличить</base-button>
        <base-button @onClick="zoomDown()">Уменьшить</base-button>
      </span>

      <span>
        <base-button @onClick="download()" :style="'background-color: oldlace;'">Сохранить</base-button>
      </span>
    </div>
    
    <div>
      <span>
        <div style="position: relative;" width="720" height="900" >
          <canvas width="720" height="900" style="z-index: -1;"></canvas>
          <canvas id="canvas-back" width="720" height="900" 
            style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
          <canvas id="canvas-front" width="720" height="900" 
            style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
        </div>
      </span>
      <span>
        <canvas id="c1" width="720" height="900"></canvas>
      </span>
    </div>

    <div 
      :class="'zoom-wrapper'" 
      :style="'display: contents; width: 720px; height: 900px;'" 
      @wheel="Wheel()"
      >
      <div ref="zoomarea" id="zoom-area" @click="ZoomClick()">
        <img :style="'pointer-events: none;'" src="https://picsum.photos/id/237/200/300"/>
      </div>

      <img
       :style="'width: 100%;'" 
       src="https://psk.expert/upload/iblock/5ca/d72rap9a2eeisgcsq409l0lg814gqtjx/kos600_kos610_b.jpg" />

    </div>

    <div class="kp-step-actions ">
      <div class="kp-step-actions-link" @click="$emit('prev')">Назад</div>
      <div class="kp-step-actions-link right" @click="next()">Далее</div>
    </div>
  </div>

  <Preloader v-if="showPreloader" />
</template>

<script setup lang="ts">
import {computed, PropType, ref, onMounted, nextTick } from 'vue'
import _ from "lodash";
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import SwitchButton from '/src/components/ui/SwitchButton.vue'
import AmountInput from '/src/components/ui/AmountInput.vue'
import CheckButton from '/src/components/ui/CheckButton.vue'
import SelectInput from '/src/components/ui/SelectInput.vue'
import BaseButton from '/src/components/ui/BaseButton.vue'
import Preloader from '/src/components/Preloader.vue'

import {KP, KP_HEADER_LOGO_ALIGN, KPLogoList} from '/src/models/KP'
import { ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT} from '/src/components/ui/svg/align'
import {SelectInputData, PriceFormat} from '/src/models/Components'
import {ShipmentsActions} from '/src/store/shipments/actions'

import {KPActions} from '/src/store/kp/actions'
import {KPMutations} from '/src/store/kp/mutations'
import {useStore} from '/src/store'
import {ShipmentsAddress} from "/src/models/Shipments";

import Panzoom from '@panzoom/panzoom';
import  {fabric}  from "fabric";

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  kp: {
    type: Object as PropType<KP>
  },
})
const emits = defineEmits(['next','prev','update:kp'])
const store = useStore()

const zoomArea = ref()

nextTick( () => {
  zoomArea.value = window.document.getElementById('zoom-area');
  console.log(zoomArea)
  console.log(zoomArea.value)

  const panzoom = Panzoom(zoomArea.value, {
      maxScale: 6
  });
  //const Wheel = panzoom.zoomWithWheel
})

console.log(zoomArea)
console.log(zoomArea.value)

//const panzoom = Panzoom(zoomArea.value, {
//    maxScale: 6
//  });

//let Wheel = panzoom.zoomWithWheel

const ZoomClick = () => {
  console.log('ZoomClick')
}
//Canvas Context
const cxt = ref()

const imageLogo = ref()

const canvasFrontRef = ref()
const canvasOffsetX = ref()
const canvasOffsetY = ref()

const canvasBackRef = ref()

//test
const canvasTest = ref()

const startLogoPosX = ref()
const startLogoPosY = ref()

const startImageWidth = ref(200)
const startImageHeight = ref(200)

const file = ref(null)

const toBase64 = res => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(res);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const download = () => {
  console.log('Image download')
  canvasTest.value.getContext('2d').clearRect(0,0,canvasTest.value.width, canvasTest.value.height)

  canvasTest.value.getContext('2d').drawImage(canvasBackRef.value,0,0)
  canvasTest.value.getContext('2d').drawImage(canvasFrontRef.value,0,0)

  //console.log(canvasTest.value.toDataURL())
  canvasTest.value.toBlob( (blob) => {
      console.log(blob)
      const url = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'image.png');
					document.body.appendChild(link);
					link.click();
					
					// clean up "a" element & remove ObjectURL
					document.body.removeChild(link);
					window.URL.revokeObjectURL(url);
  })
}

const uploadLogo = async () => {
  let fileBase64 = await toBase64(file.value.files[0])
  
  imageLogo.value = new Image()
  imageLogo.value.src = fileBase64

  imageLogo.value.onload = () => {
    console.log('Logo load',imageLogo.value)

    canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

    canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
    startLogoPosX.value,startLogoPosY.value,
    startImageWidth,startImageHeight);
    canvasFrontRef.value.getContext('2d').save()

    //костыль: двигаем изображение, т.к. не отображается после загрузки
    moveRight()
  }
}

const zoomUp = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosX.value++

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  startImageWidth.value++,startImageHeight.value++);
}

const zoomDown = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosX.value++

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  startImageWidth.value--,startImageHeight.value--);
}

const moveRight = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosX.value++

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  startImageWidth.value,startImageHeight.value);
}

const moveLeft = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosX.value--

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  startImageWidth.value,startImageHeight.value);
}

const moveUp = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosY.value--

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  startImageWidth.value,startImageHeight.value);
}

const moveDown = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosY.value++

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  startImageWidth.value,startImageHeight.value);
}

const getFrontCanvasOffset = () => {
  let canvasOffset = canvasFrontRef.value.getBoundingClientRect()
  canvasOffsetX.value = canvasOffset.x
  canvasOffsetY.value = canvasOffset.y
  console.log('getFrontCanvasOffset X: ', canvasOffsetX.value, ' Y: ',canvasOffsetY.value )
}

onMounted(() => {
  canvasFrontRef.value = window.document.getElementById('canvas-front')
  canvasBackRef.value = window.document.getElementById('canvas-back')
  canvasTest.value = window.document.getElementById('c1')

  let canvasBack = window.document.getElementById('canvas-back')
  let canvasFront = window.document.getElementById('canvas-front')
  cxt.value = canvasBack.getContext('2d')
  //observer.observe(target);
  //console.log(target)

  const canvasBackground = new Image(720,900)
  //let back = await fetch('', {mode: 'no-cors'})
  //.then(res => res.blob())
  //console.log('fetch' , back)
    // Make sure the image is loaded first otherwise nothing will draw.
  canvasBackground.onload = function() {
    canvasBack.getContext('2d').drawImage(canvasBackground,0,0,720,900)
    canvasBack.getContext('2d').save()
  }

  canvasBackground.crossOrigin = 'Anonymous'
  canvasBackground.src = 'http://89.111.136.61/upload/images/kos600_kos610_b.jpg'
  //canvasBackground.src = 'https://psk.expert/upload/iblock/77d/w8huebomv7df5plmaq7ok88rcpemw03m/kos610_aaa.jpg'
  //cxt.value.drawImage(canvasBackground, 0, 0, 720, 900)

  let isDraggable = false
  let currentX = canvasFront.width / 2
  let currentY = canvasFront.height / 2
  let initialWidthLogo = 200
  let initialHeightLogo = 200

  //let startLogoPosX = currentX - initialWidthLogo/2
  //let startLogoPosY = currentY - initialHeightLogo/2
  startLogoPosX.value = currentX - initialWidthLogo/2
  startLogoPosY.value = currentY - initialHeightLogo/2

  imageLogo.value = new Image()
  imageLogo.value.src = 'https://picsum.photos/id/237/200/300'
  imageLogo.value.crossOrigin = 'Anonymous'

  imageLogo.value.onload = () => {
    canvasFront.getContext('2d').drawImage(
      imageLogo.value,
      startLogoPosX.value,startLogoPosY.value,
      initialWidthLogo,initialHeightLogo
    )

    canvasFront.getContext('2d').save()
  }
//panzoom.value = Panzoom(window.document.getElementById('zoom-area'), {
//  maxScale: 6
//});
//console.log(panzoom)
//console.log(panzoom.value.zoomWithWheel)

canvasFront.onmousedown = (e) => {
  getFrontCanvasOffset()
    console.log('layerX', e.layerX,'layerY', e.layerY)
    console.log('layerX', e.layerX / 2,'layerY', e.layerY)
    console.log('startLogoPosX', startLogoPosX.value, 'startLogoPosY', startLogoPosY.value)
    console.log('mouseDownCanvas', e)

    let clientX = e.clientX - canvasOffsetX.value
    let clientY = e.clientY - canvasOffsetY.value

    let logoLeft = startLogoPosX.value
    let logoRight = startLogoPosX.value + startImageWidth.value
    let logoTop = startLogoPosY.value
    let logoBottom = startLogoPosY.value + startImageHeight.value

    /*
    if( e.layerX <= (startLogoPosX.value + imageLogo.width/2) && 
        e.layerX >= (startLogoPosX.value - imageLogo.width/2) &&
        e.layerY <= (startLogoPosY.value + imageLogo.height/2) && 
        e.layerY >= (startLogoPosY.value - imageLogo.height/2)
      )
    */
    if( clientX > logoLeft &&
        clientX < logoRight &&
        clientY > logoTop &&
        clientY < logoBottom
      ) 
    {
      isDraggable = true
      console.log('click Image')
    }else{
      console.log('didnt click Image')
    }
    console.log('isDraggable', isDraggable)
    
}

canvasFront.onmouseup = (e) => {
  //console.log('mouseUpCanvas', e)
  isDraggable = false
  //console.log('isDraggable', isDraggable)
}

canvasFront.onmouseout = (e) => {
  //console.log('mouseOutCanvas', e)
  isDraggable = false
  //console.log('isDraggable', isDraggable)
}

canvasFront.onmousemove = (e) => {
  if(!isDraggable) {
    return
  }
  let clientX = (e.clientX - canvasOffsetX.value) - startLogoPosX.value - 100
  let clientY = (e.clientY - canvasOffsetY.value) - startLogoPosY.value - 100

  console.log('move x:', clientX, ' y: ', clientY )

  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  canvasFrontRef.value.getContext('2d').drawImage(
      imageLogo.value,
      startLogoPosX.value += clientX, startLogoPosY.value += clientY,
      initialWidthLogo,initialHeightLogo
  )
}

}
)
//console.log(cxt)


//console.log(panzoom)
//const Wheel = panzoom.value.zoomWithWheel
//const ZoomClick = () => {
//  console.log('clicked!')
//}


const KPLocal = ref(props.kp)
const total = computed( ()=>{
  let total_price = 0
  KPLocal.value!.offer.position.forEach(c=>{
    total_price = total_price + c.total!
  })
  return total_price
})
const additionally = ref(false)
const headerLogo = ref(false)  // чекбаттон для выбора лого в заголовок
const headerText = ref(true)   // чекбаттон для выбора текста в заголовок
const isDelayType = ref(false) // переключатель выбора типа отсрочки

const imageBase64 = ref('')
const loadingLogo = ref(false)
const logoList = computed<KPLogoList[]>(() => store.getters.getKPLogoList) //Список загруженных лого для карусели
const logoListOrigin = computed<KPLogoList[]>(() => store.getters.getKPLogoListOrigin) // Копия списка агруженных лого которая не меняется для списка контрол-бар

const showPreloader = ref(false)

const PDF = ref(true)       //Флаги
const WORD = ref(false)
const handleFileUpload = ( event: any) =>{
  if (!loadingLogo.value) {
    let img = event.target.files[0]
    let filename = img.name
    let reader = new FileReader()
    reader.onloadend =  () => {
      imageBase64.value = <string>reader.result
      loadingLogo.value = true
      store.dispatch(KPActions.ADD_KP_LOGO, { name: filename, file: imageBase64.value })
          .then(()=>{
            KPLocal.value!.headerLogo = store.getters.getKPLogoId
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
const prevLogo = () => {
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
const KPHEADERLOGOALIGN = computed(()=>KP_HEADER_LOGO_ALIGN)

const addressList = computed<SelectInputData[]>(() => store.getters.getShipmentsAddressInputData)
const currentLogoId = ref(0)

store.dispatch(KPActions.GET_KP_LOGO)
store.dispatch(ShipmentsActions.GET_SHIPMENTS_ADDRESS)
const companyList = computed<SelectInputData[]>(() => store.getters.getCompanysListInput().filter((x: SelectInputData) => x.id !== ''))

const next = () => {
  const executorName = companyList.value.find((x: SelectInputData) => x.id == KPLocal.value!.offer.executor)
  if (executorName) KPLocal.value!.offer.executor = executorName.name

  if (KPLocal.value!.additionally.pickup) {
    const pickupValue = store.getters.getShipmentsAddress.find((x: ShipmentsAddress) => x.index == parseInt(KPLocal.value!.additionally.pickupValue)).address

    if (pickupValue) KPLocal.value!.additionally.pickupValue = pickupValue
  }
  if (logoList.value.length > 0) KPLocal.value!.headerLogo = Number(logoList.value[0].id)

  emits('next')
  emits('update:kp', KPLocal.value)
}

//удаляем логотип
const deleteLogo = (index: number) => {
  index=index-1
  if(logoList.value.length == 1){
    index = 0
  }

  showPreloader.value = true

  //нужный индекс элемента, так как массив logoList постоянно перемещается
  let i = 0;
  let currentID = logoList.value[index].id;
  logoListOrigin.value.forEach( (item, currentIndex)=>{
    if(item.id == currentID){
      i = currentIndex
    }
  } )


  let data = { index: index, id: Number(logoListOrigin.value[i].id) }
  store.dispatch(KPActions.DELETE_KP_LOGO, data)
    .then( () => {showPreloader.value = false})
  //store.commit(KPMutations.DELETE_KP_LOGO_BY_ID, data)
}
</script>

<style lang="sass">
.kp-canvas-controller
  margin-bottom: 15px

.kp-canvas-controller
  & > span
    margin-right: 20px
  & > span > button
    margin-right: 5px

</style>>
