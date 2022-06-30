import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { OrderState } from "./types"

export const getters: GetterTree<OrderState, RootState> = {
	getOrderError: state => state.error !== null,
	getOrderErrorMsg: state => state.error,
	isOrderAddNew: state => state.new_order.id !== 0,
	getOrderAddNew: state => state.new_order,
	isOrder: state => state.order.id !== 0,
	getOrder: state => state.order,
	getOrderPositionLength: state => state.order.position.length,
	getOrderToAdd: state => (
		{
			id: state.order.id,
			total: state.order.total,
			count: state.order.count,
			partner_id: state.partner_id,
			position: state.order.position.map((x)=>({
				guid: x.guid,
				characteristics: x.characteristics.map((c)=>({
					guid: c.GUID,
					orgguid: c.ORGGUID,
					quantity: c.count,
				})),
			})),
			position_presail: state.order.position_presail.map((x)=>({
				guid: x.product.UID,
				characteristics: x.characteristics.map((c)=>({
					guid: c.GUID,
					orgguid: c.ORGGUID,
					quantity: c.count,
				})),
			})),
	}),
	getOrderDraftCount: state => state.order_drafts.length,
	getOrderDraft: state => state.order_drafts,
	isOrderInDraft: state => state.order_drafts.findIndex(x => x.id==state.order.id)!==-1,
	getOrderDetail: state => state.order_detail,
}