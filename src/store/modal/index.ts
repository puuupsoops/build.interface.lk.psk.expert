import { Module } from "vuex";
import { ModalState } from "./types";
import { RootState } from "/src/store";
import {getters} from "./getters"
import {state} from "./state"
import { actions } from "./actions"
import { mutations } from "./mutations"

export const modal: Module<ModalState, RootState> = {
    getters, state, actions, mutations
}
