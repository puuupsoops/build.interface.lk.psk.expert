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
		getMenuCategoryName: state => id => {
			for (var i in state.menu) {
				if (typeof state.menu[i] == 'object') {
					let res = state.menu[i].sub.find(cat => cat.code == id)
					if (res) return res.name
				}
			}
			return undefined
		},
		getPageCount: state => Math.floor(Number(state.catalog.total)/Number(state.catalog.count)),
	},
	mutations: {
		setCatalogMenu(state, data){
			state.menu = data
		},
		setCatalog(state, data){
			state.catalog = data
		},
		clearCatalog(state){
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
			commit('clearCatalog')
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