<template>
  <page title="Profile">
    <photo-upload
      :snack="snack"
      :isLoading="isLoading"
      :saveFunction="editProfileImage"
      :imageUrl="imageUrl"
      @save="saveFile"
    ></photo-upload>
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
      </v-container>
      <v-dialog
        v-model="isChangePasswordOpen"
        width="auto"
        transition="dialog-top-transition"
      >
        <change-password-modal @close-modal="onCloseChangePassword" />
      </v-dialog>
      <v-container>
        <v-row class="submit_button_bar">
          <div class="submit_button_bar_submit">
            <v-btn type="submit" class="mt-2">Submeter</v-btn>
          </div>
          <div class="submit_button_bar_other_actions">
            <v-btn type="button" class="mt-2" @click="onOpenChangePassword"
              >Alterar Palavra Passe</v-btn
            >
          </div>
        </v-row>
      </v-container>
    </v-form>
  </page>
  <error-success-message ref="snack"></error-success-message>
</template>

<script lang="ts" setup>
import { useUser } from '@/composables/user';
import { onMounted, ref } from 'vue';
import Page from '../../components/shared/Page/page.vue';
import { editProfile, getProfileImage, editProfileImage } from '@/api/users';
import ChangePasswordModal from '@/components/ChangePasswordModal/changePasswordModal.vue';
import PhotoUpload from '@/components/shared/PhotoUpload/photoUpload.vue';
import ErrorSuccessMessage from '@/components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';
import { base64ToFile } from '@/utils/imageHelper';
const { user } = useUser();
const username = ref(user.name);
const email = ref(user.email);
const form = ref();
const imageUrl = ref();
const image = ref();
const isChangePasswordOpen = ref(false);
const snack = ref();
const isLoading = ref(false);

const onOpenChangePassword = () => {
  isChangePasswordOpen.value = true;
};

const onCloseChangePassword = () => {
  isChangePasswordOpen.value = false;
};

const fieldRules = [(v: string) => !!v || 'Campo obrigatório'];

const onSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    const data = {
      username,
      email,
    };
    editProfile(data).then((resp) => {
      if (resp.success) {
        snack.value.showSnackbar('Perfil guardado com sucesso.', '', true);
      } else {
        snack.value.showSnackbar(
          'Ocorreu um erro a guardar o perfil.\r\n Por favor tente mais tarde.',
          '',
          false
        );
      }
    });
  }
};

const saveFile = (base64File: string, file: any) => {
  imageUrl.value = base64File;
  image.value = file;
};

onMounted(() => {
  isLoading.value = true;
  getProfileImage().then((resp) => {
    if (resp.success && resp.data.image) {
      imageUrl.value = resp.data.image;
      image.value = base64ToFile(resp.data.image, username);
    } else if (resp.success) {
      console.error('No profile image');
    } else {
      console.error('Get profile image error');
    }
    isLoading.value = false;
  });
});
</script>

<style scoped>
.submit_button_bar {
  display: flex;
  justify-content: space-between;
  padding: 0px;
}
</style>
