<template>
    <div class="catalog_items horizontal_blocks">
        <ItemHorizontal />
        <ItemHorizontal />
        <ItemHorizontal />
    </div>
</template>

<script>
import ItemHorizontal from './ItemHorizontal.vue';


export default {
    mounted(){
            //let $ = JQuery;
    },
    components: {
        ItemHorizontal
    }
}

</script>

<style scoped>
.catalog_items {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-left: -1.5rem;
    margin-right: -1.5rem
}

.catalog_items:not(:last-child) {
    padding-bottom: 2rem
}

.catalog_items>* {
    margin: 0 1.5rem 3rem
}

.catalog_items.bick_blocks>* {
    width: -webkit-calc(25% - 3rem);
    width: calc(25% - 3rem);
    max-width: 100%
}

.catalog_items.bick_blocks>.double_item {
    width: -webkit-calc(50% - 3rem);
    width: calc(50% - 3rem)
}

.catalog_items.horizontal_blocks>* {
    width: -webkit-calc(50% - 3rem);
    width: calc(50% - 3rem);
    max-width: unset;
    margin-bottom: 5rem
}

@media screen and (max-width:1399px) {
    .catalog_items.bick_blocks>* {
        width: -webkit-calc(33.333% - 3rem);
        width: calc(33.333% - 3rem)
    }
    .catalog_items.bick_blocks>.double_item {
        width: -webkit-calc(66.666% - 3rem);
        width: calc(66.666% - 3rem)
    }
}

@media screen and (max-width:1279px) {
    .catalog_items.bick_blocks>* {
        width: -webkit-calc(50% - 3rem);
        width: calc(50% - 3rem)
    }
    .catalog_items.bick_blocks>.double_item {
        width: -webkit-calc(100% - 3rem);
        width: calc(100% - 3rem)
    }
    .catalog_items.horizontal_blocks>* {
        width: -webkit-calc(100% - 3rem);
        width: calc(100% - 3rem);
        margin-bottom: 3rem
    }
}

@media screen and (max-width:991px) {
        .catalog_items {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center
    }
}

@media screen and (max-width:600px) {
    .catalog_controll_selects,
    .item__body_sides {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal
    }
    .catalog_items.bick_blocks {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center
    }
    .catalog_items.bick_blocks>* {
        width: -webkit-calc(50% - 2rem);
        width: calc(50% - 2rem);
        margin-left: 1rem;
        margin-right: 1rem
    }
    .catalog_items.bick_blocks .item__body_main_info:not(:last-child) {
        margin-bottom: 1rem
    }
    .catalog_items.bick_blocks .item__hover_info {
        position: relative
    }
    .catalog_items.bick_blocks .item__title {
        font-size: 12px;
        min-height: 45px
    }
    .catalog_items.bick_blocks .item__image_container {
        height: 26rem;
        padding-top: 2rem
    }
    .catalog_items.bick_blocks .item__image_logo img,
    .catalog_items.bick_blocks .item__image_logo svg {
        max-height: 2rem;
        max-width: 8rem
    }
    .catalog_items.bick_blocks .item__image_heading {
        padding-top: .5rem;
        padding-bottom: .5rem
    }
}
</style>