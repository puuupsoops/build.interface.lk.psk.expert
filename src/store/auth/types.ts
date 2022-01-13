export interface AuthState {
	error_login: boolean,
	error_login_msg: string|null,
	token: string|null,
	error: boolean,
	error_msg: string,
}