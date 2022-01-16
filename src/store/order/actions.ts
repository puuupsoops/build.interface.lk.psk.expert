import axios from '@/plugins/axios'
import { ActionTree } from "vuex"
import { RootState } from "@/store"
import { OrderState, OrderStatePosition } from "./types"
import { OrderMutations } from './mutations'
import { Order } from '@/models/Order'


export enum OrderActions {
	CREATE_ORDER = "CREATE_ORDER_ACTION",
	ADD_POSITION = "ADD_POSITION_ACTION",
	REMOVE_POSITION = "REMOVE_POSITION_ACTION",
	REMOVE_POSITION_PRESAIL = "REMOVE_POSITION_PRESAIL_ACTION",
	REMOVE_CHARACTERISTIC = "REMOVE_CHARACTERISTIC_ACTION",
	REMOVE_CHARACTERISTIC_PRESAIL = "REMOVE_CHARACTERISTIC_PRESAIL_ACTION",
	ADD_ORDER = "ADD_ORDER_ACTION",
}

export const actions: ActionTree<OrderState, RootState> =  {
	[OrderActions.CREATE_ORDER] ({ commit }) {
		commit(OrderMutations.CREATE_ORDER);
	},

	[OrderActions.ADD_POSITION] ({ commit, getters }, data: OrderStatePosition) {
		// If order is empty then create newOrder and 
		if (!getters.isOrder) commit(OrderMutations.CREATE_ORDER);
		commit(OrderMutations.ADD_POSITION, data);
		commit(OrderMutations.CALC_PRESAIL);
		commit(OrderMutations.CALC_ORDER);
	},
	[OrderActions.REMOVE_POSITION] ({ commit }, data: number) {
		commit(OrderMutations.REMOVE_POSITION, data);
		commit(OrderMutations.CALC_ORDER);
	},
	[OrderActions.REMOVE_POSITION_PRESAIL] ({ commit }, data: number) {
		commit(OrderMutations.REMOVE_POSITION_PRESAIL, data);
		commit(OrderMutations.CALC_ORDER);
	},

	[OrderActions.REMOVE_CHARACTERISTIC_PRESAIL] ({ commit }, data: OrderStatePosition) {
		commit(OrderMutations.REMOVE_CHARACTERISTIC_PRESAIL, data);
		commit(OrderMutations.CALC_ORDER);
	},
	[OrderActions.REMOVE_CHARACTERISTIC] ({ commit }, data: OrderStatePosition) {
		commit(OrderMutations.REMOVE_CHARACTERISTIC, data);
		commit(OrderMutations.CALC_ORDER);
	},
	
	async [OrderActions.ADD_ORDER] ({ commit }, data: Order) {
		await axios.post('/order/add', data)
			.then(response => {
				commit(OrderMutations.ADD_ORDER, response.data.response)
			})
			.catch(error => {
				if (error.response.status == 400) {
					commit(OrderMutations.CLEAN_ORDER_ERROR, error.response.data.error.message)
				}
			})
	},
}
