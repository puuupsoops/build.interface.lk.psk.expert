<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useProductStore } from '/src/store/product';
import Notification from '/src/components/cards/Notification.vue';
import PersonalBar from '/src/components/cards/PersonalBar.vue';
import PreloaderLocal from '/src/components/PreloaderLocal.vue';
import CatalogItem from '/src/components/cards/Catalog/CatalogItem.vue';
import { ProductFound } from '/src/models/Product';

// Зимняя распродажа от 29.08.2025
const productUIds = [
    '61914532-1adc-11e8-80dc-000c2938f7da', // 12454 БРЮ520  Брюки "Дэлф" черный
    'bdf0c64a-803b-11e8-810d-000c2938f7da', // 12569 БРЮ633  Брюки "Прим" серый
    'ad35c56a-803b-11e8-810d-000c2938f7da', // 12568 БРЮ633  Брюки "Прим" т.синий
    '64714964-b7b1-11eb-baa1-005056bb1249', // 22695 БРЮ242  Брюки "Эребус" т.синий
    '7a31483b-b7bd-11eb-baa1-005056bb1249', // 22697 БРЮ602  Брюки "Эребус" т.синий(женские)
    '29617e97-2bc0-11e5-96ed-0025907c0298', // 16302 КОС803  Костюм "Памир" серый / черный / красный(зимний)
    'f7477524-4a92-11e7-8fdb-0025907c0298', // 16106 КОС630  Костюм "Страйк" т.синий / василек(зимний)
    'dc296001-bd4b-11de-9f21-0050569a3a91', // 4710 КУР515  Куртка "Эребус" т.синий / серый
    '26455b84-1add-11e8-80dc-000c2938f7da', // 12456 ПОЛ553  Полукомбинезон "Дэлф" черный
    'e5f5987a-803b-11e8-810d-000c2938f7da', // 12570 ПОЛ615  Полукомбинезон "Прим" серый
    'f2d219e6-803b-11e8-810d-000c2938f7da', // 12571 ПОЛ615  Полукомбинезон "Прим" т.синий
    'aca76991-2b43-11f0-b5d0-005056bb1249', // 33664 ЖИЛ555  Жилет "Универсальный" василёк / т.синий
    'afa50e3b-60a1-11e3-9e4c-0025907c0298', // 4684 ДОР505  Костюм сигнальный оранжевый / синий(зимний)
    'b465400f-f729-11ea-8103-000c293f55f7', // 21311 БОТ159  Ботинки "Комфорт" МП иск.мех с высокими берцами
    '7d5e2bd5-0081-11e6-8e41-0025907c0298', // 16047 САП994  Сапоги "Трейсер" КП / КС шерст.мех
    '51514e28-2336-11ea-80df-000c293f55f7', // 19905 БОТ249  Ботинки "Нитро" КП для сварщика
    '7fcb24de-298f-11e7-8fdb-0025907c0298', // 16087 БОТ242  Ботинки "Нитро" КП шерст.мех
    'abe34de0-aedf-11ea-80f1-000c293f55f7', // 21046 БОТ240  Ботинки "Нитро" КП нат.мех
    'f025342f-4114-11e7-8fdb-0025907c0298', // 16102 БОТ244  Ботинки "Нитро" КП шерст.мех
    '006a63de-2990-11e7-8fdb-0025907c0298', // 16088 САП224  Сапоги "Нитро" КП
    '53c676e2-aee0-11ea-80f1-000c293f55f7', // 21047 САП220  Сапоги "Нитро" КП нат.мех
    '8188afaf-4115-11e7-8fdb-0025907c0298', // 16103 САП226  Сапоги "Нитро" КП шерст.мех
] as const;

const productStore = useProductStore();
const { getProductById } = productStore;

const _products = ref <{
    id: string,
    title: string,
    article: string,
    description: string,
    image: string, // for src attr
    prices: {
        retail: number,
    },
}[]>([]);
const products = computed(() => _products.value);

const showLoader = ref<boolean>(true);

const scroll = ref();
const onScroll = (e: any) => {
    scroll.value = e.target.documentElement.scrollTop;
};

onMounted(async () => {
    window.addEventListener("scroll", onScroll);

    let delay = 100;

    showLoader.value = true;

    productUIds.forEach((uid, idx) => {
        setTimeout(async () => {
            try {
                const prod = await getProductById(uid) as ProductFound;
                _products.value.push({
                    id: prod['PRODUCT']['ID'],
                    title: prod['PRODUCT']['NAME'].replaceAll('&quot;', '"'),
                    article: prod['PRODUCT']['ARTICLE'],
                    description: prod['PRODUCT']['DETAIL_TEXT'],
                    image: prod['IMAGES'][0], // for src attr
                    prices: {
                        retail: prod['PRODUCT']['PRICE_OPT'],
                    },
                });
            } catch (err) {
                console.error(err);
            }

            if (idx === productUIds.length - 1)
                showLoader.value = false;
        }, delay);

        delay += 20;
    });

});

onBeforeUnmount(() => { window.removeEventListener("scroll", onScroll); });
</script>
<template>
    <section>
        <div class="top-line main-page">
            <div class="top-line-menu-btn"><span></span><span></span><span></span></div>
            <Notification />
            <PersonalBar />
        </div>
        <div class="catalog">
            <div class="catalog-elem">
                <div class="catalog-head-card">
                    <span><router-link :to="'/catalog/catalog'" style="color: #FF9900 !important;">В
                            каталог</router-link></span>
                </div>
            </div>
            <div class="catalog-elem">
                <div class="catalog-head-card">
                    <span>❄️ Ассортимент зимних товаров</span>
                </div>
            </div>
            <div class="catalog-body menu-open">
                <!-- <div>{{ products }}</div> -->
                <CatalogItem v-for="product in products" :key="product.id" :data="product" />
                <PreloaderLocal v-if="showLoader" class="catalog-body-preloader" />
            </div>
        </div>
        <a class="page_up_down_butn" href="#" v-if="scroll > 200">Наверх</a>
    </section>
</template>
<style scoped>
</style>