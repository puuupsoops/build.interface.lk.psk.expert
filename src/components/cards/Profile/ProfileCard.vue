<template>
    
        <div class="profile-personal-wrap content-elem"
            :class="{'edit': edit}"
        >
        <div :class="edit ? ' edit':''">
            <div class="profile-personal-box" v-if="!edit">
                <PreloaderLocal style="margin: auto" v-if="loading"/>
                <div class="profile-personal-img-box" @click="edit=!edit" v-else>
                    <img class="profile-personal-img" :src="image"/>
                    
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
                    <div :tooltip="profile.email" flow="up">
                    <div class="profile-personal-info-item email" >{{profile.email}}</div>
                    </div>
                </div>  
            </div>
            <div class="profile-personal-edit-box" v-if="!edit">
                <div class="profile-personal-edit" @click="edit=!edit">
                    Редактировать
                </div>
            </div>
            <Form v-else  validateOnMount v-slot="{errors}" @submit="onSave()" :validation-schema="schema" ref="formPersonal"  >
                
                <div class="profile-personal-box">
                    <div class="profile-personal-img-box" >
                        <img class="profile-personal-img" :src="image" />
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
                                    v-model="editProfile.lastname"
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
                                    v-model="editProfile.name"
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
                                    v-model="editProfile.patronymic"
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
                                    v-model="editProfile.phone"
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
                                    v-model="editProfile.email"
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
                </div>
                <div class="profile-personal-edit-box">
                    <div class="profile-personal-edit" v-if="updating">
                        <PreloaderLocal small style="margin: auto"/>
                    </div>
                    <div class="profile-personal-edit"
                        :class="{'disabled': Object.keys(errors).length !=0}"
                        v-else  
                        @click="Object.keys(errors).length ==0 ? save(): null"
                    >
                        Сохранить
                    </div>
                    <div class="profile-personal-edit"  @click="disable()">
                        Отмена
                    </div>
                </div>
            </Form>

            
        </div>
        
        </div>
</template>

<script setup lang="ts">
    import PreloaderLocal from '/src/components/PreloaderLocal.vue'
    

    import { computed, onMounted, PropType, ref, watch } from 'vue'
    import { ProfilePersonal } from '/src/models/Propfile'
    import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
    import * as yup from 'yup'
    import axios from 'axios'
    import { useStore } from '/src/store'
    import { ProfileActions } from '/src/store/profile/actions'
    import { ProfileMutations } from '/src/store/profile/mutations'

    
    const props = defineProps({
        profile: {
            type: Object as PropType<ProfilePersonal>,
            required: true            
        },
        loading: {
            type: Boolean
        }
    })
    const emits = defineEmits(['save'])
    const store = useStore()

    const editProfile = ref<ProfilePersonal>()
    const updating = ref(false)
       
    const fileImage = ref()
    const formPersonal = ref<any>()
    
    const phoneRegExp = /^\+7[0-9]{10}$/
    //const emailRegExp =/^[\\p{L}=_0-9a-z+~`!$&*^`|\\#%/&{}-]+(\\.[\\p{L}=_0-9a-z+~`!$&*^`|\\#%/&{}-]+)*@(([\\p{L}a-z0-9-]+\\.)+)([\\p{L}a-z0-9-]{2,20}$/

    const edit = ref(false)
    const schema = yup.object({
                name:        yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				lastname:    yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				patronymic:  yup.string().required('Обязательное поле').min(3, 'Минимум 3 сивола'),
				email:       yup.string().required('Обязательное поле').email('Невалидный email'),
				phone:       yup.string().required('Обязательное поле').length(12, '12 символов').matches(phoneRegExp, 'Формат +71234567890'),
			});

    const image = computed(() => store.getters.getProfileImage)
    
    watch(()=> props.profile, ()=>{
        editProfile.value = Object.assign({}, props.profile)
	})

    const handleFileUpload = ( event: any) =>{
        fileImage.value = event.target.files[0]
        var reader = new FileReader()
        var baseString = ''
        reader.onloadend = function () {
            baseString = <string>reader.result
            store.commit(ProfileMutations.SET_IMAGE, baseString)
        };
        reader.readAsDataURL(fileImage.value)
		}
    

    const save = () => {
        updating.value = true
        
        let formData = new FormData();
        if (fileImage.value) 
            formData.append('image', fileImage.value)
        if (editProfile.value) {
            formData.append('name', editProfile.value.name)
            formData.append('lastname', editProfile.value.lastname)
            formData.append('patronymic', editProfile.value.patronymic)
            formData.append('email', editProfile.value.email)
            formData.append('phone', editProfile.value.phone)
        }
        store.dispatch(ProfileActions.UPD_PERSONAL, formData).then(()=>{
            updating.value = false
            edit.value = false
            emits('save')
        })  
    }

    const disable = () => {
        editProfile.value = Object.assign({}, props.profile)
        edit.value = false
    }
</script>