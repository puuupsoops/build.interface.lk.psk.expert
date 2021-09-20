import axios from "axios";
import { onMounted, ref } from "vue";

export function useCatalog(code, page) {

    //Булевая индикация выполнения процесса запроса данных
    const isLoad = ref(true);

    //Данные
    const catalog = ref({});

    //Функция запроса данных
    const fetching = async() => {
        try {

            await axios.get('https://psk.expert/test/api/dashboard/catalog_page/ajax.php', {
                    params: {
                        SECTION: code,
                        PAGE: page
                    }
                })
                .then((response) => {

                    catalog.value = response.data;

                });

        } catch (e) {

            alert('Ошибка получения данных');

        } finally {

            isLoad.value = false;
        }
    };

    onMounted(fetching);

    /*
        onCreated();
        computed();
        watch();
    */

    return {
        catalog,
        isLoad
    }
}