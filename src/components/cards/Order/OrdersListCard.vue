<template>

    <div class="orders-list-wrap" @mouseup="onMouseUp()">
        <div class="orders-heading-info">
            <div class="orders-heading-pagination">

                <CatalogPagination
                        :maxPage = "page.maxItemOnPage !== -1 ? Math.ceil(data_filtered.length / page.maxItemOnPage): 1"
                        v-model:currentPage="page.currentPage"
                        v-model:maxItemOnPage="page.maxItemOnPage"

                />
            </div>
            <div class="orders-heading-info-text"
                 :style=" data_filtered.length !== orders_list.length ? 'visibility: visible': 'visibility: hidden'"
            >
                Показано {{data_filtered.length}} из {{orders_list.length}}
            </div>
            <div class="orders-heading-info-settings"
                 :class="{'active': showTableMenu}"
                 @click="showTableMenu = true "
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path fill="#A5A7A9" d="m9.8 21.3-.375-3q-.175-.025-.625-.275T7.775 17.4l-2.75 1.15-2.2-3.825 2.4-1.825q-.05-.2-.062-.413-.013-.212-.013-.487 0-.175.025-.413.025-.237.05-.537l-2.4-1.8 2.2-3.8L7.8 6.625q.35-.275.762-.525.413-.25.863-.4L9.8 2.675h4.4l.375 3q.475.175.838.4.362.225.737.55l2.825-1.175 2.2 3.8-2.5 1.875q.05.25.063.437.012.188.012.438 0 .225-.012.438-.013.212-.063.462l2.475 1.825-2.225 3.825-2.775-1.175q-.325.275-.7.5-.375.225-.875.425l-.375 3Zm2.175-6.4q1.2 0 2.038-.85.837-.85.837-2.05 0-1.2-.837-2.05-.838-.85-2.038-.85-1.225 0-2.062.85-.838.85-.838 2.05 0 1.2.838 2.05.837.85 2.062.85Zm0-1.4q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438.6 0 1.05.438.45.437.45 1.062t-.45 1.062q-.45.438-1.05.438ZM12 11.975ZM11 19.9h1.95l.375-2.7q.75-.2 1.35-.55.6-.35 1.175-.925l2.5 1.075.975-1.7-2.2-1.625q.125-.4.163-.75.037-.35.037-.725t-.037-.713q-.038-.337-.163-.737l2.2-1.675-.95-1.675-2.55 1.075q-.45-.5-1.15-.913-.7-.412-1.375-.587l-.3-2.7h-1.975l-.325 2.7q-.8.2-1.4.525-.6.325-1.2.95L5.625 7.2 4.65 8.875l2.15 1.6q-.125.375-.175.75-.05.375-.05.775 0 .375.038.738.037.362.162.762L4.65 15.1l.975 1.7 2.45-1.05q.6.575 1.225.938.625.362 1.375.537Z"/>
                </svg>
            </div>
            <div class="orders-heading-info-settings-dropdown"
                 :class="{'active': showTableMenu}"
                 ref="tableMenu"
            >
                <a class="orders-list-more-dropdown-link"
                   v-for="(i, col) in tableColumn"
                   :key="col"
                   @click="saveTableColumn"
                >	<CheckButton v-model="i.visible" :disabled="i.disabled" />
                    <span @click="!i.disabled ? i.visible=!i.visible : null">{{i.name}}</span>
                </a>

                <a class="orders-list-more-dropdown-link clear"
                   @click="clearTableWidth()"
                >
                    <svg  width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"></rect>
                        <rect width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"></rect>
                    </svg>
                    <span>Сбросить</span>
                </a>
            </div>
        </div>
        <div class="orders-list ">
            <div class="orders-list-row orders-list-heading"
                 ref="table"
            >
                <div class="orders-list-elem" v-if="tableColumn.id.visible"
                     :class="{'id': true}"
                     :style="`width: ${tableColumn.id.width}${tableColumn.id.unit}`"
                >
                    {{tableColumn.id.name}}
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'id')" ></div>
                </div>
                <div class="orders-list-elem" v-if="tableColumn.name.visible"
                     :class="{'name': true, 'active': (search.search !=='' && search.id === 1) || filter[1].value !== '' }"
                     :style="`width: ${tableColumn.name.width}${tableColumn.name.unit}`"
                >
                    <modal-input v-model="filter[1].value" v-model:show="filter[1].show"></modal-input>
                    <div>{{tableColumn.name.name}}</div>
                    <div class="orders-list-elem-filter"
                         :class="{ 'active' : filter[1].show || filter[1].value !== '' }"
                         title="Фильтр"
                         @click="filter[1].show=true"
                    >
                        <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="fill" d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z" fill="#A5A7A9"/>
                        </svg>
                    </div>
                    <div
                            v-if="filter[1].value !== ''"
                            class="orders-list-elem-filter active"
                            title="Очистить фильтр"
                            @click="filter[1].value='';active = -1"
                    >
                        <svg width="12" height="12" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect class="fill" x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"/>
                            <rect class="fill" width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"/>
                        </svg>

                    </div>
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'name')" ></div>
                </div>
                <div class="orders-list-elem" v-if="tableColumn.date.visible"
                     :class="{'date': true, 'active': (search.search !== '' && search.id === 3) || (period !== 'Все' ) || (filter[2].value !== '')}"
                     :style="`width: ${tableColumn.date.width}${tableColumn.date.unit}`"
                >
                    <modal-date-picker v-model="filter[2].value" v-model:show="filter[2].show"></modal-date-picker>
                    <div>{{tableColumn.date.name}}</div>
                    <div
                            :class="'orders-list-elem-filter' +(filter[2].show || filter[2].value !== '' ? ' active': '')"
                            title="Фильтр"
                            @click="filter[2].show=true"
                    >
                        <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="fill" d="M7.00726 8.11117L12.7923 2.32601C12.9262 2.1922 13 2.01359 13 1.82313C13 1.63268 12.9262 1.45406 12.7923 1.32026L12.3664 0.894224C12.0888 0.616998 11.6378 0.616998 11.3606 0.894224L6.5027 5.75217L1.63936 0.888833C1.50545 0.755029 1.32694 0.681152 1.13659 0.681152C0.946033 0.681152 0.767522 0.755029 0.633507 0.888833L0.207681 1.31487C0.0737714 1.44878 -4.1357e-08 1.62729 -4.9682e-08 1.81774C-5.8007e-08 2.0082 0.0737714 2.18681 0.207681 2.32062L5.99802 8.11117C6.13236 8.24529 6.31171 8.31896 6.50238 8.31854C6.69378 8.31896 6.87303 8.24529 7.00726 8.11117Z" fill="#A5A7A9"/>
                        </svg>
                    </div>
                    <div
                            v-if="filter[2].value !== ''"
                            class="orders-list-elem-filter active"
                            title="Очистить фильтр"
                            @click="filter[2].value='';active = -1"
                    >
                        <svg width="12" height="12" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect class="fill" x="0.250031" y="2.07935" width="2.25351" height="22.5351" rx="1.12676" transform="rotate(-45 0.250031 2.07935)" fill="#A5A7A9"/>
                            <rect class="fill" width="2.25351" height="22.5351" rx="1.12676" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)" fill="#A5A7A9"/>
                        </svg>

                    </div>
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'date')" ></div>
                </div>
                <div class="orders-list-elem" v-if="tableColumn.partner_name.visible"
                     :class="{'partner_name': true, 'active' : contrAgent !=='' }"
                     :style="`width: ${tableColumn.partner_name.width}${tableColumn.partner_name.unit}`"
                >
                    {{tableColumn.partner_name.name}}
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'partner_name')" ></div>
                </div>

                <div class="orders-list-elem" v-if="tableColumn.status.visible"
                     :class="{'status': true, 'active': status !== 'Все' }"
                     :style="`width: ${tableColumn.status.width}${tableColumn.status.unit}`"
                >
                    {{ tableColumn.status.name }}
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'status')" ></div>
                </div>

                <div class="orders-list-elem" v-if="tableColumn.delivery_tersm.visible"
                     :class="{'delivery_tersm': true, 'active': status !== 'Все' }"
                     :style="`width: ${tableColumn.delivery_tersm.width}${tableColumn.delivery_tersm.unit}`"
                >
                    {{ tableColumn.delivery_tersm.name }}
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'delivery_tersm')" ></div>
                </div>

                <div class="orders-list-elem" v-if="tableColumn.n.visible"
                     :class="{'n': true, 'active' : search.search !=='' && search.id === 2 }"
                     :style="`width: ${tableColumn.n.width}${tableColumn.n.unit}`"
                >
                    <div class="orders-list-elem-center">{{tableColumn.n.name}}</div>
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'n')" ></div>
                </div>

                <div class="orders-list-elem" v-if="tableColumn.comment.visible"
                     :class="{'comment': true, 'active': status !== 'Все' }"
                     :style="`width: ${tableColumn.comment.width}${tableColumn.comment.unit}`"
                >
                    {{tableColumn.comment.name}}
                    <div class="orders-list-elem-resize" @mousedown="onMouseDown($event, 'comment')" ></div>
                </div>
                <div class="orders-list-elem" v-if="tableColumn.info.visible"
                     :class="{'info': true}"
                     :style="`width: ${tableColumn.info.width}${tableColumn.info.unit}`"
                >{{tableColumn.info.name}}</div>
            </div>

            <div class="orders-list-item"
                 :class="{'active': key === active,'reserved': item.reserved}"
                 v-for="(item, key) in data_filtered"
                 :key="key"
            >
                <div class="orders-list-row orders-list-main-row"
                     v-if="paginationShow(key)"
                     @click="key === active ? active = -1 : active = key"

                >

                    <div class="orders-list-elem"  v-if="tableColumn.id.visible"
                         :class="{'id': true}"
                         :style="`width: ${tableColumn.id.width}${tableColumn.id.unit}`"
                    ><div>{{ key+1 }}</div><div class="table-arrow"></div>
                    </div>

                    <div class="orders-list-elem" v-if="tableColumn.name.visible"
                         :class="{'name': true}"
                         :style="`width: ${tableColumn.name.width}${tableColumn.name.unit}`"
                    >{{ item.n }}</div>

                    <div class="orders-list-elem" v-if="tableColumn.date.visible"
                         :class="{'date': true}"
                         :style="`width: ${tableColumn.date.width}${tableColumn.date.unit}`"
                    >{{ item.date }}</div>

                    <div class="orders-list-elem" v-if="tableColumn.partner_name.visible"
                         :class="{'partner_name': true}"
                         :style="`width: ${tableColumn.partner_name.width}${tableColumn.partner_name.unit}`"
                    >{{ normalizeCompanyName(item.partner_name) }}</div>

                    <div class="orders-list-elem" v-if="tableColumn.status.visible"
                         :class="{'status': true}"
                         :style="`width: ${tableColumn.status.width}${tableColumn.status.unit}`"
                    >
                        <div v-for="(check, key) in item.checks"
                             :class="'orders-list-elem-status ' + (check.status >= 0 && check.status < OrdersSatusCodeClass.length ? OrdersSatusCodeClass[check.status].class: '')"
                             :tooltip="(check.status >= 0 && check.status < OrdersSatusCodeClass.length ? OrdersSatusCodeClass[check.status].name: '')"
                             flow="up"
                             :key="key"
                        >

                        </div>
                    </div>

                    <div class="orders-list-elem" v-if="tableColumn.delivery_tersm.visible"
                         :class="{'status': true}"
                         :style="`width: ${tableColumn.delivery_tersm.width}${tableColumn.delivery_tersm.unit}`"
                    >{{ item.delivery_terms ? item.delivery_terms : item.shipment_name }}</div>

                    <div class="orders-list-elem" v-if="tableColumn.n.visible"
                         :class="{'n': true}"
                         :style="`width: ${tableColumn.n.width}${tableColumn.n.unit}`">{{ item.upd }}</div>

                    <div class="orders-list-elem" v-if="tableColumn.comment.visible"
                         :class="{'comment': true}"
                         :style="`width: ${tableColumn.comment.width}${tableColumn.comment.unit}`"
                    >{{ item.comment }}</div>

                    <div class="orders-list-elem" v-if="tableColumn.info.visible"
                         :class="{'info': true}"
                         :style="`width: ${tableColumn.info.width}${tableColumn.info.unit}`"
                    >
                        <button
                                class="orders-list-more"
                                @click.stop="active_more = key"
                        >Подробно</button>
                        <div :class="'orders-list-more-dropdown' +  ( key === active_more ? ' active': '' )"  ref="target">
                            <a class="orders-list-more-dropdown-link" @click.stop="detailOrderId = item.n; showDetail=true" >Детали заказа</a>
                            <a class="orders-list-more-dropdown-link" @click.stop="detailOrderId = item.n; showDetail=true; editOrder=false;repeatOrder=true;" >Повторить заказ</a>
                            <a class="orders-list-more-dropdown-link" v-if="item.reserved" @click.stop="detailOrderId = item.n; showDetail=true; editOrder=true;repeatOrder=false;" >Изменить заказ</a>
                            <!-- <a class="orders-list-more-dropdown-link" >Скачать документы</a> -->
                            <a class="orders-list-more-dropdown-link" @click.stop="downloadAllCertificates(item)">Сертификаты по заказу</a>
                            <a class="orders-list-more-dropdown-link" @click.stop="setClaimOrderId(item.n)" v-if="item.checks.filter(check => check.status === 5 || check.status === 9 ) && item.checks?.filter(check => check.status === 5 || check.status === 9 ).length>0 ">
                                Оформить претензию
                            </a>
                            <router-link class="orders-list-more-dropdown-link" :to="'/shipments/request'" @click="setOrderId(item.n)">Заявка на транспорт</router-link>
                            <a class="orders-list-more-dropdown-link" @click.stop="goToKP(item.n)">Создать КП</a>

                            <!--
                            <router-link
                              class="orders-list-more-dropdown-link"
                              tag="a"
                              :to="'/shipments/request'"
                              @click="setOrderId(item.n)"
                            >
                                Заявка на транспорт
                            </router-link>
                            <router-link
                              class="orders-list-more-dropdown-link"
                              tag="a"
                              :to="'/kp'"
                              @click.stop="setOrderId(item.n)"
                            >
                              Создать КП
                            </router-link>
                            -->
                        </div>
                    </div>
                </div>

                <div class="orders-list-info"
                     :class="{'active': key === active }"
                     @click="active_more =  -1"
                     v-if="paginationShow(key)"
                >


                    <div v-if="Array.isArray(item.checks) && item.checks.length>0 && item.status_code !== 7 && item.status_code !== 9">
                        <div
                                class="orders-list-info-row"
                                v-for="(check, key1) in item.checks"
                                :key="key1"
                                style="padding-right: 0px;"
                        >
                            <div class="orders-list-info-elem">{{getStorageName(item.partner_guid, check.organization_id)}}</div>
                            <div class="orders-list-info-elem" style="margin-right: 18%; width: 17%;">

                                <div class="orders-list-info-about tooltip" v-if="check.doc_status?.StatusSchet">
                                    <div class="orders-list-info-download "
                                         @click="downloadBill(check.guid)"
                                    >
                                        <span> Счёт {{getStorageName(item.partner_guid, check.organization_id)}}{{ check.n }} от {{item.date.substring(0,10)}} </span>
                                        <preloader-local
                                                v-if="loading_bill.includes(check.guid)"
                                                small
                                        />
                                    </div>
                                    <span class="tooltiptext">Сохранить счет</span>
                                </div>
<!--                                <div class="orders-list-info-about tooltip" v-else>-->
<!--                                    <div-->
<!--                                            class="orders-list-info-download disable"-->
<!--                                    >-->
<!--                                        Счёт {{check.n}} от {{item.date.substring(0,10)}}-->
<!--                                    </div>-->
<!--                                    <span class="tooltiptext">Сохранить счет можно только <br> после подтверждения заказа</span>-->
<!--                                </div>-->
                            </div>
                            
                            <div class="orders-list-info-elem orders-list-info-doc-wrap"  v-if="!check.doc_status">
                                <PreloaderLocal small></PreloaderLocal>
                            </div>
                            <div class="orders-list-info-elem orders-list-info-doc-wrap" style="width: 13%;" v-else>

                                <a
                                  v-if="check.doc_status?.StatusSchet "
                                  class="orders-list-info-doc sc"
                                  :href="`${docLocation}/api/order/print?id=${check.guid}&name=Счет`"
                                  target="_blank"
                                  title="Открыть счет">
                                </a>

                                <a
                                        v-if="check.doc_status?.StatusUPD"
                                        class="orders-list-info-doc upd"
                                        :href="`${docLocation}/api/order/print?id=${check.guid}&name=УПД`"
                                        target="_blank"
                                        title="Универсальный передаточный документ">
                                </a>
                                <a
                                        v-if="check.doc_status?.StatusSF"
                                        class="orders-list-info-doc sf"
                                        :href="`${docLocation}/api/order/print?id=${check.guid}&name=СФ`"
                                        target="_blank"
                                        title="Счёт-фактура">
                                </a>
                                <a
                                        v-if="check.doc_status?.StatusUPK"
                                        class="orders-list-info-doc kor"
                                        :href="`${docLocation}/api/order/print?id=${check.guid}&name=УКД`"
                                        target="_blank"
                                        title="Универсальный корректировочный документ">
                                </a>
                            </div>

                            <div class="orders-list-info-elem" style="justify-content: flex-start; padding-left: 36px;">{{ check.doc_status?.NumberUPD?.replace(';','') ?? '' }}</div>
                            <div class="orders-list-info-elem"></div>
                            <div class="orders-list-info-elem"></div>
                            <div class="orders-list-info-elem"></div>
                            <div class="orders-list-info-elem"></div>
                            <div class="orders-list-info-elem" style="display: flex; width: 15%; justify-content: flex-end;">

                                {{ OrdersSatusCodeClass[check.status] ? OrdersSatusCodeClass[check.status].name : ''}}
                                <div
                                        v-if="OrdersSatusCodeClass[check.status]"
                                        :class="'orders-list-elem-status small ' + (check.status >= 0 && check.status < OrdersSatusCodeClass.length ? OrdersSatusCodeClass[check.status].class: '')"

                                        flow="up"
                                >

                                </div>
                            </div>
                            <div class="orders-list-info-elem" style="display: flex; flex-direction: column; justify-content: flex-end; width: 10%;">
                                <div class="orders-list-elem-request-bill"
                                     v-if="check.status !== 10">

                                    <preloader-local small v-if="billRequestLoadingState === check.id"/>

                                    <span v-else @click="billRequestLoading(item.n, check)">Запросить счет</span>
                                </div>
                                <div class="orders-list-elem-request-bill">
                                    <span @click="downloadCertificates(check)">Сертификаты</span>
                                </div>

                            </div>
                            <!-- <div class="orders-list-info-elem">
                              <a class="orders-list-info-link" href="">Сертификаты</a>
                              <a class="orders-list-info-link" href="">Скачать все</a></div> -->
                        </div>
                    </div>
                    <div
                            v-else
                            class="orders-list-info-row"
                    >
                        <div class="orders-list-info-elem"></div>
                        <div class="orders-list-info-elem">
                            Счет отсутвует
                        </div>
                        <div class="orders-list-info-elem"></div>
                        <div class="orders-list-info-elem"></div>
                        <div class="orders-list-info-elem"></div>
                        <div class="orders-list-info-elem"></div>
                    </div>
                </div>

                <!-- </div>
                </div>
                </div> -->
            </div>
            <div
                    class="orders-list-row orders-list-main-row"
                    v-if="orders_list.length === 0 && !loading"
            >
                <div class="order-info">
                    Заказов не найдено. Создайте <router-link class="order-info-link" :to="'/order'">новый заказ</router-link> и он появится в списке.
                </div>
            </div>
        </div>
        <PreloaderLocal v-if="loading" style="width: 100%"></PreloaderLocal>
        <Preloader v-if="loading_global"></Preloader>
        <OrderDetailModal
                v-model="showDetail"
                :orderId="detailOrderId"
                v-model:repeatOrder="repeatOrder"
                v-model:editOrder="editOrder"
        ></OrderDetailModal>
    </div>
</template>

<script setup lang="ts">
import PreloaderLocal from '/src/components/PreloaderLocal.vue'
import Preloader from '/src/components/Preloader.vue'
import OrderDetailModal from '/src/components/cards/Order/OrderDetailModal.vue'
import ModalInput from '/src/components/ui/ModalInput.vue'
import ModalDatePicker from '/src/components/ui/ModalDatePicker.vue'
import CatalogPagination from '/src/components/cards/Catalog/CatalogPagination.vue'
import CheckButton from '/src/components/ui/CheckButton.vue'

import { ref, PropType, watch, computed, onMounted, nextTick, inject } from 'vue'
import _ from 'lodash'
import { onClickOutside } from '@vueuse/core'
import { Check, Orders } from '/src/models/Orders'
import { normalizeCompanyName } from '/src/models/Partner'
import { useStore } from '/src/store'

import { OrderActions } from '/src/store/order/actions'
import { StorageCompany } from '/src/models/Partner'
import { OrdersActions } from '/src/store/orders/actions'
import { OrdersSatusCode, OrdersSatusCodeClass } from '/src/store/orders/types'

import { SearchData } from '/src/models/Components'
import { KeysMutations } from '/src/store/keys/mutations'
import { useRouter } from 'vue-router'
import { OrderMutations } from '/src/store/order/mutations'
import { ClaimActions } from '/src/store/claims/actions'
import { ClaimMutations } from '/src/store/claims/mutations'

import { KP_TYPES } from '/src/models/KP'
import {KPMutations} from "/src/store/kp/mutations";
import {OrdersMutations} from "/src/store/orders/mutations";
import { bool } from 'yup'

const props = defineProps(
    {
        contrAgent: {
            type: String
        },
        period: {
            type: String
        },
        status: {
            type: String
        },
        loading:{
            type: Boolean,
            default: false
        },
        search: {
            type: Object as PropType<SearchData>,
            required: true
        },
        refresh: {
            type: Boolean,
            default: false
        }
    })

const store = useStore()
const router = useRouter()
const loading_global = ref(false)
const active = ref(-1)
const active_more = ref(-1)
const target = ref(null)
const showDetail = ref(false)
const loading_bill = ref<string[]>([])
const detailOrderId = ref(-1)
const filter = ref([
    {name: 'id', value: '', show: false},
    {name: 'n', value: '', show: false},
    {name: 'date', value: '', show: false},
])
const repeatOrder = ref(false)
const editOrder = ref(false)
const docLocation = import.meta.env.VITE_APP_DOC_LOCATION
const page = ref({maxItemOnPage: 10, currentPage: 1})
const billRequestLoadingState = ref(-1) //Переменная для прелоадера с загрузкой запроса счета
const tempOrderId = ref(inject<number|null>('tempOrderId'))
const tempKPType = ref(inject<string>('tempKPType') ?? '')

onClickOutside(target, () => {
    active_more.value = -1
});

let orders_list = computed<Orders[]>(()=> store.getters.getOrders)

const loadDocStatus = ()=>{
    if (active.value!=-1 && data_filtered.value && Array.isArray(data_filtered.value[active.value].checks)) {
        let promise_arr = data_filtered.value [active.value].checks?.map(x => !x.doc_status ? store.dispatch(OrdersActions.GET_ORDERS_DOCSTATUS, x.guid) : null)
        // let promise_arr = data_filtered.value [active.value].checks?.map(x => !x.doc_status ? store.dispatch(OrdersActions.GET_ORDERS_DOCSTATUS, '4210d77e-d9d4-11ed-b214-005056bb1249') : null)
        if (promise_arr){
            let upd = '';
            Promise.all(promise_arr).finally(()=> {
                console.log(data_filtered.value[active.value].checks)
                data_filtered.value [active.value].checks?.forEach( (check,index) => {
                    console.log(check, index)
                    console.log()
                    check.n = check.doc_status?.NumberSchet?.replace(';','')?? '';
                    upd = upd + (check.doc_status?.NumberUPD?.replace(';','')?? '');
                    if(data_filtered.value[active.value].checks?.[index+1]?.doc_status?.NumberUPD?.length) {
                        upd += '/'
                    }
                    store.commit(OrdersMutations.SET_ORDERS_UPD, {order: data_filtered.value [active.value], upd })
                })
            })
        }
    }
}

watch( active, ()=>{
    //console.log(active)
    loadDocStatus()
})

watch( () => props.status, ()=>{
    page.value.currentPage = 1
    active.value = -1
})
watch( () => props.contrAgent, ()=>{
    page.value.currentPage = 1
    active.value = -1
})
watch( () => props.search, ()=>{
    page.value.currentPage = 1
    active.value = -1
})
watch( () => props.period, ()=>{
    page.value.currentPage = 1
    active.value = -1
})
watch( () => props.refresh, (next, prev)=>{
    if (prev==true && next ==false){
        loadDocStatus()
    }

})

const data_filtered = computed( () => {
    //фильтр по контрагенту

    let data = orders_list.value.filter((x: Orders) => props.contrAgent =='' || x.partner_guid == props.contrAgent)

    //фильтр по периоду
    data = data.filter((x: Orders) => checkPeriod(x.date))

    //фильтр по статусу
    data = data.filter((x: Orders) => checkStatus(x))

    //фильтр по поиску по полю
    data = data.filter((x: Orders) => search(x))

    if (filter.value[1].value !=''){
        data = data.filter((x: Orders) => String(x.n).indexOf(filter.value[1].value)!=-1)
    }
    if (filter.value[2].value !=''){
        data = data.filter((x: Orders) => x.date.indexOf(filter.value[2].value)!=-1)
    }

    return data
})

const paginationShow = (key: number): boolean => {
    if (page.value.maxItemOnPage != -1){
        return key >= ((page.value.currentPage-1)*page.value.maxItemOnPage) && key < (page.value.currentPage*page.value.maxItemOnPage)
    } else return true
}

const search = (item: Orders) => {
    if (props.search.search == '') return true
    switch (props.search.id){
        case 1:
            return item.name.toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
        case 2:
            return String(item.n).toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
        case 3:
            return item.date.toUpperCase().indexOf(props.search.search.toUpperCase()) != -1
        default:
            return true
    }
    // {id: 1, name: 'Наименование'},
    // {id: 2, name: 'Контрагент'},
    // {id: 3, name: 'Номер'},
    // {id: 4, name: 'Дата создания'},

}

const checkPeriod = (date: string) => {
    if (props.period == 'Все') {
        return true
    } else {
        const start = props.period?.split(' - ')[0]
        const year = start?.substring(6,10)
        const month = start?.substring(3,5)
        return year == date.substring(6,10) && month == date.substring(3,5)
    }
}

const checkStatus = (item: Orders) => {
    if (props.status == 'Все'){
        return true
    } else {
        if (Array.isArray(item.checks)){
            return item.checks.findIndex( x => {
                const id = OrdersSatusCode.find(c=> c.name==props.status)?.id
                return (id && id-1 == x.status)
            }) !=-1
        }
        else
            return false
    }
}

const downloadBill = (uuid: string): void=>{
    loading_bill.value.push(uuid)
    store.dispatch(OrderActions.GET_BILL_FILE_SAVE, uuid)
        .finally( () => { loading_bill.value = loading_bill.value.filter(item => item !== uuid)})
}

const getStorageName = (partner_guid: string, organization_id: string): string=>{
    const storages = <StorageCompany[]>store.getters.getCompanyStoragesData(partner_guid)
    const storage = storages.find(x  => x.guid == organization_id)
    return storage ? storage.name.replace(/(^|\s)\S/g, s => s.toUpperCase()).replace(/(ООО)|(")|(\s)|([а-я])/g, '') : 'Склад'
}

const setOrderId = (id: number) => {
    store.commit(KeysMutations.SET_CURRENT_ORDER, id)
    tempOrderId.value 	= id
    tempKPType.value = KP_TYPES.ORDER
}

const goToKP = async (orderId: number) => {
    loading_global.value=true
    await store.dispatch(OrderActions.GET_ORDER_DETAIL, orderId)
    store.commit(KPMutations.SET_KP_OFFER_POSITION, store.getters.getOrderDetail.position)
    store.commit(KPMutations.SET_KP_STEP, 2)
    loading_global.value=false
    await router.push('/kp')
}

const setClaimOrderId = (id: number) => {
    loading_global.value = true
    store.commit(OrderMutations.CLEAN_ORDER_DETAIL)
    store.commit(ClaimMutations.CLEAR_CLAIMS_NEW)
    store.dispatch(ClaimActions.ADD_CLAIMS_NEW, id).then(() => {
        loading_global.value = false
        router.push('/claims/request')
    })

}

const billRequestLoading = (id: number, check: Check) => {
    if (billRequestLoadingState.value == -1) {
        billRequestLoadingState.value = check.id
        const check_data = Object.assign({},<Check>{
            guid: check.guid,
            id: check.id,
            n: check.n,
            organization_id: check.organization_id,
            status: check.status,
        })
        store.dispatch(OrdersActions.GET_ORDERS_BILL_REQUEST, {id, check: check_data})
            .then(()=>{billRequestLoadingState.value = -1})
            .catch(()=>{billRequestLoadingState.value = -1})
    }
}

//скачать сертификаты
const downloadCertificates = (check: Check) => {
    loading_global.value = true
    let guid = check.guid
    store.dispatch(OrdersActions.GET_ORDERS_DOWNLOAD_CERTIFICATED, guid)
        .then(()=>{ loading_global.value = false; })
}

const downloadAllCertificates = (item: Orders) => {
    loading_global.value = true
    let ordersUIDs = <string[]>[];
    item.checks?.forEach( (i: Check) => { ordersUIDs.push(i.guid) } )
    //todo: подождать реализацию метода для массива счетов на беке
    store.dispatch(OrdersActions.GET_ORDERS_DOWNLOAD_CERTIFICATED_ALL, ordersUIDs)
        .then(()=>{ loading_global.value = false; })
}

// Изменение колонок таблици
const table = ref()
const tableWidth = ref(0)
const isColumnResize = ref('')
const showTableMenu = ref(false)
const tableMenu = ref()
onClickOutside(tableMenu, () => {
    showTableMenu.value = false
});

interface TableWidthUnit {
    name: string,
    width: number,
    unit: string,
    min: number,
    disabled: boolean,
    visible: boolean
}
interface TableWidth {
    id: TableWidthUnit,
    name: TableWidthUnit,
    partner_name: TableWidthUnit,
    n: TableWidthUnit,
    date: TableWidthUnit,
    status: TableWidthUnit,
    delivery_tersm: TableWidthUnit,
    comment: TableWidthUnit,
    info: TableWidthUnit,
}

const tableColumnDefault = <TableWidth>{ id: {name: '№', width: 3, unit: '%', min: 10, visible: true, disabled: true},
    name: {name: 'Заказ', width:9, unit: '%', min: 10, visible: true, disabled: false},
    date: {name: 'Дата создания', width:14, unit: '%', min: 10, visible: true, disabled: false},
    partner_name: {name: 'Организация', width:12, unit: '%', min: 10, visible: true, disabled: false},
    n: {name: 'УПД', width:6, unit: '%', min: 5, visible: true, disabled: false},
    status: {name: 'Статус', width:9, unit: '%', min: 10, visible: true, disabled: false},
    delivery_tersm : {name: 'Отгрузка', width:9, unit: '%', min: 10, visible: true, disabled: false},
    comment: {name: 'Комментарии', width:26, unit: '%', min: 10, visible: true, disabled: false},
    info: {name: 'Инфо', width:8, unit: '%', min: 10, visible: true, disabled: true}}

const tableColumn = ref<TableWidth>(_.cloneDeep(tableColumnDefault))

const mouseMoveEvent = (e: any) => {
    const percent = (e.movementX / tableWidth.value) * 100

    if (Object.keys(tableColumn.value).reduce( (sum, i)=> tableColumn.value[i  as keyof TableWidth].visible ? sum + tableColumn.value[i  as keyof TableWidth].width : sum, 0)+percent < 100 &&
        tableColumn.value[isColumnResize.value  as keyof TableWidth].width + percent > tableColumn.value[isColumnResize.value  as keyof TableWidth].min
    )
        tableColumn.value[isColumnResize.value  as keyof TableWidth].width = tableColumn.value[isColumnResize.value  as keyof TableWidth].width + percent

}
const onMouseDown = (e: any, columnName: string) => {
    isColumnResize.value = columnName
    document.addEventListener('mousemove', mouseMoveEvent)
}
const onMouseUp = () => {
    document.removeEventListener('mousemove', mouseMoveEvent)
    isColumnResize.value = ''
    saveTableColumn()
}
const calcTableWidth = () => {
    const sum = Object.keys(tableColumn.value).reduce( (sum, i)=> tableColumn.value[i  as keyof TableWidth].visible ? sum + tableColumn.value[i  as keyof TableWidth].width : sum, 0)
    if (sum > 100 ) {
        Object.keys(tableColumn.value).forEach(i => {
            if (i != 'id'){
                tableColumn.value[i  as keyof TableWidth].width = tableColumn.value[i  as keyof TableWidth].width - ((sum-100)/6)
            }
        })
    }

}
const clearTableWidth = () => {
    tableColumn.value = <TableWidth>JSON.parse(JSON.stringify(tableColumnDefault))
    saveTableColumn()
}
const saveTableColumn = () => {
    calcTableWidth()
    localStorage.setItem('orders_list_table', JSON.stringify(tableColumn.value));
}
onMounted(() => {
    nextTick(() => {
        // Маркер обновления данных в о состоянии колонок в LocalStorage
        const orders_list_table_timestamp = localStorage.getItem('orders_list_table_timestamp');
        if (orders_list_table_timestamp == null || parseInt(orders_list_table_timestamp) < 1683731260000) {
            localStorage.setItem('orders_list_table_timestamp', '1683731260000');
            clearTableWidth()
        }

        tableWidth.value = table.value.getBoundingClientRect().width
        const orders_list_table = localStorage.getItem('orders_list_table');

        if (orders_list_table) tableColumn.value = <TableWidth>JSON.parse(orders_list_table )
        if (!tableColumn.value.comment){
            tableColumn.value = JSON.parse(JSON.stringify(tableColumnDefault))
            localStorage.setItem('orders_list_table', JSON.stringify(tableColumn.value));
        }
    })
})
</script>
