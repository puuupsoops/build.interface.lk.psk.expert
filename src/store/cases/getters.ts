import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { CasesState } from "./types"

export const getters: GetterTree<CasesState, RootState> = {
	isCases: state => state.cases.length != 0,
	getCases: state => state.cases,
	getRandomCase: state => state.cases[Math.floor(Math.random()*state.cases.length)]
}