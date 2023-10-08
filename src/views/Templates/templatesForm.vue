<template>
  <page :title="templatesTitle" back="templates">
    <v-form
      ref="form"
      validate-on="submit"
      @submit.prevent="save"
      :disabled="isLoading"
    >
      <v-container>
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              :id="`title_${template.title}`"
              v-model="template.title"
              label="Título"
              :rules="constants.nameRules"
              :error-messages="errorMessages.title"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-select
              :id="`group_id_${template.group_id}`"
              v-model="template.group_id"
              label="Funerária"
              :items="getSelectItems('group_id')"
              item-title="label"
              item-value="value"
              clearable
              :rules="constants.groupRules"
              :error-messages="errorMessages.group_id"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-select
              :id="`send_type_${template.send_type}`"
              v-model="template.send_type"
              label="Tipo de Envio"
              :items="getSelectItems('send_type')"
              item-title="label"
              item-value="value"
              :error-messages="errorMessages.send_type"
            />
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-file-input
              id="template_file"
              v-model="file_temp"
              label="Ficheiro"
              @change="handleFileUpload(file_temp)"
              @click:clear="handleClearFileClick"
              prepend-icon="mdi-paperclip"
              clearable
              :disabled="isLoadingFileVars || isLoading"
              :rules="constants.requiredFileRule"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row v-if="isEmailOption">
          <v-col cols="4" sm="4" md="4">
            <v-combobox
              id="send_email_to"
              v-model="template.send_email_to"
              label="Enviar email para"
              :items="[]"
              multiple
              chips
              closable-chips
              hint="escrever email para enviar (Ex: teste@teste.pt) e carregar na tecla enter"
              persistent-hint
              :error-messages="errorMessages.send_email_to"
            ></v-combobox>
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-combobox
              id="send_email_to_cc"
              v-model="template.send_email_to_cc"
              label="Enviar email em cc para"
              :items="[]"
              multiple
              chips
              closable-chips
              hint="escrever email para enviar em cc (Ex: teste@teste.pt) e carregar na tecla enter"
              persistent-hint
              :error-messages="errorMessages.send_email_to_cc"
            ></v-combobox>
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-combobox
              id="send_email_to_bcc"
              v-model="template.send_email_to_bcc"
              label="Enviar email em bcc para"
              :items="[]"
              multiple
              chips
              closable-chips
              hint="escrever email para enviar em bcc (Ex: teste@teste.pt) e carregar na tecla enter"
              persistent-hint
              :error-messages="errorMessages.send_email_to_bcc"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row v-if="template.validations.length > 0 && !isLoadingFileVars">
          <v-col cols="12" sm="12" md="12">
            <v-list :disabled="isLoading">
              <v-list-subheader>Validações</v-list-subheader>
              <v-list-item
                v-for="(item, i) in template.validations"
                :key="i"
                :value="item"
                :title="item.name"
                :class="{ 'error-item': errorIndexes.includes(i) }"
                color="white"
                variant="plain"
                prepend-icon="mdi-arrow-right-bold-circle-outline"
                mandatory="false"
                @click="editValidation(i)"
              >
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-container v-if="isLoadingFileVars" class="login_spinner">
          <v-progress-circular
            :size="70"
            :width="7"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-container>
      </v-container>
      <v-btn
        color="blue-darken-1"
        variant="text"
        type="submit"
        :disabled="isLoading || isLoadingFileVars"
      >
        Submeter
      </v-btn>
    </v-form>
    <error-success-message ref="snack"></error-success-message>
    <validation-edit-modal
      v-if="openCloseModal"
      :editModal="openCloseModal"
      :index="editIndex"
      :validation="validationItemEdit"
      :errorMessages="errorMessages.validations"
      @save="saveEditValidation"
      @cancel="cancelEditValidation"
    />
  </page>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import * as constants from './constants';
import { getSingleTemplate, formatDataBeforeRequest } from './helper';
import Page from '../../components/shared/Page/page.vue';
import ValidationEditModal from './components/ValidationEditModal/validationEditModal.vue';
import ErrorSuccessMessage from '@/components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';
import {
  getVariablesFromFile,
  templateCreate,
  templateEdit,
} from '@/api/templates';
import type { Template, TemplateValidation } from './templatesForm.interface';
export default defineComponent({
  name: 'TemplatesForm',
  components: {
    ValidationEditModal,
  },
});
</script>
<script lang="ts" setup>
const route = useRoute();
const snack = ref();
const errorIndexes = ref([]);
const defaultObj: TemplateValidation = {
  db_collection: '',
  db_field_reference: '',
  default_value: [],
  format: '',
  is_date_numeric: false,
  is_field_custom: true,
  label: '',
  min: 1,
  max: 1,
  optional: true,
  options: [],
  placeholder: '',
};

const template = ref<Template>({
  file: '',
  send_email_to_bcc: [],
  send_email_to_cc: [],
  send_email_to: [],
  send_type: 'NONE',
  title: '',
  validations: [],
});

let validationItemEdit = ref();
const file_temp = ref();
const mode = ref('');
const form = ref();
const isLoading = ref(true);
const isLoadingFileVars = ref(false);
const openCloseModal = ref(false);
const editIndex = ref();
const errorMessages = ref({
  title: '',
  group_id: '',
  send_type: '',
  send_email_to_bcc: '',
  send_email_to_cc: '',
  send_email_to: '',
  validations: {},
});

const defaultErrorMessages = {};

const getSelectItems = (name: string) =>
  constants.fields.find((f) => f.name === name)?.items;

const isEmailOption = computed(() => {
  if (
    template.value.send_type == 'EMAIL' ||
    template.value.send_type == 'DOCUMENT_EMAIL'
  ) {
    return true;
  }
  return false;
});

const templatesTitle = computed(() => {
  if (mode.value === 'create') {
    return 'Criar Template';
  } else if (mode.value === 'edit') {
    return template.value.title
      ? `Editar Template - ${template.value.title}`
      : 'Editar Template';
  }

  return '';
});

function checkErrors(error: any){
  if (error && error.errors) {
    let errors = '';
    for (var i = 0; i < Object.keys(error.errors).length; i++) {
      const validationKey = Object.keys(error.errors)[i];
      const validationItem = error.errors[validationKey];
      errors += validationKey + ', ';
      if (validationKey == 'validations') {
        for (var t = 0; t < Object.keys(validationItem).length; t++) {
          var valKey = Object.keys(validationItem)[t];
          errorIndexes.value.push(parseInt(valKey));
        }
      }
      errorMessages.value[validationKey] = validationItem;
    }
    if (errors.substring(errors.length - 2) == ', ') {
      snack.value.showSnackbar(
        'Contém erros nos seguintes campos:',
        errors.substring(0, errors.length - 2),
        false
      );
    }
  } else {
    errorMessages.value = { ...defaultErrorMessages };
  }
  snack.value.showSnackbar(
    'Verifique que todos os campos obrigatórios estão preenchidos e tente novamente.',
    '',
    false
  );
}

async function save() {
  if (
    template.value.validations.length == 1 &&
    JSON.stringify(template.value.validations) === JSON.stringify([defaultObj])
  ) {
    form.value.validations = [];
  }

  await form.value.validate().then((resp: any) => {
    errorIndexes.value = [];
    const valid = resp.valid;

    if (valid) {
      if (mode.value === 'edit') {
        isLoading.value = true;
        templateEdit(template.value).then((resp) => {
          if (resp.success) {
            router.push({ name: 'templates' });
          } else {
            checkErrors(resp.error);
          }
          isLoading.value = false;
        });
      } else if (mode.value === 'create') {
        const formData = formatDataBeforeRequest(template.value, 'create');
        isLoading.value = true;
        templateCreate(formData).then((resp) => {
          if (resp.success) {
            router.push({ name: 'templates' });
          } else {
            checkErrors(resp.error);
          }
          isLoading.value = false;
        });
      }
    } else {
      snack.value.showSnackbar(
        'Preencha todos os os campos obrigatórios.',
        '',
        false
      );
    }
  });
}

const handleFileUpload = (file: Blob[]) => {
  if (
    file[0].type !==
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    file_temp.value = null;
    if (template.value.validations.length > 0) {
      template.value.validations = [];
    }
    snack.value.showSnackbar('O documento tem de ser do tipo .docx', '', false);
  } else {
    isLoadingFileVars.value = true;
    getVariablesFromFile(file[0] as any).then((resp: any) => {
      if (
        resp &&
        resp.data &&
        resp.data.variables &&
        resp.data.variables.length > 0
      ) {
        if (file[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(file[0]);
          reader.onload = () => {
            reader.result && (template.value.file = reader.result);
          };
          reader.onerror = () => {
            handleClearFileClick();
            snack.value.showSnackbar('Erro ao processar ficheiro', '', false);
          };
        } else {
          template.value.file = '';
        }
        let newValidations = resp.data.variables.map((item: any) => {
          return { ...defaultObj, name: item };
        });
        template.value.validations = newValidations ? newValidations : [];
      } else {
        handleClearFileClick();
        snack.value.showSnackbar('Erro ao processar ficheiro', '', false);
      }
      isLoadingFileVars.value = false;
    });
  }
};

const handleClearFileClick = () => {
  file_temp.value = null;
  template.value.validations = [];
  isLoadingFileVars.value = false;
};

const editValidation = (index: number) => {
  validationItemEdit.value = { ...template.value.validations[index] };

  openCloseModal.value = true;
  editIndex.value = index;
};

const saveEditValidation = (validation: any, index: number) => {
  openCloseModal.value = false;
  editIndex.value = null;
  template.value.validations[index] = {
    ...template.value.validations[index],
    ...validation,
  };
  validationItemEdit.value = {};
};
const cancelEditValidation = () => {
  openCloseModal.value = false;
  editIndex.value = null;
  validationItemEdit.value = {};
};

onBeforeMount(async () => {
  if (route.name === 'templates_edit') {
    getSingleTemplate(route.params.id as string, defaultObj).then((resp) => {
      resp && (template.value = resp);
      file_temp.value = [new File([template.value.file], 'file')];
      mode.value = 'edit';
      isLoading.value = false;
    });
  } else if (route.name === 'templates_create') {
    mode.value = 'create';
    isLoading.value = false;
  }
});
</script>

<style scoped>
.error-item {
  background-color: rgba(255, 0, 0, 0.2); /* Example: Light red background */
}
</style>
