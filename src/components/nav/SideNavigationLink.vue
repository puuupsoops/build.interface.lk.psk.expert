<template>
  <li class="sidebar-nav-elem" v-if="data.sub.lenght == 0">
    <a class="sidebar-nav-link" href="#">{{ data.name }}</a>
  </li>

  <li class="sidebar-nav-elem" v-else>
    <div class="sidebar-nav-elem-wrap">
      <div class="sidebar-nav-arrow">
        <svg
          class="sidebar-nav-arrow-img"
          width="9"
          height="13"
          viewBox="0 0 9 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.11136 5.99274L2.32619 0.207681C2.19239 0.0737718 2.01377 0 1.82332 0C1.63286 0 1.45425 0.0737718 1.32044 0.207681L0.894407 0.633613C0.617182 0.911155 0.617182 1.36224 0.894407 1.63936L5.75235 6.4973L0.889017 11.3606C0.755213 11.4945 0.681335 11.6731 0.681335 11.8634C0.681335 12.054 0.755213 12.2325 0.889017 12.3665L1.31505 12.7923C1.44896 12.9262 1.62747 13 1.81793 13C2.00838 13 2.187 12.9262 2.3208 12.7923L8.11136 7.00198C8.24548 6.86764 8.31914 6.68829 8.31872 6.49762C8.31914 6.30622 8.24548 6.12697 8.11136 5.99274Z"
            fill="#A5A7A9"
          ></path>
        </svg>
      </div>
      <div class="sidebar-nav-text">{{ data.name }}</div>
    </div>
    <div class="sidebar-nav-dropdown">
      <ul class="sidebar-nav-dropdown-list">
        <li
        v-for="item of data.sub"
        :key="item.id"
        @click="getData(item.code)">
          <a class="sidebar-nav-dropdown-link" href="#">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      reqired: true,
    },
  },
  setup(_,{emit}){
    const getData = (code) => {
      emit('getData',code);

    };

    return{
      getData
    }

  },
  mounted(){
    let $ = window.$;

    $(this.$el).find('.sidebar-nav-elem-wrap').click(function(){
       var sidebarElem = $(this).parent();
        sidebarElem.toggleClass("active").siblings().removeClass("active");
        $(".sidebar-nav-dropdown").slideUp();
        if (sidebarElem.hasClass("active")) {
          sidebarElem.children(".sidebar-nav-dropdown").slideDown();
        }
    });

  }
};
</script>

<style>
</style>