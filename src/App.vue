<template>
  <aside class="sidebar">
    <SideMenu />
  </aside>

  <div class="sidebar-menu" style="display: none;">
    <SideCatalogMenu v-if="this.$route.path === '/catalog'" />
    <SideNavigation  v-else />
  </div>

  <div class="content">

        <nav class="nav">
          <ul class="nav-list">
            <li><router-link tag="a" to="/" class="nav-link">Главнаяя (тест)</router-link></li>
            <li><router-link tag="a" to="/catalog" class="nav-link">Каталог (тест)</router-link></li>
            <li><router-link tag="a" to="/company" class="nav-link">Страница компании (тест)</router-link></li>
          </ul>
        </nav>

    <router-view></router-view>
  </div>

</template>

<script>
//import { ref, computed } from 'vue';
import { ref } from 'vue';
import SideMenu from './components/SideMenu.vue';
import SideNavigation from './components/nav/SideNavigation.vue';
import SideCatalogMenu from './components/nav/SideCatalogMenu.vue';

//import Main from './pages/main.vue'
//import Catalog from './pages/catalog.vue';

//Composition API = On
export default {
  name: 'App',
  components: {
    SideMenu,
    SideNavigation,
    SideCatalogMenu,
    //Main,
    //Catalog
      //тут регистрируем компоненты
  },
  beforeMount(){
    this.preLoad();
  },
  mounted(){
    console.log('Модуль роутера', this.$router)
    console.log('Текущий маршрут',this.$route)
  },
  // setup( props, context ) {...} - может принимать параметры,
  // setup( _, { emit } ) {...} - не используем props, деструктуризируем объект context и выбираем нужные значения 
  setup() {
    //используем Composition API, можно не использовать this в этой области
    
    //announcement
    const ad = {
      title : "Информация по маркеровки обуви",
      src   : "#",
      date  : "04.03.2020",
      text  : `Уважаемые партнеры! Сообщаем вам что согласно Постановлению Правительства Российской Федерации № 216 от 29.02.2020 
      дата запрета оборота немаркированной обуви перенесена на 1 июля 2020 года.`,
      img   : "upload/img/logo.png" 
    };

    const titleText = "Строка заголовок приложения";

    //ref - добавляет реактивности к переменной + используется оболчка на основе объекта Proxy
    // ! обращение к реактивным элементам через:-=|  переменная.value  |=-, пример: arFruits.value 
    const arFruits =  ref( [ 'Яблоко' , 'Апельсин' , 'Банан'] );

    //тестовая функция 1
    function foo() {
      console.log('foo');
    }

    //Псевдо-переменная для индикации загрузки
    const isLoad = ref(false);

    //Псевдо-функция загрузки
    function preLoad(){
      setTimeout(function(){
          console.log(isLoad);
          isLoad.value = true;
      },3000);
    }

    return {
      //возвращаем данные
      ad,
      titleText,
      arFruits,
      isLoad,
      preLoad,
      foo
      
    }
  }
}
</script>

<style>
 
</style>
