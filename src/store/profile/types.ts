import { ProfilePersonal } from "/src/models/Propfile";

export interface ProfileState {
    personal: ProfilePersonal,
	is_load: boolean
}



export const defaultProfilePersonal: ProfilePersonal = {
	name:'',
	lastname: '',
	patronymic: '',
	email: '',
	phone: '',
	image: '/src/assets/img/user.png',
}