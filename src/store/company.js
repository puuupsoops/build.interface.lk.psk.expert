import axios from '@/plugins/axios';


export default ({
	//namespaced: true,
	state: {
		companys: [],
		manager: {},
	},
	getters: {
		isCompanysLoad: state => state.companys.length !== 0,
		isManagerLoad: state => Object.keys(state.manager).length !== 0,
		getCompanys: state => state.companys,
		getCompanysList: state => state.companys.map ( val => ({
			id: val.uid,
			name: val.name.replace(/Общество с ограниченной ответственностью/, 'ООО')
							.replace(/Акционерное общество/, 'АО')
							.replace(/Индивидуальный Предприниматель/, 'ИП')})),
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
						"date": new Date(Number(val.date) * 1000).toLocaleString().substr(0, 10),
						"documents": val.documents.map( doc =>
							({
								"date_str": new Date(Number(doc.date) * 1000).toLocaleString().substr(0, 10),
								"date": new Date(Number(doc.date) * 1000),
								"number": doc.number,
								"debt": doc.debt,
								"expires_str": new Date(Number(doc.expires) * 1000).toLocaleString().substr(0, 10),
								"expires": new Date(Number(doc.expires) * 1000),
							})
							),
					})) : []
		},
		getCompanySpent: state => uid => {
			if (uid){
				let company = state.companys.find(x => x.uid === uid)
				let res = company.storages.reduce((prev,cur) => prev + cur.spent, 0);
				return res
			} else { return 0 }
		},
		getManager: state => state.manager,
	},
	mutations: {
		setPartners(state,data){
			state.companys = data
		},
		setManager(state,data){
			// state.manager = data[0]
			state.manager = data
		}
	},
	actions: {
		// API https://documenter.getpostman.com/view/15374835/UUxwBoF3#e1274708-aee2-4901-a4fa-40b9c3202c14
		GET_PARTNER: async function({commit}) {
			await axios.get('/partners')
				.then(response => {
						commit('setPartners', response.data.response)
				})
				.catch( error => {
					commit('setError', 'Request GET_PARTNER error:<br>'+error)
				})
				
		},
		GET_MANAGER: async function({commit}) {
			await axios.get('/manager')
				.then(response => {
						commit('setManager', response.data.response)
				})
				.catch( error => {
					commit('setError', 'Request GET_MANAGER error:<br>'+error)
				})
				
		},

	},
});
