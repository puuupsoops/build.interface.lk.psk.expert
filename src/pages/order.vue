<template>
<div>
	<div class="top-line product-page">
		<CompanyBarTop :data="companyBarTopData" v-model="activeCompanyUid"></CompanyBarTop>
		<Notification></Notification>
		<PersonalBar></PersonalBar>
		
	</div>
	<top-nav></top-nav>

<div v-if="!isProduct">
	Для оформления заказа выберите товар в 
	<router-link tag="a" to="/catalog" class="nav-link">Каталоге</router-link>
</div>
<div v-else>
		<ProductHeaderCard
			:title="String(product.NAME)"
			:price="String(product.PRICE)"
			:status="String(product.STATUS)"
		/>

	<div class="content-wrap content-product-wrap">
		<div class="content-wrap-elem">
			<ProductSearchResultCard 
					:data="productFound" 
					:cardType="'order'"
					v-model="activeProductId" 
					@onClick="loadProduct()"
					/>

		</div>
		<div class="content-wrap-elem">
			<ProductOffersOrderCard :data="productOffers"/>
		</div>
	</div>
	<div class="content-heading-wrap proudct-heading-wrap">
		<div class="content-heading-wrap-elem">
		<div class="content-heading">Заказ № 2435</div>
		</div>
		<div class="content-heading-wrap-elem">
		<div class="content-heading-price"> 
			<div class="content-heading-price-text">Сумма заказа: </div>
			<div class="content-heading-price-value">547 300 ₽</div>
		</div>
		</div>
		<div class="content-heading-info"> 
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Колечество едениц: </span><span class="content-heading-info-value">120</span></div>
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Общий вес: </span><span class="content-heading-info-value">25 кг.</span></div>
		<div class="content-heading-info-elem"> <span class="content-heading-info-text">Общий объем: </span><span class="content-heading-info-value">23 м.куб.</span></div>
		</div>
	</div>
	<div class="content-wrap content-order-wrap">
		<div class="content-wrap-elem">
		<div class="order-list content-elem">
			<div class="order-list-top">
			<div class="order-list-top-elem">
				<div class="product-search-text">Контрагент:</div>
				<select class="custom-select select2-hidden-accessible" style="width: 100%" tabindex="-1" aria-hidden="true" data-select2-id="43">
				<option value="0" selected="" data-select2-id="45">ООО “Тристан”</option>
				<option value="1">ООО “Тристан #2”</option>
				<option value="2">ООО “Тристан #3”</option>
				<option value="3">ООО “Тристан #4”</option>
				</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="44" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-a8q0-container"><span class="select2-selection__rendered" id="select2-a8q0-container" role="textbox" aria-readonly="true" title="ООО “Тристан”">ООО “Тристан”</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
			</div>
			<div class="order-list-top-elem">
				<button class="order-list-btn">Добавить печатный каталог</button>
			</div>
			</div>
			<div class="order-list-bottom scroll-elem">
			<div class="table-more-info-arrow"></div>
			<div class="order-list-bottom-wrap"> 
				<div class="order-list-row order-list-heading">
				<div class="order-list-elem">№</div>
				<div class="order-list-elem">Наименование</div>
				<div class="order-list-elem">Цена</div>
				<div class="order-list-elem">Кол-во</div>
				<div class="order-list-elem">Стоимость</div>
				<div class="order-list-elem">Комп.</div>
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
					<div class="order-list-elem error">- 57</div>
					<div class="order-list-elem-delete">
					<svg class="order-list-elem-delete-img" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
						<rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
					</svg>
					</div>
				</div>
				<div class="order-list-sublist" style="display: none;">
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem error">- 57</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem error">- 57</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem error">- 57</div>
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
					<div class="order-list-elem">Укомп.</div>
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
					<div class="order-list-elem">Укомп.</div>
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
		<div class="order-list-buttons">
			<button class="order-list-submit gradient-btn"> 
			<div class="gradient-btn-text">Оформить заказ</div>
			</button>
			<div class="order-list-buttons-wrap">
			<div class="order-list-buttons-item later">
				<svg class="order-list-buttons-item-img" width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.5H18.75C19.3023 4.5 19.75 4.94772 19.75 5.5V14.0173C20.2318 13.9356 20.727 13.8931 21.2321 13.8931C21.406 13.8931 21.5786 13.8981 21.75 13.908V5.5C21.75 3.84315 20.4069 2.5 18.75 2.5H3C1.34315 2.5 0 3.84315 0 5.5V24.3571C0 26.014 1.34315 27.3571 3 27.3571H13.762C13.3748 26.7379 13.0625 26.067 12.8377 25.3571H3C2.44772 25.3571 2 24.9094 2 24.3571V5.5C2 4.94772 2.44772 4.5 3 4.5Z" fill="#A5A7A9"></path>
				<circle cx="21.2321" cy="22.6961" r="7.80357" stroke="#A5A7A9" stroke-width="2"></circle>
				<rect x="19.6786" y="18.0356" width="1.7" height="6.21429" rx="0.85" fill="#A5A7A9"></rect>
				<rect x="24.8571" y="22.6001" width="1.7" height="5.17857" rx="0.85" transform="rotate(90 24.8571 22.6001)" fill="#A5A7A9"></rect>
				<rect x="6" y="8" width="2" height="2" rx="1" transform="rotate(90 6 8)" fill="#A5A7A9"></rect>
				<rect x="6" y="12" width="2" height="2" rx="1" transform="rotate(90 6 12)" fill="#A5A7A9"> </rect>
				<rect x="6" y="16" width="2" height="2" rx="1" transform="rotate(90 6 16)" fill="#A5A7A9"></rect>
				<rect x="6" y="20" width="2" height="2" rx="1" transform="rotate(90 6 20)" fill="#A5A7A9"></rect>
				<rect x="10" y="8" width="2" height="2" rx="1" transform="rotate(90 10 8)" fill="#A5A7A9"></rect>
				<rect x="10" y="12" width="2" height="2" rx="1" transform="rotate(90 10 12)" fill="#A5A7A9"></rect>
				<rect x="10" y="16" width="2" height="2" rx="1" transform="rotate(90 10 16)" fill="#A5A7A9"></rect>
				<rect x="14" y="16" width="2" height="2" rx="1" transform="rotate(90 14 16)" fill="#A5A7A9"></rect>
				<rect x="10" y="20" width="2" height="2" rx="1" transform="rotate(90 10 20)" fill="#A5A7A9"></rect>
				<rect x="14" y="8" width="2" height="2" rx="1" transform="rotate(90 14 8)" fill="#A5A7A9"></rect>
				<rect x="14" y="12" width="2" height="2" rx="1" transform="rotate(90 14 12)" fill="#A5A7A9"></rect>
				<rect x="18" y="8" width="2" height="2" rx="1" transform="rotate(90 18 8)" fill="#A5A7A9"></rect>
				<rect x="18" y="12" width="2" height="2" rx="1" transform="rotate(90 18 12)" fill="#A5A7A9"></rect>
				<rect x="5" y="0.5" width="2" height="6" rx="1" fill="#A5A7A9"></rect>
				<rect x="10" y="0.5" width="2" height="6" rx="1" fill="#A5A7A9"></rect>
				<rect x="15" y="0.5" width="2" height="6" rx="1" fill="#A5A7A9"></rect>
				</svg>
			</div>
			<div class="order-list-buttons-item mail">
				<svg class="order-list-buttons-item-img" width="41" height="20" viewBox="0 0 41 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M37.4649 2H18.5787L26.6432 9.10183L37.4649 2ZM16.7388 3.03554L14.7128 15.9112C14.6173 16.518 15.0864 17.0667 15.7007 17.0667H35.6268C36.1191 17.0667 36.5382 16.7084 36.6147 16.2221L38.5935 3.64601L27.2621 11.0824C27.2165 11.1123 27.1693 11.138 27.1209 11.1596C26.7546 11.4186 26.2422 11.4065 25.8863 11.0931L16.7789 3.07285C16.7651 3.06071 16.7517 3.04827 16.7388 3.03554ZM14.7931 2.53369C15.0227 1.07482 16.2798 0 17.7567 0H37.6829C39.5257 0 40.9328 1.6459 40.6464 3.46631L38.5904 16.533C38.3608 17.9918 37.1037 19.0667 35.6268 19.0667H15.7007C13.8579 19.0667 12.4507 17.4208 12.7371 15.6004L14.7931 2.53369Z" fill="#A5A7A9"></path>
				<rect x="3.7" y="4" width="8" height="2" rx="1" fill="#A5A7A9"></rect>
				<rect y="8" width="11" height="2" rx="1" fill="#A5A7A9"></rect>
				<rect x="5.30003" y="12" width="5" height="2" rx="1" fill="#A5A7A9"></rect>
				</svg>
			</div>
			<div class="order-list-buttons-item print">
				<svg class="order-list-buttons-item-img" width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M21 7H3C2.44772 7 2 7.44772 2 8V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V8C22 7.44772 21.5523 7 21 7ZM3 5C1.34315 5 0 6.34315 0 8V17C0 18.6569 1.34315 20 3 20H21C22.6569 20 24 18.6569 24 17V8C24 6.34315 22.6569 5 21 5H3Z" fill="#A5A7A9"></path>
				<rect class="notfill" x="4" y="13" width="16" height="7" fill="#1F2227"></rect>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M17 2H7C6.44772 2 6 2.44772 6 3V5C6 5.55228 6.44772 6 7 6H17C17.5523 6 18 5.55228 18 5V3C18 2.44772 17.5523 2 17 2ZM7 0C5.34315 0 4 1.34315 4 3V5C4 6.65685 5.34315 8 7 8H17C18.6569 8 20 6.65685 20 5V3C20 1.34315 18.6569 0 17 0H7Z" fill="#A5A7A9"></path>
				<rect class="notfill" x="3" y="7" width="18" height="7" fill="#1F2227"></rect>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M17 15H7C6.44772 15 6 15.4477 6 16V24C6 24.5523 6.44772 25 7 25H17C17.5523 25 18 24.5523 18 24V16C18 15.4477 17.5523 15 17 15ZM7 13C5.34315 13 4 14.3431 4 16V24C4 25.6569 5.34315 27 7 27H17C18.6569 27 20 25.6569 20 24V16C20 14.3431 18.6569 13 17 13H7Z" fill="#A5A7A9"></path>
				<rect x="16" y="17" width="2" height="8" rx="1" transform="rotate(90 16 17)" fill="#A5A7A9"></rect>
				<rect x="16" y="21" width="2" height="8" rx="1" transform="rotate(90 16 21)" fill="#A5A7A9"></rect>
				<rect x="20" y="9" width="2" height="3" rx="1" transform="rotate(90 20 9)" fill="#A5A7A9"></rect>
				</svg>
			</div>
			<div class="order-list-buttons-item save">
				<svg class="order-list-buttons-item-img" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="stroke" d="M1 3.5C1 2.39543 1.89543 1.5 3 1.5H16C19.866 1.5 23 4.63401 23 8.5V21.5C23 22.6046 22.1046 23.5 21 23.5H3C1.89543 23.5 1 22.6046 1 21.5V3.5Z" stroke="#A5A7A9" stroke-width="2"></path>
				<rect x="4" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"></rect>
				<rect x="18" y="13.5" width="2" height="10" rx="1" fill="#A5A7A9"></rect>
				<rect x="4" y="15.5" width="2" height="16" rx="1" transform="rotate(-90 4 15.5)" fill="#A5A7A9"></rect>
				<rect x="6" y="9.5" width="2" height="12" rx="1" transform="rotate(-90 6 9.5)" fill="#A5A7A9"></rect>
				<rect x="8" y="9.5" width="2" height="8" rx="1" transform="rotate(180 8 9.5)" fill="#A5A7A9"></rect>
				<rect x="18" y="9.5" width="2" height="8" rx="1" transform="rotate(180 18 9.5)" fill="#A5A7A9"></rect>
				<rect x="15" y="6.5" width="2" height="3" rx="1" transform="rotate(-180 15 6.5)" fill="#A5A7A9"></rect>
				</svg>
			</div>
			</div>
		</div>
		</div>
		<div class="content-wrap-elem"> 
		<div class="content-properties content-elem">
			<div class="content-properties-text">Свойства:</div>
			<div class="content-properties-elem"><img class="content-properties-img" src="style/img/properties/properties-1.png" alt=""></div>
			<div class="content-properties-elem"> <img class="content-properties-img" src="style/img/properties/properties-2.png" alt=""></div>
		</div>
		<div class="order-product-prev content-elem">
			<div class="order-product-prev-wrap">
			<div class="order-product-prev-slider slick-initialized slick-slider"><button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="">Previous</button>
				<div class="slick-list draggable"><div class="slick-track" style="opacity: 1; width: 2460px; transform: translate3d(-492px, 0px, 0px);"><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="-3" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="-2" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="-1" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="0" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-active" data-slick-index="1" aria-hidden="false" tabindex="0" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-active" data-slick-index="2" aria-hidden="false" tabindex="0" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide" data-slick-index="3" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide" data-slick-index="4" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide" data-slick-index="5" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="6" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="7" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="8" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="9" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="10" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div><div class="order-product-prev-slider-elem slick-slide slick-cloned" data-slick-index="11" id="" aria-hidden="true" tabindex="-1" style="width: 164px;">
				<div class="order-product-prev-slider-img-box"><img class="order-product-prev-slider-img" src="style/img/product/product-5.jpg" alt=""></div>
				</div></div></div>
				
				
				
				
				
			</div>
			</div>
			<div class="order-product-btn-wrap"><a class="order-product-btn" href="">Детали</a><a class="order-product-btn" href="">Сертификаты</a></div>
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
import ProductHeaderCard from '@/components/cards/Product/ProductHeaderCard'
import ProductSearchResultCard from '@/components/cards/Product/ProductSearchResultCard'
import ProductOffersOrderCard from '@/components/cards/Product/ProductOffersOrderCard'


import { useStore } from 'vuex'
import { ref, computed, onMounted, inject } from 'vue'

export default {
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		ProductHeaderCard,
		ProductSearchResultCard,
		ProductOffersOrderCard,
	},
	setup() {
		const store = useStore();
		const loader = inject('loader');

		const activeCompanyUid = ref('');
		const activeProductId = ref('');
		onMounted(() => {
			if (!store.getters.isCompanysLoad)
			{
				store.dispatch('GET_PARTNER')
			}
			activeProductId.value=store.getters.getProduct.ID;
		});

		const loadProduct = () => {
			loader.value = true;
			store.dispatch('GET_PRODUCT_BY_ID', activeProductId.value)
				.then(()=>{
					activeProductId.value=store.getters.getProduct.ID;
					})
				.finally(() => {loader.value=false})
		};

		return {
			companyBarTopData: computed(() => store.getters.getCompanys),
			activeCompanyUid,
	
			isProduct: computed(() => store.getters.isProduct),
			activeProductId,
			loadProduct,

			productOffers: computed(() => store.getters.getProductOffers),
			product: computed(() => store.getters.getProduct),
			productFound: computed(() => store.getters.getProductFound),
			productImages: computed(() => store.getters.getProductImages),
			productProtect: computed(() => store.getters.getProductProtect),
		}
	}
}
</script>