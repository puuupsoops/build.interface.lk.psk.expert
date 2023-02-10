import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { CompanyState } from "./types"
import { Document, normalizeCompanyName, Partner, StorageCompany } from "/src/models/Partner"
import { SelectInputData } from "/src/models/Components"

export const getters: GetterTree<CompanyState, RootState> = {
	isCompanysLoad: state => state.companys.length !== 0,
		isManagerLoad: state => Object.keys(state.manager).length !== 0,
		getCompanys: state => state.companys,
		getCompanysList: state => state.companys.map ( val => ({
			id: val.uid,
			name: normalizeCompanyName(val.name)})),
		getCompanysListInput: state =>  (): SelectInputData[] =>{
			const res = state.companys.map ( val => ({
				id: val.uid,
				name: normalizeCompanyName(val.name)}))
							
			res.unshift({id: '', name: "Все"})
			return res
		},
		getCompanyData : state => (uid: string): Partner|{} => {
			const company = state.companys.find(x => x.uid === uid)
			return company ? ({
				"name": normalizeCompanyName(company.name),
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
		getCompanyStoragesData: state => (uid: string): StorageCompany[] => {
			const company = state.companys.find(x => x.uid === uid)
			
			return (company && company.storages) ?
				company.storages.map ( val => 
					<StorageCompany>({
						"guid": val.guid,
						"name": val.name,
						"spent": val.spent,
						"contract": val.contract,
						"deferment": val.deferment,
						"debt": val.debt,
						"balance": val.balance,
						"discount": val.discount,
						"case": val.case,
						"limit": val.limit,
						"percent": val.percent,
						"date": Number(val.date) >= 0 ? new Date(Number(val.date) * 1000).toLocaleString('ru').substr(0, 10) : '--.--.--',
						"documents": val.documents.map( doc => {
							return <Document>{
								"date": new Date(Number(doc.date) * 1000).toLocaleString('ru').substr(0, 10),
								"number": doc.number,
								"debt": doc.debt,
								"expires": new Date(Number(doc.expires) * 1000).toLocaleString('ru').substr(0, 10),
								"expires_date": new Date(Number(doc.expires) * 1000),
							}}),
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