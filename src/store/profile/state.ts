import { defaultProfilePersonal, ProfileState } from "./types";

export const state: ProfileState = {
	is_load: false,
	personal: Object.assign({}, defaultProfilePersonal),
}