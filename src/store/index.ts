import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
// import company from '@/store/company'
// import product from '@/store/product'
import { auth } from './auth/index'
// import catalog from '@/store/catalog'
// import order from '@/store/order'
// import orders from '@/store/orders'
// import shipments from '@/store/shipments'
// import main_page from '@/store/main_page'
import { keys } from './keys/index'


// export default createStore({
// 	modules:{
// 		auth,
// 		company,
// 		product,
// 		catalog,
// 		order,
// 		orders,
// 		shipments,
// 		main_page,
// 	}
// })


export interface RootState {}
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
	state: {},
	modules:{
		auth,
		keys,
	}
})