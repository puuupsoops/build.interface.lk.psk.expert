<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useStore } from '/src/store'
  import { onClickOutside } from '@vueuse/core'
  import { useRouter } from 'vue-router'
  import { OrderMutations } from '/src/store/order/mutations'
  import DeleteButton from '/src/components/ui/DeleteButton.vue'
  import SwitchButton from '/src/components/ui/SwitchButton.vue'

  const props = defineProps({
    modelValue:{
        type: Boolean,
        required: true,
      }
    })
  
  const feedbackType = ref(false)
  
  const emits = defineEmits(['update:modelValue'])
	
  const close = () => {
		emits('update:modelValue', false);
	};

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
            <img class="sidebar-logo-img" src="/src/assets/img/lamp.png"/>
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
          <textarea class="order-comment-textarea"></textarea>

          <br />

          <div>
            <input type="file" multiple>
          </div>
        </div>
      </div>

      <div :style="'margin: 15px 14px 0px 0px;'">
        <div class="gradient-btn claim-submit">
			    <div class="gradient-btn-text">Отправить</div>
		    </div>
      </div>

    </div>
  </div>
</template>

<style>

</style>