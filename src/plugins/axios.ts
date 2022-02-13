
import axios from "axios";
import { store } from '@/store'
import { AuthActions } from "@/store/auth/actions";
import { AuthMutations } from "@/store/auth/mutations";


const api_location = process.env.VUE_APP_API_LOCATIONL + '/api'

const instanse = axios.create({
	baseURL: api_location,
	headers: {
		"Content-type": "application/json"
	},
	withCredentials: false
});

const token = localStorage.getItem('id_token')
if (token) {
	instanse.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

instanse.interceptors.response.use(
	(response)=>{return response},
	async (error) =>  {
		try {
			if (error.response.status == 401 && error.response.config.url != '/auth') {
				await store.dispatch(AuthActions.LOGOUT)
			}
			return Promise.reject(error);
		} catch (e) {
			
			store.commit(AuthMutations.SET_ERROR, 'Ошибка ответа сервера: <br>' + e.message)
		}
	});



export default instanse;


export const axios_dadata = axios.create({
	baseURL: process.env.VUE_APP_DADATA_LOCATION,
	headers: {
		"Content-type": "application/json",
		"Accept": "application/json",
		"Authorization": "Token " + process.env.VUE_APP_DADATA_TOKEN
	},
	withCredentials: false
});