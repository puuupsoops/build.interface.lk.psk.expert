<template>
    <div class="profile-personal-wrap content-elem"
        :class="{'edit': edit}"
    >
    <div :class="edit ? ' edit':''">
        <div class="profile-personal-box" v-if="!edit">
            <PreloaderLocal style="margin: auto" v-if="loadingImage"/>
            <div class="profile-personal-img-box" @click="edit=!edit" v-else>
                <img class="profile-personal-img" :src="image" v-if="loadImage"/>
                <img class="profile-personal-img" src="/src/assets/img/user.png" alt=""  v-else>
                <div class="profile-personal-img-hover">
                    Редактировать
                </div>
                
            </div>
            <div class="profile-personal-info-box">
                <div class="profile-personal-info-name">
                    {{profile.lastname}} {{profile.name}} {{profile.patronymic}}
                    <div class="profile-personal-info-name-position">Профиль</div>
                </div>
                <div class="profile-personal-info-item phone">{{profile.phone}}</div>
                <div class="profile-personal-info-item email">{{profile.email}}</div>
                
            </div>  
        </div>
        <Form v-else validateOnMount @submit="onSave()" :validation-schema="schema" ref="aboutForm" class="profile-personal-box" >
            <div class="profile-personal-img-box" >
                <img class="profile-personal-img" :src="image" v-if="loadImage"/>
                <img class="profile-personal-img" src="/src/assets/img/user.png" alt=""  v-else>
                <label class="profile-personal-img-hover" for="file-upload">
                        Выбрать фото
                    <input @change="handleFileUpload( $event )" id="file-upload" type="file" accept="image/*">
                </label>
                   
                         
            </div>
            <div class="profile-personal-info-box">
                <div class="profile-personal-info-item-edit">
                    <div class="input-textfield">
                        <Field 
                            name="lastname"
                            validateOnInput
                            placeholder=" "
                            autocomplete="off"
                            v-slot="{ field, errors }"
                            v-model="profile.lastname"
                        >
                            <input
                                v-bind="field"
                                type="text" 
                                placeholder=" "
                                :class="errors.length == 0 ? '' : 'error'"
                            >
                            <label>Фамилия</label>
                            <ErrorMessage name="lastname" class="validationBox"/>
                        </Field>
                    </div>
                </div>
                <div class="profile-personal-info-item-edit">
                    <div class="input-textfield">
                        <Field 
                            name="name"
                            validateOnInput
                            placeholder=" "
                            autocomplete="off"
                            v-slot="{ field, errors }"
                            v-model="profile.name"
                        >
                            <input
                                v-bind="field"
                                type="text" 
                                placeholder=" "
                                :class="errors.length == 0 ? '' : 'error'"
                            >
                            <label>Имя</label>
                            <ErrorMessage name="name" class="validationBox"/>
                        </Field>
                    </div>
            
                
                </div>
                <div class="profile-personal-info-item-edit">
                    <div class="input-textfield">
                        <Field 
                            name="patronymic"
                            validateOnInput
                            placeholder=" "
                            autocomplete="off"
                            v-slot="{ field, errors }"
                            v-model="profile.patronymic"
                        >
                            <input
                                v-bind="field"
                                type="text" 
                                placeholder=" "
                                :class="errors.length == 0 ? '' : 'error'"
                            >
                            <label>Отчество</label>
                            <ErrorMessage name="patronymic" class="validationBox"/>
                        </Field>
                    </div> 
                </div>
                <div class="profile-personal-info-item-edit">
                    <div class="input-textfield">
                        <Field 
                            name="phone"
                            validateOnInput
                            placeholder=" "
                            autocomplete="off"
                            v-slot="{ field, errors }"
                            v-model="profile.phone"
                        >
                            <input
                                v-bind="field"
                                type="text" 
                                placeholder=""
                                
                                :class="errors.length == 0 ? '' : 'error'"
                            >
                            <label>Телефон</label>
                            <ErrorMessage name="phone" class="validationBox"/>
                        </Field>
                    </div>
                </div>
                <div class="profile-personal-info-item-edit">
                    <div class="input-textfield">
                        <Field 
                            name="email"
                            validateOnInput
                            placeholder=" "
                            autocomplete="off"
                            v-slot="{ field, errors }"
                            v-model="profile.email"
                        >
                            <input
                                v-bind="field"
                                type="text" 
                                placeholder=" "
                                :class="errors.length == 0 ? '' : 'error'"
                            >
                            <label>email</label>
                            <ErrorMessage name="email" class="validationBox"/>
                        </Field>
                    </div>
                </div>
            </div>

        </Form>

        <div class="profile-personal-edit-box">
            <div class="profile-personal-edit" v-if="edit" @click="save">
                Сохранить
            </div>
            <div class="profile-personal-edit" v-if="edit" @click="edit=!edit">
                Отмена
            </div>
            <div class="profile-personal-edit" v-if="!edit" @click="edit=!edit">
                Редактировать
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
    import PreloaderLocal from '/src/components/PreloaderLocal.vue'


    import { PropType, ref, watch } from 'vue'
    import { ProfilePersonal } from '/src/models/Propfile'
    import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
    import * as yup from 'yup'
    import axios from 'axios'
    
    const props = defineProps({
        profile: {
            type: Object as PropType<ProfilePersonal>,
            required: true            
        }
    })
    const loadImage = ref(false)
	const loadingImage = ref(false)
	const image = ref('')
	watch (()=> props.profile, ()=>{
		loadImage.value=false
		loadingImage.value=true
		if (props.profile && props.profile.image){
			image.value = ''
			axios({
				method: 'get',
				timeout: 1000 * 3,
				url: props.profile.image,
				responseType: 'arraybuffer',
				headers: {'Content-type': 'image/jpeg'}
			}).then(response => { 
				loadImage.value = true
				loadingImage.value=false
				image.value = `data:${response.headers['content-type']};base64,${btoa(String.fromCharCode(...new Uint8Array(response.data)))}`
			}).catch(()=>{
				loadingImage.value=false
			})
  		}
		
	})

    const phoneRegExp = /^\+7[0-9]{10}$/

    const edit = ref(false)
    const schema = yup.object({
                name:        yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				lastname:    yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				patronymic:  yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				email:       yup.string().required('Обязательное поле').email('Невалидный email'),
				phone:       yup.string().required('Обязательное поле').length(12, '12 символов').matches(phoneRegExp, 'Формат +71234567890'),
			});

    defineRule('required', (value: string) => {
        if (!value || !value.length) { 
            return 'Обязательное поле';	
            }
            return true;	
    })

    const handleFileUpload = ( event: any) =>{
			var file = event.target.files[0]
            var reader = new FileReader()
            var baseString = ''
            reader.onloadend = function () {
                baseString = <string>reader.result
                image.value = baseString
                loadImage.value = true
            };
            reader.readAsDataURL(file)
		}

    const save = () => {
        console. log(props.profile)
    }
</script>