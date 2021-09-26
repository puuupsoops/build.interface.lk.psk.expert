import axios from '@/plugins/axios';
import { createStore } from 'vuex'


export default createStore({
	state: {
		partners: {}
	},
	getters: {
		getCompanyData(state) {
			return {
				"name": state.partners.name,
				"inn": state.partners.inn,
				"payment": state.partners.payment,
				"bik": state.partners.bik,
				"correspondent": state.partners.correspondent,
				"address": state.partners.address,
				"city": state.partners.city,
				"email": state.email,
				"uid": state.partners.uid
			}
		},
		getCompanyStoragesData(state) {
			if (state.partners.storages)
				return  state.partners.storages.map ( val =>{
					return {
						"guid": val.guid,
						"name": val.name,
						"spent": val.spent,
						"contract": val.contract,
						"deferment": val.deferment,
						"debt": Number(val.debt).toLocaleString(),
						"balance": Number(val.balance).toLocaleString(),
						"discount": val.discount,
						"date": String(val.date).replace(/^\d\d(\d\d)-(\d\d)-(\d\d)(.*)/, '$3.$2.$1')
						}
					})
				else
					return []
		}
	},
	mutations: {
		setPartners(state,data){
			state.partners = data
		}
	},
	actions: {
		// API https://documenter.getpostman.com/view/15374835/UUxwBoF3#e1274708-aee2-4901-a4fa-40b9c3202c14
		GET_PARTNER: async function({commit}) {
			await axios.get('/partner')
				.then(response => {
						commit('setPartners', response.data.response[0])
				})
				
		},
	},
});
