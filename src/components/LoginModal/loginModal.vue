<template>
  <modal title="Autenticação" @close-modal="closeModal">
    <v-form v-if="!isLoading" ref="form" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-text-field
            v-model="email"
            label="Nome de utilizador"
            :rules="fieldRules"
          />
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            label="Palavra passe"
            :rules="fieldRules"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            class="input-group--focused"
          ></v-text-field>
        </v-row>
      </v-container>

      <v-btn type="submit" class="mt-2">Entrar</v-btn>
    </v-form>
    <v-container v-else class="login_spinner">
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-container>

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
  name: 'LoginModal',
  components: {
    Modal,
  },
});
</script>

<script lang="ts" setup>
import { useUser } from '@/composables/user';

const emit = defineEmits(['close-modal']);
const closeModal = () => emit('close-modal');
const { authenticateUser } = useUser();
const showPassword = ref(false);
const hasErrorMessage = ref(false);
const errorMessage = ref('');

const form = ref();
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const fieldRules = [(v: string) => !!v || 'Campo obrigatório'];

const onSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    isLoading.value = true;
    const data = {
      email,
      password,
    };

    await authenticateUser(data).then((resp) => {
      if (resp.success) {
        closeModal();
      } else {
        hasErrorMessage.value = true;
        errorMessage.value = resp.error.title;
      }
    });
  }

  isLoading.value = false;
};
</script>

<style lang="scss">
.login_spinner {
  display: flex;
  justify-content: center;
}
</style>
