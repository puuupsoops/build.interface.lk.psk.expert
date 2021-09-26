import { createStore } from 'vuex'
import company from '@/store/company'
import auth from '@/store/auth'


export default createStore({
	modules:{
		auth,
		company,
	}
})