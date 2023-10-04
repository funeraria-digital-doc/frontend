<template>
  <modal title="Autenticação" @close-modal="closeModal">
    <login @close="closeModal"></login>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '../shared/Modal/modal.vue';
import Login from '../shared/Login/login.vue';

export default defineComponent({
  name: 'LoginModal',
  components: {
    Modal,
    Login
  },
});
</script>

<script lang="ts" setup>
const emit = defineEmits(['close-modal']);
const closeModal = () => emit('close-modal');
</script>
