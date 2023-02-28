<script setup lang="ts">
//страница с выдачей сертификата
import { ref, onMounted, onUpdated, computed } from "vue";
import axios from "/src/plugins/axios";

import { useStore } from "/src/store";
import { ProductActions } from "/src/store/product/actions";
import { KeysMutations } from "/src/store/keys/mutations";

import { useRouter } from "vue-router";

import { Sliders } from "/src/models/Components";
import { ButtonState } from "/src/components/ui/button/state";
import { IconsSVG } from "/src/components/ui/button/icons";
import ButtonWithIcon from "/src/components/ui/ButtonWithIcon.vue";
import PersonalBar from "/src/components/cards/PersonalBar.vue";
import ProductSearchInput from "/src/components/cards/Product/ProductSearchInput.vue";

const store = useStore();
const router = useRouter();

const loader = computed<boolean>({
  get: () => store.getters.getLoader,
  set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val),
});

const search_str = ref("");
const doSearch = (arg: string) => {
  console.log("search");

  loader.value = true;
  article.value = arg

  store
    .dispatch(ProductActions.SEARCH_PRODUCT, article.value)
    .then(() => {
      console.log(store.getters.getProduct);
      let product = store.getters.getProduct
      title.value = product.NAME
      productUId.value = product.UID
      //store.getters.getProductImages?.forEach( (v:string, i:number) => slides.value.push(<Sliders>{ id: i, src: v }))
      getCirtificates(productUId.value)
    })
    .finally(() => {
    });
};

const title = ref("Наименование продукта")
const article = ref("КJC 321")
const productUId = ref('0')

//Слайдер с сертефикатами
let slides = ref<Sliders[]>([]);
let fullscreen = ref(false);
let certificates = ref([]);
let showCertificates = ref(false);

let next = () => {
  const first = <Sliders>slides.value.shift();
  slides.value = slides.value.concat(first);
};
let prev = () => {
  const last = <Sliders>slides.value.pop();
  slides.value = [last].concat(slides.value);
};

//Скачивание сертификатов
let btnText = ref("Скачать сертификаты архивом ");
let btnState = ref<ButtonState>(ButtonState.Active);
let btnIcon = IconsSVG.Download;
let isDownload = ref(false);

let getCirtificates = (uid: string) => {

  slides.value = [];
  certificates.value = [];

  let productID = uid;
  console.log(productID);

  axios
    .get("/product/" + productID + "/certificates")
    .then((response) => {
      response.data?.forEach((v: string, i: number) => {
        slides.value.push(<Sliders>{ id: i, src: v });
        certificates.value.push(v);
      });
    })
    .catch((error) => {
      //todo: сделать проверку на ошибки
      console.log("error");
      console.log(error);
      //commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
      //commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
    })
    .finally(function () {
      showCertificates.value = true;
      loader.value = false;
    });
};

let download = () => {
  btnState.value = ButtonState.InProgress;
  btnText.value = "Архив скачивается, подождите";
  let productID = productUId.value;

  axios
    .get("/product/" + productID + "/certificates/download", {
      responseType: "blob",
      transformRequest: (_, headers) => {
        delete headers?.common;
      },
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cert.zip");
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      isDownload.value = !isDownload;
    })
    .catch((error) => {
      //todo: сделать проверку на ошибки
      console.log("error");
      console.log(error);
      //commit(OrdersMutations.SET_ORDERS_DOCSTATUS_ERROR)
      //commit(AuthMutations.SET_ERROR, 'Request GET_ORDERS_DOCSTATUS error:<br>'+error)
    })
    .finally(function () {
      btnState.value = ButtonState.Active;
      btnText.value = "Скачать сертификаты архивом ";
    });
};
</script>

<template>
  <div class="top-line product-page">
    <div class="top-line-card-wrap header-lable">Поиск сертификатов</div>
    <!--<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>-->
    <PersonalBar></PersonalBar>
  </div>

  <ProductSearchInput v-model="search_str" to="certificate" @search="doSearch" />

  <div v-if="slides.length > 0">
    <div class="content-heading-wrap proudct-heading-wrap">
      <div class="content-heading-price">
        <div class="content-heading-price-text" v-html="title"></div>
      </div>

      <div class="content-heading-wrap-elem" style="width: 23.76%;">
        <div class="content-heading-price">
          <div class="content-heading-price-text">Артикул:</div>
          <div class="content-heading-price-value" v-html="article"></div>
        </div>
      </div>

      <div :style="'margin: 0 auto 0 auto; display: table;'">
        <ButtonWithIcon
            style="display: flex; margin: 0px auto;"
            :text="btnText"
            :icon="btnIcon"
            :state="btnState"
            @click="download()"
        />
        </div>
    </div>

    <div class="product-slider-wrap">
      <button class="product-slider-arrow prev" @click="prev"></button>

      <transition-group
        style="max-width: 560px;"
        name="product-slider-trans"
        class="product-slider"
        tag="div"
      >
        <div
          v-for="slide in slides"
          class="product-slider-slide"
          :key="slide.id"
        >
          <img v-if="slide.src" :src="slide.src" @click="fullscreen = true" />
        </div>
      </transition-group>
      <div class="product-slider-arrow next" @click="next"></div>

      <!--<transition-group name="product-slider-trans" class='product-slider-small' tag="div">
						<div 
							v-for="slide in slides" 
							class='product-slider-small-slide'
							:key="slide.id"
						>
							<img 
								v-if="slide.src"
								:src="slide.src" 
							/>
						</div>
					</transition-group>-->
    </div>
  </div>
</template>

<style lang="sass" scoped>
.header-lable
    font-family: "Muli", sans-serif
    font-size: 33px
    color: #ffffff
    font-weight: 400
    font-style: normal
    cursor: default

.fade-enter-active, .fade-leave-active
    transition: all 0.5s ease

.fade-enter-from, .fade-leave-to
    transform: translateY(-20px)
    opacity: 0
</style>