// Generated by https://quicktype.io

export interface ProductFound {
    FOUND:   Found[];
    PRODUCT: Product;
    IMAGES:  string[];
    OFFERS:  Offer[];
    PROTECT: Protect[];
}

export interface Found {
    ID:      string;
    NAME:    string;
    ARTICLE: string;
}

export interface Offer {
    ID:             number;
    GUID:           string;
    ORGGUID:        string;
    CHARACTERISTIC: string;
    RESIDUE:        number;
    PRICE:          number;
    PPDATA:         string;
    STORAGES:       Storage[];
}

export interface Storage {
    NAME:     String;
    GUID:     string;
    WAIT:     number;
    SHOWCASE: number;
}

export interface Product {
    ID:              string;
    UID:             string;
    NAME:            string;
    ARTICLE:         string;
    PRICE:           number;
    PRICE_OPT:       number;
    WEIGHT:          number;
    VALUME:          number;
    DETAIL_TEXT:     string;
    STATUS:          string;
    CHARACTERISTICS: Characteristic[];
}

export interface Characteristic {
    NAME:  string;
    VALUE: string;
}

export interface Protect {
    NAME:   string;
    XML_ID: string;
    IMAGE:  string;
}


export interface ProductArticles {
    article: string;
    name: string;
}

export interface ProductCharacteristic {
    productUID:           string;
    characteristicGUID:   string;
    count:                number;
}