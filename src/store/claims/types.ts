import { Claim } from "@/models/Claim";

export interface ClaimState {
    claims: Claim[],
    claimSuccess: number[],
}