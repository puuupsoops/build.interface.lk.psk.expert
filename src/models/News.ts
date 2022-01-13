// API response https://psk.expert/test/api/dashboard/main_page/ajax_news.php
export interface NewsResponse{
	data: News[],
}

export interface News {
	id:    string;
	title: string;
	text:  string;
	image: string;
	date:  string;
}
