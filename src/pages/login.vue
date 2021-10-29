<template>
<div>
	<div class="auth-box" v-if="!isAuth">
		<div class="auth-form" >
			<div class="auth-title">Авторизация</div>
				<Form @submit="onLogin"> 
					<div class="auth-formgroup">
						<div class="auth-formgroup-label">Логин</div>
						<div class="auth-formgroup-input">
							<Field as="input" v-model="login" name="Login" rules="required|minLength:3">
								
							</Field>
							<ErrorMessage name="Login" />
						
						</div>
					</div>

					<div class="auth-formgroup">
						<div class="auth-formgroup-label">Пароль</div>
						<div class="auth-formgroup-input">
							<Field as="input" type="password" v-model="password" name="password" rules="required|minLength:3">
								
							</Field>
							<ErrorMessage name="password" />
						
						</div>
					</div>

					<div class="auth-formgroup">
						<div class="auth-param">
							<input
								class="auth-param-input"
								type="checkbox"
								id="save-me"
								v-model="saved"
							/>
							<label class="auth-param-text" for="save-me">
								Запомнить меня на этом компьютере
							</label>
						</div>
					</div>
					<div class="auth-formgroup" >
						<input
							type="submit"
							:style="loader? 'background: linear-gradient(90deg, #8d8f92 0%, #303030 100%}' : 'background: linear-gradient(90deg, #b995fe 0%, #8444fc 100%)'"
							class="gradient-btn"
							:disabled="loader"
							value="Войти"
							
						/>
					</div>
				</Form>
			
		</div>

	</div>
	<SnackBar v-model="loginError" :message="loginErrorMsg"></SnackBar>
</div>
</template>

<script>
import { ref, computed, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import SnackBar from '@/components/cards/SnackBar';


export default {
	components:{
		Form,
		Field,
		ErrorMessage,
		SnackBar
	},	
	setup(){
		const store = useStore();
		const router = useRouter();
		const login = ref('');
		const password = ref('');
		const saved = ref(false);
		const loader = inject('loader');

		defineRule('required', value => {
			if (!value || !value.length) { 
				return 'Обязательное поле';	
				}
				return true;	
		});
		defineRule('minLength', (value, [limit]) => {
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
			set: () => store.commit('clearLoginError')
		})

		let onLogin = () => {
			loader.value=true;
			setTimeout(() => {
				store.dispatch('LOGIN', {
						"login": login.value,
						"password": password.value,
						"save": saved.value,
					})
						.then(() => {

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
};
</script>

<style scoped lang="sass">


</style>