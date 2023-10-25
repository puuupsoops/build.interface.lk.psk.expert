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
                ><svgAlignLeft class="sidebar-btn"/></div>
                <div class="header-button center"
                     :class="{'active': KPLocal.headerLogoAlign === KPHEADERLOGOALIGN.CENTER}"
                     @click="KPLocal.headerLogoAlign=KPHEADERLOGOALIGN.CENTER"
                     tooltip="По центру"
                     flow="up"
                ><svgAlignCenter class="sidebar-btn"/></div>
                <div class="header-button right"
                     :class="{'active': KPLocal.headerLogoAlign === KPHEADERLOGOALIGN.RIGHT}"
                     tooltip="Справа"
                     flow="up"
                     @click="KPLocal.headerLogoAlign=KPHEADERLOGOALIGN.RIGHT"
                ><svgAlignRight class="sidebar-btn"/></div>

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
                  <div class="product-slider-main">
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
              <div :style="'text-align: center; margin-top: -50px;'">
                <BaseButton
                 @click="deleteLogo(currentLogoId)"
                >Удалить</BaseButton>
              </div>
            </div>
            <div v-else class="kp-step-title kp-step-body-row-group" :class="{'active': headerLogo}">
              <span>Логотипов нет. Добавьте логотип.</span>
            </div>

            <div class="kp-step-body-row">
              <span class="kp-step-body-row-elem">Баннер</span>
              <CheckButton v-model="KPLocal.banner" style="margin-left: 30px"/>
              <label v-if="KPLocal.banner" class="kp-step-body-add-file-label" for="banner-upload">
                <input @change="handleBannerFileUpload( $event )" class="kp-step-body-add-file-input" id="banner-upload" type="file" accept="image/*">
              </label>
              <div v-if="KPLocal.banner" style="color: #A5A7A9; padding-left: 95px; opacity: 0.7;">Рекомендуемый размер баннера для загрузки, высота: <strong>240</strong>px, <strong>x</strong> ширина: <strong>2040</strong>px.</div>
            </div>
            <div v-if="bannerList.length>0" class="kp-step-body-row-group"  :class="{'active': KPLocal.banner}">
              <div :style="'text-align: center;'"> Баннер #{{ bannerList[0].id }} {{ bannerList[0].type ==  'showcase' ? '- системный' : ''}} </div>
            <PreloaderLocal v-if="loadingLogo" style="margin:auto"></PreloaderLocal>
              <div class="kp-step-body-column" v-if="KPLocal.banner" :style="'justify-content: center'">
                <div class="product-slider-wrap" >
                  <div class="product-slider-main">
                    <button class='product-slider-arrow prev' @click="prevBanner"></button>
                    <transition-group name="product-slider-trans" class='product-slider' :style="'align-items: center; height: 240px; max-width: 1200px;'"  tag="div">
                      <div v-for="slide in bannerList" class='product-slider-slide' :key="slide.id" :style="slide.type != 'custom' ? ['border: 2px solid;','border-color: #FAC12E;', 'border-radius: 10px;'] : []">
                        <img v-if="slide.image" :src="slide.image"  />
                      </div>
                    </transition-group>
                    <div class='product-slider-arrow next' @click="nextBanner"></div>
                  </div>
                </div>
              </div>
              <div v-if="bannerList[0].type=='custom'" :style="'text-align: center; margin-top: -50px;'">
                <BaseButton
                 @click="deleteBanner(currentBannerId)"
                >Удалить</BaseButton>
              </div>
            </div>
            <div v-else class="kp-step-title kp-step-body-row-group" :class="{'active': KPLocal.banner}">
              <span>Баннеров нет. Добавьте баннер.</span>
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
          <CheckButton v-model="WORD" @onClick="PDF=false; WORD=true; KPLocal.as='WORD'"  :style="'margin-left: 30px'"/>
          <div :style="'margin-left: 10px'">WORD</div>

        </div>
        <div class="kp-step-body-row" :style="'justify-content: flex-end; align-items: baseline;'">
          Ориентация документа:
          <div :style="'display: flex; flex-direction: column; margin-left: 20px; margin-right: 148px;'">
            <div :style="'display: flex; align-items: center;'"> 
              <CheckButton v-model="isLDDO" @onClick="isLDDO=true; isPDDO=false; KPLocal.isPortraitOrientation=false" />
              <div :style="'margin-left: 10px'">Альбом</div>
            </div>
            <div :style="'display: flex; align-items: center; padding-top: 12px;'">
              <CheckButton v-model="isPDDO" @onClick="isLDDO=false; isPDDO=true; KPLocal.isPortraitOrientation=true" />
              <div :style="'margin-left: 10px'">Портрет</div>
            </div>
          </div>
        </div>

        <!--<div class="orders-list-item" :class="{'active': attachments}">
          <div class="orders-list-row " @click="attachments=!attachments">
            <div class="orders-list-elem"> <div class="table-arrow"></div> 	</div>
            <div class="orders-list-elem">Вложения</div>
          </div>
              <div class="kp-step-body-row-group"  :class="{'active': attachments}">
                <div>
                  <div class="kp-step-body-row">
                    <div style="display: grid; width: 150px; height: 210px;"
                      v-for="(item,index) in KPLocal.attachments" :key="index"
                      @click="removeAttachmentsById($event.target.parentElement)"
                      :data-id="index"
                    >
                      <span style="margin: 0 0 0 auto; font-weight: bold; color: red; cursor: pointer;">X</span>
                      <img :src="item" height="200">
                    </div>
                  </div>
                </div>
              </div>
        </div>  -->


      </div>
    </div>
    
    <div class="order-list content-elem" :style="[ attachments ? 'display: flex;' : 'display: none;']">
    <div class="content-heading-wrap kp" style="display: block;">

    <div v-if="KPLocal.offer.position" :style="'display: flex; align-items: center; max-width: 580px; padding: 10px 5px;'">
      <div class="select-input-container">
        <button 
          @click="selectInputActive=!selectInputActive"
          :class="['select-input-btn', selectInputActive ? 'active' : '']"
        >ВЫБЕРИТЕ ТОВАР ИЗ ВЫПАДАЮЩЕГО СПИСКА.   
        </button>
        <div :class="['select-input-options', selectInputActive ? 'active' : '']" >
          <p 
            v-for="(position,index) in KPLocal.offer.position" :key="index"
            :class="'select-input-item'"
            @click="selectOnChangeHandler(position.guid); selectInputActive=false"
          >
            [{{position.article}}] {{stringConverter(position.product.NAME)}}
          </p>
        </div>
      </div>
      <PreloaderLocal v-if="showPreloader"  center/>
    </div>
    
    <div :class="'kp-canvas-controller'">
      <div>
        <input ref="file" id="myfile" type="file" @change="uploadLogo()" style="display: none;">
        <base-button 
          :tooltip="'Добавить файл с логотипом на холст'"
          :tooltipFlow="'up'"
          @onClick="uploadLogoHandler()"
        >Добавить логотип</base-button>
      </div>

      <div :style="'display: grid;'">
        <span><base-button @mousedown="moveUp()">🠕</base-button></span>
        <div>
          <base-button @onClick="moveLeft()">🠔</base-button>
          <base-button @onClick="moveDown()">🠗</base-button>
          <base-button @onClick="moveRight()">➝</base-button>
        </div>
      </div>

      <div>
        <span :style="'margin-bottom: 10px;'">Масштаб нанесения</span>
        <div :style="'display: flex;'">
          <div><base-button @onClick="zoomDown(1)">-</base-button></div>
          <div>
            <BaseInput 
              @click="scaleClickHandler($event)"
              @focusout ="scaleFocusOutHandler($event)"
              v-model="scaleLogo" 
              :class="'input-text-field-modify'"/>
          </div>
          <div><base-button @onClick="zoomUp(1)">+</base-button></div>
        </div>
      </div>
      <div style="display: flex; align-items: center;">
        <base-button
        style="margin: 0; border-radius: 100px; width: 30px; min-width: 30px; min-height: 30px; height: 30px; cursor: help;"
        :active="false" 
        :tooltip="'Переключатель для выбора управления колесом мыши'" 
        :tooltipFlow="'up'" >?</base-button>
        <SwitchButton v-model="isRotate"></SwitchButton>
      </div>
      <div>
        <span :style="'margin-bottom: 10px;'">Угол поворота</span>
        <div :style="'display: flex;'">
          <div><base-button @onClick="rotateLogoLeft(-1)">L</base-button></div>
          <div>
            <BaseInput 
              @click="rotateClickHandler($event)"
              @focusout ="rotateFocusOutHandler($event)"
              v-model="rotateDegreeLastStateString" 
              :class="'input-text-field-modify'"/>
          </div>
          <div><base-button @onClick="rotateLogoRight(1)">R</base-button></div>
        </div>
      </div>

      <div>
        <base-button 
          @onClick="addToAttachments()" 
          :tooltip="'Добавить сформированоое изображение в файл КП'" 
          :tooltip-flow="'up'">Добавить</base-button>
        <base-button 
          @onClick="download()" 
          :tooltip="'Сохранить изображение на устройство'" 
          :tooltip-flow="'up'" 
          :style="'background-color: oldlace;'">Скачать</base-button>
      </div>
    </div>

    <div class="kp-product-image-container" v-if="imageList.length > 0">
      <img style="cursor: pointer;" 
      @click="selectCanvasBackgroundImageHandler($event.target.src)"
      v-for="(src,index) in imageList" :key=index 
      :src=src height="200"/>
    </div>

    <div style="display: table; margin: auto;">
      <span>
        <div style="position: relative;" width="720" height="1080" >
          <canvas width="720" height="1080" style="z-index: -1;"></canvas>
          <canvas id="canvas-back" width="720" height="1080" 
            style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
          <canvas id="canvas-front" width="720" height="1080" 
            style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
        </div>
      </span>
      <span style="display: none;" >
        <canvas id="c1" width="720" height="1080"></canvas>
      </span>
    </div>

    </div>
    </div>

    <div class="kp-step-actions ">
      <div class="kp-step-actions-link" @click="$emit('prev')">Назад</div>
      <div class="kp-step-actions-link right" @click="next()">Далее</div>
    </div>
  </div>

  <Preloader v-if="showPreloader" />
</template>

<script setup lang="ts">

import svgAlignCenter from '/src/assets/img/icon/align-center.svg'
import svgAlignLeft from '/src/assets/img/icon/align-left.svg'
import svgAlignRight from '/src/assets/img/icon/align-right.svg'

import axios from '/src/plugins/axios'
import { computed, PropType, ref, onMounted, watch } from 'vue'

import { PreloaderLocal, Preloader } from '/src/components'
import { SwitchButton, AmountInput, CheckButton, SelectInput, BaseButton, BaseInput } from '/src/components/ui'


import { KP, KP_HEADER_LOGO_ALIGN, KPLogoList, KPBannerList } from '/src/models/KP'

import { SelectInputData, PriceFormat } from '/src/models/Components'
import { ShipmentsAddress } from '/src/models/Shipments'
import { ShipmentsActions } from '/src/store/shipments/actions'

import { KPActions } from '/src/store/kp/actions'
import { KPMutations } from '/src/store/kp/mutations'
import { useStore } from '/src/store'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  kp: {
    type: Object as PropType<KP>,
    require: true
  },
})
const emits = defineEmits(['next','prev','update:kp'])
const store = useStore()
const showPreloader = ref(false)

const attachments = ref(false)
const selectInputActive = ref(false)

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

const startImageWidth = 100
const startImageHeight = 100

const currentLogoImageWidth = ref(startImageWidth)
const currentLogoImageHeight = ref(startImageHeight)

// флаг переключения между Масштабом или Поворотом логотипа
const isRotate = ref(false)

// хелпер для преобразования &quot; в кавычки 
const stringConverter = (s: string) => { return s.replace(/&quot;/gi, '"') }

// input масштаба изображения
const scaleLogo = ref('10%')

// кликаем на input поворота изображения
const rotateClickHandler = (e: any) => {
  console.log('click', e)
}
// покидаем input поворота изображения
const rotateFocusOutHandler = (e: any) => {
  console.log('out',e.target.value)
  let degree = e.target.value;
  if(degree >= 360 || degree <= -360) {
    degree = 0
  }
  rotateDegreeLastState.value = degree;
  rotateDegreeLastStateString.value = rotateDegreeLastState.value.toString();

  let translateOffsetX = startLogoPosX.value + currentLogoImageWidth.value/2
  let translateOffsetY = startLogoPosY.value + currentLogoImageHeight.value/2

  // смещение центра
  canvasFrontRef.value.getContext('2d').translate(translateOffsetX,translateOffsetY)
  
  // поворт холста
  canvasFrontRef.value.getContext('2d').rotate((rotateDegreeLastState.value * Math.PI) / 180);
  
  // восстановление центра
  canvasFrontRef.value.getContext('2d').translate(-translateOffsetX,-translateOffsetY)

  //очистка
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  //отрисовка
  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value,currentLogoImageHeight.value);

  canvasFrontRef.value.getContext('2d').resetTransform();
}

// кликаем на input масштаба изображения
const scaleClickHandler = (e: any) => {
  console.log(e)
  scaleLogo.value = scaleLogo.value.replace('%','')
}

// покидаем input масштаба изображения
const scaleFocusOutHandler = (e: any) => {
  console.log('scaleFocusOutHandler', e)

  let scaleFactor = Number(scaleLogo.value.replace('%','')) * 10
  console.log(scaleFactor)
  scaleLogo.value += '%'
  console.log(scaleFactor)
  if(scaleFactor == 0){
    canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width,canvasFrontRef.value.height)
    canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
    startLogoPosX.value,startLogoPosY.value,
    currentLogoImageWidth.value = startImageWidth,currentLogoImageHeight.value = startImageHeight);
    return;
  }

  currentLogoImageWidth.value = startImageWidth
  currentLogoImageHeight.value = startImageHeight

  if(scaleFactor > 0) {
    scaleLogo.value = '0'
    zoomUp(scaleFactor)
  }else{
    scaleLogo.value = '0'
    zoomDown(scaleFactor * -1)
  }
  //scaleInputChange(scaleFactor)
  
}

// меняем значение, и приводим к строке в input масштаба изображения
const scaleInputChange = (n: number) => {
  console.log('scaleInputChange')
  let str = scaleLogo.value.replace('%','')
  let amount = Number(str) * 10
  console.log(amount)
  amount += n
  console.log(amount)
  scaleLogo.value = (amount / 10).toString() + '%'
}

watch(scaleLogo, () => {
  console.log(scaleLogo.value)
})

const file = ref<HTMLInputElement>()

const imageList = ref<string[]>([])
const selectOnChangeHandler = (uid: string) => {
  if(uid == "null") {
    return;
  }
  showPreloader.value = true
  imageList.value = []

  console.log(uid)
  axios.get('/product/search?QUERY='+uid+'&OPTION=8')
    .then( (response) => {
      console.log(response.data.IMAGES)
      response.data.IMAGES.forEach( (item: string) => { imageList.value.push(item) })
    })
    .finally( () => {
      showPreloader.value = false
      console.log(imageList.value)
    })
  
}

const selectCanvasBackgroundImageHandler = (uid: string) => {
  console.log(uid)
  chooseCurrentBackgroundImage(uid)
}

//отрисовываем выбранное изображение для дальнего холста
const chooseCurrentBackgroundImage = (src: string) => {
  let image = new Image(canvasBackRef.value.width,canvasBackRef.value.height)

  image.onload = function() {
    canvasBackRef.value.getContext('2d').drawImage(image,0,0,canvasBackRef.value.width,canvasBackRef.value.height)
    canvasBackRef.value.getContext('2d').save()
  }

  image.crossOrigin = 'Anonymous'
  image.src = src + '?no-cache-please'
}

const toBase64 = (res: Blob) => new Promise((resolve, reject) => {
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
  canvasTest.value.toBlob( (blob: Blob) => {
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

//удаляем изображения из вложений
// const removeAttachmentsById = (item: any) => {
//   let id = item.getAttribute('data-id')
//   if(id < 0){
//     return;
//   }
//   KPLocal.value.attachments.splice(id,1)
//   console.log(KPLocal.value.attachments)
// }

// загружает файл с логотипом на холст
const uploadLogo = async () => {
  if (file.value && file.value.files) {
    let fileBase64 = await toBase64(file.value!.files[0])

    imageLogo.value = new Image()
    imageLogo.value.src = fileBase64

    imageLogo.value.onload = () => {
      console.log('Logo load', imageLogo.value)

      canvasFrontRef.value.getContext('2d').clearRect(0, 0, canvasFrontRef.value.width, canvasFrontRef.value.height)

      canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
          startLogoPosX.value, startLogoPosY.value,
          currentLogoImageWidth.value, currentLogoImageHeight.value);
      canvasFrontRef.value.getContext('2d').save()

      //костыль: двигаем изображение, т.к. не отображается после загрузки
      moveRight()
    }
  }
}

// функция для тригера окна загрузки файла с логотипом по кнопке
const uploadLogoHandler = () => {
  file.value!.click()
}

// отрисовывает логотип с учетом всех модификаторов (масштаб, поворот, позиция)
const drawLogo = () => {
  let translateOffsetX = startLogoPosX.value + currentLogoImageWidth.value/2
  let translateOffsetY = startLogoPosY.value + currentLogoImageHeight.value/2
  
  // смещение центра
  canvasFrontRef.value.getContext('2d').translate(translateOffsetX,translateOffsetY)
  
  // поворт холста
  canvasFrontRef.value.getContext('2d').rotate((rotateDegreeLastState.value * Math.PI) / 180);
  
  // восстановление центра
  canvasFrontRef.value.getContext('2d').translate(-translateOffsetX,-translateOffsetY)

  //очистка
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  //отрисовка
  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value,currentLogoImageHeight.value);

  canvasFrontRef.value.getContext('2d').resetTransform();
}

// последнее сохраненное состояние поворота логотипа
const rotateDegreeLastState = ref(0)
const rotateDegreeLastStateString = ref(rotateDegreeLastState.value.toString())

watch(rotateDegreeLastState, () => {
  console.log('watch',rotateDegreeLastState.value)
  if(rotateDegreeLastState.value > 359 || rotateDegreeLastState.value < -359){
    rotateDegreeLastState.value = 0
  }
  rotateDegreeLastStateString.value = rotateDegreeLastState.value.toString()
})

// наклонить логотип на холсте влево
const rotateLogoLeft = (n: number) => {
  if(n > 0) {
    n *= -1
  }
  rotateLogo(n)
}

// наклонить логотип на холсте вправо
const rotateLogoRight = (n: number) => {
  rotateLogo(n)
}

// наклонить логотип на холсте
const rotateLogo = (n: number) => {
  if(n == 0) {
    return
  }
  rotateDegreeLastState.value = Number(rotateDegreeLastState.value) + Number(n)
  let translateOffsetX = startLogoPosX.value + currentLogoImageWidth.value/2
  let translateOffsetY = startLogoPosY.value + currentLogoImageHeight.value/2

  // смещение центра
  canvasFrontRef.value.getContext('2d').translate(translateOffsetX,translateOffsetY)
  
  // поворт холста
  canvasFrontRef.value.getContext('2d').rotate((rotateDegreeLastState.value * Math.PI) / 180);
  
  // восстановление центра
  canvasFrontRef.value.getContext('2d').translate(-translateOffsetX,-translateOffsetY)

  //очистка
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  //отрисовка
  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value,currentLogoImageHeight.value);

  canvasFrontRef.value.getContext('2d').resetTransform();
}

// увеличить масштаб логотипа на холсте
const zoomUp = (n: number) => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)
   
  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value += n,currentLogoImageHeight.value += n);
  
  drawLogo()
  scaleInputChange(n)
}

// уменьшить масштаб логотипа на холсте
const zoomDown = (n: number) => {
  console.log('zoomDown')
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value -= n,currentLogoImageHeight.value -= n);
  drawLogo()
  scaleInputChange(n * -1)
}

// сдвинуть логотип на холсте вправо
const moveRight = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosX.value++

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value,currentLogoImageHeight.value);
  drawLogo()
}

// сдвинуть логотип на холсте влево
const moveLeft = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosX.value--

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value,currentLogoImageHeight.value);
  drawLogo()
}

// сдвинуть логотип на холсте вверх
const moveUp = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosY.value--

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value,currentLogoImageHeight.value);
  drawLogo()
}

// сдвинуть логотип на холсте вниз
const moveDown = () => {
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  startLogoPosY.value++

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value,currentLogoImageHeight.value);
  drawLogo()
}

// смещение для холста
const getFrontCanvasOffset = () => {
  let canvasOffset = canvasFrontRef.value.getBoundingClientRect()
  canvasOffsetX.value = canvasOffset.x
  canvasOffsetY.value = canvasOffset.y
  console.log('getFrontCanvasOffset X: ', canvasOffsetX.value, ' Y: ',canvasOffsetY.value )
}

// заглушаем прокрутку колесом мыши окна браузера, если передвигаем логотип на холсте
const disabledWheel = (e:any) => {
  e.preventDefault()
}
//onUnmounted( ()=>{
//  if (props.active) {
//    emits('update:kp', KPLocal.value)
//  }
//})
onMounted(async () => {
  if (props.active) {
    emits('update:kp', KPLocal.value)
  }
  canvasFrontRef.value = window.document.getElementById('canvas-front') as HTMLCanvasElement
  canvasBackRef.value = window.document.getElementById('canvas-back') as HTMLCanvasElement
  canvasTest.value = window.document.getElementById('c1')

  let canvasBack = window.document.getElementById('canvas-back') as HTMLCanvasElement
  let canvasFront = window.document.getElementById('canvas-front') as HTMLCanvasElement
  cxt.value = canvasBack!.getContext('2d')
  //observer.observe(target);
  //console.log(target)

  const canvasBackground = new Image(720,1080)
  //let back = await fetch('', {mode: 'no-cors'})
  //.then(res => res.blob())
  //console.log('fetch' , back)
    // Make sure the image is loaded first otherwise nothing will draw.
  canvasBackground.onload = function() {
    canvasBack.getContext('2d')?.drawImage(canvasBackground,0,0,720,1080)
    canvasBack.getContext('2d')?.save()
  }

  canvasBackground.crossOrigin = 'Anonymous'
  //canvasBackground.src = 'http://89.111.136.61/upload/images/kos600_kos610_b.jpg'
  canvasBackground.src = 'https://psk.expert/upload/iblock/77d/w8huebomv7df5plmaq7ok88rcpemw03m/kos610_aaa.jpg'
  //cxt.value.drawImage(canvasBackground, 0, 0, 720, 900)

  let isDraggable = false
  let currentX = canvasFront.width / 2
  let currentY = canvasFront.height / 2
  let initialWidthLogo = currentLogoImageWidth.value
  let initialHeightLogo = currentLogoImageHeight.value

  //let startLogoPosX = currentX - initialWidthLogo/2
  //let startLogoPosY = currentY - initialHeightLogo/2
  startLogoPosX.value = currentX - initialWidthLogo/2
  startLogoPosY.value = currentY - initialHeightLogo/2

 
  imageLogo.value = new Image()
  imageLogo.value.src = 'https://psk.expert/upload/lk-kp-logo-NOT-REMOVE.png'
  imageLogo.value.crossOrigin = 'Anonymous'

  imageLogo.value.onload = () => {
    canvasFront.getContext('2d')?.drawImage(
      imageLogo.value,
      startLogoPosX.value,startLogoPosY.value,
      initialWidthLogo,initialHeightLogo
    )

    canvasFront.getContext('2d')?.save()
  }

//panzoom.value = Panzoom(window.document.getElementById('zoom-area'), {
//  maxScale: 6
//});
//console.log(panzoom)
//console.log(panzoom.value.zoomWithWheel)

canvasFront.onmousedown = (e: MouseEvent) => {
  getFrontCanvasOffset()
    // console.log('layerX', e.layerX,'layerY', e.layerY)
    // console.log('layerX', e.layerX / 2,'layerY', e.layerY)
    console.log('startLogoPosX', startLogoPosX.value, 'startLogoPosY', startLogoPosY.value)
    console.log('mouseDownCanvas', e)

    let clientX = e.clientX - canvasOffsetX.value
    let clientY = e.clientY - canvasOffsetY.value

    let logoLeft = startLogoPosX.value
    let logoRight = startLogoPosX.value + currentLogoImageWidth.value
    let logoTop = startLogoPosY.value
    let logoBottom = startLogoPosY.value + currentLogoImageHeight.value

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

      window.addEventListener('wheel', disabledWheel, {passive:false})
       
    }else{
      console.log('didnt click Image')
    }
    console.log('isDraggable', isDraggable)
    
}

canvasFront.onmouseup = () => {
  //console.log('mouseUpCanvas', e)
  isDraggable = false
  //console.log('isDraggable', isDraggable)
  window.removeEventListener('wheel', disabledWheel, false)
}

canvasFront.onmouseout = () => {
  if(!isDraggable) {
    return;
  }
  //console.log('mouseOutCanvas', e)
  isDraggable = false
  //console.log('isDraggable', isDraggable)
  window.removeEventListener('wheel', disabledWheel, false)
}

canvasFront.onmousemove = (e: MouseEvent) => {
  if(!isDraggable) {
    return
  }

  //вычисляем центр изображения
  let clientX = (e.clientX - canvasOffsetX.value) - startLogoPosX.value - currentLogoImageWidth.value/2
  let clientY = (e.clientY - canvasOffsetY.value) - startLogoPosY.value - currentLogoImageHeight.value/2

  console.log('move x:', clientX, ' y: ', clientY )

  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  canvasFrontRef.value.getContext('2d').drawImage(
      imageLogo.value,
      startLogoPosX.value += clientX, startLogoPosY.value += clientY,
      currentLogoImageWidth.value,currentLogoImageHeight.value
  )
  drawLogo()
}

canvasFront.onwheel = (e) => {
  if(!isDraggable) {
    return;
  }

  // e.deltaY -100 - вверх, 100 - вниз
  if(e.deltaY > 0) {
    console.log('wheel down',e.deltaY)
    if(isRotate.value) {
      rotateLogoLeft(-5)
      return;
    }

    //лимит
    if(currentLogoImageWidth.value <= 10 || currentLogoImageHeight.value <= 10) {
      return;
    }

    zoomDown(10)
  }else {
    console.log('wheel up',e.deltaY)

    if(isRotate.value) {
      rotateLogoRight(5)
      return;
    }

    //лимит width="720" 960 height="900" 1140
    if(currentLogoImageWidth.value >= 700 || currentLogoImageHeight.value >= 800) {
      return;
    }
    zoomUp(10)
  }
  
}

}
)
//console.log(cxt)

//добавить изображение в массив вложений КП
const addToAttachments = () => {
  console.log(123)
  console.log('Image add to attachments')
  canvasTest.value.getContext('2d').clearRect(0,0,canvasTest.value.width, canvasTest.value.height)

  canvasTest.value.getContext('2d').drawImage(canvasBackRef.value,0,0)
  canvasTest.value.getContext('2d').drawImage(canvasFrontRef.value,0,0)

  // canvasTest.value.toBlob( (blob: Blob) => {
  //     toBase64(blob)
  //       .then((result) => {
  //         //KPLocal.value!.attachments.push(result)
  //       })
  // })

}

const KPLocal = ref(props.kp)

//временная перегрузка, чтобы добавить массив с вложеныыми изображениями
//KPLocal.value.attachments = []

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

const bannerList = computed<KPBannerList[]>( () => store.getters.getKPBannerList )
const bannerListOrigin = computed<KPBannerList[]>( () => store.getters.getKPBannerListOrigin)
const currentBannerId = ref(0)

const PDF = ref(true)       // Получить КП в формате pdf
const WORD = ref(false)     // Получить КП в формате docx

//is_Portrait_Download_Document_Orientation  
const isPDDO = ref(false) //Портретная оринтация документа
//is_Landscape_Download_Document_Orientation  
const isLDDO = ref(true) //Альбомная оринтация документа

//добавление файла с логотипом
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

// добавление файла с баннером
const handleBannerFileUpload = ( event: any) =>{
  if (!loadingLogo.value) {
    let img = event.target.files[0]
    let filename = img.name
    let reader = new FileReader()
    reader.onloadend =  () => {
      imageBase64.value = <string>reader.result
      loadingLogo.value = true
      store.dispatch(KPActions.ADD_KP_BANNER, { name: filename, file: imageBase64.value })
          .then(() => {
            KPLocal.value!.bannerSrc = store.getters.getKPBannerSrc
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
const nextBanner = () => {
  store.commit(KPMutations.SET_KP_BANNER_LIST_NEXT)
  ++currentBannerId.value
  if (currentBannerId.value >= bannerList.value.length){
    currentBannerId.value = 0
  }
}
const prevBanner = () => {
  store.commit(KPMutations.SET_KP_BANNER_LIST_PREV)
  --currentBannerId.value
  if (currentBannerId.value < 0 ){
    currentBannerId.value = bannerList.value.length-1
  }
};

// const shiftLogo = (n: number):void => {
//   store.commit(KPMutations.SET_KP_LOGO_LIST_SIFT, n-currentLogoId.value)
//   currentLogoId.value = n
// }
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
  //if (logoList.value.length > 0) KPLocal.value!.headerLogo = Number(logoList.value[0].id)

  if(headerLogo.value) {
    KPLocal.value!.headerLogo = Number(logoList.value[0].id)
  } else {
    KPLocal.value!.headerLogo = 0
  }

  if(KPLocal.value!.banner == true) {
    KPLocal.value!.bannerSrc = bannerList.value[0].image
    KPLocal.value!.bannerId = bannerList.value[0].id
  } else {
    KPLocal.value!.bannerSrc = ''
  }
    

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

const deleteBanner = (index: number) => {
  index=index-1
  if(bannerList.value.length == 1){
    index = 0
  }

  showPreloader.value = true

  //нужный индекс элемента, так как массив bannerList постоянно перемещается
  let i = 0;
  let currentID = bannerList.value[index].id;
  bannerListOrigin.value.forEach( (item, currentIndex)=>{
    if(item.id == currentID){
      i = currentIndex
    }
  } )


  let data = { index: index, id: Number(bannerListOrigin.value[i].id) }
  store.dispatch(KPActions.DELETE_KP_BANNER, data)
    .then( () => {showPreloader.value = false})
  //store.commit(KPMutations.DELETE_KP_LOGO_BY_ID, data)
}
</script>

<style lang="sass">
.kp-canvas-controller
  display: flex
  align-items: end
  margin-bottom: 15px
  padding: 10px 10px

.kp-canvas-controller
  & > div
    margin-right: 20px
  & > div > button
    margin-right: 5px
  & > div > span
    display: flex
  & > div > span > button
    margin: 0px auto 5px 45px
  & > div > div > button
    margin-right: 5px
  & > div > div > div > button
    margin-right: 5px
    margin-left: 5px
    margin-top: 5px
.input-text-field-modify > .input-text-field
  & > input
    width: 65px
    margin-top: 5px

.kp-product-image-container
  & > img
    margin-right: 5px
    padding: 5px 10px
</style>>
