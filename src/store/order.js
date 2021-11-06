
export default {
	state: {
		order: {
			id: null,		// Идентификатор заказа, генерируется отметкой времени, на стороне личного кабинета
			user_id: 2,		// Идентификатор учетной записи в битрикс, берем из токена
			total: 0,	// Общая стоимость заказа
			count: 0,		// количество позиций в заказе ()
			position: []	// массив с позициями товара
		},
		position: {
			guid: null, // идентификатор товара (номенклатуры)
			characteristics : [] // массив с характеристиками товара (комплектации выбранные пользователем)
		},
		characteristics: {
			guid: null, // идентификатор характеристики 
			quantity: 3   // количество позиций характеристики 
		}
	},
	getters: {
		isOrder: state => state.order.id !== null,
	},
	mutations: {
		createOrder(state){
			state.order.id = (new Date()).getTime()
		}
	},
	actions: {
		CREATE_ORDER: ({ commit }) => {
			commit('createOrder')
		}
	},
}