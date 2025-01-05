<template>
  <div>
    <h3 v-if="title">{{ title }}</h3>
    <v-spacer></v-spacer>
    <v-container>
      <v-row>
        <div class="profile-picture">
          <label :for="photoId" class="profile-label">
            <div class="profile-preview" v-if="props.imageUrl">
              <img :src="props.imageUrl" alt="Profile Preview" />
            </div>
            <div v-else class="profile-placeholder">
              <v-icon class="profile-icon">mdi-camera</v-icon>
              <span class="profile-text">{{ photoLabel }}</span>
            </div>
            <input
              type="file"
              :id="photoId"
              :name="id"
              class="profile-input"
              accept="image/*"
              ref="input"
              @change="handleFileChange"
            />
          </label>
        </div>
      </v-row>

      <v-btn
        v-if="props.downloadFile && props.imageUrl"
        type="button"
        class="download-button"
        @click="downloadImage"
      >
        Descarregar fotografia
      </v-btn>
    </v-container>
  </div>
</template>
<script lang="ts">
import { useSnackBar } from '@/composables/snackBar';
import { checkImageTypeAndSize } from '@/utils/imageHelper';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'PhotoUpload',
});
</script>

<script lang="ts" setup>
// saveFunction - callback to save it on BE
const props = defineProps([
  'saveFunction',
  'imageUrl',
  'id',
  'label',
  'title',
  'downloadFile',
  'downloadName',
]);

// save - callback to save the file object on FE
const emit = defineEmits(['save']);

const { showSnackbar } = useSnackBar();

const photoId = ref(props.id ?? 'photo-input');
const photoLabel = ref(props.label ?? 'Carregar foto');
const title = ref(props.title ?? '');
const input = ref();

const handleSave = (base64File: string, file: any) => {
  emit('save', base64File, file, props.id);
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  const { snackMessage, canUpload } = checkImageTypeAndSize(file);
  if (snackMessage) {
    showSnackbar(snackMessage, '', false);
  }

  if (file && canUpload) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      reader.result && saveImage(reader.result as string, file);

      input.value && (input.value.attributes.value = reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
      showSnackbar('Erro a processar a imagem.', '', false);
    };
  }
};

async function saveImage(base64File: string, file: any) {
  // save photo on BE
  if (props.saveFunction) {
    props.saveFunction(base64File).then((resp: any) => {
      if (resp.success) {
        handleSave(base64File, file);
        showSnackbar('Imagem guardada com sucesso.', '', true);
      } else {
        showSnackbar('Erro a processar a imagem.', '', false);
      }
    });
  } else {
    // save photo on BE by parent component
    handleSave(base64File, file);
  }
}

const downloadImage = () => {
  const link = document.createElement('a');
  link.href = props.imageUrl;
  link.download = props.downloadName ?? 'profile-image';
  link.click();
};
</script>

<style scoped>
.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: control;
  margin-bottom: 20px;

  width: 100%;
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

.download-button {
  width: 100%;
}
</style>
