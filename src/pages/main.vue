<template>
    <div class="top-line main-page">
        <div class="top-line-menu-btn"><span></span><span></span><span></span></div>
        <Notification />
        <PersonalBar />
    </div>

    <CompanyBar 
        :data = mainFeed
    />

    <div class="content-wrap content-main-wrap">
        
        <Showcase />

        <div class="content-wrap-elem">
            <a class="banner" href="">
                <div class="banner-img-box">
                    <img class="banner-img" src="style/img/product/product-4.png" alt="">
                </div>
                <div class="banner-btn">Подробнее</div>
            </a>
        </div>

    </div>
</template>

<script>
import Notification from '../components/cards/Notification.vue';
import PersonalBar  from '../components/cards/PersonalBar.vue';
import CompanyBar   from '../components/cards/CompanyBar.vue';
import Showcase     from '../components/cards/Showcase.vue'; 

export default {
    components: {
        Notification,
        PersonalBar,
        CompanyBar,
        Showcase
    },
    setup(){
            //Временный контент список контрагентов для main-Page 
    const mainFeed = [
      {
        id: 1,
        name: 'ООО Столица',
        agents: [
          {  
            name: 'ЭС',
            debt: '-',
            balance: '0',
            discount: 35,
          },
          {
            name: 'ФРО',
            debt: '-',
            balance: '0',
            discount: 35,
          }
        ]
      },
      {
        id: 2,
        name: 'ООО Вектор',
        agents: [
          {
            name: 'ЭС',
            debt: '-',
            balance: '0',
            discount: 35,
          },
          {
            name: 'ФРО',
            debt: '-',
            balance: '0',
            discount: 35,
          }
        ]
      },
      {
        id: 3,
        name: 'ООО Тристан',
        agents: [
          {
            name: 'ЭС',
            debt: '-',
            balance: '0',
            discount: 35,
          },
          {
            name: 'ФРО',
            debt: '-',
            balance: '0',
            discount: 35,
          }
        ]
      },
      {
        id: 4,
        name: 'ООО Лама',
        agents: [
          {
            name: 'ЭС',
            debt: '-',
            balance: '0',
            discount: 35,
          },
          {
            name: 'ФРО',
            debt: '-',
            balance: '0',
            discount: 35,
          }
        ]
      },
      {
        id: 5,
        name: 'ИП Лама',
        agents: [
          {
            name: 'ЭС',
            debt: '-',
            balance: '0',
            discount: 35,
          },
          {
            name: 'ФРО',
            debt: '-',
            balance: '0',
            discount: 35,
          }
        ]
      }
    ]

        return {
            mainFeed
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>