<template>
  <page title="Profile">
    <v-container v-if="!isLoading">
      <v-row>
        <div class="profile-picture">
          <label for="profile-input" class="profile-label">
            <div class="profile-preview" v-if="imageUrl">
              <img :src="imageUrl" alt="Profile Preview" />
            </div>
            <div v-else class="profile-placeholder">
              <v-icon class="profile-icon">mdi-camera</v-icon>
              <span class="profile-text">Upload Image</span>
            </div>
            <input
              type="file"
              id="profile-input"
              class="profile-input"
              accept="image/*"
              @change="handleFileChange"
            />
          </label>
          <!-- <v-btn @click="saveProfileImage" type="button" class="profile-save"
            >Save</v-btn
          > -->
        </div>
      </v-row>
    </v-container>
    <v-container v-else class="login_spinner">
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-container>
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
import ErrorSuccessMessage from '@/components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';
const { user } = useUser();
const username = ref(user.name);
const email = ref(user.email);
const form = ref();
const imageUrl = ref();
const image = ref();
const isChangePasswordOpen = ref(false);
const snack = ref();
const isLoading = ref(false)

const onOpenChangePassword = () => {
  isChangePasswordOpen.value = true;
};

const onCloseChangePassword = () => {
  isChangePasswordOpen.value = false;
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        saveProfileImage(reader.result, file);
      }
      // reader.result && (imageUrl.value = reader.result) && (image.value = file);
    };
    reader.onerror = (error) => {
      console.log(error);
      snack.value.showSnackbar('Erro a processar a imagem.', '', false);
    };
  }
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

async function saveProfileImage(base64File: string, file: any) {
  if (base64File) {
    isLoading.value = true
    editProfileImage(base64File).then((resp) => {
      if (resp.success) {
        imageUrl.value = base64File;
        image.value = file;
        snack.value.showSnackbar('Imagem guardada com sucesso.', '', true);
      } else {
        console.log(resp);
        snack.value.showSnackbar('Erro a processar a imagem.', '', false);
      }
      isLoading.value = false
    });
  } else {
    console.error('Save profile image - no image');
  }
}

const base64ToFile = (base64Data: string) => {
  const filename = username.value + '_picture.jpg';
  const byteCharacters = atob(base64Data.replace('data:image/png;base64,', '')); // Decode the base64 data
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i)); // Convert each character to its byte value
  }

  const byteArray = new Uint8Array(byteArrays); // Create a Uint8Array from the byte values
  return new File([byteArray], filename, { type: 'image/jpeg' }); // Create a File object from the Uint8Array
};

onMounted(() => {
  isLoading.value = true
  getProfileImage().then((resp) => {
    if (resp.success && resp.data.image) {
      imageUrl.value = resp.data.image;
      image.value = base64ToFile(resp.data.image);
    } else if (resp.success) {
      console.error('No profile image');
    } else {
      console.error('Get profile image error');
    }
    isLoading.value = false
  });
});
</script>

<style scoped>
.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: control;
  margin-bottom: 20px;
}

.profile-label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.profile-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: grey;
  border-radius: 50%;
}

.profile-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.profile-text {
  font-size: 14px;
  flex-wrap: wrap;
}

.profile-input {
  display: none;
}

.profile-save {
  margin-top: 10px;
}

.submit_button_bar {
  display: flex;
  justify-content: space-between;
  padding: 0px;
}
</style>
