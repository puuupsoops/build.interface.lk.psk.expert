<template>
<div>

          <div class="shipment-form-heading shipment-form-wrap">
            <div class="shipment-form-elem">
              <div class="shipment-form-item"> 
                <div class="shipment-form-elem-title"><span>Адрес Самовывоза</span><span class="shipment-form-elem-title-time">с 9.00 до 20.00 (пн-сб), вс- вых.</span></div>
                <div class="shipment-form-row">
                  <div class="shipment-form-input-wrap shipment-datalist" id="shipment-datalist">
                    <input class="shipment-form-input shipment-datalist-input" type="text" value="Россия г. Москва ул. Ангарская вл. 8, стр. 15 д." id="shipment-datalist-input">
                    <ul class="shipment-datalist-list active" id="shipment-datalist-list" wfd-invisible="true"><li id="1">Россия г. Москва ул. Ангарская вл. 8, стр. 15 д.</li><li id="2">Россия г. Москва ул. Ангарская вл. 9, стр. 15 д.</li><li id="3">Россия г. Москва ул. Ангарская вл. 10, стр. 15 д.</li><li id="4">Россия г. Москва ул. Ангарская вл. 11, стр. 15 д.</li></ul>
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
                    <input class="shipment-form-input shipment-form-date-input hasDatepicker" type="text" placeholder="Выберите дату" name="date" autocomplete="off" id="dp1638342360285">
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
                <textarea class="shipment-form-textarea" name=""></textarea>
              </div>
              <div class="shipment-form-item">
                <div class="shipment-form-elem-title"><span>Данные</span></div>
                <div class="shipment-form-info">
                  <div class="shipment-form-info-input-wrap"><span>ФИО</span>
                    <input class="shipment-form-info-input" type="text">
                  </div>
                  <div class="shipment-form-wrap">
                    <div class="shipment-form-elem">
                      <div class="shipment-form-info-input-wrap"><span>Документ</span>
                        <input class="shipment-form-info-input" type="text">
                      </div>
                    </div>
                    <div class="shipment-form-elem">
                      <div class="shipment-form-info-input-wrap"><span>Серия</span>
                        <input class="shipment-form-info-input" type="text"><span>№</span>
                        <input class="shipment-form-info-input" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="shipment-form-wrap">
                    <div class="shipment-form-elem">
                      <div class="shipment-form-info-input-wrap"><span>Дата выдачи</span>
                        <input class="shipment-form-info-input" type="text">
                      </div>
                    </div>
                    <div class="shipment-form-elem">
                      <div class="shipment-form-info-input-wrap"><span>Кем выдан</span>
                        <input class="shipment-form-info-input" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="shipment-form-wrap">
                    <div class="shipment-form-elem">
                      <div class="shipment-form-info-input-wrap"><span>Марка</span>
                        <input class="shipment-form-info-input" type="text">
                      </div>
                    </div>
                    <div class="shipment-form-elem">
                      <div class="shipment-form-info-input-wrap"><span>Гос. номер</span>
                        <input class="shipment-form-info-input" type="text">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shipment-form-doc shipment-form-wrap">
                <div class="shipment-form-doc-wrap">
                  <label class="shipment-form-doc-label" for="shipment_file">прикрепить доверенность</label>
                  <input class="shipment-form-doc-input" type="file" id="shipment_file" wfd-invisible="true">
                  <div class="shipment-form-doc-file" wfd-invisible="true">
                    <div class="shipment-form-doc-file-name"> </div>
                    <div class="shipment-form-doc-file-delete"></div>
                  </div>
                </div><a class="shipment-form-doc-btn" href=""><img src="style/img/icon/doc-file.svg" alt=""></a>
              </div>
            </div>
            <div class="shipment-form-elem">
              <div class="shipment-form-item">
                <div class="shipment-form-elem-title"><span>Представление</span></div>
                <div class="shipment-form-info shipment-form-info-text">
                  <p>Заказ №2435 от 03.04.2020</p>
                  <p>Желаемая дата отгрузки: 05.04.2020</p>
                  <p>Расстояние: 1124 км</p>
                  <p>Количество едениц: 120</p>
                  <p>Общий вес: 25 кг</p>
                  <p>Общий объем: 23 м3 </p>
                  <p>Адрес самовывоза: Россия г. Москва ул. Ангарская вл. 8, стр. 15 д.</p>
                  <p>Комментрий: Нет</p>
                  <p>Данные: Иванов Иван Иванович</p>
                  <p>Документ: Паспорт Рф Серия 745 №256548</p>
                  <p>Выдан 03.09.2015 ГУ МВД По гор. Москве</p>
                  <p>Машина: Ивеко И500, М564АК77</p>
                  <p>Довереность: есть</p>
                  <p>Схема проезда: есть</p>
                </div>
                <div class="shipment-form-notion">
                   Подтверждение заявки- запроса не несет за собой обязательство исполнения, 
                  ожидайте ответ по стоимости, после чего вы сможете подтвердить доставку 
                  и стоимость!
                </div>
              </div>
            </div>
          </div>
          <div class="shipment-form-submit gradient-btn">
            <div class="gradient-btn-text">Подтвердить</div>
          </div>
</div>
</template>


<script>

</script>