import axios from '@/plugins/axios';


let site_location = process.env.VUE_APP_SITE_LOCATIONL;

export default {
state:  {
    search_product_result: [],
	},

    getters: {

	},
	mutations: {
		setSearchProductResult(state, data) {
			state.search_product_result = data;
		},
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
        }
    },

}