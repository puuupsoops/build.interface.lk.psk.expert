import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { KPState } from "./types"

export const getters: GetterTree<KPState, RootState> = {
	getKPOrgName: state => state.org_name,
	getKPLogoList: state => state.logo_list,
	getKPLogoListOrigin: state => state.logo_list_origin,
	getKPStep: state => state.step,
	getKP: state => state.kp,
}