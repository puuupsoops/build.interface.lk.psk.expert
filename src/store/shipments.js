//import axios from '@/plugins/axios';

export default {
	state: {
		shipments: []
	},
	getters: {
		isShipments: state => state.orders.length == 0,
		getShipments: state => state.orders,
	},
	mutations: {
		setShipments(state){
			state.orders = [
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date: '02.02.20',
					date_shipment: '02.02.20',
					state: 'Рассмотрение',					
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date: '02.02.20',
					date_shipment: '02.02.20',
					state: 'Ответ получен',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date: '02.02.20',
					date_shipment: '02.02.20',
					state: 'Закрыт',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date: '02.02.20',
					date_shipment: '02.02.20',
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
					date: '02.02.20',
					date_shipment: '02.02.20',
					state: 'На рассмотрении',
					bills: [
						{bill: 'счет1'},
						{bill: 'счет2'},
					]
				},
				{
					name: 'Заказ № 1232 от 02.02.2020',
					partner: 'ООО “Вектор”',
					id: '1232',
					date: '02.02.20',
					date_shipment: '02.02.20',
					state: 'В ожидании',
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
	