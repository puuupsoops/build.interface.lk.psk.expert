import axios from '/src/plugins/axios'
import { ActionTree } from 'vuex'
import { RootState } from "/src/store"
import { CompanyState } from './types'
import { CompanyMutations } from './mutations'
import { AuthMutations } from '../auth/mutations'
import { PartnerResponse } from '/src/models/Partner'
import { ManagerResponse } from '/src/models/Manager'
import router from '/src/plugins/router'

export enum CompanyActions {
	GET_COMPANYS = "GET_COMPANYS",
	GET_MANAGER = "GET_MANAGER",
}

export const actions: ActionTree<CompanyState, RootState> =  {
	// API https://documenter.getpostman.com/view/15374835/UUxwBoF3#e1274708-aee2-4901-a4fa-40b9c3202c14
	async [CompanyActions.GET_COMPANYS] ({commit}) {
		const errors = <String[]>[];

		await axios.get<PartnerResponse>('/partners')
			.then(response => {
				if(!response.data.response.length){
					errors.push(`Отсутствуют контрагенты!`)
				}else{
					// проверяем каждого контрагента правки от 2024-01-22
					response.data.response.forEach((value, index) => {
						// проверяем на отсутствие договоров
						if(!value.storages){
							errors.push(`Отсутствуют договора у контрагента: ${value.name}`)
						}else{
							
							// должно присутствовать два договора
							//if(value.storages.length != 2) {
							//	errors.push(`Количество договоров: ${value.storages.length} , должно быть 2 ФРО и ЭС. Контрагент: ${value.name}.`)
							//}

							// Дата должна быть больше нуля у договоров отсрочки при долге не равном нулю
							value.storages.forEach((val) => {
								if(Number(val.date) < 0 && val.case === 'отсрочка' && val.debt > 0){
									errors.push(`Дата договора ${val.contract} : ${val.name} = ${new Date(Number(val.date)).toLocaleDateString('ru')}. Контрагент: ${value.name}. (${val.case})`)
								}

								// Скидка должна быть строго больше нуля
								if( val.discount <= 0 ){
									errors.push(`Скидка меньше или равна нулю. Договор: ${val.contract}, скидка = ${val.discount}. Контрагент: ${value.name}.`)
								}
							})
	
							// должен присутствовать 1 договор от ФРО guid = 'f59a4d06-2f35-11e7-8fdb-0025907c0298'
							if(!value.storages.find( (val) => val.guid === 'f59a4d06-2f35-11e7-8fdb-0025907c0298' )){
								errors.push(`Договор ФРО не найден! Должен присутствовать 1 договор от ФРО. Контрагент: ${value.name}.`)
							}
	
							// должен присутствовать 1 договор от ЭС guid = 'b5e91d86-a58a-11e5-96ed-0025907c0298'
							if(!value.storages.find( (val) => val.guid === 'b5e91d86-a58a-11e5-96ed-0025907c0298' )){
								errors.push(`Договор ЭС не найден! Должен присутствовать 1 договор от ЭС. Контрагент: ${value.name}.`)
							}
	
							// скидки у договоров идентичны
							if(value.storages.length > 2){
								if(value.storages[0].discount !== value.storages[1].discount){
									errors.push(`Скидки в договорах не равны. ${value.storages[0].contract} : ${value.storages[0].discount}% , ${value.storages[1].contract} : ${value.storages[1].discount}%. Контрагент: ${value.name}.`)
								}
							}
						}

					})
				}
				// блокируем пользователя, т.к. отсутствие компаний является неправильной конфигурацией учетки в 1С от 2024-01-22
				if(errors.length > 0){
					//router.push({name: 'Blocked', params: { data: errors }});
					//return;
				}
				
				
				commit(CompanyMutations.SET_COMPANYS, response.data.response)
			})
			.catch( error => {
				errors.push(`Отсутствуют договора!`)
				if(errors.length > 0){
					//router.push({name: 'Blocked', params: { data: errors }});
					//return;
				}
				commit(AuthMutations.SET_ERROR, 'Request GET_PARTNER error:<br>'+error)
			})
			
	},
	async [CompanyActions.GET_MANAGER] ({commit} ,id: string) {
		await axios.get<ManagerResponse>('/manager', { params: { id } })
			.then(response => {
					commit(CompanyMutations.SET_MANAGER, response.data.response)
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, 'Request GET_MANAGER error:<br>'+error)
			})
			
	},
}
