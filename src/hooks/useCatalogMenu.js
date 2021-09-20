import axios from "axios";
import { onMounted, ref } from "vue";

export function useCatalogMenu() {

    //Булевая индикация выполнения процесса запроса данных
    const isLoad = ref(true);

    //Данные
    const menu = ref({});

    //Функция запроса данных
    const fetching = async() => {
        try {

            await axios.get('https://psk.expert/test/api/dashboard/catalog_page/ajax_menu.php')
                .then((response) => {

                    menu.value = response.data;

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
        menu,
        isLoad
    }
}