import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '/src/plugins/axios';

export const useProductStore = defineStore('product', () => {
    
    const getProductById = async (uid: string) => {
        return await axios.get('/product/search', {
            params: {
                'QUERY': uid,
                'OPTION': 8,
                'PRICEUID': '4baf295f-1342-11e9-814e-005056bf1558'
            }
        })
            .then((resp) => {
                return resp.data;
            });
    };
    const getProductsByIds = async () => { };

    return {
        getProductById,
        getProductsByIds
    };
});
