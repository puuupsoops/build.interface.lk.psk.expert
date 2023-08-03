<template>
<div>

    <div class="authorization" v-if="!isAuth">
        <div class="authorization-body">
            <div class="authorization-logo">
                <img src="/src/assets/img/login/logo.png" alt="логотип">
            </div>
            <Form @submit="onLogin" class="authorization-form">

                <Field
                    as="input"
                    v-model="authData.login"
                    class="authorization-input"
                    name="Login"
                    placeholder="Логин"
                    autocomplete="off"
                    rules="required|minLength:3"
                />
                <ErrorMessage name="Login" />
                <Field
                    as="input"
                    type="password"
                    v-model="authData.password"
                    class="authorization-input"
                    name="password"
                    placeholder="Пароль"
                    autocomplete="off"
                    rules="required|minLength:3"
                />

                <label class="authorization-check">
                    <input
                        v-model="saved"
                        class="check-input"
                        type="checkbox"
                        name="remember"
                    >
                    <span class="checkbox-custom"></span>
                    <span class="check-txt">Запомнить меня</span>
                </label>

                <button
                    class="authorization-btn"
                    type="submit"
                    :disabled="loader"
                >Войти</button>
            </Form>
        </div>

        <div class="authorization-bottom">
            Produced by Expert Workwear
        </div>
    </div>


    <SnackBar v-model="loginError" :message="loginErrorMsg"></SnackBar>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '/src/store'

import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import SnackBar from '/src/components/ui/SnackBar.vue'
import { AuthMutations } from '/src/store/auth/mutations'
import { AuthActions } from '/src/store/auth/actions'
import { KeysMutations } from '/src/store/keys/mutations'
import { AuthRequest } from '/src/models/Auth'
import { CompanyActions } from '/src/store/company/actions'
import { ProfileActions } from '../store/profile/actions'
import { wsStoreActions } from '../plugins/wsStore'


const store = useStore()
const router = useRouter()
const authData = ref<AuthRequest>({
    login: '',
    password: ''
})

const saved = ref<boolean>(false)

const loader = computed<boolean>({
    get: () => store.getters.getLoader,
    set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
})
const isAuth = computed(() => store.getters.isAuthenticated)
const loginErrorMsg = computed(() => store.getters.getLoginErrorMsg)

defineRule('required', (value: string) => {
    if (!value || !value.length) {
        return 'Обязательное поле'
        }
        return true
})
defineRule('minLength', (value: string, [limit]: number[]) => {
    if (!value || !value.length) {
        return true
    }
    if (value.length < limit) {
        return `Минимум ${limit} символа`
    }
    return true
})

const loginError = computed({
    get: () => store.getters.getLoginError,
    set: () => store.commit(AuthMutations.CLEAR_LOGIN_ERROR)
})

const onLogin = () => {
    loader.value=true
    store.dispatch(AuthActions.LOGIN, authData.value)
            .finally(async () => {
                if (saved.value) await store.commit(AuthMutations.SET_SAVE_AUTH)
                await store.commit(AuthMutations.SET_AUTH_LOGIN,authData.value.login)
                await Promise.all([
                    store.dispatch(CompanyActions.GET_COMPANYS),
                    store.dispatch(ProfileActions.GET_PROFILE)
                ])
                loader.value=false
                await store.dispatch(wsStoreActions.AUTH_WS)
                await router.push('/')
            })
            .catch(() => {
                authData.value.password = ''
                setTimeout(() => {loader.value=false}, 3000)
            })
}



</script>

<style scoped lang="sass">


</style>