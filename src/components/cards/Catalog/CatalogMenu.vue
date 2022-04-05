<template>
	<div class="catalog-menu">
		<div class="catalog-menu-heading">Каталог
				<span
					class="catalog-menu-heading-add" 
					:title="!showMenu ? 'Показать' : 'Скрыть'"
					@click="$emit('update:showMenu', showMenu ? false : true)" >
					{{ !showMenu ? '+' : '-' }}
				</span>
		</div>
			
		
		
		<transition name="fade">
			<div v-if="showMenu">
				<ul class="catalog-menu-nav" v-if="!loading">

					<li
						class="catalog-menu-nav-elem "
						v-for="item in data"
						:key="item.id"
					>
						<div class="catalog-menu-nav-elem-wrap" @click="push(item.id)">
							<div class="catalog-menu-nav-arrow" v-if="item.sub">
								<img
									:class="menuOpen.indexOf(item.id) !== -1 ? 'catalog-menu-nav-arrow active': 'catalog-menu-nav-arrow'"
									src="@/assets/img/icon/arrow-nav-r.svg"
									alt=""
									/>
							</div>
							<div :class="menuOpen.indexOf(item.id) !== -1 ? 'catalog-menu-nav-text active' : 'catalog-menu-nav-text'">
								{{ item.name }}
							</div>
						</div>
						
						<div v-if="item.sub" :class="menuOpen.indexOf(item.id) != -1 ? 'catalog-menu-nav-dropdown active':'catalog-menu-nav-dropdown'">
							<ul class="catalog-menu-nav-dropdown-list">
								<li
									v-for="child in item.sub"
									:key="child.id"
								> 
									<router-link 
										tag="a" 
										:to="'/catalog/catalog/'+child.code"
										class="catalog-menu-nav-dropdown-link" 
										active-class="catalog-menu-nav-dropdown-link active"
										@click="$emit('update:catalogName', child.name)"
									>
										{{child.name}}
									</router-link>

								</li>
							</ul>
						</div>
					</li>

				</ul>
				<PreloaderLocal v-else></PreloaderLocal>
			</div>
		</transition>
	</div>
</template>

<script>
import PreloaderLocal  from '@/components/PreloaderLocal.vue';

import { ref } from 'vue';

export default {
	props: {
		data: {
			type: Object
		},
		loading: {
			type: Boolean,
			default: true
		},
		catalogName:{
			type: String
		},
		showMenu:{
			type: Boolean
		}
	},
	emits: ['update:showMenu', 'update:catalogName'],
	components: {
		PreloaderLocal
	},
	setup() {
		let menuOpen = ref([]);
		
		let push = (id) => {
			menuOpen.value.indexOf(id) != -1 ? menuOpen.value.splice(menuOpen.value.indexOf(id)) : menuOpen.value.push(id)
		}
		return {
			menuOpen,
			push
		}
	}
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: all 0.35s ease;
}
.fade-enter-from, .fade-leave-to  {
  transform: translateY(-50px);
  max-height: 0px;
  opacity: 0;
}
</style>