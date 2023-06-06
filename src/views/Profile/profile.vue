<template>
  <page title="Profile">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-text-field
            v-model="username"
            label="Nome de utilizador"
            :rules="fieldRules"
          />
        </v-row>
        <v-row>
          <v-text-field v-model="email" label="Email" :rules="fieldRules" />
        </v-row>
        <v-row>
          <v-text-field
            v-model.trim="password"
            label="Palavra passe"
            :rules="rules"
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
            :rules="rules"
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
            class="input-group--focused"
          ></v-text-field>
        </v-row>
      </v-container>

      <v-btn type="submit" class="mt-2">Submeter</v-btn>
    </v-form>
  </page>
</template>

<script lang="ts" setup>
import { useUser } from "@/composables/user";
import { ref, computed } from "vue";
import Page from "../../components/shared/Page/page.vue";
import { editProfile } from "@/api/users";
const { user } = useUser();
const username = ref(user.name);
const email = ref(user.email);
const form = ref();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const password = ref("");
const confirmPassword = ref("");
const fieldRules = [(v: string) => !!v || "Campo obrigatório"];

const passwordRules = [
  (value: string) => password.value === value || "Passwords do not match."
];

const requiredIfNotEmpty = () => {
  if (password.value !== "" || confirmPassword.value !== "") {
    return [(v: any) => !!v || "This field is required."];
  }
  return [];
};
const rules = computed(() => [...requiredIfNotEmpty(), ...passwordRules]);

const onSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    const data = {
      username,
      email,
      password: "",
      password_confirm: "",
      // password,
      // password_confirm: confirmPassword,
      token: user.token,
    };
    editProfile(data).then((resp) => {
      if (resp.success) {
        //updateUserName(resp.data);
        console.log(resp.data);
      } else {
        // because this is mock we need mock a successful login
        // updateUserName(email.value); // delete this (mock)
        // closeModal(); // delete this (mock)
        console.log("erro");
      }
    });
  }
};
</script>
