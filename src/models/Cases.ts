// API response https://psk.expert/test/api/dashboard/main_page/ajax.php.php
export interface CaseResponse{
	data: Case[],
}


export interface Case {
    id:        string;
    title:     string;
    desc:      string;
    image:     string;
    article:   string;
    price:     string;
    priceType: string;
}

