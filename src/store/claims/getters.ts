import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { ClaimState } from "./types"

export const getters: GetterTree<ClaimState, RootState> = {
    getClaims: state => state.claims,
    getClaimSuccess: state => state.claim_success,
    getClaimNew: state => state.claim_new,
}