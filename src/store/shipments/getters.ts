import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { ShipmentsState } from "./types"
import { SelectInputData } from "/src/models/Components"
import { ShipmentsAddress } from "/src/models/Shipments"

export const getters: GetterTree<ShipmentsState, RootState> = {
	isShipments: state => state.shipments.length == 0,
		getShipments: state => state.shipments,
		getAddressPrompt: state => state.address_prompt,
		getShipmentsAddressById: state => (id:number) => state.address.find(x => x.index == id),
		getShipmentsAddress: state => state.address,
		getShipmentsSuccess: state => state.shipments_success,
		getCompanyFromShipments: state => {
			const unique = <Object[]>[...new Set(state.shipments.map(item => item.partner_guid))]
			const res = unique.map(id => ({id, name:  state.shipments.find(x => x.partner_guid ==id)?.partner_name}))
			res.unshift({id: '', name: "Все"})
			return res
		},
		getShipmentsAddressInputData: state => <SelectInputData[]>state.address.map((x: ShipmentsAddress) => {
				return {
						id: x.index,
						name: x.label,
						address: x.address
					}
			})
}