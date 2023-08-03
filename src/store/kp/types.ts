import { KP, KPLogoList, KP_HEADER_LOGO_ALIGN, KPBannerList } from '/src/models/KP'

export interface KPState {
    kp: KP,
    file: any,
    file_type: string,
    org_name: string,
    logo_list: KPLogoList[],
    logo_list_origin: KPLogoList[],
    banner_list: KPBannerList[],
	banner_list_origin: KPBannerList[],
    step: number
}

export const DefaultKP:KP = {
    offer: {
        executor:    '',
        executorUID: '',
        customer:    '',
        n:           '',
        date:        -1,
        comment:     '',
        position: []
    },
    additionally: {
        delay: false,
        delayCalendarValue: 0,
        delayWorkValue: 0,
        delivery: false,
        deliveryValue: 0,
        pickup: false,
        pickupValue: '',
        prepayment:false,
        prepaymentValue: 0
    },
    header: false,        //true,
    headerLogo: 0,
    banner: false,       // true/false баннер
    bannerSrc: '',      // банер-ресурс в base64
    bannerId: 0,       
    headerLogoAlign: KP_HEADER_LOGO_ALIGN.LEFT,
    headerText: '',
    as:     'PDF',       //PDF
    isPortraitOrientation: true,
}

