import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { OrdersState } from "./types"
import { normalizeCompanyName } from "/src/models/Partner"
import { SelectInputData } from '/src/models/Components'

export const getters: GetterTree<OrdersState, RootState> = {
	isOrders: state => state.orders.length != 0,
	getOrdersByID: state => (id: number) => state.orders.find(x => x.n == id),
	getOrders: state => state.orders,
	getOrdersMaxId: state => Math.max(...state.orders.map(x => x.n)),
	getCompanyFromOrders: state =>  (): SelectInputData[] =>{
		const unique = <Object[]>[...new Set(state.orders.map(item => item.partner_guid))]
		const res = unique.map(id => {
			let name =  state.orders.find(x => x.partner_guid ==id)?.partner_name
			return <SelectInputData>{id, name: name ? normalizeCompanyName(name):''}
		})
		res.unshift({id: '', name: "Все"})
		return res
	},
	getOrdersDataPeriodArray: state => {
		let res = [{id: 0, name: "Все",}]
		if (state.orders.length != 0) {
			const unique = <Object[]>[...new Set(state.orders.map(item => item.date.substring(3,10)))]
			res = unique.map((x, index) => {
				const start = new Date(parseInt(String(x).substring(3,7)), parseInt(String(x).substring(0,2))-1, 1 );
				const end = (new Date(start.getFullYear(), start.getMonth()+1, 0));
				const name = start.toLocaleString('ru').substr(0,10) + ' - ' + end.toLocaleString('ru').substr(0,10)
				return {
					id: index+1,
					name,
				// start,
				// end
				}
			})
			res.unshift({id: 0, name: "Все",})
		}
		return res
	},
} 