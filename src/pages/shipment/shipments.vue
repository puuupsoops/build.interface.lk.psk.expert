<template>
<div>
        
    <div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
	</div>
	<top-nav></top-nav>

	<div class="orders-heading">
			<div class="orders-heading-elem">
			<div class="orders-heading-item">
				<div class="orders-heading-text">Контрагент:</div>
				<SelectInput 
					:data="companyBarTopData"
					v-model="activeCompanyUid"
				/>
			</div>
			<div class="orders-heading-item">
				<div class="orders-heading-text">Договор:</div>
				<SelectInput 
					:data="dogovor"
				/>
			</div>
			<div class="orders-heading-item" data-select2-id="147">
				<div class="orders-heading-text">Период:</div>
					<SelectInput 
						:data="period"
					/>

			</div>
			<div class="orders-heading-clean"></div>
			</div>
			<div class="orders-heading-elem">
			<div class="content-heading-btn">
              <svg class="content-heading-btn-img" width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill" d="M10.8337 20.6667H7.50033C7.04033 20.6667 6.66699 20.2933 6.66699 19.8333C6.66699 19.3733 7.04033 19 7.50033 19H10.8337C11.2937 19 11.667 19.3733 11.667 19.8333C11.667 20.2933 11.2937 20.6667 10.8337 20.6667Z" fill="#A5A7A9"></path>
                <path class="fill" d="M37.9176 20.6665H35.8342C35.3742 20.6665 35.0009 20.2932 35.0009 19.8332C35.0009 19.3732 35.3742 18.9998 35.8342 18.9998H37.2259L38.3492 13.0132C38.3342 9.94984 35.7176 7.33317 32.5009 7.33317H27.0292L24.3776 18.9998H29.1676C29.6276 18.9998 30.0009 19.3732 30.0009 19.8332C30.0009 20.2932 29.6276 20.6665 29.1676 20.6665H23.3342C23.0809 20.6665 22.8409 20.5515 22.6826 20.3532C22.5242 20.1565 22.4642 19.8965 22.5209 19.6498L25.5509 6.3165C25.6376 5.93484 25.9742 5.6665 26.3642 5.6665H32.5009C36.6359 5.6665 40.0009 9.0315 40.0009 13.1665L38.7359 19.9865C38.6626 20.3815 38.3192 20.6665 37.9176 20.6665Z" fill="#A5A7A9"></path>
                <path class="fill" d="M32.4997 23.9998C30.203 23.9998 28.333 22.1315 28.333 19.8332C28.333 17.5348 30.203 15.6665 32.4997 15.6665C34.7963 15.6665 36.6663 17.5348 36.6663 19.8332C36.6663 22.1315 34.7963 23.9998 32.4997 23.9998ZM32.4997 17.3332C31.1213 17.3332 29.9997 18.4548 29.9997 19.8332C29.9997 21.2115 31.1213 22.3332 32.4997 22.3332C33.878 22.3332 34.9997 21.2115 34.9997 19.8332C34.9997 18.4548 33.878 17.3332 32.4997 17.3332Z" fill="#A5A7A9"></path>
                <path class="fill" d="M14.1667 23.9998C11.87 23.9998 10 22.1315 10 19.8332C10 17.5348 11.87 15.6665 14.1667 15.6665C16.4633 15.6665 18.3333 17.5348 18.3333 19.8332C18.3333 22.1315 16.4633 23.9998 14.1667 23.9998ZM14.1667 17.3332C12.7883 17.3332 11.6667 18.4548 11.6667 19.8332C11.6667 21.2115 12.7883 22.3332 14.1667 22.3332C15.545 22.3332 16.6667 21.2115 16.6667 19.8332C16.6667 18.4548 15.545 17.3332 14.1667 17.3332Z" fill="#A5A7A9"></path>
                <path class="fill" d="M10.833 5.66667H4.16634C3.70634 5.66667 3.33301 5.29334 3.33301 4.83334C3.33301 4.37333 3.70634 4 4.16634 4H10.833C11.293 4 11.6663 4.37333 11.6663 4.83334C11.6663 5.29334 11.293 5.66667 10.833 5.66667Z" fill="#A5A7A9"></path>
                <path class="fill" d="M10.8337 10.6667H2.50033C2.04033 10.6667 1.66699 10.2933 1.66699 9.83333C1.66699 9.37333 2.04033 9 2.50033 9H10.8337C11.2937 9 11.667 9.37333 11.667 9.83333C11.667 10.2933 11.2937 10.6667 10.8337 10.6667Z" fill="#A5A7A9"></path>
                <path class="fill" d="M10.8333 15.6667H0.833333C0.373333 15.6667 0 15.2933 0 14.8333C0 14.3733 0.373333 14 0.833333 14H10.8333C11.2933 14 11.6667 14.3733 11.6667 14.8333C11.6667 15.2933 11.2933 15.6667 10.8333 15.6667Z" fill="#A5A7A9"></path>
                <path class="fill" d="M23.3337 20.6665H17.5003C17.0403 20.6665 16.667 20.2932 16.667 19.8332C16.667 19.3732 17.0403 18.9998 17.5003 18.9998H22.6687L26.4553 2.33317H7.50033C7.04033 2.33317 6.66699 1.95984 6.66699 1.49984C6.66699 1.03984 7.04033 0.666504 7.50033 0.666504H27.5003C27.7537 0.666504 27.9937 0.781504 28.152 0.979838C28.3103 1.1765 28.3703 1.4365 28.3137 1.68317L24.147 20.0165C24.0603 20.3982 23.722 20.6665 23.3337 20.6665Z" fill="#A5A7A9"></path>
              </svg>
              <div class="content-heading-btn-text">Создать заявку</div>
            </div>
		</div>
	</div>
    <div class="orders-heading-search">
		<div class="orders-heading-search-elem" >
			<div class="product-search-text">Поиск по: </div>
			<div class="orders-heading-search-select-wrap">
				<div class="orders-heading-search-select-elem">
					<SelectInput 
					:data="dogovor"
				/>
				</div>
				<div class="orders-heading-search-select-elem" >
					<SelectInput 
						:data="dogovor"
					/>
				</div>
			</div>
			<div class="product-search-clear"></div>
		</div>
		<div class="orders-heading-search-elem">
			<div class="orders-heading-search-btn gradient-btn">
				<div class="gradient-btn-text">Поиск</div>
			</div>
		</div>
	</div>


        <div class="orders-list-wrap content-elem">
          <div class="table orders-list-table scroll-elem">
            <div class="table-more-info-arrow"></div>
            <div class="orders-list-table-wrap">
              <div class="table-row table-heading">
                <div class="table-elem">№</div>
                <div class="table-elem"> 
                  <div class="table-elem-toggle">
                     Наименование
                    <svg class="table-elem-toggle-arrow" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z" fill="#A5A7A9"></path>
                    </svg>
                  </div>
                  <div class="table-heading-dropdown" wfd-invisible="true">
                    <div class="table-heading-dropdown-wrap"><a class="table-heading-dropdown-link" href="">ООО Столица</a><a class="table-heading-dropdown-link" href="">ООО Вектор</a><a class="table-heading-dropdown-link" href="">ООО Тристан</a><a class="table-heading-dropdown-link" href="">ООО Лама</a><a class="table-heading-dropdown-link" href="">ООО Лавочкин</a></div>
                  </div>
                </div>
                <div class="table-elem"> 
                  <div class="table-elem-toggle">
                     Контрагент
                    <svg class="table-elem-toggle-arrow" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z" fill="#A5A7A9"></path>
                    </svg>
                  </div>
                  <div class="table-heading-dropdown" wfd-invisible="true">
                    <div class="table-heading-dropdown-wrap"><a class="table-heading-dropdown-link" href="">ООО Столица</a><a class="table-heading-dropdown-link" href="">ООО Вектор</a><a class="table-heading-dropdown-link" href="">ООО Тристан</a><a class="table-heading-dropdown-link" href="">ООО Лама</a><a class="table-heading-dropdown-link" href="">ООО Лавочкин</a></div>
                  </div>
                </div>
                <div class="table-elem">Желаемая дата </div>
                <div class="table-elem">Номер</div>
                <div class="table-elem">Дата отгрузки</div>
                <div class="table-elem">Статус</div>
                <div class="table-elem">Инфо</div>
              </div>
              <div class="orders-list-item active">
                <div class="table-row orders-list-title">
                  <div class="table-elem">
                     1
                    <div class="table-arrow"></div>
                  </div>
                  <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
                  <div class="table-elem">ООО “Вектор”</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">1232</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">Рассмотрение</div>
                  <div class="table-elem"> 
                    <button class="orders-list-more">Подробно</button>
                    <div class="orders-list-more-dropdown" wfd-invisible="true"><a class="orders-list-more-dropdown-link" href="">Повторить</a><a class="orders-list-more-dropdown-link" href="">Детали заказа</a><a class="orders-list-more-dropdown-link" href="">Скачать документы</a><a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a><a class="orders-list-more-dropdown-link" href="">Печать документов</a><a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a></div>
                  </div>
                </div>
                <div class="orders-list-info" style="display: block;">
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ЭС</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ФРО</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                </div>
              </div>
              <div class="orders-list-item">
                <div class="table-row orders-list-title">
                  <div class="table-elem">
                     2
                    <div class="table-arrow"></div>
                  </div>
                  <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
                  <div class="table-elem">ООО “Вектор”</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">1232</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">Ответ получен</div>
                  <div class="table-elem"> 
                    <button class="orders-list-more">Подробно</button>
                    <div class="orders-list-more-dropdown" wfd-invisible="true"><a class="orders-list-more-dropdown-link" href="">Повторить</a><a class="orders-list-more-dropdown-link" href="">Детали заказа</a><a class="orders-list-more-dropdown-link" href="">Скачать документы</a><a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a><a class="orders-list-more-dropdown-link" href="">Печать документов</a><a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a></div>
                  </div>
                </div>
                <div class="orders-list-info" wfd-invisible="true">
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ЭС</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                </div>
              </div>
              <div class="orders-list-item">
                <div class="table-row orders-list-title">
                  <div class="table-elem">
                     3
                    <div class="table-arrow"></div>
                  </div>
                  <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
                  <div class="table-elem">ООО “Вектор”</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">1232</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">Закрыт</div>
                  <div class="table-elem"> 
                    <button class="orders-list-more">Подробно</button>
                    <div class="orders-list-more-dropdown" wfd-invisible="true"><a class="orders-list-more-dropdown-link" href="">Повторить</a><a class="orders-list-more-dropdown-link" href="">Детали заказа</a><a class="orders-list-more-dropdown-link" href="">Скачать документы</a><a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a><a class="orders-list-more-dropdown-link" href="">Печать документов</a><a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a></div>
                  </div>
                </div>
                <div class="orders-list-info" wfd-invisible="true">
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ЭС</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                </div>
              </div>
              <div class="orders-list-item">
                <div class="table-row orders-list-title">
                  <div class="table-elem">
                     4
                    <div class="table-arrow"></div>
                  </div>
                  <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
                  <div class="table-elem">ООО “Вектор”</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">1232</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">Подтверждён</div>
                  <div class="table-elem"> 
                    <button class="orders-list-more">Подробно</button>
                    <div class="orders-list-more-dropdown" wfd-invisible="true"><a class="orders-list-more-dropdown-link" href="">Повторить</a><a class="orders-list-more-dropdown-link" href="">Детали заказа</a><a class="orders-list-more-dropdown-link" href="">Скачать документы</a><a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a><a class="orders-list-more-dropdown-link" href="">Печать документов</a><a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a></div>
                  </div>
                </div>
                <div class="orders-list-info" wfd-invisible="true">
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ЭС</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                </div>
              </div>
              <div class="orders-list-item">
                <div class="table-row orders-list-title">
                  <div class="table-elem">
                     5
                    <div class="table-arrow"></div>
                  </div>
                  <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
                  <div class="table-elem">ООО “Вектор”</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">1232</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem error">На рассмотрении</div>
                  <div class="table-elem"> 
                    <button class="orders-list-more">Подробно</button>
                    <div class="orders-list-more-dropdown" wfd-invisible="true"><a class="orders-list-more-dropdown-link" href="">Повторить</a><a class="orders-list-more-dropdown-link" href="">Детали заказа</a><a class="orders-list-more-dropdown-link" href="">Скачать документы</a><a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a><a class="orders-list-more-dropdown-link" href="">Печать документов</a><a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a></div>
                  </div>
                </div>
                <div class="orders-list-info" wfd-invisible="true">
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ЭС</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                </div>
              </div>
              <div class="orders-list-item">
                <div class="table-row orders-list-title">
                  <div class="table-elem">
                     6
                    <div class="table-arrow"></div>
                  </div>
                  <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
                  <div class="table-elem">ООО “Вектор”</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">1232</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">Подтверждён</div>
                  <div class="table-elem"> 
                    <button class="orders-list-more">Подробно</button>
                    <div class="orders-list-more-dropdown" wfd-invisible="true"><a class="orders-list-more-dropdown-link" href="">Повторить</a><a class="orders-list-more-dropdown-link" href="">Детали заказа</a><a class="orders-list-more-dropdown-link" href="">Скачать документы</a><a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a><a class="orders-list-more-dropdown-link" href="">Печать документов</a><a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a></div>
                  </div>
                </div>
                <div class="orders-list-info" wfd-invisible="true">
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ЭС</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                </div>
              </div>
              <div class="orders-list-item">
                <div class="table-row orders-list-title">
                  <div class="table-elem">
                     7
                    <div class="table-arrow"></div>
                  </div>
                  <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
                  <div class="table-elem">ООО “Вектор”</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">1232</div>
                  <div class="table-elem">02.02.20</div>
                  <div class="table-elem">В ожидании</div>
                  <div class="table-elem"> 
                    <button class="orders-list-more">Подробно</button>
                    <div class="orders-list-more-dropdown" wfd-invisible="true"><a class="orders-list-more-dropdown-link" href="">Повторить</a><a class="orders-list-more-dropdown-link" href="">Детали заказа</a><a class="orders-list-more-dropdown-link" href="">Скачать документы</a><a class="orders-list-more-dropdown-link" href="">Скачать сертификаты</a><a class="orders-list-more-dropdown-link" href="">Печать документов</a><a class="orders-list-more-dropdown-link" href="">Печать сертификатов</a></div>
                  </div>
                </div>
                <div class="orders-list-info" wfd-invisible="true">
                  <div class="orders-list-info-row">
                    <div class="orders-list-info-elem">ЭС</div>
                    <div class="orders-list-info-elem"> 
                      <div class="orders-list-info-about">Счёт № 12 от 02.02.2020</div>
                      <div class="orders-list-info-about">Реализация № 243 от 10.02.2020 + корректировка № 201 от 11.02.2020</div>
                      <div class="orders-list-info-about">Счёт Фактура № 243 от 10.02.2020</div>
                    </div>
                    <div class="orders-list-info-elem orders-list-info-doc-wrap"><a class="orders-list-info-doc sc" href=""></a><a class="orders-list-info-doc upd" href=""></a><a class="orders-list-info-doc sf" href=""></a><a class="orders-list-info-doc kor" href=""></a></div>
                    <div class="orders-list-info-elem"><a class="orders-list-info-link" href="">Сертификаты</a><a class="orders-list-info-link" href="">Скачать все</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 </div>
</template>



<script>
import PersonalBar from '@/components/cards/PersonalBar'
import Notification from '@/components/cards/Notification'
import CompanyBarTop from '@/components/cards/Company/CompanyBarTop'
import TopNav from '@/components/nav/TopNav'
import SelectInput from '@/components/ui/SelectInput';

import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'

export default {
	components:{
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		SelectInput,
	},
	setup(){
		const store = useStore();
		const activeCompanyUid = ref('');
		const dogovor = ref([
			{id: 1, name:'По умолчанию № 1'},
			{id: 2, name:'По умолчанию № 2'},
			{id: 3, name:'По умолчанию № 3'},
			{id: 4, name:'По умолчанию № 4'},
		]);

		const period = computed(() => {
			let res = [];
			let d = new Date();

			for (var i = 0; i < 15; i++){
				let s = new Date(d.getFullYear(), d.getMonth()-i, 1).toLocaleString().substr(0,10) +' - ';
				s = s + (new Date(d.getFullYear(), d.getMonth()-i+1, 0)).toLocaleString().substr(0,10);
				res.push({id: i+1, name: s})
			}
			return res;
		});

	
		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch('GET_PARTNER')
					.then(() =>{
						activeCompanyUid.value = store.getters.getCompanys === [] ? '' : store.getters.getCompanys[0].uid;
					})
			}
			
		});

		return{
			companyBarTopData: computed(() => store.getters.getCompanysList),
			activeCompanyUid,
			dogovor,
			period,
		}
	}
}
</script>