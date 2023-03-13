import {state as CompanyState} from "/src/store/company/state";

export default (uid: string, guid: string, status: string): number => {
    if (status == 'Outlet' || status == 'Discount' || status == 'Activity') return 0
    if (uid){
        const company = CompanyState.companys.find(x => x.uid === uid)
        const res = company && company.storages ? company.storages.find(x => x.guid === guid): null
        return res ? res.discount:0
    } else { return 0 }
}