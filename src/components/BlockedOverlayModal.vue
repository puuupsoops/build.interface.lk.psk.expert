<script setup lang="ts">
    import { ref } from "vue";
    import { onClickOutside } from '@vueuse/core'

    const props = defineProps({
        modelValue: {
            type: Array,
            default: [],
            required: false
        },
        manager: {
            type: Object,
            default: {},
            required: false
        }
    })

    const shake = ref(false);
    const targetModal = ref(null);

    onClickOutside(targetModal, () => {
			shake.value = true;
			setTimeout(() => {shake.value=false;}, 500);
		});

</script>

<template>
    <div>
        <div class="blocked-modal">
            <div class="blocked-modal__wrapper">
                <div 
                    :class="'blocked-modal__wrapper-content ' + (shake? ' shake' : '')"
                    ref="targetModal"
                >
                    <slot>
                        <div class="wrapper">
                            <div class="wrapper__left">
                                <div>
                                    <div><span><b>В конфигурации Вашей учетной записи обнаружены проблемы.</b></span></div> <br>
                                    <div>
                                        <span><i>Пожалуйста, свяжитесь с вашим персональным менеджером!</i></span>
                                    </div>
                                    <div style="margin: 8px 0px;">
                                        <div class="alert info">
                                            <span>Функционал работает в тестовом режиме. <br> Попробуйте переоткрыть приложение.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="wrapper__right">
                                <div class="manager-card">
                                    <div class="manager-card__img-wrapper">
                                        <img :src="manager.image ? manager.image : 'https://imgupscaler.com/images/samples/animal-after.webp'">
                                    </div>
                                    <div v-if="manager.name" class="manager-card__name">
                                        <span>{{ manager.name }}</span>
                                    </div>
                                    <div v-else class="manager-card__name">
                                        <span>Менеджер не найден</span>
                                    </div>
                                    <div v-if="manager.name" class="manager-card__position">
                                        <span>Персональный менеджер</span>
                                    </div>
                                    <div v-else class="manager-card__position">
                                        <span>Общий телефон для связи:</span>
                                    </div>
                                    <div class="manager-card__phone">
                                        <a href="tel:+74951033030">+7 495 103-30-30</a>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        <div class="errors-stack" v-if="modelValue.length > 0">
                            <span style="color: red">Обнаружены ошибки!</span>
                            <ul class="errors-stack__list">
                                <li v-for="(item, key) in modelValue" :key="key"><div class="alert danger"><span>{{ item }}</span></div></li>
                            </ul>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.errors-stack
    margin: 8px 0px

    &__list
        display: flex
        flex-direction: column
        row-gap: 8px
        list-style-type:  none

.alert
    position: relative
    padding: 8px 8px 8px 40px
    border-radius: 8px
    color: white
    font-size: 14px
    width: 100%

    &.info
        background-color: #9e6cfd
        
        & span::before
            content: ""
            display: block
            position: absolute
            margin-top: -10px
            margin-left: 8px
            top: 50%
            left: 0
            width: 20px
            height: 20px
            background-image: url('data:image/svg+xml,<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.27657" cy="9.27755" r="7.34414" stroke="%23FFFFFF" stroke-width="0.773067"/><path d="M6.43943 13.7734L7.73818 7.21783H8.92561L7.62686 13.7734H6.43943ZM8.67823 5.95618C8.45559 5.95618 8.27417 5.88609 8.13399 5.74591C8.00205 5.60572 7.93608 5.43668 7.93608 5.23877C7.93608 5.00788 8.01442 4.8141 8.1711 4.65743C8.32777 4.49251 8.53392 4.41005 8.78955 4.41005C9.00395 4.41005 9.18124 4.48014 9.32142 4.62032C9.46985 4.75226 9.54406 4.91305 9.54406 5.10271C9.54406 5.35834 9.46573 5.56449 9.30905 5.72117C9.15238 5.87784 8.9421 5.95618 8.67823 5.95618Z" fill="%23FFFFFF"/></svg>')
            background-size: cover
            background-position: center center
            background-repeat: no-repeat

    &.danger
        background-color: #b9342d

        & span::before
            content: ""
            display: block
            position: absolute
            margin-top: -10px
            margin-left: 8px
            top: 50%
            left: 0
            width: 20px
            height: 20px
            background-image: url('data:image/svg+xml,<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8.27657" cy="9.27755" r="7.34414" stroke="%23FFFFFF" stroke-width="0.773067"/><path d="M6.43943 13.7734L7.73818 7.21783H8.92561L7.62686 13.7734H6.43943ZM8.67823 5.95618C8.45559 5.95618 8.27417 5.88609 8.13399 5.74591C8.00205 5.60572 7.93608 5.43668 7.93608 5.23877C7.93608 5.00788 8.01442 4.8141 8.1711 4.65743C8.32777 4.49251 8.53392 4.41005 8.78955 4.41005C9.00395 4.41005 9.18124 4.48014 9.32142 4.62032C9.46985 4.75226 9.54406 4.91305 9.54406 5.10271C9.54406 5.35834 9.46573 5.56449 9.30905 5.72117C9.15238 5.87784 8.9421 5.95618 8.67823 5.95618Z" fill="%23FFFFFF"/></svg>')
            background-size: cover
            background-position: center center
            background-repeat: no-repeat

.wrapper
    display: flex
    flex-direction: row
    column-gap: 32px

    &__left
        max-width: 1320px
.manager-card
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    row-gap: 4px

    &__img-wrapper
        max-width: 100px
        max-height: 100px
        overflow: hidden
        border-radius: 100%
        margin: 4px

        & img
            width: 100%
            height: 100%
    
    &__position
        margin-top: 5px
        margin-bottom: 19px
        font-size: 12px
        line-height: 18px
        color: #A5A7A9
        text-align: center

    &__phone
        & a 
            position: relative
            text-decoration: none
            color: white
            
            &::before
                content: ""
                display: block
                position: absolute
                margin-top: -10px
                margin-left: -28px
                top: 50%
                left: 0
                width: 20px
                height: 20px
                background-image: url(/src/assets/img/icon/phone.svg)
                background-size: cover
                background-position: center center
                background-repeat: no-repeat

.blocked-modal
    display: block
    position: fixed
    z-index: 1000000000
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: auto
    background-color: rgba(0, 0, 0, 0.4)
    backdrop-filter: blur(4px)

    &__wrapper
        display: flex
        position: relative
        align-items: center
        justify-content: center
        height: 100%
        width: 100%

        &-content
            display: block
            position: absolute
            margin: 0 auto
            padding: 40px
            background: #292C32
            border-radius: 2px
            box-shadow: 0px 0px 30px rgb(0, 0, 0)

            &.shake
                animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both
                transform: translate3d(0, 0, 0)
                backface-visibility: hidden
                perspective: 1000px

                @keyframes shake
                        10%, 90% 
                            transform: translate3d(-1px, 0, 0)
                        20%, 80% 
                            transform: translate3d(2px, 0, 0)
                        30%, 50%, 70%
                            transform: translate3d(-4px, 0, 0)
                        40%, 60%
                            transform: translate3d(4px, 0, 0)
</style>