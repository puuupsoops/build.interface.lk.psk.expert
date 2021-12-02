//import axios from '@/plugins/axios';

export default {
	state: {
		orders: []
	},
	getters: {
		isOrders: state => state.orders.length == 0,
		getOrders: state => state.orders,
	},
	mutations: {
		setOrders(state){
			state.orders = [
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date_created: '02.02.20',
					state: 'Подтверждён',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date_created: '02.02.20',
					state: 'Подтверждён',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date_created: '02.02.20',
					state: 'Подтверждён',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date_created: '02.02.20',
					state: 'Подтверждён',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date_created: '02.02.20',
					state: 'Подтверждён',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
			]
		}
	},
	actions: {},
}
	