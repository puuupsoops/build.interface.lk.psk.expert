import axios from '/src/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "/src/store"
import { KPState } from "./types"
import { KP } from '/src/models/KP'
import { KPMutations } from '../kp/mutations'
import { AuthMutations } from '../auth/mutations'


export enum KPActions {
	SEND_KP = "SEND_KP",
	SAVE_KP = "SAVE_KP",
}

export const actions: ActionTree<KPState, RootState> =  {
	async [KPActions.SEND_KP] ({ commit }, data: KP){
		await axios.post('/services/proposal/add', data)
			.then(response => {
				commit(KPMutations.SET_KP_FILE, response.data)
				
			})
			.catch( error => {
				commit(AuthMutations.SET_ERROR, 'Request SEND_KP error:<br>'+error)
			})
	},
	[KPActions.SAVE_KP] ({ state }){
		const url = window.URL.createObjectURL(new Blob([state.file]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'file.pdf')
		document.body.appendChild(link)
		link.click()
			
	},
}
