<template>
  <div class="auth-box">
    
    <div class="bx-authform" v-if="isAuth == 1">
      <h3 class="bx-title" style="text-align: center">Авторизация</h3>

      <form> 
        <div class="bx-authform-formgroup-container">
          <div class="bx-authform-label-container">Логин</div>
          <div class="bx-authform-input-container">
            <input 
              type="text" 
              name="USER_LOGIN" 
              maxlength="255" 
              v-model="login"/>
          </div>
        </div>

        <div class="bx-authform-formgroup-container">
          <div class="bx-authform-label-container">Пароль</div>
          <div class="bx-authform-input-container">
            <input
              type="password"
              name="USER_PASSWORD"
              maxlength="255"
              autocomplete="off"
              v-model="password"
            />
          </div>
        </div>

        <div class="bx-authform-formgroup-container">
          <div class="checkbox">
            <label class="bx-filter-param-label">
              <input
                type="checkbox"
                id="USER_REMEMBER"
                name="USER_REMEMBER"
                value="Y"
              />
              <span class="bx-filter-param-text"
                >Запомнить меня на этом компьютере</span
              >
            </label>
          </div>
        </div>

        <div class="bx-authform-formgroup-container">
          <input
            type="submit"
            style="background: linear-gradient(90deg, #b995fe 0%, #8444fc 100%)"
            class="gradient-btn"
            name="AUTH_ACTION"
            value="Войти"
            @click.prevent="foo"
          />
        </div>
      </form>
      
    </div>
    <Preloader v-else-if="isAuth == 2" />
    <div v-else>
      <div><b>Вы авторизованы под пользователем ID: </b><span>{{userID}}</span></div>
      <div><b>Полученный токен с сервера: </b><span>{{token}}</span></div>
      <div><b>Секретный ключ (подпись): </b><span>{{sign}}</span></div>
      <div><b style="color: red">Входящая ошибка: </b><span>{{errorMsg}}</span></div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';

import Preloader from '@/components/Preloader.vue';

import axios from "axios";

export default {
  components: {
    Preloader
  },
  setup(){
    const isAuth = ref(1);

    const login = ref('');
    const password = ref('');

    const userID = ref('');
    const token = ref('');
    const sign = ref('');

    const errorMsg = ref('');

    //Функция запроса данных
    async function fetching (username,pass) {
            console.log('fetching-username', username.value);
            console.log('fetching-pass', pass.value);
            
            const params = new URLSearchParams();
            params.append('login',username.value);
            params.append('password',pass.value);

        try {
            await axios.post('http://10.68.5.243/api/1.0/auth',params, {timeout: 3000})
                .then((response) => {

                   // news.value = response.data[0];
                   console.log('response-data',response.data)

                  token.value = response.data.response.token;
                  errorMsg.value = 'Без ошибок';
                });

        } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              if(error.response.status == 401){
                console.log('401 Err MSG', error.message);
                errorMsg.value = error.message
              }

            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);

            alert('Ошибка получения данных');

        } finally {

            isAuth.value = 3;
        }
    }

    async function foo(){
      console.log(123);
      console.log('login',login.value);
      console.log('password',password.value);
      
      userID.value = 1;
      token.value = 'ASasjdu2klj1';
      sign.value = 'key45456';

      isAuth.value = 2;

      await fetching(login,password);

      /*setTimeout(function(){
          isAuth.value = 3;
      },3000);*/
    }

    return{
      isAuth,
      login,
      password,
      userID,
      token,
      sign,
      errorMsg,
      foo
    }

  }
};
</script>

<style scoped>
.auth-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 70%);
}

.bx-authform-content-container, .bx-authform-label-container {
    font-size: 13px;
    color: #5a6c77;
    padding-bottom: 2px;
}

.bx-authform-input-container input[type="text"], .bx-authform-input-container input[type="password"] {
    display: block;
    width: 100%;
    font-size: 18px;
    height: 38px;
    margin: 0;
    padding: 0 4px;
    border: 1px solid #ccd5db;
    border-radius: 2px;
    background: #f8fafc;
    outline: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.bx-authform-formgroup-container {
    margin-bottom: 25px;
}

.bx-authform-input-container {
    position: relative;
}

.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    left: auto;
    transform: translateX(+30%);
}
</style>