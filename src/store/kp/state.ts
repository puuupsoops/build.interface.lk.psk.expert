import { DefaultKP, KPState } from "./types"
import { KP } from "/src/models/KP"
import _ from "lodash"

export const state: KPState = {
	kp: <KP> _.cloneDeep(DefaultKP),
	file: '',
	file_type:'pdf',
	org_name: '',
	logo_list: [],
	logo_list_origin: [],
	banner_list: [],
	banner_list_origin: [],
	step: 1
}