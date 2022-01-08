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

<script>
import { ref, computed, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import SnackBar from '@/components/ui/SnackBar.vue';
import { AuthMutations } from '@/store/auth/mutstions';


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
			set: () => store.commit(AuthMutations.CLEAR_LOGIN_ERROR)
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