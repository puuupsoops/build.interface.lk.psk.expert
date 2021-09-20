<template>
  <div class="top-line-info">
    <div class="top-line-info-text">
      Уважаемые клиенты, в связи с короновирусорм склад работает до 15600
    </div>
    <div class="top-line-info-close">
      <svg
        class="top-line-info-close-img"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.250031"
          y="2.07935"
          width="2.25351"
          height="22.5351"
          rx="1.12676"
          transform="rotate(-45 0.250031 2.07935)"
          fill="#A5A7A9"
        ></rect>
        <rect
          width="2.25351"
          height="22.5351"
          rx="1.12676"
          transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 17.5282 2.07935)"
          fill="#A5A7A9"
        ></rect>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    let $ = window.$;

    $('.top-line-info-close').click(function() {
      $(this).parent().fadeOut();
    });

  }
};
</script>

<style>
</style>