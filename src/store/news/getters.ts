import { GetterTree } from "vuex"
import { RootState } from "@/store"
import { NewsState } from "./types"

export const getters: GetterTree<NewsState, RootState> = {
	isNews: state => state.news.length != 0,
	getNews: state => state.news,
	getOneNews: state => state.news.length != 0 ?state.news[0]: null,
}