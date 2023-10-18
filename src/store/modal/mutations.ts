import { ModalState } from "./types";
import { MutationTree } from "vuex";

export enum ModalMutations {
    SET_VALUE = "SET_VALUE",
}

export const mutations: MutationTree<ModalState> = {
    [ModalMutations.SET_VALUE] (state, data) {
        state.showInfoModal = data
    }
}