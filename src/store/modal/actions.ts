import { ActionTree } from "vuex";
import { RootState } from "/src/store";
import { ModalState } from "./types";
import { ModalMutations } from "./mutations";

export enum ModalActions {
    VALUE = "VALUE"
}

export const actions: ActionTree<ModalState, RootState> = {
    [ModalActions.VALUE] ({commit}, data) {
        commit(ModalMutations.SET_VALUE, data)
    }
}