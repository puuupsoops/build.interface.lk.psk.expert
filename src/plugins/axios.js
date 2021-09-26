
import axios from "axios";

let api_location = process.env.VUE_APP_API_LOCATIONL + '/api'

export default axios.create({
	baseURL: api_location,
	headers: {
		"Content-type": "application/json"
	}
});