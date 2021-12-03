<template>
  <div>
    <div class="top-line product-page">
      <CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid" />
      <Notification />
      <PersonalBar />
    </div>
    <top-nav></top-nav>

            <div class="shipment-heading claim-heading">
                <div class="shipment-heading-elem">
                    <a class="shipment-heading-back-btn" href=""></a>
                    <div class="shipment-heading-info">
                        <div class="shipment-title"><span>Претензия № 145 от 04.05.2020</span></div>
                        <div class="shipment-heading-select"><span>Основание:</span>
                            <div class="base-select-wrap">
                                <select class="base-select" style="width: 100%">
                    <option value="0" selected>Заказ № 123 от 02.02.20202</option>
                    <option value="1">Заказ № 124 от 02.02.20202</option>
                    <option value="2">Заказ № 125 от 02.02.20202</option>
                    <option value="3">Заказ № 126 от 02.02.20202</option>
                  </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shipment-heading-elem">
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
                            :data="data.contracts"
                            v-model="contracts"
                        />
                    </div>
                </div>
                <div class="shipment-heading-elem">
                    <div class="content-heading-btn">
                        <svg class="content-heading-btn-img" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M3 2H18.75C19.3023 2 19.75 2.44772 19.75 3V15H21.75V3C21.75 1.34315 20.4069 0 18.75 0H3C1.34315 0 0 1.34315 0 3V21.8571C0 23.514 1.34315 24.8571 3 24.8571H16.4846C16.1942 24.6822 16 24.3638 16 24V22.8571H3C2.44772 22.8571 2 22.4094 2 21.8571V3C2 2.44772 2.44772 2 3 2Z" fill="#A5A7A9"></path>
                <path class="fill stroke" d="M27.614 22.1745C26.585 23.406 25.1063 24.6558 23.394 26.1031L23.3937 26.1033C22.8085 26.5978 22.1454 27.1584 21.457 27.7553M27.614 22.1745L27.7675 22.3028M27.614 22.1745L27.7675 22.3028C27.7675 22.3028 27.7675 22.3028 27.7675 22.3028M27.614 22.1745C28.7643 20.798 29.3 19.4928 29.3 18.0669C29.3 16.6816 28.8211 15.4035 27.9515 14.4679C27.0715 13.5213 25.8639 13 24.551 13C23.5697 13 22.671 13.3077 21.88 13.9144L20.8 14.703M27.7675 22.3028C26.7274 23.5476 25.2378 24.8066 23.5349 26.2458L23.5228 26.2561L23.5228 26.2561C22.9375 26.7506 22.2753 27.3104 21.5881 27.9064L21.457 27.7553M27.7675 22.3028C28.9399 20.8998 29.5 19.5508 29.5 18.0669C29.5 16.6357 29.0051 15.3076 28.098 14.3318L28.098 14.3318C27.1795 13.3437 25.9184 12.8 24.551 12.8C23.525 12.8 22.5836 13.1227 21.7583 13.7557C21.4091 14.0235 21.0888 14.3408 20.8 14.703M21.457 27.7553L21.5881 27.9064M21.457 27.7553C21.2753 27.913 21.0419 28 20.8 28C20.558 28 20.3246 27.913 20.1428 27.7551C19.456 27.1595 18.7939 26.5998 18.2098 26.1062L18.2068 26.1036C16.4941 24.6561 15.0151 23.406 13.9861 22.1747C12.8358 20.798 12.3 19.4928 12.3 18.0669C12.3 16.6816 12.779 15.4035 13.6486 14.4679C14.5286 13.5213 15.7361 13 17.0491 13C18.0304 13 18.9291 13.3077 19.7201 13.9144C20.0677 14.1811 20.387 14.4998 20.6742 14.8663L21.5881 27.9064M21.5881 27.9064C21.3698 28.0958 21.0898 28.2 20.8 28.2C20.5101 28.2 20.2301 28.0958 20.0117 27.9061C19.3261 27.3115 18.6649 26.7527 18.0807 26.2589L18.0791 26.2576L18.0791 26.2576L18.0777 26.2563L18.0761 26.255L18.0669 26.2472C16.3632 24.8074 14.873 23.5479 13.8326 22.3029L13.8326 22.3029C12.6602 20.8998 12.1 19.5508 12.1 18.0669C12.1 16.6357 12.595 15.3076 13.5021 14.3318L13.5021 14.3318C14.4206 13.3437 15.6815 12.8 17.0491 12.8C18.0752 12.8 19.0165 13.1227 19.8418 13.7557L19.8418 13.7558C20.1908 14.0235 20.5113 14.3407 20.8 14.703M21.5881 27.9064L20.8 14.703M14.9062 21.4162L14.9062 21.4162C15.8663 22.5653 17.299 23.777 18.9807 25.1985C18.9811 25.1987 18.9814 25.199 18.9817 25.1992L18.9831 25.2004L18.9848 25.2018C19.5341 25.6661 20.153 26.1893 20.7988 26.7476C21.4482 26.1882 22.0682 25.6641 22.6187 25.199M14.9062 21.4162L14.5271 15.2735C15.1778 14.5736 16.072 14.1876 17.0491 14.1876C17.7595 14.1876 18.4107 14.4107 18.9892 14.8543C19.508 15.2523 19.873 15.7588 20.0887 16.1174L20.0887 16.1175C20.2397 16.3685 20.5068 16.5186 20.8 16.5186C21.0932 16.5186 21.3602 16.3685 21.5113 16.1175C21.7271 15.7588 22.0921 15.2523 22.6108 14.8543C23.1892 14.4107 23.8404 14.1876 24.551 14.1876C25.528 14.1876 26.4223 14.5737 27.0729 15.2735C27.7343 15.9851 28.1043 16.9751 28.1043 18.0669C28.1043 19.2064 27.6808 20.2351 26.6939 21.4162C25.7336 22.5655 24.3008 23.7772 22.6187 25.199M14.9062 21.4162C13.9192 20.2351 13.4957 19.2064 13.4957 18.0669C13.4957 16.9751 13.8657 15.9851 14.5271 15.2735L14.9062 21.4162ZM22.6187 25.199L22.7478 25.3517L22.6187 25.199Z" fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.4"></path>
                <rect class="fill" x="17.6071" y="5.17856" width="1.7" height="13.4643" rx="0.85" transform="rotate(90 17.6071 5.17856)" fill="#A5A7A9"></rect>
                <rect class="fill" x="10" y="13" width="1.7" height="6" rx="0.85" transform="rotate(90 10 13)" fill="#A5A7A9"></rect>
                <rect class="fill" x="14" y="9" width="1.7" height="10" rx="0.85" transform="rotate(90 14 9)" fill="#A5A7A9"></rect>
              </svg>
                        <div class="content-heading-btn-text">В черновик </div>
                    </div>
                </div>
            </div>

            <div class="nav-tab claim-tab"><span>Причина претензии:</span>
                <div class="nav-tab-wrap">
                     <a 
                :class="'nav-tab-elem gradient-btn' + ( activeCard =='var1' ? ' active' : '' )" 
                @click="activeCard ='var1'"
              >
                <div class="gradient-btn-text">Недостача</div>
              </a>
              <a 
                :class="'nav-tab-elem gradient-btn' + ( activeCard =='var2' ? ' active' : '' )" 
                @click="activeCard ='var2'"
              >
                 <div class="gradient-btn-text">Пересорт</div>
              </a>
              <a 
                :class="'nav-tab-elem gradient-btn' + ( activeCard =='var3' ? ' active' : '' )" 
                @click="activeCard ='var3'"
              >
                  <div class="gradient-btn-text">Качество</div>
              </a>
                            <a 
                :class="'nav-tab-elem gradient-btn' + ( activeCard =='var4' ? ' active' : '' )" 
                @click="activeCard ='var4'"
              >
                  <div class="gradient-btn-text">Другое</div>
              </a>
                </div>
            </div>

            <div class="claim-info">

                <div class="claim-info-elem">
                    <div class="claim-info-title">Перечень товаров</div>
                    <div class="content-elem">
                        <div class="order-list-bottom scroll-elem">
                            <div class="table-more-info-arrow"></div>
                            <div class="order-list-bottom-wrap">
                                <div class="order-list-row order-list-heading">
                                    <div class="order-list-elem">№</div>
                                    <div class="order-list-elem">Наименование</div>
                                    <div class="order-list-elem">Цена</div>
                                    <div class="order-list-elem">Кол-во</div>
                                    <div class="order-list-elem">Стоимость</div>
                                    <div class="order-list-elem">Количество</div>
                                </div>
                                <div class="order-list-item">

                                    <div class="order-list-row order-list-main-row">
                                        <div class="order-list-elem">
                                            1
                                            <div class="table-arrow"></div>
                                        </div>
                                        <div class="order-list-elem">КОС598 Костюм “Финикс” бежевый/т. бежевый NEW</div>
                                        <div class="order-list-elem">18 300 ₽</div>
                                        <div class="order-list-elem">4</div>
                                        <div class="order-list-elem">181 300 ₽</div>
                                        <div class="order-list-elem">
                                            <div class="order-amount-table-input-wrap">
                                                <input class="order-amount-table-input" type="text" value="0">
                                                <div class="order-amount-table-input-arrow plus">
                                                    <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                            </svg>
                                                </div>
                                                <div class="order-amount-table-input-arrow minus">
                                                    <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                            </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order-list-elem-delete">
                                            <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                          <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                        </svg>
                                        </div>
                                    </div>
                                    <div class="order-list-sublist">
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="order-list-item">
                                    <div class="order-list-row order-list-main-row">
                                        <div class="order-list-elem">
                                            2
                                            <div class="table-arrow"></div>
                                        </div>
                                        <div class="order-list-elem">КОС598 Костюм “Финикс” бежевый/т. бежевый NEW</div>
                                        <div class="order-list-elem">18 300 ₽</div>
                                        <div class="order-list-elem">4</div>
                                        <div class="order-list-elem">181 300 ₽</div>
                                        <div class="order-list-elem">
                                            <div class="order-amount-table-input-wrap">
                                                <input class="order-amount-table-input" type="text" value="0">
                                                <div class="order-amount-table-input-arrow plus">
                                                    <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                            </svg>
                                                </div>
                                                <div class="order-amount-table-input-arrow minus">
                                                    <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                            </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order-list-elem-delete">
                                            <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                          <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                        </svg>
                                        </div>
                                    </div>
                                    <div class="order-list-sublist">
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="order-list-item">
                                    <div class="order-list-row order-list-main-row">
                                        <div class="order-list-elem">
                                            3
                                            <div class="table-arrow"></div>
                                        </div>
                                        <div class="order-list-elem">КОС598 Костюм “Финикс” бежевый/т. бежевый NEW</div>
                                        <div class="order-list-elem">18 300 ₽</div>
                                        <div class="order-list-elem">4</div>
                                        <div class="order-list-elem">181 300 ₽</div>
                                        <div class="order-list-elem">
                                            <div class="order-amount-table-input-wrap">
                                                <input class="order-amount-table-input" type="text" value="0">
                                                <div class="order-amount-table-input-arrow plus">
                                                    <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                            </svg>
                                                </div>
                                                <div class="order-amount-table-input-arrow minus">
                                                    <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                            </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order-list-elem-delete">
                                            <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                          <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                        </svg>
                                        </div>
                                    </div>
                                    <div class="order-list-sublist">
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                        <div class="order-list-row">
                                            <div class="order-list-elem"> </div>
                                            <div class="order-list-elem">р. 48-50. рост 5/6</div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem">1 000 ₽</div>
                                            <div class="order-list-elem">
                                                <div class="order-amount-table-input-wrap">
                                                    <input class="order-amount-table-input" type="text" value="0">
                                                    <div class="order-amount-table-input-arrow plus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.71679 0.986589C4.11715 0.482264 4.88285 0.482265 5.28321 0.986589L7.9757 4.37825C8.49596 5.0336 8.02925 6 7.19249 6L1.80751 6C0.970754 6 0.504041 5.0336 1.0243 4.37824L3.71679 0.986589Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                    <div class="order-amount-table-input-arrow minus">
                                                        <svg class="order-amount-table-input-arrow-img" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.28321 5.01341C4.88285 5.51774 4.11715 5.51774 3.71679 5.01341L1.0243 1.62176C0.504042 0.966397 0.970754 -1.64313e-07 1.80751 -2.37464e-07L7.19249 -7.08234e-07C8.02925 -7.81386e-07 8.49596 0.966397 7.9757 1.62176L5.28321 5.01341Z" fill="#53565B"></path>
                              </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="order-list-elem-delete">
                                                <svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                            <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                          </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="claim-info-elem">
                    <div class="claim-info-title">Сопроводительный текст претензии</div>
                    <div class="claim-info-textarea-wrap">
                        <textarea class="claim-info-textarea" name=""></textarea>
                        <div class="claim-info-add-file">
                            <input class="claim-info-add-file-input" type="file" id="claim-add-file">
                            <label class="claim-info-add-file-label" for="claim-add-file"><span class="claim-info-add-file-val">4</span></label>
                        </div>
                    </div>
                </div>

                <div class="claim-doc">
                    <a class="claim-doc-elem sc" href=""></a>
                    <a class="claim-doc-elem upd" href=""></a>
                    <a class="claim-doc-elem sf" href=""></a>
                    <a class="claim-doc-elem kor" href=""></a>
                </div>

                <div class="claim-bottom">
                    <a class="claim-add-basis" href="">Добавить основание</a>
                    <div class="gradient-btn claim-submit">
                        <div class="gradient-btn-text">Оформить претензию</div>
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

import SelectInput from '@/components/ui/SelectInput';

import { useStore } from 'vuex'
import { ref,computed,onMounted }from 'vue';

export default {
  components: {
    PersonalBar,
    Notification,
    CompanyBarTop,
    TopNav,
    SelectInput
  },
  setup() {    
          const store = useStore();
    const activeCompanyUid = ref('');
    const activeCard = ref('var1')
      const data = ref({
        partners: [
          {id: 1, name:'ООО Вектор'},
          {id: 2, name:'ООО Вектор'},
          {id: 3, name:'ООО Вектор'}
        ],
        contracts: [
          {id: 1, name:'По умолчанию'},
          {id: 2, name:'По умолчанию'},
          {id: 3, name:'По умолчанию'},
        ],
        
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

    return {
              companyBarTopData: computed(() => store.getters.getCompanysList),
      activeCompanyUid,
      data,
      activeCard
    }},
};
</script>

<style>

</style>