<template>
<div class="product-info product-info-tab content-elem">
    <div class="content-elem-heading"> 
        <div class="content-elem-heading-text">Подробно</div>
        <ul class="product-info-tab-nav">
            <li :class="content_switch === 'detail' ? 'product-info-tab-link active':'product-info-tab-link'"
                @click="content_switch = 'detail'">Описание</li>

            <li :class="content_switch === 'characteristics' ? 'product-info-tab-link active':'product-info-tab-link'"
                @click="content_switch = 'characteristics'">Характеристика</li>
        </ul>
        <div class="content-elem-heading-btn content-hide-btn product-info-hide-btn" @click="show = !show">{{ !show ? 'Показать +' : 'Скрыть —' }}</div>
    </div>
    <transition name="fade" mode="out-in">
        <div class="content-hide"  v-if="show" >
            <div :class="content_switch === 'detail' ? 'product-info-desc product-info-tab-elem active':'product-info-desc product-info-tab-elem'">
                <div class="content-properties">
                    <div class="content-properties-text">Свойства:</div>

                    <div class="content-properties-elem" 
                        v-for="(p, i) in protect"
                        :key="i">
                        <img class="content-properties-img" :src="p.IMAGE" alt="" :title="p.NAME">
                    </div>
                    
                </div>
                
                <p>
                    <span v-html="data.DETAIL_TEXT"></span>
                </p>
            </div>
            <div :class="content_switch === 'characteristics' ? 'product-info-desc product-info-tab-elem active':'product-info-desc product-info-tab-elem'">
                <div class="table product-info-table scroll-elem">
                    <div class="table-more-info-arrow"></div>
                    <div class="table-wrap">
                        <div class="table-row"
                            v-for="(v, i) in data.CHARACTERISTICS"
                            :key="i"
                        >
                            <div class="table-elem"><span v-html="v.NAME"></span></div>
                            <div class="table-elem"><span v-html="v.VALUE"></span></div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import { ref } from 'vue';
export default {
    props: {
        data: {
			type: Object
		},
        protect: {
            type: Array
        },
       
    },
    setup() {
        let content_switch = ref('detail')
        let show = ref(true)
        return {
            content_switch,
            show
        }
    }
}
</script>

<style scope>
    
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>