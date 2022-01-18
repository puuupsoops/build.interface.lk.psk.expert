<template>
<div class="orders-list-wrap">
	<div class="orders-list ">
			<div class="orders-list-row orders-list-heading">
				<div class="orders-list-elem">№</div>
				<div class="orders-list-elem">Наименование</div>
				<div :class="'orders-list-elem' + (contrAgent !='' ? ' active':'')">Контрагент</div>
				<div class="orders-list-elem">Номер</div>
				<div :class="'orders-list-elem' + (period != 'Все' ? ' active':'')">Дата создания</div>
				<div class="orders-list-elem">Статус</div>
				<div class="orders-list-elem">Инфо</div>
			</div>
            
			<div 
				v-for="(item, key) in data"
				:key="key"
				:class="'orders-list-item' + ( key == active ? ' active': '' )"
				>
                <div
                    v-if="contrAgent =='' || item.partner_guid == contrAgent"
                >
                <div
                    v-if="checkPeriod(item.date)"
                >
                    <div class="orders-list-row orders-list-main-row"
                        @click="key === active ? active = null : active = key"
                    >

                        <div class="orders-list-elem">
                            {{key+1}}
                            <div class="table-arrow"></div>
                        </div>
                        <div class="orders-list-elem">{{ item.name }}</div>
                        <div class="orders-list-elem">{{ item.partner_name }}</div>
                        <div class="orders-list-elem">{{ item.n }}</div>
                        <div class="orders-list-elem">{{ item.date }}</div>
                        <div class="orders-list-elem">{{ item.status }}</div>
                        <div class="orders-list-elem" > 
                            <button
                                class="orders-list-more"
                                @click.stop="key == active_more ? active_more = null : active_more = key"
                            >Подробно</button>
                            <div
                                ref="target"
                                :class="'orders-list-more-dropdown' +  ( key == active_more ? ' active': '' )"
                            >
                                <a class="orders-list-more-dropdown-link" href="">Повторить</a>
                                <a class="orders-list-more-dropdown-link" href="">Детали заказа</a>
                                <a class="orders-list-more-dropdown-link" href="">Скачать документы</a>
                                <a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a>
                                <a class="orders-list-more-dropdown-link" href="">Печать документов</a>
                                <a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a>
                            </div>
                        </div>
                    </div>
                    <div :class="'orders-list-info'   + ( key == active ? ' active': '' )"  >
                        <div class="orders-list-info-row">
                            <div class="orders-list-info-elem">ЭС</div>
                            <div class="orders-list-info-elem"> 
                            <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                            <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                            <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                            </div>
                            <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                            <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                        </div>
                        <div class="orders-list-info-row">
                            <div class="orders-list-info-elem">ФРО</div>
                            <div class="orders-list-info-elem"> 
                            <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                            <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                            <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                            </div>
                            <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a></div>
                            <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                        </div>
                    </div>
                </div>
                </div>
			</div>
		
	</div>
    <PreloaderLocal v-if="loading" style="width: 100%"></PreloaderLocal>
</div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Orders } from '@/models/Orders'
import PreloaderLocal from '@/components/PreloaderLocal.vue'

export default defineComponent({
	props: {
		data: {
			type: Array as PropType<Orders[]>
		},
        contrAgent: {
            type: String
        },
        period: {
            type: String
        },        
        loading:{
            type: Boolean,
            default: false
        }
	},
    components: {
        PreloaderLocal
    },
	setup(props) {
		const active = ref(null);
		const active_more = ref(null);
		const target = ref(null);
		onClickOutside(target, () => {
			active_more.value = null;
		});
        let checkPeriod = (date: string) => {
            if (props.period == 'Все') {
                return true
            } else {
                const start = props.period?.split(' - ')[0]
                const year = start?.substring(6,10)
                const month = start?.substring(3,5)
                return year == date.substring(6,10) && month == date.substring(3,5)
            }
        }
		return {
			target,
			active,
			active_more,
            checkPeriod,
		}
	},
})
</script>
>