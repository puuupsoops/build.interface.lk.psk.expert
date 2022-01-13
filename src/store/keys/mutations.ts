import { MutationTree } from "vuex";
import { KeysState } from "./types";

export enum KeysMutations {
	SET_LOADER = 'SET_LOADER',
	SET_IS_DEBUG = 'SET_IS_DEBUG',
	SET_COLLAPSED = 'SET_COLLAPSED',
}

export const mutations: MutationTree<KeysState> = {
	[KeysMutations.SET_LOADER] (state, data) {
		state.loader = data;
	},
	[KeysMutations.SET_IS_DEBUG] (state, data) {
		state.isDebug = data;
	},
	[KeysMutations.SET_COLLAPSED] (state, data) {
		state.collapsed = data;
	},

}