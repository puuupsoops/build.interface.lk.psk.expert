<template>
	<div class="sidebar-menu-wrap">
		<div class="sidebar-heading">Каталог</div>
		<ul class="sidebar-nav">
			<SideNavigationLink 
				v-for="item of menu" 
				:key="item.id" 
				:data="item"
				/>
		</ul>
	</div>
</template>

<script>
import SideNavigationLink from "./SideNavigationLink.vue";
import { useCatalogMenu } from '../../hooks/useCatalogMenu';

export default {
	components: {
		SideNavigationLink,
	},
	setup(){
			const {menu, isLoad} = useCatalogMenu();

			return {
					menu,
					isLoad
			}
	},
	mounted(){
	}
};
</script>

<style>
</style>