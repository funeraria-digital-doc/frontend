<template>
  <v-container v-if="isLoading" class="login_spinner">
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-row>
      <div class="profile-picture">
        <label for="profile-input" class="profile-label">
          <div class="profile-preview" v-if="props.imageUrl">
            <img :src="props.imageUrl" alt="Profile Preview" />
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
      </div>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { checkImageTypeAndSize } from '@/utils/imageHelper';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'PhotoUpload',
});
</script>

<script lang="ts" setup>
const props = defineProps(['snack', 'saveFunction', 'imageUrl', 'isLoading']);
const isLoading = ref(props.isLoading)
const emit = defineEmits(['save']);

const handleSave = (base64File: string, file: any) => {
  emit('save', base64File, file);
};
const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  const canUpload = checkImageTypeAndSize(file, props.snack);

  if (file && canUpload) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        saveImage(reader.result, file);
      }
      // reader.result && (imageUrl.value = reader.result) && (image.value = file);
    };
    reader.onerror = (error) => {
      console.log(error);
      props.snack.showSnackbar('Erro a processar a imagem.', '', false);
    };
  }
};

async function saveImage(base64File: string, file: any) {
  if (base64File) {
    isLoading.value = true;
    props.saveFunction(base64File).then((resp) => {
      if (resp.success) {
        handleSave(base64File, file);
        props.snack.showSnackbar('Imagem guardada com sucesso.', '', true);
      } else {
        props.snack.showSnackbar('Erro a processar a imagem.', '', false);
      }
      isLoading.value = false;
    });
  } else {
    console.error('Save profile image - no image');
  }
}
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
</style>
