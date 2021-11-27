import { createStore } from 'vuex'
import company from '@/store/company'
import product from '@/store/product'
import auth from '@/store/auth'
import catalog from '@/store/catalog'
import order from '@/store/order'
import main_page from '@/store/main_page'


export default createStore({
	modules:{
		auth,
		company,
		product,
		catalog,
		order,
		main_page,
	}
})