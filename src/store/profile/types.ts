import { ProfilePersonal } from "/src/models/Propfile";

export interface ProfileState {
	is_load: boolean,
	loading: boolean,
    personal: ProfilePersonal,
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