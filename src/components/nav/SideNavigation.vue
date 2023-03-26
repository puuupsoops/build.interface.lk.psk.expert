<template>
  <div class="sidebar-menu-wrap" >
    <div :class="{'sidebar-menu': true, 'show': modelValue}">
      <div class="sidebar-menu-wrap">
        <div class="sidebar-heading">{{active_item===-1 ? 'Мои компании': menu[active_item].title}}</div>
        <ul class="sidebar-nav">
          <li
              class="sidebar-nav-elem "
              v-for="(item, id) in menu"
              :key="id"
          >
            <div class="sidebar-nav-elem-wrap"
                 @click="active_item === id ? active_item = -1 : active_item = id"
            >
              <div class="sidebar-nav-arrow" v-if="item.children">
                <svgArrowNavRight :class="{'sidebar-nav-arrow': true, 'active': active_item===id}"></svgArrowNavRight>
              </div>

              <div
                  v-if="item.children"
                  class="sidebar-nav-text"
                  :class="{'active': active_item === id,'lock': item.lock}"
                  :tooltip="item.lock ? 'Раздел находится в разработке':''"
                  flow="up"
              >
                <span >{{ item.title }} </span>
                <svgLock v-if="item.lock"></svgLock>
              </div>
              <router-link v-else @click="$emit('close')" :to="item.lock ? '#' : item.link"
                           class="sidebar-nav-text"
                           :class="{'lock': item.lock}"
                           :tooltip="item.lock ? 'Раздел находится в разработке':''"
                           flow="up"
              >
                <span>{{ item.title }}</span>
                <svgLock v-if="item.lock"/>
              </router-link>

            </div>
            <div v-if="item.children" :class="{'sidebar-nav-dropdown': true, 'active': active_item===id}">
              <ul class="sidebar-nav-dropdown-list">
                <li
                    v-for="(child, i) in item.children"
                    :key="i"
                >
                  <router-link
                      v-if="child.link == 'draft'"
                      :to="'#'"
                      class="sidebar-nav-dropdown-link "
                      @click="$emit('close'); showDraft = true"
                  >
                    {{ child.title }}
                  </router-link>
                  <router-link
                      v-else
                      :to="child.link"
                      @click="$emit('close')"
                      class="sidebar-nav-dropdown-link"
                      :class="{'lock': child.lock }"
                      active-class="sidebar-nav-dropdown-link active"
                      :tooltip="child.lock ? 'Раздел находится в разработке':''"
                      flow="up"
                  >
                    <span>{{ child.title }}</span>
                    <svgLock v-if="child.lock"></svgLock>
                  </router-link>
                </li>
              </ul>
            </div>
            <div v-else>
              <router-link
                  @click="$emit('close')"
                  :to="item.link"
                  :class="'sidebar-nav-dropdown-list' + (item.lock ? ' lock':'')"
                  active-class="sidebar-nav-dropdown-link active"
              >
              </router-link>
            </div>
          </li>
        </ul>
        <router-link to="#" @click="$emit('close'); showFeedbackModal=true">
          <div class="sidebar-logo">
            <img class="sidebar-logo-img" src="/src/assets/img/lamp.png"/>
            <div class="sidebar-logo-text">
              <span>Сделай лучше<br>наше сотрудничество</span>
            </div>
          </div>
        </router-link>
        <div class="sidebar-logo-version">
          Версия {{version}}
        </div>
      </div>
    </div>
    <div  class="sidebar-menu-bg" v-if="modelValue" @click="$emit('close')"></div>
  </div>
  <OrderDraftModal v-model="showDraft"/>
  <FeedbackModal v-model="showFeedbackModal"/>
</template>

<script  setup lang="ts">

import { computed, ref } from 'vue'
import { useStore } from '/src/store'
import { CompanyActions } from '/src/store/company/actions'
import { normalizeCompanyName } from '/src/models/Partner'
import OrderDraftModal from '/src/components/cards/Order/OrderDraftModal.vue'
import FeedbackModal from '/src/components/cards/Main/FeedbackModal.vue'
import svgLock from '/src/assets/img/icon/lock.svg'
import svgArrowNavRight from '/src/assets/img/icon/arrow-nav-r.svg'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['update:modelValue', 'close'])
const store = useStore();
// eslint-disable-next-line no-undef
const version = APP_VERSION
const active_item = ref(0)
const showDraft = ref(false)
const showFeedbackModal = ref(false)

const menu = computed(() => {
  const menu_start = [
    {title: 'Мои компании', link: null, lock: false, children: [
      ]},
    {title: 'Рабочий стол', link: null, lock: false, children: [
        {title: 'Поиск товара', link: '/product', lock: false, collapsed: false},
        {title: 'Заказы', link: '/orders', lock: false, collapsed: false},
        {title: 'Отгрузки', link: '/shipments', lock: false, collapsed: false},
        {title: 'Претензии', link:'/claims', lock: false, collapsed: false},
        {title: 'Черновики', link: 'draft', lock: false, collapsed: false},
        {title: 'Создать КП', link: '/kp', lock: false, collapsed: false},
        {title: 'Макет нанесения', link: '/logo', lock: false, collapsed: false},
        {title: 'История', link: '/history', lock: true, collapsed: false},

      ]},
    {title: 'Логистика', link: '/settlements', lock: false, children: [
        {title: 'Заявка на отгрузку', link: '/shipments/request', lock: false, collapsed: false},
        {title: 'Адреса Доставки', link: '/shipments/address', lock: false, collapsed: false},
      ]},
    {title: 'Сертификаты', link: '/certificate', lock: false, children: null },
    //{title: 'Сертификаты', link: null, lock: true, children: [
    //	{title: 'Разрешительная', link: '/permissive', lock: true, collapsed: false},
    //	{title: 'Нормативная', link: '/regulatory', lock: true, collapsed: false},
    //	{title: 'Доп.Информация', link: '/dop_info', lock: true, collapsed: false},
    //]},
    {title: 'Взаиморасчеты', link: '/settlements', lock: true, children: [
        {title: 'Счета', link: '/bills', lock: true, collapsed: false},
        {title: 'Реализации', link: '/realization', lock: true, collapsed: false},
        {title: 'Корректировки', link: '/adjustments', lock: true, collapsed: false},
        {title: 'Акты сверки', link: '/acts', lock: true, collapsed: false},
        {title: 'ЭДО', link: '/edo', lock: true, collapsed: false},
      ]},
    {title: 'Каталог', link: null, lock: false, children: [
        {title: 'Электронный', link: '/catalog/catalog', lock: false, collapsed: true},
        {title: 'Интерактивный', link: '/catalog/interactive', lock: false, collapsed: true},
      ]},
    {title: 'Маркетинг', link: null, lock: true, children: [
        {title: 'Баннеры', link: '/banners', lock: true, collapsed: false},
        {title: 'Фотографический материал', link: '/photo_mat', lock: true, collapsed: false},
        {title: 'Обучающий материал', link: '/ed_mat', lock: true, collapsed: false},
        {title: 'Интеграции', link: '/integration', lock: true, collapsed: false},
      ]},
    {title: 'Novelty', link: '/Novelty', lock: true, children: null },
    {title: 'Контакты', link: '/contacts', lock: true, children: null},
    {title: 'Help', link: '/help', lock: false, children: null},
    {title: 'Выход', link: '/logout', lock: false, children: null},
  ]
  const arr = [];
  if (!store.getters.isCompanysLoad) {
    store.dispatch(CompanyActions.GET_COMPANYS);
  }
  store.getters.getCompanys.forEach((element: { name: string; uid: string; }) => {
    arr.push({title: normalizeCompanyName(element.name),
      link: '/company/'+element.uid,
      lock: false,
      collapsed: false,
    })
  });
  arr.push({title: 'Договоры', link: '/agreements', lock: true, collapsed: false,});
  arr.push({title: 'Аналитика', link: '/analytics', lock: true, collapsed: false,});
  arr.push({title: 'Программа лояльности', link: '/loyalty', lock: true, collapsed: false,});
  menu_start[0].children = arr;
  return menu_start;
});


</script>
