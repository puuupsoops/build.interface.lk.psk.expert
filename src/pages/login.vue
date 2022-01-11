<template>
<div>

	<div class="authorization" v-if="!isAuth">
		<div class="authorization-body">
			<div class="authorization-logo">
				<img src="~@/assets/img/login/logo.png" alt="логотип">
			</div>
			<Form @submit="onLogin" class="authorization-form">

				<Field 
					as="input"
					v-model="login"
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
					v-model="password"
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

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import SnackBar from '@/components/ui/SnackBar.vue'
import { AuthMutations } from '@/store/auth/mutations'
import { AuthActions } from '@/store/auth/actions'
import { KeysMutations } from '@/store/keys/mutations'

export default defineComponent({
	components:{
		Form,
		Field,
		ErrorMessage,
		SnackBar
	},	
	setup(){
		const store = useStore(key);
		const router = useRouter();
		const login = ref('');
		const password = ref('');
		const saved = ref(false);
		
		const loader = computed<boolean>({
			get: () => store.getters.getLoader,
			set: (val: boolean) => store.commit(KeysMutations.SET_LOADER, val)
		})
		
		defineRule('required', (value: string) => {
			if (!value || !value.length) { 
				return 'Обязательное поле';	
				}
				return true;	
		});
		defineRule('minLength', (value: string, [limit]: number[]) => {
			if (!value || !value.length) {
				return true;
			}
			if (value.length < limit) {
				return `Минимум ${limit} символа`;
			}
			return true;
		});

		let loginError = computed({
			get: () => store.getters.getLoginError,
			set: () => store.commit(AuthMutations.CLEAR_LOGIN_ERROR)
		})

		let onLogin = () => {
			loader.value=true;
			setTimeout(() => {
				store.dispatch(AuthActions.LOGIN, {
						"login": login.value,
						"password": password.value,
					})
						.then(() => {
							if (saved.value) store.commit(AuthMutations.SET_SAVE_AUTH)
							Promise.all([
								store.dispatch('GET_PARTNER'),
								store.dispatch('GET_MANAGER'),
							])
							.catch(()=>{
								password.value = '';
								setTimeout(() => {loader.value=false;}, 3000);
							})
							.finally(() => {
								loader.value=false;
								router.push({name: 'Main'});
							})		
						})
						.catch(() => {
							password.value = '';
							setTimeout(() => {loader.value=false;}, 3000);
						})
					}, 500);
			
		};


		return {
			isAuth: computed(() => store.getters.isAuthenticated),
			loginError,
			loginErrorMsg: computed(() => store.getters.getLoginErrorMsg),
			loader,
			login,
			password,
			saved,
			onLogin,
		}

	}
});
</script>

<style scoped lang="sass">


</style>