import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { AuthState } from "./types"

export const getters: GetterTree<AuthState, RootState> = {
	isAuthenticated: state => !!state.token,
	getLoginError: state => state.error_login,
	getLoginErrorMsg: state => state.error_login_msg,
	getError: state => state.error,
	getErrorMsg: state => state.error_msg,
}