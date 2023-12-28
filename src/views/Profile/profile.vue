<template>
  <page title="Profile">
    <photo-upload
      :saveFunction="editProfileImage"
      :imageUrl="imageUrl"
      @save="saveFile"
    ></photo-upload>

    <v-btn
      class="profile__change-password"
      type="button"
      @click="onOpenChangePassword"
    >
      Alterar Palavra Passe
    </v-btn>

    <v-form class="profile__form" ref="form" @submit.prevent="onSubmit">
      <v-container>
        <v-row class="profile__row">
          <v-text-field
            v-model="username"
            label="Nome de utilizador"
            :rules="fieldRules"
          />
        </v-row>
        <v-row class="profile__row">
          <v-text-field v-model="email" label="Email" :rules="fieldRules" />
        </v-row>

        <v-btn
          class="profile__submit-btn"
          color="blue-darken-1"
          variant="text"
          type="submit"
        >
          Submeter
        </v-btn>
      </v-container>

      <v-dialog
        v-model="isChangePasswordOpen"
        width="auto"
        transition="dialog-top-transition"
      >
        <change-password-modal @close-modal="onCloseChangePassword" />
      </v-dialog>
    </v-form>
  </page>
</template>

<script lang="ts" setup>
import { useUser } from '@/composables/user';
import { onMounted, ref } from 'vue';
import Page from '../../components/shared/Page/page.vue';
import { editProfile, getProfileImage, editProfileImage } from '@/api/users';
import ChangePasswordModal from '@/components/ChangePasswordModal/changePasswordModal.vue';
import PhotoUpload from '@/components/shared/PhotoUpload/photoUpload.vue';
import { base64ToFile } from '@/utils/imageHelper';
import { useSnackBar } from '@/composables/snackBar';

const { showSnackbar } = useSnackBar();
const { user, changeUserProfileImage } = useUser();

const username = ref(user.name);
const email = ref(user.email);
const form = ref();
const imageUrl = ref();
const image = ref();
const isChangePasswordOpen = ref(false);

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
        showSnackbar('Perfil guardado com sucesso.', '', true);
      } else {
        showSnackbar(
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

  changeUserProfileImage(base64File);
};

onMounted(() => {
  getProfileImage().then((resp) => {
    if (resp.success && resp.data.image) {
      imageUrl.value = resp.data.image;
      image.value = base64ToFile(resp.data.image, username);
    } else if (resp.success) {
      console.error('No profile image');
    } else {
      console.error('Get profile image error');
    }
  });
});
</script>

<style scoped lang="scss">
.profile {
  &__change-password {
    margin-top: -1rem;
    margin-bottom: 2rem;
  }

  &__form {
    width: 40%;

    > v-row {
      margin-bottom: 1rem;
    }
  }

  &__row {
    margin-bottom: 1rem;
  }

  &__submit-btn {
    float: right;
    padding: 0;
    margin-right: -1rem;
  }
}
</style>
