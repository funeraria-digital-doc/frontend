<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <v-container>
      <v-row class="mb-1">
        <v-text-field
          v-model="name"
          label="Nome"
          :rules="fieldRules(true, null, 150)"
        />
      </v-row>
      <v-row class="mb-1">
        <v-text-field
          v-model="phoneNumber"
          label="Telefone"
          :rules="fieldRules(true, null, 12)"
        />
      </v-row>
      <v-row class="mb-1">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :rules="fieldRules(true, null, 150)"
        />
      </v-row>
      <v-row class="mb-1">
        <v-textarea
          v-model="message"
          label="Mensagem"
          :rules="fieldRules(false, null, 400)"
        />
      </v-row>
    </v-container>

    <v-btn type="submit" class="funeraria-contacts-form__button">Enviar</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';
import { ref } from 'vue';

const form = ref();
const name = ref('');
const phoneNumber = ref('');
const email = ref('');
const message = ref('');

const onSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    const data = {
      name: name.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      message: message.value,
    };

    //TODO send data to backend
  }
};
</script>

<style scoped lang="scss">
.funeraria-contacts-form {
  &__button {
    margin-top: 0.5vw;

    width: 100%;
  }
}
</style>
