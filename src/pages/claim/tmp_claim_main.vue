<template>
  <div>
    <div class="top-line product-page">
      <CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid" />
      <Notification />
      <PersonalBar />
    </div>
    <top-nav></top-nav>

    <div class="orders-heading">
      <div class="orders-heading-elem">
        <div class="orders-heading-item">
          <div class="orders-heading-text">Контрагент:</div>
          <select class="custom-select" style="width: 100%">
            <option value="0" selected>ООО “Вектор”</option>
            <option value="1">ООО “Вектор”</option>
            <option value="2">ООО “Вектор”</option>
            <option value="3">ООО “Вектор”</option>
          </select>
        </div>
        <div class="orders-heading-item">
          <div class="orders-heading-text">Договор:</div>
          <select class="custom-select" style="width: 100%">
            <option value="0" selected>По умолчанию</option>
            <option value="1">По умолчанию № 1</option>
            <option value="2">По умолчанию № 2</option>
            <option value="3">По умолчанию № 3</option>
          </select>
        </div>
        <div class="orders-heading-item">
          <div class="orders-heading-text">Период:</div>
          <select class="custom-select" style="width: 100%">
            <option value="0" selected>01.01.2020 - 31.01.2020</option>
            <option value="1">01.01.2020 - 31.01.2020</option>
            <option value="2">01.01.2020 - 31.01.2020</option>
            <option value="3">01.01.2020 - 31.01.2020</option>
          </select>
        </div>
        <div class="orders-heading-clean"></div>
      </div>

      <div class="orders-heading-elem">
        <div class="content-heading-btn">
          <svg
            class="content-heading-btn-img"
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="fill"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 2H18.75C19.3023 2 19.75 2.44772 19.75 3V11.5H21.75V3C21.75 1.34315 20.4069 0 18.75 0H3C1.34315 0 0 1.34315 0 3V21.8571C0 23.514 1.34315 24.8571 3 24.8571H16V22.8571H3C2.44772 22.8571 2 22.4094 2 21.8571V3C2 2.44772 2.44772 2 3 2Z"
              fill="#A5A7A9"
            ></path>
            <rect
              class="fill"
              x="17.6071"
              y="5.17871"
              width="1.7"
              height="13.4643"
              rx="0.85"
              transform="rotate(90 17.6071 5.17871)"
              fill="#A5A7A9"
            ></rect>
            <rect
              class="fill"
              x="10"
              y="13"
              width="1.7"
              height="6"
              rx="0.85"
              transform="rotate(90 10 13)"
              fill="#A5A7A9"
            ></rect>
            <rect
              class="fill"
              x="14"
              y="9"
              width="1.7"
              height="10"
              rx="0.85"
              transform="rotate(90 14 9)"
              fill="#A5A7A9"
            ></rect>
            <path
              class="fill"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.8 15C20.2478 15 19.8 15.4477 19.8 16V19H16.8C16.2478 19 15.8 19.4477 15.8 20C15.8 20.5523 16.2478 21 16.8 21H19.8V24C19.8 24.5523 20.2478 25 20.8 25C21.3523 25 21.8 24.5523 21.8 24V21H24.8C25.3523 21 25.8 20.5523 25.8 20C25.8 19.4477 25.3523 19 24.8 19H21.8V16C21.8 15.4477 21.3523 15 20.8 15Z"
              fill="#A5A7A9"
            ></path>
          </svg>
          <div class="content-heading-btn-text">Создать претензию</div>
        </div>
      </div>
    </div>

    <div class="orders-heading-search">
      <div class="orders-heading-search-elem">
        <div class="product-search-text">Поиск по:</div>
        <div class="orders-heading-search-select-wrap">
          <div class="orders-heading-search-select-elem">
            <select class="custom-select" style="width: 100%">
              <option value="0" selected>Статус</option>
              <option value="1">Статус №2</option>
              <option value="2">Статус №3</option>
              <option value="3">Статус №4</option>
            </select>
          </div>
          <div class="orders-heading-search-select-elem">
            <select class="custom-select" style="width: 100%">
              <option value="0" selected>Статус</option>
              <option value="1">Статус №2</option>
              <option value="2">Статус №3</option>
              <option value="3">Статус №4</option>
            </select>
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
                <svg
                  class="table-elem-toggle-arrow"
                  width="13"
                  height="9"
                  viewBox="0 0 13 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z"
                    fill="#A5A7A9"
                  ></path>
                </svg>
              </div>
              <div class="table-heading-dropdown">
                <div class="table-heading-dropdown-wrap">
                  <a class="table-heading-dropdown-link" href="">ООО Столица</a
                  ><a class="table-heading-dropdown-link" href="">ООО Вектор</a
                  ><a class="table-heading-dropdown-link" href="">ООО Тристан</a
                  ><a class="table-heading-dropdown-link" href="">ООО Лама</a
                  ><a class="table-heading-dropdown-link" href=""
                    >ООО Лавочкин</a
                  >
                </div>
              </div>
            </div>
            <div class="table-elem">
              <div class="table-elem-toggle">
                Контрагент
                <svg
                  class="table-elem-toggle-arrow"
                  width="13"
                  height="9"
                  viewBox="0 0 13 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z"
                    fill="#A5A7A9"
                  ></path>
                </svg>
              </div>
              <div class="table-heading-dropdown">
                <div class="table-heading-dropdown-wrap">
                  <a class="table-heading-dropdown-link" href="">ООО Столица</a
                  ><a class="table-heading-dropdown-link" href="">ООО Вектор</a
                  ><a class="table-heading-dropdown-link" href="">ООО Тристан</a
                  ><a class="table-heading-dropdown-link" href="">ООО Лама</a
                  ><a class="table-heading-dropdown-link" href=""
                    >ООО Лавочкин</a
                  >
                </div>
              </div>
            </div>
            <div class="table-elem">Номер</div>
            <div class="table-elem">Дата создания</div>
            <div class="table-elem">Статус</div>
            <div class="table-elem">Инфо</div>
          </div>
          <div class="orders-list-item">
            <div class="table-row orders-list-title">
              <div class="table-elem">
                1
                <div class="table-arrow"></div>
              </div>
              <div class="table-elem">Заказ № 1232 от 02.02.2020</div>
              <div class="table-elem">ООО “Вектор”</div>
              <div class="table-elem">1232</div>
              <div class="table-elem">02.02.20</div>
              <div class="table-elem">Подтверждён</div>
              <div class="table-elem">
                <button class="orders-list-more">Подробно</button>
                <div class="orders-list-more-dropdown">
                  <a class="orders-list-more-dropdown-link" href="">Повторить</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Детали заказа</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать документы</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать сертификаты</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать документов</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать сертификатов</a
                  >
                </div>
              </div>
            </div>
            <div class="orders-list-info">
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ЭС</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a
                  ><a class="orders-list-info-doc kor" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
              </div>
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ФРО</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
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
              <div class="table-elem">1232</div>
              <div class="table-elem">02.02.20</div>
              <div class="table-elem">Подтверждён</div>
              <div class="table-elem">
                <button class="orders-list-more">Подробно</button>
                <div class="orders-list-more-dropdown">
                  <a class="orders-list-more-dropdown-link" href="">Повторить</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Детали заказа</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать документы</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать сертификаты</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать документов</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать сертификатов</a
                  >
                </div>
              </div>
            </div>
            <div class="orders-list-info">
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ЭС</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a
                  ><a class="orders-list-info-doc kor" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
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
              <div class="table-elem">1232</div>
              <div class="table-elem">02.02.20</div>
              <div class="table-elem">Подтверждён</div>
              <div class="table-elem">
                <button class="orders-list-more">Подробно</button>
                <div class="orders-list-more-dropdown">
                  <a class="orders-list-more-dropdown-link" href="">Повторить</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Детали заказа</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать документы</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать сертификаты</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать документов</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать сертификатов</a
                  >
                </div>
              </div>
            </div>
            <div class="orders-list-info">
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ЭС</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a
                  ><a class="orders-list-info-doc kor" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
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
              <div class="table-elem">1232</div>
              <div class="table-elem">02.02.20</div>
              <div class="table-elem">Подтверждён</div>
              <div class="table-elem">
                <button class="orders-list-more">Подробно</button>
                <div class="orders-list-more-dropdown">
                  <a class="orders-list-more-dropdown-link" href="">Повторить</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Детали заказа</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать документы</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать сертификаты</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать документов</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать сертификатов</a
                  >
                </div>
              </div>
            </div>
            <div class="orders-list-info">
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ЭС</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a
                  ><a class="orders-list-info-doc kor" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
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
              <div class="table-elem">1232</div>
              <div class="table-elem">02.02.20</div>
              <div class="table-elem">Подтверждён</div>
              <div class="table-elem">
                <button class="orders-list-more">Подробно</button>
                <div class="orders-list-more-dropdown">
                  <a class="orders-list-more-dropdown-link" href="">Повторить</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Детали заказа</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать документы</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать сертификаты</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать документов</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать сертификатов</a
                  >
                </div>
              </div>
            </div>
            <div class="orders-list-info">
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ЭС</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a
                  ><a class="orders-list-info-doc kor" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
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
              <div class="table-elem">1232</div>
              <div class="table-elem">02.02.20</div>
              <div class="table-elem">Подтверждён</div>
              <div class="table-elem">
                <button class="orders-list-more">Подробно</button>
                <div class="orders-list-more-dropdown">
                  <a class="orders-list-more-dropdown-link" href="">Повторить</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Детали заказа</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать документы</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать сертификаты</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать документов</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать сертификатов</a
                  >
                </div>
              </div>
            </div>
            <div class="orders-list-info">
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ЭС</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a
                  ><a class="orders-list-info-doc kor" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
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
              <div class="table-elem">1232</div>
              <div class="table-elem">02.02.20</div>
              <div class="table-elem">Подтверждён</div>
              <div class="table-elem">
                <button class="orders-list-more">Подробно</button>
                <div class="orders-list-more-dropdown">
                  <a class="orders-list-more-dropdown-link" href="">Повторить</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Детали заказа</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать документы</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Скачать сертификаты</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать документов</a
                  ><a class="orders-list-more-dropdown-link" href=""
                    >Печать сертификатов</a
                  >
                </div>
              </div>
            </div>
            <div class="orders-list-info">
              <div class="orders-list-info-row">
                <div class="orders-list-info-elem">ЭС</div>
                <div class="orders-list-info-elem">
                  <div class="orders-list-info-about">
                    Счёт № 12 от 02.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Реализация № 243 от 10.02.2020 + корректировка № 201 от
                    11.02.2020
                  </div>
                  <div class="orders-list-info-about">
                    Счёт Фактура № 243 от 10.02.2020
                  </div>
                </div>
                <div class="orders-list-info-elem orders-list-info-doc-wrap">
                  <a class="orders-list-info-doc sc" href=""></a
                  ><a class="orders-list-info-doc upd" href=""></a
                  ><a class="orders-list-info-doc sf" href=""></a
                  ><a class="orders-list-info-doc kor" href=""></a>
                </div>
                <div class="orders-list-info-elem">
                  <a class="orders-list-info-link" href="">Сертификаты</a
                  ><a class="orders-list-info-link" href="">Скачать все</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalBar from "@/components/cards/PersonalBar";
import Notification from "@/components/cards/Notification";
import CompanyBarTop from "@/components/cards/Company/CompanyBarTop";
import TopNav from "@/components/nav/TopNav";

export default {
  components: {
    PersonalBar,
    Notification,
    CompanyBarTop,
    TopNav,
  },
  setup() {},
};
</script>

<style>
</style>