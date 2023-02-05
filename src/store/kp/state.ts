import { DefaultKP, KPState } from "./types";
import { KP } from "/src/models/KP";

export const state: KPState = {
	kp: <KP> JSON.parse(JSON.stringify(DefaultKP)),
	file: '',
	file_type:'pdf',
	org_name: '',
	logo_list: [],
	logo_list_origin: []
}