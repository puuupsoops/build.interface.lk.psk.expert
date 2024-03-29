import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { KPState } from "./types"
import { KP, KPLogoList } from '/src/models/KP'
import { KPMutations } from '../kp/mutations'
import { AuthMutations } from '../auth/mutations'


export enum KPActions {
	SEND_KP = "SEND_KP",
	SAVE_KP = "SAVE_KP",
	GET_ORG_BY_INN = "GET_ORG_BY_INN",
	ADD_KP_LOGO = "ADD_KP_LOGO",
	GET_KP_LOGO = "GET_KP_LOGO",
	DELETE_KP_LOGO = "DELETE_KP_LOGO", 
}

export const actions: ActionTree<KPState, RootState> =  {
	async [KPActions.SEND_KP] ({ commit }, data: KP){
		await axios.post('/services/proposal/add', data, {responseType: 'blob'})
			.then(response => {
				commit(KPMutations.SET_KP_FILE, response.data)
				commit(KPMutations.SET_KP_FILE_TYPE, data.as)
				
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, `Request SEND_KP error:<br>${error}`)
			})
	},
	[KPActions.SAVE_KP] ({ state }){
		const url = window.URL.createObjectURL(new Blob([state.file]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'file.'+state.file_type)
		document.body.appendChild(link)
		link.click()		
	},
	async [KPActions.GET_ORG_BY_INN] ({ commit }, inn: string){
		await axios.get('/services/proposal/org/' + inn)
			.then(response=>{
				console.log(response.data.response.name)
				commit(KPMutations.SET_KP_ORG_NAME, response.data.response.text)
				
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, `${error.response.data.error.message}`)
				return Promise.reject('Error')
			})
	},
	async [KPActions.ADD_KP_LOGO] ({ commit }, data){
		console.log(data)
        let formData = new FormData();
        formData.append(data.name, DataURIToBlob(data.file),data.name)
		await axios.post( '/services/proposal/logo/add',
					formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
					).then(response=> {
						//commit(KPMutations.SET_KP_LOGO, <KPLogoList>{id: response.data.response.id, image: data})
						// присваиваем новые значения, т.к. Битрикс дичит с файлами, и генерирует новые айдишники
						commit(KPMutations.SET_KP_LOGO, response.data.response.data)
					})
					.catch(error => {
						commit(AuthMutations.SET_ERROR, `Request ADD_KP_LOGO error:<br>${error}`)
					});
	},
	async [KPActions.GET_KP_LOGO] ({ commit }) {
		await axios.get( '/services/proposal/logo/list').then(response=> {
						commit(KPMutations.SET_KP_LOGO_LIST, response.data.response)
					})
					.catch(error => {
						commit(AuthMutations.SET_ERROR, `Request SET_KP_LOGO_LIST error:<br>${error}`)
					});
	},
	async [KPActions.DELETE_KP_LOGO] ({ commit }, id) {
		await axios.post('/services/proposal/logo/delete', id)
			.then( response => {
				if(response.status == 200) {
					commit(KPMutations.DELETE_KP_LOGO_BY_ID, response.data.response.data)
				} 
			 } )
			.catch( error => { commit(AuthMutations.SET_ERROR, `Request DELETE_KP_LOGO error:<br>${error}`) } )
	}
}
function DataURIToBlob(dataURI: string) {
	const splitDataURI = dataURI.split(',')
	const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
	const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

	const ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++)
		ia[i] = byteString.charCodeAt(i)

	return new Blob([ia], { type: mimeString })
  }