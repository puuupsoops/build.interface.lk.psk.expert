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
					<router-link
						tag="a" 
						:to="'/claims'"
						class="shipment-heading-back-btn"
					></router-link>
					
					<div class="shipment-heading-info">
					<div v-if="order" class="shipment-title"><span>Оформить претензию по Заказу № {{order}} от {{orders.find(x => x.n == order)?.date.substring(0,10)}}</span></div>
					<div v-else class="shipment-title"><span>Отсутвуют заказы</span></div>
						<div class="shipment-heading-select"><span>Основание: &nbsp;</span>
							<div class="base-select-wrap">
								<select class="base-select" style="width: 100%" v-model="order">
									<option v-for="(order, key) in orders"
										:key="key"
										:value="order.n"
									>{{order.name}}</option>
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
					<!-- <div class="orders-heading-item">
						<div class="orders-heading-text">Договор:</div>
						<SelectInput 
							:data="data.contracts"
							v-model="contracts"
						/>
					</div> -->
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
					<!--<div class="gradient-btn claim-submit">-->
			<router-link 
				tag="div" 
				:to="'/claims/success'"
				class="gradient-btn claim-submit"
			>
						<div class="gradient-btn-text">Оформить претензию</div>
						</router-link>
					<!--</div>-->
				</div>

			</div>
	<preloader v-if="loading"></preloader>
</div>
</template>

<script>
import PersonalBar from "@/components/cards/PersonalBar.vue"
import Notification from "@/components/cards/Notification.vue"
import CompanyBarTop from "@/components/cards/Company/CompanyBarTop.vue"
import TopNav from "@/components/nav/TopNav.vue"
import Preloader from '@/components/Preloader.vue'
import SelectInput from '@/components/ui/SelectInput.vue'

import { useStore } from 'vuex'
import { key } from '@/store'
import { defineComponent, ref,computed,onMounted }from 'vue';
import { CompanyActions } from "@/store/company/actions"
import { ShipmentsConst } from "@/store/shipments/types"
import { ShipmentsMutations } from "@/store/shipments/mutations"
import { OrdersActions } from "@/store/orders/actions"

export default defineComponent({
	components: {
		PersonalBar,
		Notification,
		CompanyBarTop,
		TopNav,
		SelectInput,
		Preloader
	},
	setup() {    
		const store = useStore(key);
		const activeCompanyUid = ref('');
		const loading = ref(false)
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
		const order = computed({
			get: () => {
				const id = store.getters.getCurrentOrderId
				if (id != null && id != ShipmentsConst.DEFAULT_ORDER_ID) 
					return id
				else {
					if (store.getters.getOrders[0] != undefined) {
							store.commit(ShipmentsMutations.SET_CURRENT_ORDER, store.getters.getOrders[0].n)
							return store.getters.getOrders[0].n
						} else {
						store.commit(ShipmentsMutations.SET_CURRENT_ORDER, ShipmentsConst.DEFAULT_ORDER_ID)
						return null
					}
				}
			},
			set: (val) => {store.commit(ShipmentsMutations.SET_CURRENT_ORDER,val)}
		})
		onMounted(() => {
			if (!store.getters.isCompanysLoad) store.dispatch(CompanyActions.GET_COMPANYS)
			if (!store.getters.isOrders) {
				loading.value = true
				store.dispatch(OrdersActions.GET_ORDERS).then(()=>{ loading.value = false})
			}
			
		});

	return {
		activeCompanyUid,
		data,
		loading,
		activeCard,
		order,
		
		companyBarTopData: computed(() => store.getters.getCompanysList),
		orders: computed(() => store.getters.getOrders),
	}},
})
</script>

<style>

</style>