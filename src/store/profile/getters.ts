import { GetterTree } from "vuex"
import { RootState } from "/src/store"
import { ProfileState } from "./types"

export const getters: GetterTree<ProfileState, RootState> = {
    isProfileLoad: state => state.is_load,
    getProfilePersonal: state => state.personal
	
}