
export default {
	state:  {
		items: [],//type Product
	},
	getters: {
		isCartEmpty: state => state.items.length == 0,
		getCartItems: state => state.items
	},
	mutations: {
		addItemToCart: (state, item) => {
			state.items.push(item);
		}
	},
	actions: {
		ADD_PRODUCT_TO_CART: ({ commit }, item) => {
			commit('addItemToCart', item);
		} 
	},
}