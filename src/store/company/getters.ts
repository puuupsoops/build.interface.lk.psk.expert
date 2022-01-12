import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { CompanyState } from "./types"

export const getters: GetterTree<CompanyState, RootState> = {
	isCompanysLoad: state => state.companys.length !== 0,
		isManagerLoad: state => Object.keys(state.manager).length !== 0,
		getCompanys: state => state.companys,
		getCompanysList: state => state.companys.map ( val => ({
			id: val.uid,
			name: val.name.replace(/Общество с ограниченной ответственностью/, 'ООО')
							.replace(/Акционерное общество/, 'АО')
							.replace(/Индивидуальный Предприниматель/, 'ИП')})),
		getCompanyData : state => (uid: string) => {
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
						"debt_str": Number(val.debt).toLocaleString(),
						"balance": val.balance,
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
		getCompanySpent: state => (uid: string) => {
			if (uid){
				const company = state.companys.find(x => x.uid === uid)
				const res = company ? company.storages.reduce((prev,cur) => prev + cur.spent, 0) : 0;
				return res
			} else { return 0 }
		},
		getManager: state => state.manager,
}