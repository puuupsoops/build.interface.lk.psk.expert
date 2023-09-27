import { GetterTree } from "vuex";
import { RootState } from "/src/store";
import { ModalState } from "./types";
import axios from "axios";

export const getters: GetterTree<ModalState,RootState> = {
    getValue: state => state.showInfoModal
}