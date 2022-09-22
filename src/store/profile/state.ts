import { defaultProfilePersonal, defaultProfileNotification, ProfileState } from "./types";

export const state: ProfileState = {
	is_load: false,
	loading: false,
	personal: Object.assign({}, defaultProfilePersonal),
	image: defaultProfilePersonal.image,
	notifications: defaultProfileNotification
}