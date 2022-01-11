

export interface Partners {
    uid:           string;
    name:          string;
    city:          string;
    phone:         string;
    email:         string;
    address:       string;
    inn:           string;
    bik:           string;
    payment:       string;
    correspondent: string;
    storages:      Storage[];
}

export interface Storage {
    guid:      string;
    name:      string;
    spent:     number;
    contract:  string;
    deferment: number;
    debt:      number;
    balance:   number;
    discount:  number;
    date:      string;
    documents: Document[];
}

export interface Document {
    expires: string;
    date:    string;
    number:  string;
    debt:    number;
}
