<template>
  <modal title="Alterar Palavra Passe" @close-modal="closeModal">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-text-field
            v-model.trim="password"
            label="Palavra passe"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            class="input-group--focused"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model.trim="confirmPassword"
            label="Confirmar Palavra passe"
            :rules="passwordConfirmRules"
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
            class="input-group--focused"
          ></v-text-field>
        </v-row>
      </v-container>
      <v-btn type="submit" class="mt-2">Alterar</v-btn>
    </v-form>
    <v-snackbar
      v-model="hasErrorMessage"
      :timeout="2000"
      location="top right"
      color="red-darken-2"
    >
      {{ errorMessage }}
    </v-snackbar>
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '../shared/Modal/modal.vue';

export default defineComponent({
  name: 'ChangePasswordModal',
  components: {
    Modal,
  },
});
</script>

<script lang="ts" setup>
import { changePassword } from '@/api/users';

const emit = defineEmits(['close-modal']);
const closeModal = () => emit('close-modal');
const hasErrorMessage = ref(false);
const errorMessage = ref('');

const form = ref();
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordRules = [
  (value: string) => !!value || 'Palavra passe é obrigatória',
  (value: string) =>
    password.value === value || 'Palavras Passe não são iguais.',
];
const passwordConfirmRules = [
  (value: string) => !!value || 'Confirmar Palavra passe é obrigatória',
  (value: string) =>
    password.value === value || 'Palavras Passe não são iguais.',
];

const onSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {

    const data = {
      password,
      confirmPassword,
    };

    await changePassword(data).then((resp) => {
      if (resp.success) {
        //updateUserName(resp.data);
        closeModal();
      } else {
        hasErrorMessage.value = true;
        //errorMessage.value = resp.error.data;
      }
    });
  }
};
</script>

<style lang="scss">
.change_password_spinner {
  display: flex;
  justify-content: center;
}
</style>
