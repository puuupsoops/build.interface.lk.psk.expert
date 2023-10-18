<script setup lang="ts">
import { DeleteButton } from '../../ui';
import { ref, onMounted } from 'vue'
import { useStore } from '/src/store';
import { ModalActions } from '/src/store/modal/actions'
import axios from 'axios';
import { date } from 'yup';
import { wsMessageTypes } from '/src/plugins/wsStore';

const store = useStore()

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
        required: true 
    }
});

const emits = defineEmits(['update:modelValue']);

const close = () => {   // Функция закрытияи модального окна.

    let status = localStorage.setItem('status', props.modelValue.toString())    //Сохранение просмотра модального окна пользователем.
    let closeSave = localStorage.getItem('status') 
   
        store.dispatch(ModalActions.VALUE, false)
		emits('update:modelValue', false);
	}


const v = ref();

const f = async () => { 
    let a = '';
    await axios.get('http://89.111.136.61/update/')
        .then(function (response) {
            // обработка успешного запроса
            a = response.data;
            //console.log(response.data);
        })
        .catch(function (error) {
            // обработка ошибки
            //console.log(error);
        })
        .finally(function () {
            // выполняется всегда
        });
        
    return a;
}


const d = ref();

//Дата с сервера 
const data = async () => {
        let time = 0;
        await axios.get('http://89.111.136.61/api/updates/info/cache')
        .then(function (response) {
             time = response.data.response.updates.last;
        })
        .catch(function(error) {

        })
        .finally(function(){

        });
        return time;
}


/*
onMounted( async () => {
    let currentDate = localStorage.getItem('date');
    let serverDate = await data();


    if(!currentDate ||  Number(currentDate) != Number(serverDate))
    {
            // переменная пустая
        setTimeout(() => {
            store.commit('SOCKET_ONMESSAGE', {type: wsMessageTypes.NOTIFICATION, date: 165367234, text: "Обратите внимание на наши новинки", })
        }, 2000) 
        v.value = await f();
        localStorage.setItem('html', v.value)
        localStorage.setItem('date', serverDate.toString())
        localStorage.setItem('status', false.toString())
        /* Принудительно открывает модальное окно.
        
        setTimeout(() => {
            store.dispatch(ModalActions.VALUE, true)
		    emits('update:modelValue', true);
        }, 3000);
        */
       /*
    }
    else{
        // переменная содержит значение 
        v.value = localStorage.getItem('html');
    }
    
})
*/

</script>

<template>
    <div v-if="modelValue" class="order-modal">
        <div class="order-modal-dialog draft">
            <div class="order-modal-content draft" >
                <div class="order-modal-header">
                    Обратите внимание на наши новинки! <DeleteButton @onClick="close()"/> 
                </div>
                <div class="order-modal-body draft" :innerHTML="v">
                
                </div>
                <div v-if="showPreload">
                    <PreloaderLocal :style="'margin: -8px 60px 0 auto;'"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>