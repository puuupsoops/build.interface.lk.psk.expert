import axios from "axios";
import { onMounted, ref } from "vue";

export function useShowcase() {

    //Булевая индикация выполнения процесса запроса данных
    const isLoad = ref(true);

    //Данные
    const showcase = ref({});

    //Функция запроса данных
    const fetching = async() => {
        try {

            await axios.get('https://psk.expert/test/api/dashboard/main_page/ajax.php')
                .then((response) => {

                    showcase.value = response.data;

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
        showcase,
        isLoad
    }
}