
import axios from "axios";
import store from '@/plugins/store'

let api_location = process.env.VUE_APP_API_LOCATIONL + '/api'

const instanse = axios.create({
	baseURL: api_location,
	headers: {
		"Content-type": "application/json"
	}
});

const token = localStorage.getItem('id_token')
if (token) {
	instanse.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

instanse.interceptors.response.use(
	(response)=>{return response},
	async (error) =>  {
		if (error.response.status == 401 & error.response.config.url != '/auth') {
			await store.dispatch('LOGOUT')
		}
		return Promise.reject(error);
	});



export default instanse;