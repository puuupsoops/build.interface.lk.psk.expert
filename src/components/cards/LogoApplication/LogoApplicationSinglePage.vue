<script setup lang="ts">
// Комнонент нанесения логотипа
// import axios from '/src/plugins/axios'
import { PropType, ref, onMounted, onUpdated, watch } from 'vue'
import { Sliders } from '/src/models/Components'
import SwitchButton from '/src/components/ui/SwitchButton.vue'
import BaseButton from '/src/components/ui/BaseButton.vue'
import BaseInput from '/src/components/ui/BaseInput.vue'
import svgArrowDown from '/src/assets/img/icon/arrow-i-down.svg'
import svgArrowUp from '/src/assets/img/icon/arrow-i-up.svg'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array as PropType<Sliders[]>,
    require: true
  },
})

// для изменения стиля плашки управления
const unPin = ref(false)

//Slider
let slides = ref<Sliders[]>([]);

const nextSlide = () => {
  const first = <Sliders>slides.value.shift();
	slides.value = slides.value.concat(first);
}

const prevSlide = () => {
  const last = <Sliders>slides.value.pop();
	slides.value = [last].concat(slides.value);
}
//

onUpdated( () => {
				slides.value = [];
				props.images?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src: v.src}))
				// if (slides.value.length % 2 == 0){
				// 	slides.value.push({id: slides.value.length, src:props.data[0]})
				// }
				});

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

// значения размера логотипа при инициилизации
const uploadInitLogoImageWidth = ref(startImageWidth)
const uploadInitLogoImageHeight = ref(startImageHeight)

// текущие значения размера логотипа (для динамического вычисления)
const currentLogoImageWidth = ref(startImageWidth)
const currentLogoImageHeight = ref(startImageHeight)

// флаг переключения между Масштабом или Поворотом логотипа
const isRotate = ref(false)

// хелпер для преобразования &quot; в кавычки 
// const stringConverter = (s: string) => { return s.replace(/&quot;/gi, '\"') }

// input масштаба изображения
const scaleLogo = ref('50%')
const currentScaleLogoValue = ref(0.0) //значение текущего масштаба

// кликаем на input поворота изображения
const rotateClickHandler = () => {
  console.log('click')
}
// покидаем input поворота изображения
const rotateFocusOutHandler = (e: any) => {
  let degree = e.target.value;
  if(degree >= 360 || degree <= -360){
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
const scaleFocusOutHandler = () => {
  console.log('scaleFocusOutHandler')
  console.log(scaleLogo.value)
  let scaleFactor = Number(scaleLogo.value)

  //лимит на 100%
  if(scaleFactor > 100.00) {
    currentScaleLogoValue.value = 1.0
    scaleLogo.value = '100%'
    canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)
    
    canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
    startLogoPosX.value,startLogoPosY.value,
    currentLogoImageWidth.value = uploadInitLogoImageWidth.value + (uploadInitLogoImageWidth.value * currentScaleLogoValue.value),
    currentLogoImageHeight.value = uploadInitLogoImageHeight.value + (uploadInitLogoImageHeight.value * currentScaleLogoValue.value));
    return;
  }

  //лимит на 0.1%
  if(scaleFactor < 0.01) {
    currentScaleLogoValue.value = -0.99
    scaleLogo.value = '0.01%'
    canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)
    
    canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
    startLogoPosX.value,startLogoPosY.value,
    currentLogoImageWidth.value = uploadInitLogoImageWidth.value + (uploadInitLogoImageWidth.value * currentScaleLogoValue.value),
    currentLogoImageHeight.value = uploadInitLogoImageHeight.value + (uploadInitLogoImageHeight.value * currentScaleLogoValue.value));
    return;
  }

  // масштаб 0.0
  if(scaleFactor == 50.00) {
    scaleLogo.value = '50%'
    currentScaleLogoValue.value = 0.0
    canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width,canvasFrontRef.value.height)
    canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
    startLogoPosX.value,startLogoPosY.value,
    currentLogoImageWidth.value = uploadInitLogoImageWidth.value,currentLogoImageHeight.value = uploadInitLogoImageHeight.value);
    return;
  }

  let newScaleValue = (scaleFactor - 50) / 100
  scaleLogo.value += '%'
  console.log(newScaleValue)

  // мастштаб от 0.01 до 1.0, увеличиваем
  if(scaleFactor > 50.00) {
    currentScaleLogoValue.value = Number(newScaleValue.toFixed(2))
    console.log(currentScaleLogoValue.value)

    canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)
    
    canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
    startLogoPosX.value,startLogoPosY.value,
    currentLogoImageWidth.value = uploadInitLogoImageWidth.value + (uploadInitLogoImageWidth.value * currentScaleLogoValue.value),
    currentLogoImageHeight.value = uploadInitLogoImageHeight.value + (uploadInitLogoImageHeight.value * currentScaleLogoValue.value));
    //currentLogoImageWidth.value += n,currentLogoImageHeight.value += n);
    
    drawLogo()
    return;
  }

  // мастштаб от -0.01 до -1.0, уменьшаем
  if(scaleFactor < 50.00) {
    currentScaleLogoValue.value = Number(newScaleValue.toFixed(2))
    console.log(currentScaleLogoValue.value)

    canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)
    
    canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
    startLogoPosX.value,startLogoPosY.value,
    currentLogoImageWidth.value = uploadInitLogoImageWidth.value + (uploadInitLogoImageWidth.value * currentScaleLogoValue.value),
    currentLogoImageHeight.value = uploadInitLogoImageHeight.value + (uploadInitLogoImageHeight.value * currentScaleLogoValue.value));
    //currentLogoImageWidth.value += n,currentLogoImageHeight.value += n);
    
    drawLogo()
    return;
  }

  scaleLogo.value += '%'
  //console.log(scaleLogo.value)
  /* 
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
  */
  //scaleInputChange(scaleFactor)
  
}

// меняем значение, и приводим к строке в input масштаба изображения
const scaleInputChange = (n: number) => {
  console.log('scaleInputChange')
  console.log(n)
  //старое значение из Input
  let str = scaleLogo.value.replace('%','')

  // новое значение
  let amount = Number(str)
  console.log(amount)

  amount += (n * 100) / 2
  // новое значение
  console.log(amount)
  if(amount%2 == 0) {
    scaleLogo.value = amount.toString() + '%'
  } else {
    scaleLogo.value = amount.toFixed(1) + '%'
  }
  
}

watch(scaleLogo, () => {
  console.log(scaleLogo.value)
})

const file = ref<HTMLInputElement>()

// const imageList = ref(props.images)
// const selectOnChangeHandler = (uid: string) => {
//   if(uid == "null") {
//     return;
//   }
//   imageList.value = []
//
//   console.log(uid)
//   axios.get('/product/search?QUERY='+uid+'&OPTION=8')
//     .then( (response) => {
//       console.log(response.data.IMAGES)
//       response.data.IMAGES.forEach( (item: string) => { imageList.value.push(item) })
//     })
//     .finally( () => {
//       console.log(imageList.value)
//     })
//
// }

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
  if(file.value && file.value.files) {
    let fileBase64 = await toBase64(file.value.files[0])

    imageLogo.value = new Image()
    imageLogo.value.src = fileBase64

    imageLogo.value.onload = () => {
      let width = imageLogo.value.width;
      let hight = imageLogo.value.height;

      uploadInitLogoImageWidth.value = width
      uploadInitLogoImageHeight.value = hight

      currentLogoImageWidth.value = width
      currentLogoImageHeight.value = hight

      scaleLogo.value = '50%'
      currentScaleLogoValue.value = 0.0

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
    console.log('zoomUp')
  if(currentScaleLogoValue.value >= 1.00) {
    return;
  }
  currentScaleLogoValue.value = Number((currentScaleLogoValue.value + n).toFixed(2))
  console.log(currentScaleLogoValue.value)

  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)
   
  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value = uploadInitLogoImageWidth.value + (uploadInitLogoImageWidth.value * currentScaleLogoValue.value),
  currentLogoImageHeight.value = uploadInitLogoImageHeight.value + (uploadInitLogoImageHeight.value * currentScaleLogoValue.value));
  //currentLogoImageWidth.value += n,currentLogoImageHeight.value += n);
  
  drawLogo()
  scaleInputChange(n)
}

// уменьшить масштаб логотипа на холсте
const zoomDown = (n: number) => {
  console.log('zoomDown')
  if(currentScaleLogoValue.value <= -1.00) {
    return;
  }
  currentScaleLogoValue.value = Number((currentScaleLogoValue.value - n).toFixed(2))
  canvasFrontRef.value.getContext('2d').clearRect(0,0,canvasFrontRef.value.width, canvasFrontRef.value.height)

  canvasFrontRef.value.getContext('2d').drawImage(imageLogo.value,
  startLogoPosX.value,startLogoPosY.value,
  currentLogoImageWidth.value = uploadInitLogoImageWidth.value + (uploadInitLogoImageWidth.value * currentScaleLogoValue.value),
  currentLogoImageHeight.value = uploadInitLogoImageHeight.value + (uploadInitLogoImageHeight.value * currentScaleLogoValue.value));
  //currentLogoImageWidth.value -= n,currentLogoImageHeight.value -= n);

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

onMounted(async () => {
  props.images?.forEach( (v, i) => slides.value.push(<Sliders>{id: i, src: v.src}));

  canvasFrontRef.value = window.document.getElementById('canvas-front') as HTMLCanvasElement
  canvasBackRef.value = window.document.getElementById('canvas-back') as HTMLCanvasElement
  canvasTest.value = window.document.getElementById('c1') as HTMLCanvasElement

  let canvasBack = window.document.getElementById('canvas-back') as HTMLCanvasElement
  let canvasFront = window.document.getElementById('canvas-front') as HTMLCanvasElement
  cxt.value = canvasBack.getContext('2d')
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
  //canvasBackground.src = 'https://psk.expert/upload/iblock/77d/w8huebomv7df5plmaq7ok88rcpemw03m/kos610_aaa.jpg'
  canvasBackground.src = slides.value[0].src
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

canvasFront.onmousedown = (e) => {
  getFrontCanvasOffset()
    // console.log('layerX', e.layerX,'layerY', e.layerY)
    // console.log('layerX', e.layerX / 2,'layerY', e.layerY)
    // console.log('startLogoPosX', startLogoPosX.value, 'startLogoPosY', startLogoPosY.value)
    // console.log('mouseDownCanvas', e)

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

canvasFront.onmousemove = (e) => {
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

    zoomDown(0.05)
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
    zoomUp(0.05)
  }
  
}

}
)
//console.log(cxt)
</script>

<template>
    <div
      :style="[unPin ? 'position: fixed; left: 50%; top: 28%; transform: translate(-50%, -50%);' : 'position: relative;']" 
      :class="'kp-canvas-controller'">
      <div :style="'display: flex; flex-direction: column;'">
        <div 
          :style="'width: 24px; padding-bottom: 15px; cursor: pointer;'"
          @click="unPin=!unPin"
        >
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 123.14 123.54">
            <title>Открепить/Закрепить панель</title>
            <path :style="[unPin ? 'fill: honeydew;' : 'fill: honeydew; opacity: 0.3;']" class="cls-1" d="M121.59,36.81,86.3,1.52c-3-3-7.77.09-9.2,2.74-.24.45.19.86-.2,3.91a46.16,46.16,0,0,1-2.72,11.32l-15.7,15.7c-6.26,6.27-15.22,3.48-22.87-.32-1.61-.8-3.68-2.57-5.47-.78l-6.65,6.65a2.5,2.5,0,0,0,0,3.53l55.79,55.78a2.5,2.5,0,0,0,3.53,0l6.64-6.65c1.77-1.77-.49-4.06-1.41-6-3.4-7-6.45-16.42-.78-22.09L103.65,49A84.08,84.08,0,0,1,115,46.38c3.09-.49,3.47-.1,3.91-.39,2.7-1.75,5.7-6.16,2.68-9.18ZM53.86,82.39,41.15,69.69.38,121.25l1.92,1.91L53.86,82.39Z"/>
          </svg>
        </div>
        <input ref="file" id="myfile" type="file" @change="uploadLogo()" style="display: none;">
        <div><base-button 
            style="width: 154px;"
          :tooltip="'Добавить файл с логотипом на холст'"
          :tooltipFlow="'up'"
          @onClick="uploadLogoHandler()"
        >Добавить логотип</base-button></div>
      </div>

      <div :style="'display: flex; align-items: flex-end;'">
        <div>
            <base-button @onClick="moveLeft()">🠔</base-button>
        </div>
        
        <div style="max-width: 46px;">
            <base-button @mousedown="moveUp()">🠕</base-button>
            <base-button style="margin-top: 5px;" @onClick="moveDown()">🠗</base-button>
        </div>
        <div>
            <base-button @onClick="moveRight()">➝</base-button>
        </div>
      </div>

      <div style="text-align: center;">
        <span :style="'margin-bottom: 10px;'">Масштаб нанесения</span>
        <div :style="'display: flex;'">
          <div><base-button @onClick="zoomDown(0.01)">-</base-button></div>
          <div>
            <BaseInput 
              @click="scaleClickHandler($event)"
              @focusout ="scaleFocusOutHandler($event)"
              v-model="scaleLogo" 
              :class="'input-text-field-modify'"/>
          </div>
          <div><base-button @onClick="zoomUp(0.01)">+</base-button></div>
        </div>
      </div>
      <div style="display: flex; align-items: center;">
        <base-button
        style="margin: 0; border-radius: 100px; width: 30px; min-width: 30px; min-height: 30px; height: 30px; cursor: help;"
        :active="false" 
        :tooltip="'Переключатель управления колесом мыши: Масштаб логотипа или Угол поворота.'" 
        :tooltipFlow="'up'" >?</base-button>
        <SwitchButton v-model="isRotate"></SwitchButton>
      </div>
      <div style="text-align: center;">
        <span :style="'margin-bottom: 10px;'">Поворот логотипа</span>
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
          @onClick="download()" 
          :tooltip="'Сохранить изображение на устройство'" 
          :tooltip-flow="'up'" 
          :style="'background-color: oldlace;'">Скачать</base-button>
      </div>
    </div>
    <div class="kp-head-card-subtitle">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path  fill="#A5A7A9" d="M11.875 18Q12.5 18 12.95 17.55Q13.4 17.1 13.4 16.475Q13.4 15.85 12.95 15.412Q12.5 14.975 11.875 14.975Q11.25 14.975 10.8 15.412Q10.35 15.85 10.35 16.475Q10.35 17.1 10.8 17.55Q11.25 18 11.875 18ZM10.7 14.15H13.05Q13.05 13.425 13.25 12.925Q13.45 12.425 14.2 11.7Q14.775 11.15 15.137 10.525Q15.5 9.9 15.5 9.025Q15.5 7.525 14.525 6.737Q13.55 5.95 12.15 5.95Q10.625 5.95 9.613 6.825Q8.6 7.7 8.2 8.9L10.4 9.725Q10.575 9.225 10.95 8.725Q11.325 8.225 12.025 8.225Q12.525 8.225 12.8 8.537Q13.075 8.85 13.075 9.225Q13.075 9.6 12.812 10Q12.55 10.4 12.275 10.625Q11.275 11.55 10.988 12.137Q10.7 12.725 10.7 14.15ZM12 22.85Q9.75 22.85 7.763 22Q5.775 21.15 4.312 19.688Q2.85 18.225 2 16.25Q1.15 14.275 1.15 12Q1.15 9.725 2 7.75Q2.85 5.775 4.312 4.312Q5.775 2.85 7.763 2Q9.75 1.15 12 1.15Q14.275 1.15 16.25 2Q18.225 2.85 19.688 4.312Q21.15 5.775 22 7.75Q22.85 9.725 22.85 12Q22.85 14.275 22 16.25Q21.15 18.225 19.688 19.688Q18.225 21.15 16.25 22Q14.275 22.85 12 22.85ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 19.7Q15.2 19.7 17.45 17.462Q19.7 15.225 19.7 12Q19.7 8.775 17.45 6.537Q15.2 4.3 12 4.3Q8.8 4.3 6.55 6.537Q4.3 8.775 4.3 12Q4.3 15.225 6.55 17.462Q8.8 19.7 12 19.7Z"/>
        </svg>
      <div>Удерживая нажатой левую кнопку мыши перемещайте логотип, или используйте колесо мыши для изменения масштаба или наклона логотипа.</div>
    </div>
    <!--
    <div class="kp-product-image-container" style="margin-top: 150px;" v-if="imageList.length > 0">
      <img style="cursor: pointer;" 
      @click="selectCanvasBackgroundImageHandler($event.target.src)"
      v-for="(src,index) in imageList" :key=index 
      :src=src.src height="200"/>
    </div>
    -->
    <div style="display: flex; margin-top: 105px;">

      <div class="product-slider-wrap" style="display: block;">
        <div style="display: flex;">
          <button 
            style="margin: 10px auto;" 
            class='product-slider-arrow' 
            @click="nextSlide"><svgArrowUp></svgArrowUp></button>
        </div>

        <transition-group name="product-slider-trans" class='product-slider-small' tag="div" style="flex-flow: column; max-height: 960px; flex: 0 0 100%;">
          <div 
            v-for="slide in slides" 
            class='product-slider-small-slide'
            style="opacity: 1.0;"
            :key="slide.id"
          >
            <img style="max-width: 146px;"
              v-if="slide.src"
              :src="slide.src"
              @click="selectCanvasBackgroundImageHandler($event.target.src)"
            />
          </div>
        </transition-group>

        <div style="display: flex;">
          <button 
            style="margin: 10px auto;" 
            class='product-slider-arrow' 
            @click="prevSlide"><svgArrowDown></svgArrowDown></button>
        </div>
      </div>

      <div style="margin: auto;">
        <div style="position: relative;" width="720" height="1080" >
          <canvas width="720" height="1080" style="z-index: -1;"></canvas>
          <canvas id="canvas-back" width="720" height="1080" 
            style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
          <canvas id="canvas-front" width="720" height="1080" 
            style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
        </div>
      </div>
      <span style="display: none;" >
        <canvas id="c1" width="720" height="1080"></canvas>
      </span>
    </div>
</template>

<style lang="sass">
.cls-1 
  stroke: #000
  stroke-miterlimit: 22.93
  stroke-width: 0.57px
  fill-rule: evenodd

.kp-canvas-controller
  //position: fixed
  z-index: 10
  background-color: #15171C
  //left: 50%
  //top: 28%
  //transform: translate(-50%, -50%)
  display: flex
  align-items: end
  margin-bottom: 15px
  padding: 10px 10px
  opacity: 0.7
  justify-content: center

.kp-canvas-controller
  &:hover
    opacity: 1.0

.kp-canvas-controller
  & > div
    margin-right: 20px
  & > div > button
    margin-right: 5px
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
</style>