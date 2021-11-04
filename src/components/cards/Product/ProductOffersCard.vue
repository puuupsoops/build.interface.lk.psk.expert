<template>
    <div class="content-elem ">
        <div class="product-more-info-table-wrap scroll-elem">
            <div class="table-more-info-arrow"></div>
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
                    <div class="table-elem"><span v-html="Number(offer.PRICE).toLocaleString() + ' ₽'"></span></div>
                    <div class="table-elem"><span v-html="offer.PPDATA"></span></div>
                </div>
            
            </div>
        </div>
    </div>
</template>


<script>

export default {
    props:{
        data: {
            type: Array
        },
    },

    setup(){
    }
}
</script>
