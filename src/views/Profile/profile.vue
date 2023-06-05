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
            v-model="password"
            label="Palavra passe"
            :rules="fieldRules"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            class="input-group--focused"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="confirmPassword"
            label="Confirmar Palavra passe"
            :rules="confirmPasswordRules"
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
const { user } = useUser();
const username = ref(user.name);
const email = ref(user.email);
const form = ref();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const password = ref("");
const confirmPassword = ref("");
const fieldRules = [(v: string) => !!v || "Campo obrigatório"];
const confirmPasswordRules = computed(() => [
  (value: any) => !!value || "Confirm Password is required",
  (value: string) => value === password.value || "Passwords do not match",
]);
const onSubmit = (values: any) => console.log(values);
</script>
