<template>
	<div class="sidebar-menu">
		<!-- <div style="margin: 0 0 0 170px; display: inline-flex;">
			Debug
			<label class="sidebar-switch">
				
				<input id="input" v-model="isDebug" type="checkbox" />
				<div></div>
				
			</label>
		</div> -->
		<div class="sidebar-heading">{{modelValue==-1 ? 'Мои компании': menu[modelValue].title}}</div>
		<ul class="sidebar-nav">
			<li
				class="sidebar-nav-elem "
				v-for="(item, id) in menu"
				:key="id"
			>
				<div class="sidebar-nav-elem-wrap"
					@click="modelValue === id ? $emit('update:modelValue', -1) : $emit('update:modelValue',  id) "
				>
					<div class="sidebar-nav-arrow" v-if="item.children">
						<img
							:class="modelValue===id ? 'sidebar-nav-arrow active': 'sidebar-nav-arrow'"
							src="@/assets/img/icon/arrow-nav-r.svg"
							alt=""
							/>
					</div>
					
					<div 
						v-if="item.children"
						:class="'sidebar-nav-text' + (modelValue==id ? ' active' : '') + (item.lock ? ' lock' : '')"
					>
						<span >{{ item.title }} </span>
						<span
							v-if="item.lock"
							class="tooltip"
						>
							<img src="@/assets/img/icon/lock.svg"/>
							<span class="tooltiptext">Раздел находится в разработке</span>
						</span>

					</div>
					<router-link
								v-else
								tag="a"
								:to="item.lock ? '#' : item.link" 
								:class="'sidebar-nav-text' + (item.lock ? ' lock':'')" 
							>
							{{ item.title }}
						<span
							v-if="item.lock"
							class="tooltip"
						>
							<img src="@/assets/img/icon/lock.svg"/>
							<span class="tooltiptext">Раздел находится в разработке</span>
						</span>
						</router-link>
			
			
			
				</div>
				<div v-if="item.children" :class="modelValue===id ? 'sidebar-nav-dropdown active':'sidebar-nav-dropdown'">
					<ul class="sidebar-nav-dropdown-list">
						<li
							v-for="(child, i) in item.children"
							:key="i"
						>
							<router-link
								tag="a"
								:to="child.link"
								@click="collapsed(child.collapsed)"
								:class="'sidebar-nav-dropdown-link' + (child.lock ? ' lock':'')" 
								active-class="sidebar-nav-dropdown-link active"
							>
								{{ child.title }}
								<span
									v-if="child.lock"
									class="tooltip"
								>
									<img src="@/assets/img/icon/lock.svg"/>
									<span class="tooltiptext">Раздел находится в разработке</span>
								</span>
							</router-link>
						</li>
					</ul>
				</div>
				<div v-else>
					<router-link
								tag="a"
								:to="item.link" 
								:class="'sidebar-nav-dropdown-list' + (item.lock ? ' lock':'')" 
								active-class="sidebar-nav-dropdown-link active"
							>
					</router-link>
				</div>
			</li>
		</ul>
		<div class="sidebar-logo">
			<img class="sidebar-logo-img" src="@/assets/img/lamp.png"/>
			<div class="sidebar-logo-text">
				<span>Сделай лучше<br>наше сотрудничество</span>
			</div>
			
		</div>
		<div class="sidebar-logo-version">
			Версия {{version}}
		</div>
		
	</div>

</template>

<script lang="ts">
import { key } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { KeysMutations } from '@/store/keys/mutations'
import { CompanyActions } from '@/store/company/actions'
import { AuthActions } from '@/store/auth/actions'


export default defineComponent({
	props: {
		modelValue: {
			type: Number,
			reqired: true
		}
	},
	emits: ['update:modelValue'],
	setup(){
		const store = useStore(key);
		const isDebug = computed<boolean>({
			get: () => store.getters.getIsDebug,
			set: (val: boolean) => store.commit(KeysMutations.SET_IS_DEBUG, val)
		})
		const menu = computed(() => {
			let menu_start = [
				{title: 'Мои компании', link: null, lock: false, children: [
				]},
				{title: 'Рабочий стол', link: null, lock: false, children: [
					{title: 'Поиск товара', link: '/product', lock: false, collapsed: false},
					{title: 'Заказы', link: '/orders', lock: false, collapsed: false},
					{title: 'Отгрузки', link: '/shipments', lock: false, collapsed: false},
					{title: 'Претензии', link:'/claims', lock: false, collapsed: false},
					{title: 'Конструктор КП', link: '/kp', lock: true, collapsed: false},
					{title: 'История', link: '/history', lock: true, collapsed: false},
					
				]},
				{title: 'Логистика', link: '/settlements', lock: false, children: [
					{title: 'Заявка на отгрузку', link: '/shipments/request', lock: false, collapsed: false},
					{title: 'Адреса Доставки', link: '/shipments/address', lock: false, collapsed: false},
				]},
				{title: 'Сертификаты', link: null, lock: true, children: [
					{title: 'Разрешительная', link: '/permissive', lock: true, collapsed: false},
					{title: 'Нормативная', link: '/regulatory', lock: true, collapsed: false},
					{title: 'Доп.Информация', link: '/dop_info', lock: true, collapsed: false},
				]},
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
					{title: 'Интеграции', link: '/ingration', lock: true, collapsed: false},
				]},
				{title: 'Novelty', link: '/Novelty', lock: true, children: null },
				{title: 'Контакты', link: '/contacts', lock: true, children: null},
				{title: 'Help', link: '/help', lock: false, children: null},
				{title: 'Выход', link: '/logout', lock: false, children: null},
			]
			let arr = [];
			if (!store.getters.isCompanysLoad) {
				store.dispatch(CompanyActions.GET_COMPANYS);
			}
			store.getters.getCompanys.forEach((element: { name: string; uid: string; }) => {
				arr.push({title: element.name
											.replace(/Общество с ограниченной ответственностью/, 'ООО')
											.replace(/Акционерное общество/, 'АО'),
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
		
		const collapsed = (isCollapsed: boolean) => {
			if (isCollapsed) store.commit(KeysMutations.SET_COLLAPSED, false)
		}
		return {
			menu,
			isDebug,
			//computed
			logout: ()=>store.dispatch(AuthActions.LOGOUT),
			version:  process.env.VUE_APP_VERSION,
			//method
			collapsed,
		}
	}
})
</script>
