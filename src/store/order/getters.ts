import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { OrderState } from "./types"
import { Order } from "/src/models/Order"


export const getters: GetterTree<OrderState, RootState> = {
	getOrderError: state => state.error !== null,
	getOrderErrorMsg: state => state.error,
	isOrderAddNew: state => state.new_order.id !== 0,
	getOrderAddNew: state => state.new_order,
	isOrder: state => state.order.id !== 0,
	getOrder: state => state.order,
	getOrderPositionLength: state => state.order.position.length,
	getOrderToAdd: (state) : Order => {
		let res = <Order>{
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
		}
		return res
	},
	
	getOrderDraftCount: state => state.order_drafts.length,
	getOrderDraft: state => state.order_drafts,
	isOrderInDraft: state => state.order_drafts.findIndex(x => x.id==state.order.id)!==-1,
	getOrderDetail: state => state.order_detail,
}