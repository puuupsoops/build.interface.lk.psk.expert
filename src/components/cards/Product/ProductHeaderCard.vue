<script setup lang="ts">
import { defineProps, toRefs, defineEmits, computed } from 'vue';
import { useStore } from '/src/store';
import { PartnerPriceType } from '/src/models/Partner';

const store = useStore();
const showPriceTypeTitle = computed(() => {
	const activeCompanyId = store.getters.getActiveCompanyId;
	const storages: Storage[] = store.getters.getCompanyStoragesData(activeCompanyId);
	//console.log(storages);
	if (storages[0]) {
		switch (storages[0].pricetype) {
			case PartnerPriceType.Default: return 'Цена:';
			case PartnerPriceType.Base: return 'Базовая цена:';
			case PartnerPriceType.Dealer: return 'Дилерская цена:';
			default: return 'Цена:';
		}
	}

	return 'Цена:';
});
const props = defineProps({
	title: {
		type: String
	},
	price: {
		type: String
	},
	status: {
		type: String
	},
	discount: {
		type: Number
	}
});

const { title, price, status, discount } = toRefs(props);

defineEmits(['ShowSearch']);

/*
export default {
	props:{
		title: {
			type: String
		},
		price: {
			type: String
		},
		status: {
			type: String
		},
		discount:{
			type: Number
		}
	},
	emits: ['ShowSearch']
}*/
</script>

<template>
	<div class="content-heading-wrap proudct-heading-wrap">
		<div class="content-heading-wrap-elem">
			<div class="product-info-header" title="Выбрать другой продукт" @click="$emit('ShowSearch')"><span
					v-html="title"></span>
			</div>
		</div>
		<div class="content-heading-wrap-elem tooltip">
			<div class="content-heading-price">
				<div class="content-heading-price-text">Ваша цена: </div>
				<div class="content-heading-price-value" v-if="discount">{{ Number(price ? price - (price / 100) *
					discount :
					0).toLocaleString('RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.') }}
					₽
				</div>
				<div class="content-heading-price-value" v-else>{{ Number(price ? price : 0).toLocaleString('ru') }} ₽
				</div>

				<div class="tooltiptext" style="	transform: translate3d(-10px, -30px, 0) ">
					<div class="content-heading-info-elem"> скидка: {{ discount }}%</div>
					<!--<div class="content-heading-info-elem" v-else> выберите организацию</div>	-->
				</div>

			</div>

			<div class="content-heading-wrap-elem">
				<div class="content-heading-price">
					<div class="content-heading-price-text">{{ showPriceTypeTitle }} </div>
					<div class="content-heading-price-value">{{ Number(price ? price : 0).toLocaleString('ru') }} ₽
					</div>
				</div>
			</div>
			<div class="content-heading-btn">

			</div>
		</div>
		<div class="content-heading-info">
			<div class="content-heading-info-elem"> <span class="content-heading-info-text">Скидка: </span><span
					class="content-heading-info-value">{{ discount }}%</span></div>
			<div class="content-heading-info-elem"
				v-if="status == 'Outlet' || status == 'Discount' || status == 'Activity'">
				<span class="content-heading-info-text">Скидка: </span><span class="content-heading-info-value">Не
					распостроняется</span>
			</div>

			<div class="content-heading-info-elem"> <span class="content-heading-info-text">Статус товара: </span><span
					class="content-heading-info-value" v-html="status"></span></div>
		</div>
	</div>
</template>