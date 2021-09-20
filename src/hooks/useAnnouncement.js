import axios from "axios";
import { onMounted, ref } from "vue";

export function useAnnouncement() {

    //Булевая индикация выполнения процесса запроса данных
    const isLoad = ref(true);

    //Данные
    const news = ref({});

    //Функция запроса данных
    const fetching = async() => {
        try {

            await axios.get('https://psk.expert/test/api/dashboard/main_page/ajax_news.php')
                .then((response) => {

                    news.value = response.data[0];

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
        news,
        isLoad
    }
}