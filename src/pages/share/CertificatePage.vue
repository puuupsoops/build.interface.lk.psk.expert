<script setup lang="ts">
//страница с выдачей сертификата
import {ref, computed, watch, onMounted} from "vue";
import axios from "/src/plugins/axios";

import { useStore } from "/src/store";
import { ProductActions } from "/src/store/product/actions";
import { KeysMutations } from "/src/store/keys/mutations";


import { ButtonState } from "/src/components/ui/button/state";
import { IconsSVG } from "/src/components/ui/button/icons";
import { ButtonWithIcon, SimpleSlider } from "/src/components/ui";
import PersonalBar from "/src/components/cards/PersonalBar.vue";
import { ProductSearchInput, ProductSliderFullscreen } from "/src/components/cards/Product";

const props = defineProps({
  article: {
    type: String
  }
})

const store = useStore();

const loader = computed<boolean>({
  get: () => store.getters.getLoader,
  set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val),
});

const search_str = ref("");
const title = ref("Наименование продукта")
//Слайдер с сертефикатами

let fullscreen = ref(false)
let certificates = ref<string[]>([])
let showCertificates = ref(false)


//Скачивание сертификатов
let btnText = ref("Скачать сертификаты архивом ")
let btnState = ref<ButtonState>(ButtonState.Active)
let btnIcon = IconsSVG.Download
let isDownload = ref(false)

const doSearch = async () => {
  loader.value = true
  await store.dispatch(ProductActions.SEARCH_PRODUCT, props.article)
  title.value = store.getters.getProduct.NAME
  await getCirtificates(store.getters.getProduct.UID)
  loader.value=false
}

onMounted(()=>{
  if (props.article) {
    doSearch()
  }
})

watch( ()=>props.article, (new_val) => {
  if (new_val) {
    doSearch()
  }
})

const getCirtificates = async (uid: string) => {
  certificates.value = []
  await axios
    .get("/product/" + uid + "/certificates")
    .then((response) => {
      response.data?.forEach((src: string) => {
        certificates.value.push(src);
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

const download = async () => {
  btnState.value = ButtonState.InProgress;
  btnText.value = "Архив скачивается, подождите";
  await axios
    .get("/product/" + store.getters.getProduct.UID + "/certificates/download", {
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
      isDownload.value = !isDownload.value;
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
<div>
  <div class="top-line product-page">
    <div class="top-line-card-wrap header-lable">Поиск сертификатов</div>
    <!--<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>-->
    <PersonalBar></PersonalBar>
  </div>

  <ProductSearchInput v-model="search_str" to="certificate" />

  <div v-if="certificates.length > 0">
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
    <SimpleSlider :data="certificates" @onClick="fullscreen=true" style="width: 50%"/>
    <ProductSliderFullscreen v-model="fullscreen" :data="certificates"/>
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

</style>