<template>
  <div class="top-line-button">
      <Mail />
      <Bell 
        :amount = "3"
      />
      <Avatar 
        :image = null
      />
  </div>
</template>

<script>
import Mail   from '../ui/personal/buttons/Mail.vue';
import Bell   from '../ui/personal/buttons/Bell.vue';
import Avatar from '../ui/personal/buttons/Avatar.vue';

export default {
  components: {
    Mail,
    Bell,
    Avatar
  }
};
</script>

<style>
</style>