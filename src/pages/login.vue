<template>
	<div class="auth-box" v-if="!isAuth">
		<Preloader v-if="isLoad"></Preloader>
		<div class="bx-authform" >
			<h3 class="bx-title" style="text-align: center">Авторизация</h3>

			<form> 
				<div class="bx-authform-formgroup-container">
					<div class="bx-authform-label-container">Логин</div>
					<div class="bx-authform-input-container">
						<input 
							type="text" 
							maxlength="255" 
							v-model="login"/>
					</div>
				</div>

				<div class="bx-authform-formgroup-container">
					<div class="bx-authform-label-container">Пароль</div>
					<div class="bx-authform-input-container">
						<input
							type="password" 
							maxlength="255"
							autocomplete="off"
							v-model="password"
						/>
					</div>
				</div>

				<div class="bx-authform-formgroup-container">
					<div class="checkbox">
						<label class="bx-filter-param-label">
							<input
								type="checkbox"
								v-model="saved"
							/>
							<span class="bx-filter-param-text"
								>Запомнить меня на этом компьютере</span
							>
						</label>
					</div>
				</div>
				<div class="bx-authform-formgroup-container" >
					<input
						type="submit"
						:style="isLoad? 'background: linear-gradient(90deg, #8d8f92 0%, #303030 100%}' : 'background: linear-gradient(90deg, #b995fe 0%, #8444fc 100%)'"
						class="gradient-btn"
						:disabled="isLoad"
						value="Войти"
						@click.prevent="onLogin()"
					/>
				</div>
			</form>
			
		</div>
		


	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import Preloader from '@/components/Preloader'

export default {
	components: {
		Preloader
	},
	setup(){
		const store = useStore();
		const router = useRouter();
		const login = ref('');
		const password = ref('');
		const saved = ref(false);

		let isLoad = ref(false);

		let onLogin = () => {
			isLoad.value = true;
			setTimeout(() => {
				store.dispatch('LOGIN', {
						"login": login.value,
						"password": password.value,
						"save": saved.value,
					})
						.then(() => {
								isLoad.value = false;
								router.push({name: 'Main'});
							})
						.catch(() => {
							password.value = '';
							setTimeout(() => {isLoad.value = false;}, 3000);
						})
					}, 1000);
		};


		return {
			isAuth: computed(() => store.getters.isAuthenticated),
			isLoad,
			login,
			password,
			saved,
			onLogin,
		}

	}
};
</script>

<style scoped lang="sass">

.auth-box
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, 70%)


.bx-authform-content-container, .bx-authform-label-container
  font-size: 13px
  color: #5a6c77
  padding-bottom: 2px


.bx-authform-input-container input[type="text"], .bx-authform-input-container input[type="password"]
  display: block
  width: 100% 
  font-size: 18px
  height: 38px
  margin: 0
  padding: 0 4px
  border: 1px solid #ccd5db
  border-radius: 2px
  background: #f8fafc
  outline: 0
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box

.bx-authform-formgroup-container
  margin-bottom: 25px

.bx-authform-input-container
  position: relative

.bx-filter-param-text
  padding: 0 5px


</style>