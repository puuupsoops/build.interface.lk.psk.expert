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

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '/src/store'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import SnackBar from '/src/components/ui/SnackBar.vue'
import { AuthMutations } from '/src/store/auth/mutations'
import { AuthActions } from '/src/store/auth/actions'
import { KeysMutations } from '/src/store/keys/mutations'
import { AuthRequest } from '/src/models/Auth'
import { CompanyActions } from '/src/store/company/actions'

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
		const authData = ref<AuthRequest>({
			login: '',
			password: ''
		})

		const saved = ref<boolean>(false);
		
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
				store.dispatch(AuthActions.LOGIN, authData.value)
						.then(() => {
							if (saved.value) store.commit(AuthMutations.SET_SAVE_AUTH)
							store.commit(AuthMutations.SET_AUTH_LOGIN,authData.value.login)
							Promise.all([
								store.dispatch(CompanyActions.GET_COMPANYS),
								store.dispatch(CompanyActions.GET_MANAGER)
							])
							.catch(()=>{
								authData.value.password = '';
								setTimeout(() => {loader.value=false;}, 3000);
							})
							.finally(() => {
								loader.value=false;
								router.push({name: 'Main'});
							})		
						})
						.catch(() => {
							authData.value.password = '';
							setTimeout(() => {loader.value=false;}, 3000);
						})
					}, 500);
			
		};


		return {
			isAuth: computed(() => store.getters.isAuthenticated),
			loginError,
			loginErrorMsg: computed(() => store.getters.getLoginErrorMsg),
			loader,
			authData,
			saved,
			onLogin,
		}

	}
});
</script>

<style scoped lang="sass">


</style>