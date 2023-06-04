<template>
  <modal title="Autenticação" @close-modal="closeModal">
    <v-form ref="form" @submit.prevent="onSubmit">
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
          />
        </v-row>
      </v-container>

      <v-btn type="submit" class="mt-2">Entrar</v-btn>
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
import { defineComponent, ref } from "vue";
import Modal from "../shared/Modal/modal.vue";

export default defineComponent({
  name: "LoginModal",
  components: {
    Modal,
  },
});
</script>

<script lang="ts" setup>
import { loginUser } from "@/api/users";
import { useUser } from "@/composables/user";

const emit = defineEmits(["close-modal"]);
const closeModal = () => emit("close-modal");
const { updateUserName } = useUser();

const hasErrorMessage = ref(false);
const errorMessage = ref("");

const form = ref();
const email = ref("");
const password = ref("");

const fieldRules = [(v: string) => !!v || "Campo obrigatório"];

const onSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    const data = {
      email,
      password,
    };
    loginUser(data).then((resp) => {
      if (resp.success) {
        updateUserName(email.value);
        closeModal();
      } else {
        // because this is mock we need mock a successful login
        // updateUserName(email.value); // delete this (mock)
        // closeModal(); // delete this (mock)

        hasErrorMessage.value = true;
        errorMessage.value = resp.error.title;
      }
    });
  }
};
</script>

<style lang="scss"></style>
