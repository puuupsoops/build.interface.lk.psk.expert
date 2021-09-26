import axios from '@/plugins/axios';


export default ({
	//namespaced: true,
	state: {
		companys: [],
	},
	getters: {
		getCompanys: state => state.companys,
		getCompanyData : state => uid => {
			let company = state.companys.find(x => x.uid === uid)
			return company ? ({
				"name": company.name,
				"inn": company.inn,
				"payment": company.payment,
				"bik": company.bik,
				"correspondent": company.correspondent,
				"address": company.address,
				"city": company.city,
				"email": company.email,
				"uid": company.uid,
			}) : {}
		},
		getCompanyStoragesData: state => uid => {
			let company = state.companys.find(x => x.uid === uid)
			return (company && company.storages) ?
				company.storages.map ( val =>
					({
						"guid": val.guid,
						"name": val.name,
						"spent": val.spent,
						"contract": val.contract,
						"deferment": val.deferment,
						"debt": parseFloat(val.debt),
						"debt_str": Number(val.debt).toLocaleString(),
						"balance": parseFloat(val.balance),
						"balance_str": Number(val.balance).toLocaleString(),
						"discount": val.discount,
						"date": String(val.date).replace(/^\d\d(\d\d)-(\d\d)-(\d\d)(.*)/, '$3.$2.$1'),
						"documents": val.documents,
					})) : []
		},
	},
	mutations: {
		setPartners(state,data){
			state.companys = data
		}
	},
	actions: {
		// API https://documenter.getpostman.com/view/15374835/UUxwBoF3#e1274708-aee2-4901-a4fa-40b9c3202c14
		GET_PARTNER: async function({commit}) {
			await axios.get('/partners')
				.then(response => {
						commit('setPartners', response.data.response)
				})
				
		},
	},
});
