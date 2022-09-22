import { ProfileNotificationsList, ProfileNotifications, ProfilePersonal } from "/src/models/Propfile";

export interface ProfileState {
	is_load: boolean,
	loading: boolean,
    personal: ProfilePersonal,
	notifications: ProfileNotificationsList,
	image: string,
}



export const defaultProfilePersonal: ProfilePersonal = {
	name:'',
	lastname: '',
	patronymic: '',
	email: '',
	phone: '',
	image: '/src/assets/img/user.png',
}


export const defaultProfileNotification: ProfileNotificationsList = {
	order: {
		email:{
			changed: false,
			created: false,
			states: false},
		lk:{
			changed: false,
			created: false,
			states: false}
		}
}