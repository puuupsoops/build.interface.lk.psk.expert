<script setup lang="ts">
  import { ref } from 'vue'
  import axios from '/src/plugins/axios'

  import DeleteButton from '/src/components/ui/DeleteButton.vue'
  import SwitchButton from '/src/components/ui/SwitchButton.vue'
  import PreloaderLocal from '/src/components/PreloaderLocal.vue'

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    modelValue:{
        type: Boolean,
        required: true,
      }
    })
  
  const feedbackType = ref(false)
  const showPreload = ref(false)

  const data = ref({
    type: '',
    text: '',
    files: <any>[]
  })

  const emits = defineEmits(['update:modelValue'])
	
  const handleFileUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement)
    if (file && file.files)
      data.value.files.push(file.files[0])
  }

  const close = () => {
		emits('update:modelValue', false);
	}

  const send = () => {
    data.value.type = !feedbackType.value ? 'info' : 'error';
    console.log(data.value)
      axios.post('/user/request/feedback', data.value)
      .then(response => {
        if(response.status == 201) {
          showPreload.value = !showPreload.value
          close();
        }
      })
      .catch(error => {
        console.log(error)
        showPreload.value = !showPreload.value
      })
    //close();
  }



</script>

<template>
  <div
    class="order-modal"
    v-if="modelValue"
  >
    <div class="order-modal-dialog draft">
      <div class="order-modal-content draft" >
        
        <div class="order-modal-header">
          <div class="sidebar-logo" :style="'color: #fff;'">
            <img class="sidebar-logo-img" alt="" src="/src/assets/img/lamp.png"/>
            <h3 class="order-modal-header-title">Форма обратной связи.</h3>
          </div>
          
          <DeleteButton 
            @onClick="close()"
          />
        </div>

        <div class="order-modal-body draft">
          <div :style="'display: flex;'">
            <div class="order-comment-title">Тип обращения: </div>
            <div :style="[!feedbackType ? 'color: #FFFFFF':'color: #292C32','margin-left: 30px']">Предложение по улучшению.</div>
            <div :style="'margin-left: 30px'">
              <SwitchButton v-model="feedbackType"/>
            </div>
            <div :style="[feedbackType ? 'color: #FFFFFF':'color: #292C32','margin-left: 30px']">Сообщение об ошибке.</div>
          </div>
          
          <br />

          <div class="order-comment-title"><span>Текст {{ !feedbackType ? 'предложения' : 'описания ошибки' }}</span></div>
          <textarea class="order-comment-textarea" v-model="data.text"></textarea>

          <br />

          <div>
            <input
            @change="handleFileUpload($event)" 
            type="file" multiple>
          </div>
        </div>

      </div>
      <div v-if="showPreload">
        <PreloaderLocal :style="'margin: -8px 60px 0 auto;'"/>
      </div>
      <div v-else  :style="'margin: 15px 14px 0px 0px;'">
        <div class="gradient-btn claim-submit"
          @click="send(); showPreload=!showPreload">
          <div class="gradient-btn-text">Отправить</div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>

</style>