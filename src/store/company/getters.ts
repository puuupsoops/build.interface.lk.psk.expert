import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { CompanyState } from "./types"
import { Partner } from "/src/models/Partner"

export const getters: GetterTree<CompanyState, RootState> = {
	isCompanysLoad: state => state.companys.length !== 0,
		isManagerLoad: state => Object.keys(state.manager).length !== 0,
		getCompanys: state => state.companys,
		getCompanysList: state => state.companys.map ( val => ({
			id: val.uid,
			name: val.name
						.replace(/Общество с ограниченной ответственностью/, 'ООО')
						.replace(/Акционерное общество/, 'АО')
						.replace(/Индивидуальный предприниматель/, 'ИП')})),
		getCompanysListInput: state => {
			const res = state.companys.map ( val => ({
				id: val.uid,
				name: val.name
							.replace(/Общество с ограниченной ответственностью/, 'ООО')
							.replace(/Акционерное общество/, 'АО')
							.replace(/Индивидуальный предприниматель/, 'ИП')}))
			res.unshift({id: '', name: "Все"})
			return res
		},
		getCompanyData : state => (uid: string): Partner|{} => {
			const company = state.companys.find(x => x.uid === uid)
			return company ? ({
				"name": company.name,
				"inn": company.inn,
				"payment": company.payment,
				"bik": company.bik,
				"correspondent": company.correspondent,
				"address": company.address,
				"city": company.city,
				"email": company.email,
				"phone": company.phone,
				"uid": company.uid,
			}) : {}
		},
		getCompanyStoragesData: state => (uid: string) => {
			const company = state.companys.find(x => x.uid === uid)
			return (company && company.storages) ?
				company.storages.map ( val =>
					({
						"guid": val.guid,
						"name": val.name,
						"spent": val.spent,
						"contract": val.contract,
						"deferment": val.deferment,
						"debt": val.debt,
						"debt_str": Number(val.debt).toLocaleString('ru'),
						"balance": val.balance,
						"balance_str": Number(val.balance).toLocaleString('ru'),
						"discount": val.discount,
						"date": new Date(Number(val.date) * 1000).toLocaleString('ru').substr(0, 10),
						"documents": val.documents.map( doc =>
							({
								"date_str": new Date(Number(doc.date) * 1000).toLocaleString('ru').substr(0, 10),
								"date": new Date(Number(doc.date) * 1000),
								"number": doc.number,
								"debt": doc.debt,
								"expires_str": new Date(Number(doc.expires) * 1000).toLocaleString('ru').substr(0, 10),
								"expires": new Date(Number(doc.expires) * 1000),
							})
							),
					})) : []
		},
		getCompanySpent: state => (uid: string) => {
			if (uid){
				const company = state.companys.find(x => x.uid === uid)
				const res = company && company.storages ? company.storages.reduce((prev,cur) => prev + cur.spent, 0) : 0;
				return res
			} else { return 0 }
		},
		getManager: state => state.manager,
		getManagerName: state=> (uid: String): String => {
			if (uid){
				const company = state.companys.find(x => x.uid === uid)
				const res = company ? company.managerName : '';
				return res
			} else { return ''}
		},
		getManagerUid: state=> (uid: String): String => {
			if (uid){
				const company = state.companys.find(x => x.uid === uid)
				const res = company ? company.managerUid : '';
				return res
			} else { return ''}
		},
		getCompanyDiscount: state => (uid: string, guid: string) => {
			if (uid){
			
				const company = state.companys.find(x => x.uid === uid)
				
				const res = company && company.storages ? company.storages.find(x => x.guid === guid): null
				return res?res.discount:null
			} else { return 0 }
		},
}