<template>
  <a 
    :class="[link, notification, (amount > 0) ? active : '']" 
    href="#">
    
    <svg
      class="top-line-link-img"
      width="24"
      height="27"
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.8411 21.7618L22.769 21.831L22.8411 21.7617C20.7863 19.6188 19.6547 16.8039 19.6547 13.8351V11.498C19.6547 8.06943 17.393 5.16002 14.2837 4.18163V3.19727C14.2837 1.93046 13.2532 0.9 11.9864 0.9C10.7196 0.9 9.68912 1.93046 9.68912 3.19727V4.18163C6.57977 5.16002 4.31803 8.06938 4.31803 11.498V13.8351C4.31803 16.804 3.18649 19.6188 1.13164 21.7617C0.900786 22.0025 0.835909 22.3577 0.966767 22.6645C1.09762 22.9713 1.39896 23.1703 1.73248 23.1703H8.3172C8.69703 24.8455 10.1977 26.1 11.9864 26.1C13.7751 26.1 15.2757 24.8455 15.6556 23.1703H22.2403C22.5738 23.1703 22.8751 22.9712 23.006 22.6645C23.1368 22.3577 23.0719 22.0025 22.8411 21.7618ZM11.354 3.19727C11.354 2.84864 11.6378 2.56484 11.9864 2.56484C12.335 2.56484 12.6188 2.84864 12.6188 3.19727V3.8559C12.4103 3.83871 12.1994 3.82969 11.9864 3.82969C11.7734 3.82969 11.5625 3.83871 11.354 3.8559V3.19727ZM11.9864 24.4352C11.1259 24.4352 10.3848 23.914 10.0619 23.1703H13.9109C13.588 23.914 12.8468 24.4352 11.9864 24.4352ZM3.50859 21.5055C5.1145 19.2837 5.98287 16.6182 5.98287 13.8351V11.498C5.98287 8.1878 8.67614 5.49453 11.9864 5.49453C15.2966 5.49453 17.9899 8.1878 17.9899 11.498V13.8351C17.9899 16.6182 18.8583 19.2837 20.4642 21.5055H3.50859Z"
        fill="#A5A7A9"
        stroke="#A5A7A9"
        stroke-width="0.2"
      ></path>
    </svg>
    <div class="top-line-notification-val" v-if="(amount > 0)">
      <div class="top-line-notification-num">{{amount}}</div>
    </div>
  </a>
</template>

<script lang="ts">
export default {
    props:{
        amount:{
            type: Number,
            require: true
        }
    },
    data(){
        return {
            link: 'top-line-link',
            notification: 'top-line-notification',
            active: 'active'
        }
    }
};
</script>

<style>
</style>