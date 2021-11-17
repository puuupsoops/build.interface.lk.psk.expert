import axios from '@/plugins/axios';

export default {
	state: {
		order: {
			id: null,		// Идентификатор заказа, генерируется отметкой времени, на стороне личного кабинета
			total: 0,	// Общая стоимость заказа
			count: 0,		// количество позиций в заказе ()
			position: [],	// массив с позициями товара
			position_presail: [],	// массив с позициями товара
		},
		// position: {
		// 	name: null, // имя 
		// 	guid: null, // идентификатор товара (номенклатуры)
		// 	characteristics : [] // массив с характеристиками товара (комплектации выбранные пользователем)
		// },
		// characteristics: {
		// 	guid: null, // идентификатор характеристики 
		// 	quantity: 3   // количество позиций характеристики 
		// }
		error: null,
	},
	getters: {
		getOrderError: state => state.error !== null,
		getOrderErrorMsg: state => state.error,
		isOrder: state => state.order.id !== null,
		getOrder: state => state.order,
		getOrderToAdd: state => (
			{
				id: state.id,
		
				total: state.total,
				count: state.count,
				position: []
		})

	},
	mutations: {
		createOrder(state){
			state.order.id = (new Date()).getTime()
			state.error = null;
			console.log(state)
		},
		addPosition(state, data){
			if (data.characteristics.length > 0)
			{
				let exist = state.order.position.find(x => x.product.ID == data.product.ID);
				if (exist) {
					let add_characteristics = data.characteristics.filter(x => {
						let e = exist.characteristics.find(m => m.id == x.id)
						if (e){
							e.count = Number(e.count) + Number(x.count)
							if (Number(e.count) > Number(e.residue)) e.count=e.residue
						} else 
						return true
					});
					exist.characteristics = exist.characteristics.concat(add_characteristics);
				} else
					state.order.position.push(data);
			}

		},
		addPositionPresail(state, data){
			if (data.characteristics.length > 0)
			{
				let exist = state.order.position_presail.find(x => x.product.ID == data.product.ID);
				if (exist) {
					console.log(exist)
					let add_characteristics = data.characteristics.filter(x => {
						let e = exist.characteristics.find(m => m.id == x.id)
						if (e){
							e.count = Number(e.count) + Number(x.count)
						} else 
						return true
					});
					exist.characteristics = exist.characteristics.concat(add_characteristics);
				} else
					state.order.position_presail.push(data);
			}

		},
		removePosition(state, data){
			if (data.position)
				state.order.position=state.order.position.filter(x=> Number(x.product.ID) !== Number(data.id));
			if (data.position_presail)
				state.order.position_presail=state.order.position_presail.filter(x=> Number(x.product.ID) !== Number(data.id));
		},
		removeCharacteristic(state, data){
			if (data.position)
			{
				state.order.position.forEach(pos => {
					pos.characteristics = pos.characteristics.filter(x=> Number(x.id) !== Number(data.id))
				});
				state.order.position = state.order.position.filter(x=> x.characteristics.length > 0)
			}
			if (data.position_presail)
			{
				state.order.position_presail.forEach(pos => {
					pos.characteristics = pos.characteristics.filter(x=> Number(x.id) !== Number(data.id))
				});
				state.order.position_presail = state.order.position_presail.filter(x=> x.characteristics.length > 0)
			}
		},
		calcOrder(state){
			let total = 0;
			let total_count = 0;
			let total_valume = 0;
			let total_weight = 0;

			state.order.position.forEach(pos => {
				let total_pos = 0;
				let total_count_pos = 0;
				let total_valume_pos = Number(pos.product.VALUME);
				let total_weigth_pos = Number(pos.product.WEIGHT);
				pos.characteristics.forEach( c => {
					total_pos = total_pos + Number(c.price) * Number(c.count);
					total_count_pos = total_count_pos + Number(c.count);
				});
				pos.total = total_pos;
				pos.count = total_count_pos

				total = total + total_pos;
				total_count = total_count + total_count_pos;
				total_valume = total_valume_pos * total_count_pos;
				total_weight = total_weigth_pos * total_count_pos;
			});
			state.order.position_presail.forEach(pos => {
				let total_pos = 0;
				let total_count_pos = 0;
				pos.characteristics.forEach( c => {
					total_pos = total_pos + Number(c.price) * Number(c.count);
					total_count_pos = total_count_pos + Number(c.count);
				});
				pos.total = total_pos;
				pos.count = total_count_pos;
			});

			state.order.count = state.order.position.length;
			state.order.total = total;
			state.order.total_count = total_count;
			state.order.total_valume = total_valume.toFixed(3);
			state.order.total_weight = total_weight.toFixed(3);
			
			if (total == 0 & state.order.position_presail.length == 0 ) state.order.id = null;
		},
		addOrder(){

		},
		setOrderError(state, data){
			state.error = data
		}, 
		cleanOrderError(state){
			state.error = null;
		},
		cleanOrder(state){
			state.order = {
				id: null,
				total: 0,
				count: 0,
				position: [],
				position_presail: []
			}	
		}
	},
	actions: {
		CREATE_ORDER: ({ commit }) => {
			commit('createOrder');
		},

		ADD_POSITION: ({ commit, getters }, data) => {
			// If order is empty then create newOrder and 
			if (!getters.isOrder) commit('createOrder');
			commit('addPosition', data.position);
			commit('addPositionPresail', data.position_presail);
			commit('calcOrder');
		},
		REMOVE_POSITION:({ commit }, data) => {
			commit('removePosition', data);
			commit('calcOrder')
		},

		REMOVE_CHARACTERISTIC:({ commit }, data) => {
			commit('removeCharacteristic', data);
			commit('calcOrder')
		},
		
		ADD_ORDER: async function({ commit }, data) {
			await axios.post('/order/add', data)
				.then(response => {
					console.log(response.data)
					commit('addOrder')
				})
				.catch(error => {
					
					if (error.response.status == 400) {
						commit('setOrderError', error.response.data.error.message)
					}
				})
		},
	
	},
}