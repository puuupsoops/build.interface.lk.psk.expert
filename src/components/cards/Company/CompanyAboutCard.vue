<template>

		<div :class="'company-head-about content-elem' + (edit ? ' edit':'')">
			<Form validateOnMount @submit="onSave()" :validation-schema="schema" ref="aboutForm">
				<div class="company-head-about-info">
					<div class="company-head-about-title">{{data.name}}</div>
					<div class="company-head-about-wrap">
						<router-link 
							v-if="!edit"
							class="company-head-about-add" 
							tag="a"
							:to="'/order'"
						>
							<img
								class="company-head-about-add-img"
								src="@/assets/img/icon/doc-add.svg"
								alt=""
							/>Добавить заказ
						</router-link >
						
						<div class="company-head-about-text" v-if="!edit" >
							<span  class="company-head-about-text-top">Город</span>
							<span class="company-head-about-text-bottom">{{data.city}}</span>
						</div>
						<div class="company-head-about-text edit" v-else style="width: 100%">
							<div class="input-textfield">
								<Field 
									name="City"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.city"
								>
									<input
										v-bind="field"
										type="text" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>Город</label>
									<ErrorMessage name="City" class="validationBox"/>
								</Field>
							</div>
						</div>
					</div>
					
					<div class="company-head-about-text-wrap" v-if="!edit">
						<div class="company-head-about-text">
							<span class="company-head-about-text-top">ИНН </span
							><span class="company-head-about-text-bottom">{{data.inn}}</span>
						</div>
						<div class="company-head-about-text">
							<span class="company-head-about-text-top">Телефон</span
							><span class="company-head-about-text-bottom">{{data.phone}}</span>
						</div>
						<div class="company-head-about-text">
							<span class="company-head-about-text-top">БИК </span
							><span class="company-head-about-text-bottom">{{data.bik}}</span>
						</div>
						<div class="company-head-about-text">
							<span class="company-head-about-text-top">E-mail</span
							><span class="company-head-about-text-bottom">{{data.email}}</span>
						</div>
						<div class="company-head-about-text">
							<span class="company-head-about-text-top">Р/сч</span
							><span class="company-head-about-text-bottom"
								>{{data.payment}}</span
							>
						</div>
						<div class="company-head-about-text">
							<span class="company-head-about-text-top">К/сч</span
							><span class="company-head-about-text-bottom"
								>{{data.correspondent}}</span
							>
						</div>
						<div class="company-head-about-text"  style="width: 100%;">
							<span class="company-head-about-text-top">Адрес</span
							><span class="company-head-about-text-bottom"
								>{{data.address}}</span
							>
						</div>
					</div>
					
					<div class="company-head-about-text-wrap" v-else>
						<div class="company-head-about-text edit">
							<div class="input-textfield">
								<Field 
									name="inn"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.inn"
								>
									<input
										v-bind="field"
										type="number" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>ИНН</label>
									<ErrorMessage name="inn" class="validationBox"/>
								</Field>
							</div>
							
						</div>
						<div class="company-head-about-text edit">
							<div class="input-textfield">
								<Field 
									name="phone"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.phone"
								>
									<input
										v-bind="field"
										type="text" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>Телефон</label>
									<ErrorMessage name="phone" class="validationBox"/>
								</Field>
								
							</div>
						</div>
						<div class="company-head-about-text edit">
							<div class="input-textfield">
								<Field 
									name="bik"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.bik"
								>
									<input
										v-bind="field"
										type="text" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>БИК</label>
									<ErrorMessage name="bik" class="validationBox"/>
								</Field>
								
							</div>
						</div>
						<div class="company-head-about-text edit">
							<div class="input-textfield">
								<Field 
									name="email"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.email"
								>
									<input
										v-bind="field"
										type="text" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>E-mail</label>
									<ErrorMessage name="email" class="validationBox"/>
								</Field>
								
							</div>
						</div>
						<div class="company-head-about-text edit">
							<div class="input-textfield">
								<Field 
									name="payment"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.payment"
								>
									<input
										v-bind="field"
										type="text" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>Р/сч</label>
									<ErrorMessage name="payment" class="validationBox"/>
								</Field>
								
							</div>
						</div>
						<div class="company-head-about-text edit">
							<div class="input-textfield">
								<Field 
									name="correspondent"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.correspondent"
								>
									<input
										v-bind="field"
										type="text" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>К/сч</label>
									<ErrorMessage name="correspondent" class="validationBox"/>
								</Field>
								
							</div>
						</div>
						<div class="company-head-about-text edit" style="width: 100%;">
							<div class="input-textfield">
								<Field 
									name="address"
									validateOnInput
									placeholder=" "
									autocomplete="off"
									v-slot="{ field, errors }"
									v-model="data_edit.address"
								>
									<input
										v-bind="field"
										type="text" 
										placeholder=" "
										:class="errors.length == 0 ? '' : 'error'"
									>
									<label>Адрес</label>
									<ErrorMessage name="address" class="validationBox"/>
								</Field>
							</div>
						</div>
					</div>
		
				</div>
				<div class="company-head-about-btn-wrap" v-if="!edit">
					<router-link 
							class="company-head-about-btn" 
							tag="a"
							:to="'/agreements'"
						>
						Договоры
					</router-link>
					<div
						class="company-head-about-btn"
						@click="setEdit()"
					>Редактировать
					</div>
				</div>
				<div class="company-head-about-btn-wrap" v-else>
					<div 
						class="company-head-about-btn edit"
						@click="onSave"
					>
						Сохранить
						
					</div>
					<div
						class="company-head-about-btn edit"
						@click="edit = false"
					>
						Отмена
					</div>
				</div>
			</Form>
		</div>

</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue"

import { Partner } from '@/models/Partner'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import * as yup from 'yup'

export default defineComponent({
		props: {
			data: {
				type: Object as PropType<Partner>,
				required: true
			}
		},
		components:{
			Form,
			Field,
			ErrorMessage,
		},
		setup(props){
			const edit = ref(false)
			const data_edit = ref<Partner>({
				uid:           '',
				name:          '',
				city:          '',
				phone:         '',
				email:         '',
				address:       '',
				inn:           '',
				bik:           '',
				payment:       '',
				correspondent: '',
			})
			const aboutForm = ref<any>()
			
			watch( ()=>props.data, ()=>{
				edit.value=false
				aboutForm.value.validate()
				}
			)
			
			const setEdit = () => {
				
				data_edit.value.city = props.data.city
				data_edit.value.phone = props.data.phone
				data_edit.value.email = props.data.email
				data_edit.value.address = props.data.address
				data_edit.value.inn = props.data.inn
				data_edit.value.bik = props.data.bik
				data_edit.value.payment = props.data.payment
				data_edit.value.correspondent = props.data.correspondent
				edit.value = true
			}
			
			const onSave = async() => {

				await aboutForm.value.validate()
				
			}
			const schema = yup.object({
				city:          yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				phone:         yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				email:         yup.string().required('Обязательное поле').email('Невалидный email'),
				address:       yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				inn:           yup.string().required('Обязательное поле').length(12, 'ИНН 12 цифр'),
				bik:           yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				payment:       yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				correspondent: yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
			});
			
			defineRule('required', (value: string) => {
				if (!value || !value.length) { 
					return 'Обязательное поле';	
					}
					return true;	
			})
			
			defineRule('minLength', (value: string, [limit]: number[]) => {
				if (!value || !value.length) {
					return true;
				}
				if (value.length < limit) {
					return `Минимум ${limit} символа`;
				}
				return true;
			})
			
			return {
				//data
				edit,
				data_edit,
				schema,
				aboutForm,
				//computed
				
				//methods
				setEdit,
				onSave,
			}
		}
})
</script>

<style>
</style>