import axios from '@/plugins/axios';


let site_location = process.env.VUE_APP_SITE_LOCATIONL;

export default {
state:  {
	search_product_result: [],
	product_offers: [],
	product_found: [],
	product: {},
	product_images: [],
	product_protect: []
	},

	getters: {
		getProductSearchResult: state => state.search_product_result,
		getProductOffers: state => state.product_offers,
		getProductFound: state => state.product_found,
		getProduct: state => state.product,
		getProductImages: state => state.product_images,
		getProductProtect: state => state.product_protect,
	},
	mutations: {
		setSearchProductResult(state, data) {
			state.search_product_result = data;
			state.product_offers = data.OFFERS;
			state.product_found = data.FOUND;
			state.product = data.PRODUCT;
			state.product_images = data.IMAGES;
			state.product_protect = data.PROTECT;
		},
		setSearchProductClear(state) {
			state.search_product_result = [];
			state.product_offers = [];
			state.product_found = [];
			state.product = {};
			state.product_images = [];
			state.product_protect = [];
		},
		setProductResult(state, data){
			state.product = data.PRODUCT;
			state.product_images = data.IMAGES;
			state.product_offers = data.OFFERS;
			state.product_protect = data.PROTECT;
			
		},
		setProductClear(state){
			state.product = {};
			state.product_images = [];
			state.product_offers = [];
			state.product_protect = [];
		}
	},
	actions: {
		SEARCH_PRODUCT: async function({commit}, data) {
			await axios.get(site_location + `/test/product-page/ajax.php?QUERY=${data}&OPTION=2`, {transformRequest: (data, headers) => {
				delete headers.common['Authorization'];
				return data;
				}})
				.then(response => {
					commit('setSearchProductResult', response.data)
				})
		},
		GET_PRODUCT_BY_ID: async function({commit}, data) {
			await axios.get(site_location + `/test/product-page/ajax.php?QUERY=${data}&OPTION=9`, {transformRequest: (data, headers) => {
				delete headers.common['Authorization'];
				return data;
				}})
				.then(response => {
					commit('setProductResult', response.data)
				})
		}

	},

}