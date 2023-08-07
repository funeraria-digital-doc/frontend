<template>
  <page :title="templatesTitle">
    <v-form
      v-if="!isLoading"
      ref="form"
      validate-on="submit"
      @submit.prevent="save"
    >
      <v-container>
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              :id="`title_${template.title}`"
              v-model="template.title"
              label="Título"
              :rules="constants.nameRules"
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
            />
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-file-input
              id="template_file"
              v-model="file_temp"
              label="File input"
              @change="handleFileUpload(file_temp)"
              prepend-icon="mdi-paperclip"
              clearable
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
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row v-if="template.validations.length > 0">
          <v-col cols="12" sm="12" md="12">
            <v-list>
              <v-list-subheader>Validações</v-list-subheader>
              <v-list-item
                v-for="(item, i) in template.validations"
                :key="i"
                :value="item"
                :title="item.name"
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
      </v-container>
      <v-btn color="blue-darken-1" variant="text" type="submit">
        Submeter
      </v-btn>
    </v-form>
    <validation-edit-modal
      v-if="openCloseModal"
      :editModal="openCloseModal"
      :index="editIndex"
      :validation="validationItemEdit"
      @save="saveEditValidation"
      @cancel="cancelEditValidation"
    />
  </page>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as constants from './constants';
import { getSingleTemplate } from './helper';
import Page from '../../components/shared/Page/page.vue';
import ValidationEditModal from './components/ValidationEditModal/validationEditModal.vue';
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

const defaultObj: TemplateValidation = {
  db_collection: '',
  db_field_reference: '',
  default_value: [],
  format: '',
  is_date_numeric: false,
  is_field_custom: true,
  label: '',
  min: 0,
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
const openCloseModal = ref(false);
const editIndex = ref();

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

async function save() {
  if (
    template.value.validations.length == 1 &&
    JSON.stringify(template.value.validations) === JSON.stringify([defaultObj])
  ) {
    form.value.validations = [];
  }

  await form.value.validate().then((resp: any) => {
    const valid = resp.valid;

    if (valid) {
      if (mode.value === 'edit') {
        templateEdit(template.value).then((resp) => {
          console.log('resp', resp);
        });
      } else if (mode.value === 'create') {
        console.log('save create', template.value);
        templateCreate(template.value).then((resp) => {
          console.log('resp', resp);
        });
      }
    }
    if (template.value.validations.length == 0) {
      template.value.validations.push({ ...defaultObj });
    }
  });
}

const handleFileUpload = (file: Blob[]) => {
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
        reader.onerror = (error) => console.log('error', error);
      } else {
        template.value.file = '';
      }
      let newValidations = resp.data.variables.map((item: any) => {
        return { ...defaultObj, name: item };
      });
      template.value.validations = newValidations ? newValidations : [];
    }
  });
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
  console.log('resultado', template.value.validations[index]);
};
const cancelEditValidation = () => {
  console.log('cancel edit');
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
