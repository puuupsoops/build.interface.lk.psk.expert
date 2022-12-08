import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { KPState } from "./types"

export const getters: GetterTree<KPState, RootState> = {
	getKPOrgName: state => state.org_name,
}