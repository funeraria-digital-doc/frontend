<template>
  <page title="Profile">
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-container>
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
            <v-btn @click="console.log('cenas')" class="profile-save"
              >Save</v-btn
            >
          </div>
        </v-row>
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
        <change-password-modal
          @close-modal="onCloseChangePassword"
          :token="user.token"
        />
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
</template>

<script lang="ts" setup>
import { useUser } from '@/composables/user';
import { ref } from 'vue';
import Page from '../../components/shared/Page/page.vue';
import { editProfile } from '@/api/users';
import ChangePasswordModal from '@/components/ChangePasswordModal/changePasswordModal.vue';
const { user } = useUser();
const username = ref(user.name);
const email = ref(user.email);
const form = ref();
const imageUrl = ref(null);
const image = ref(null);
const isChangePasswordOpen = ref(false);

const onOpenChangePassword = () => {
  isChangePasswordOpen.value = true;
};

const onCloseChangePassword = () => {
  isChangePasswordOpen.value = false;
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};
const fieldRules = [(v: string) => !!v || 'Campo obrigatório'];

const onSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    const data = {
      username,
      email,
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
        console.log('erro');
      }
    });
  }
};
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
