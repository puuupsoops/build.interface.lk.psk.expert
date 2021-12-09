<template>
    <div>
          <div class="shipment-form-heading shipment-form-wrap">
            <div class="shipment-form-elem">
              <div class="shipment-form-item"> 
                <div class="shipment-form-elem-title"><span>Адрес Доставки</span></div>
                <div class="shipment-form-row">
                  <div class="shipment-form-input-wrap">
                     <SelectInput 
                            :data="data.address"
                            v-model="address"
                        />
                        <a class="shipment-form-map-btn" href=""> 
                        <svg class="shipment-form-map-btn-img" width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.49968 25C8.95397 25 8.4653 24.717 8.19255 24.2429C8.18967 24.238 8.18688 24.2329 8.1841 24.2279L1.98479 12.8809C0.505001 10.1724 0.547432 6.95749 2.09831 4.28113C3.61555 1.66277 6.31047 0.0631103 9.30725 0.00197754C9.43527 -0.00065918 9.56398 -0.00065918 9.69191 0.00197754C12.6887 0.0631103 15.3837 1.66277 16.9009 4.28113C18.4518 6.95749 18.4943 10.1723 17.0145 12.8809L10.8152 24.2279C10.8124 24.2329 10.8096 24.238 10.8067 24.2429C10.534 24.717 10.0454 25 9.49968 25ZM9.49963 1.56252C9.44597 1.56252 9.39245 1.56306 9.33903 1.56414C6.89279 1.61404 4.69133 2.92258 3.45017 5.06453C2.17541 7.26448 2.14016 9.90642 3.35593 12.1317L9.49963 23.3768L15.6433 12.1318C16.8591 9.90642 16.8238 7.26448 15.549 5.06453C14.3078 2.92263 12.1064 1.61404 9.66013 1.56414C9.60685 1.56306 9.55329 1.56252 9.49963 1.56252Z" fill="#8D8D8D"></path>
                            <path d="M9.5 11.3281C7.56147 11.3281 5.98438 9.75103 5.98438 7.8125C5.98438 5.87397 7.56147 4.29688 9.5 4.29688C11.4385 4.29688 13.0156 5.87397 13.0156 7.8125C13.0156 9.75103 11.4386 11.3281 9.5 11.3281ZM9.5 5.85938C8.42305 5.85938 7.54688 6.73555 7.54688 7.8125C7.54688 8.88945 8.42305 9.76563 9.5 9.76563C10.577 9.76563 11.4531 8.88945 11.4531 7.8125C11.4531 6.73555 10.577 5.85938 9.5 5.85938Z" fill="#8D8D8D"></path>
                        </svg><span>На карте</span></a>
                  </div>
                  <div class="shipment-form-btn shipment-form-accept-btn">Подтвердить</div>
                </div>
              </div>
            </div>
            <div class="shipment-form-elem">
              <div class="shipment-form-item">
                <div class="shipment-form-elem-title"><span>Дата отгрузки</span></div>
                <div class="shipment-form-row">
                  <div class="shipment-form-date">
                    <input class="shipment-form-input shipment-form-date-input hasDatepicker" type="text" placeholder="Выберите дату" name="date" autocomplete="off" >
                    <datepicker 
                        class="ui-datepicker"
                        v-model="picked" 
                        :locale="ru"
                    />
                  </div>
                  <div class="shipment-form-btn shipment-form-urgently-btn">Срочно</div>
                </div>
              </div>
            </div>
          </div>
          <div class="shipment-form-body shipment-form-wrap">
            <div class="shipment-form-elem">
              <div class="shipment-form-item">
                <div class="shipment-form-elem-title"><span>Комментраий</span></div>
                <textarea class="shipment-form-textarea" name=""  v-model="data.comment"></textarea>
              </div>
            </div>
            <div class="shipment-form-elem">
              <div class="shipment-form-item">
                <div class="shipment-form-elem-title"><span>Представление</span></div>
                <div class="shipment-form-info shipment-form-info-text">
                  <p>Заказ №2435 от 03.04.2020</p>
                  <p>Желаемая дата отгрузки:  {{data.date }}</p>
                  <p>Расстояние: 1124 км</p>
                  <p>Количество едениц: 120</p>
                  <p>Общий вес: 25 кг</p>
                  <p>Общий объем: 23 м3 </p>
                  <p>Адрес доставки:  {{data.address.find(x => x.id==address).name }}</p>
                  <p>Комментрий: {{ data.comment.trim() == '' ? 'Нет' : data.comment}}</p>
                  <p>Дополнительные условия: Ополечивание</p>
                </div>
              </div>
            </div>
          </div>
          <div class="shipment-form-wrap shipment-form-bottom">
            <div class="shipment-form-elem">
              <div class="shipment-form-notion">
                 Подтверждение заявки- запроса не несет за собой обязательство исполнения, 
                ожидайте ответ по стоимости, после чего вы сможете подтвердить доставку 
                и стоимость!
              </div>
            </div>
            <div class="shipment-form-elem">
              <div class="shipment-form-submit gradient-btn">
                <div class="gradient-btn-text">Подтвердить</div>
              </div>
            </div>
          </div>
        </div>
</template>




<script>
import SelectInput from '@/components/ui/SelectInput';




import { ref }from 'vue';

export default {
    components: {
        SelectInput,
     
    },
    setup() {
		const data = ref({
            date: '14.12.2021',
            address: [
                {id: 1, name:'Россия г. Москва ул. Ангарская вл. 8, стр. 15 д.'},
                {id: 2, name:'Россия г. Москва ул. Ангарская вл. 9, д.'},
                {id: 3, name:'Россия г. Москва ул. Ангарская вл. 10, стр. 16 д.'},
                {id: 4, name:'Россия г. Москва ул. Ангарская вл. 23, стр. 45 д.'},
                {id: 5, name:'Россия г. Москва ул. Ангарская вл. 44, стр. 5 д.'},
                {id: 6, name:'Россия г. Москва ул. Ангарская вл. 67, стр. 145 д.'},
            ],
            comment: '',
            fio: '',
            doc: 'Паспорт',
            serial: '',
            num: '',
            when: '',
            who: '',
            car: '',
            gosnum: ''
        });
        
        const address = ref(1);
        const picked = ref(new Date())
        return {
            picked,
            data, 
            address
        }
    }
}
</script>