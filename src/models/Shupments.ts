export interface ShipmentsAddress {
    index?:      number;
    label:      string;
    latitude:   string;
    longitude:  string;
}

export interface Shipments {
    bitrix_id:    string;
    date_create:  string;
    status:       number;
    title:        string;
    partner_name: string;
    partner_guid: string;
    id:           string;
    case:         string;
    message:      string;
    files:        any[];
    amount:       string;
    weight:       string;
    volume:       string;
    carriers:     string;
    date:         string;
    address:      string;
    comment:      string;
    extra:        string[] | boolean;
}
