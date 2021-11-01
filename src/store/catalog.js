import axios from '@/plugins/axios';
let site_location = process.env.VUE_APP_SITE_LOCATIONL;

export default ({
	state: {
		menu: {},
		catalog: {},
	},
	getters: {
		isCatalogMenuLoad: state => Object.keys(state.menu).length !== 0,
		isCatalogLoad: state => Object.keys(state.catalog).length !== 0,
		getCatalogMenu: state => state.menu,
		getCatalog: state => state.catalog,
	},
	mutations: {
		setCatalogMenu(state, data){
			state.menu = data
		},
		setCatalog(state, data){
			state.catalog = data
		},
		cleartCatalog(state){
			state.catalog = {}
		}
	},
	actions: {
		GET_CATALOG_MENU: async function({commit}) {
			await axios.get(site_location + `/test/api/dashboard/catalog_page/ajax_menu.php`, {transformRequest: (data, headers) => {
				delete headers.common['Authorization'];
				return data;
				}})
				.then(response => {
					commit('setCatalogMenu', response.data)
				})
		},
		GET_CATALOG: async function({commit}, data) {
			commit('cleartCatalog')
			await axios.get(site_location + `/test/api/dashboard/catalog_page/ajax.php`, 
				{
					transformRequest: (data, headers) => {
						delete headers.common['Authorization'];
						return data;
					},
					params: {
						SECTION: data.code,
						PAGE: data.page
					},
				})
				.then(response => {
					commit('setCatalog', response.data)
				})
		}

	},
})