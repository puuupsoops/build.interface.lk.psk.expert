<template>
    <div class="content-elem ">
        <div class="product-more-info-table-wrap scroll-elem">
            <div class="table more-info-table">
                <div class="table-row table-heading">
                    <div class="table-elem">Характеристика</div>
                    <div class="table-elem">Остаток</div>
                    <div class="table-elem">Цена</div>
                    <div class="table-elem">Пп / Дата</div>
                </div>
                <div 
                    class="table-row"
                    v-for="offer in data"
                    :key="offer.ID"
                >
                    <div class="table-elem"><span v-html="offer.CHARACTERISTIC"></span></div>
                    <div class="table-elem"><span v-html="offer.RESIDUE"></span></div>
                    <div class="table-elem"><span v-html="(offer.PRICE ? offer.PRICE-(offer.PRICE/100)*discount : 0 ).toLocaleString('RU', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(',','.') + ' ₽'"></span></div>
                    <div class="table-elem"><span :v-html="offer.PPDATA ? offer.PPDATA.replaceAll('/', '&nbsp;/&nbsp;') : ''"></span></div>
                </div>
            
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Offer } from '/src/models/Product';

export default defineComponent({
    props:{
        data: {
            type: Array as PropType<Offer[]>,
            required: true
        },
        discount: {
            type: Number,
            required: true
        }
    },

    setup(){
    }
})
</script>
