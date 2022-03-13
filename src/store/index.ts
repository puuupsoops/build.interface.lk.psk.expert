import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { auth } from './auth/index'
import { company } from './company/index'
import { news } from './news/index'
import { cases } from './cases/index'
import { product } from './product/index'
import { catalog } from './catalog/index'
import { order } from './order/index'
import { orders } from './orders/index'
import { shipments } from './shipments/index'
import { claims } from './claims/index'
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
		company,
		news,
		cases,
		product,
		catalog,
		order,
		orders,
		shipments,
		claims,
		keys
	}
})