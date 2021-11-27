import axios from '@/plugins/axios';


// let site_location = process.env.VUE_APP_SITE_LOCATIONL;

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
		isProduct: state => Object.keys(state.product).length !== 0 & state.product.ID !== null,
		getProductSearchResult: state => state.search_product_result,
		getProductOffers: state => state.product_offers.length != 0 ? state.product_offers : 
												[{
													ID: 0,
													CHARACTERISTIC:'Только предзаказ',
													RESIDUE: 0,
													PRICE: state.product.PRICE,
													PPDATA: '',
													GUID: null,
													ORGGUID: null,
												}],
		getProductFound: state => state.product_found.filter(x => x.ARTICLE !==null),
		getProduct: state => state.product,
		getProductImages: state => state.product_images,
		getProductProtect: state => state.product_protect,
		getPtoductToCart: state => ({
			product: state.product,
			product_found: state.product_found,
			product_offers: state.product_offers,
			product_images: state.product_images,
			product_protect: state.product_protect,
		}),
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
			await axios.get(`/product/search?QUERY=${data}&OPTION=2`, {transformRequest: (data, headers) => {
				delete headers.common['Authorization'];
				return data;
				}})
				.then(response => {
					commit('setSearchProductResult', response.data)
				})
				.catch( error => {
					commit('setError', 'Request SEARCH_PRODUCT error:<br>'+error)
				})

		},
		GET_PRODUCT_BY_ID: async function({commit}, data) {
			await axios.get(`/product/search?QUERY=${data}&OPTION=9`, {transformRequest: (data, headers) => {
				delete headers.common['Authorization'];
				return data;
				}})
				.then(response => {
					commit('setProductResult', response.data)
				})
				.catch( error => {
					commit('setError', 'Request GET_PRODUCT_BY_ID error:<br>'+error)
				})
		}

	},

}