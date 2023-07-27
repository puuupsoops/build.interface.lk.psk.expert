import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import {OrderState, OrderStateOrder} from "./types"
import { Order } from "/src/models/Order"
import { SelectInputData } from "/src/models/Components"
import { state as CompanyState } from "/src/store/company/state"

export const getters: GetterTree<OrderState, RootState> = {
	getOrderError: state => state.error !== null,
	getOrderErrorMsg: state => state.error,
	isOrderAddNew: state => state.new_order.id !== 0,
	getOrderAddNew: state => state.new_order,
	isOrder: state => state.order.id !== 0,
	getOrder: state => state.order,
	getOrderPositionLength: state => state.order.position.length,
	getOrderToAdd: (state) : Order => {
		const res = <Order>{
			id: state.order.id,
			edit: state.order.edit,
			reserved: state.order.reserved,
			comment: state.order.comment,
			delivery: state.order.delivery,
			request_certificate: state.order.request_certificate,
			total: state.order.total,
			count: state.order.count,
			partner_id: state.order.edit? state.order.partner_id : state.partner_id,
			position: state.order.position.map((x) => ({
				guid: x.guid,
				characteristics: x.characteristics.map((c) => ({
					discount: c.discount ? Number(c.discount/100): 0,
					fullprice: c.PRICE,
					price: c.price_discount ? c.price_discount : c.PRICE,
					guid: c.GUID,
					orgguid: c.ORGGUID,
					quantity: c.count,
				})),
			})),
			position_presail: state.order.position_presail.map((x) => ({
				guid: x.guid,
				characteristics: x.characteristics.map((c) => ({
					discount: c.discount ? Number(c.discount/100): 0,
					fullprice: c.PRICE,
					price: c.price_discount ? c.price_discount : c.PRICE,
					guid: c.GUID,
					orgguid: c.ORGGUID,
					quantity: c.count,
				})),
			})),
			bags: state.order.bags
		}
		return res
	},
	
	getOrderDraftCount: state => state.order_drafts.length,
	getOrderDrafts: (state):OrderStateOrder[] => state.order_drafts,
	getOrderDraftsInputData: (state):SelectInputData[] => state.order_drafts.map(draft => ({id: draft.id, name: draft.name!})),
	isOrderInDraft: state => state.order_drafts.findIndex(x => x.id==state.order.id)!==-1,
	getOrderDetail: state => state.order_detail,
	getOrderStorages: (state): SelectInputData[] => {
		let res = <SelectInputData[]>[]
		
		state.order.position.forEach(x => {
			x.characteristics.forEach(c => {
				if (res.findIndex(r => r.id==c.ORGGUID) == -1 && state.partner_id !== '') 
					{
						const company = CompanyState.companys.find(x => x.uid === state.partner_id)
						if (company && company.storages){
							const storage_name = company?.storages?.find(store => store.guid ==  c.ORGGUID)?.name
							res.push({id: c.ORGGUID, name: storage_name ? storage_name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(")|(\s)|([а-я])/g, '') : 'Склад'})
						}
					}
			})
		})

		state.order.position_presail.forEach(x => {
			x.characteristics.forEach(c => {
				if (res.findIndex(r => r.id==c.ORGGUID) == -1 && state.partner_id !== '') 
					{
						const company = CompanyState.companys.find(x => x.uid === state.partner_id)
						if (company && company.storages){
							const storage_name = company?.storages?.find(store => store.guid ==  c.ORGGUID)?.name
							res.push({id: c.ORGGUID, name: storage_name ? storage_name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(")|(\s)|([а-я])/g, '') : 'Склад'})
						}
					}
			})
		})

		return res;
	}
}