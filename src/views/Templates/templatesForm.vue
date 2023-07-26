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
              :id="'title_' + template.title"
              v-model="template.title"
              label="Título"
              :rules="constants.nameRules"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-select
              :id="'group_id_' + template.group_id"
              v-model="template.group_id"
              label="Funerária"
              :items="constants.fields.find((f) => f.name === 'group_id').items"
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
              :id="'send_type_' + template.send_type"
              v-model="template.send_type"
              label="Tipo de Envio"
              :items="
                constants.fields.find((f) => f.name === 'send_type').items
              "
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
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card class="mx-auto">
              <v-list>
                <v-list-subheader>Validações</v-list-subheader>
                <v-list-item
                  v-for="(item, i) in template.validations"
                  :key="i"
                  :value="item"
                  color="white"
                  variant="elevated"
                >
                  <template v-slot:prepend>
                    <v-icon icon="mdi-arrow-right-bold-circle-outline"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <div>
              <v-card
                class="px-4 py-2 mb-4"
                v-for="(validation, index) in template.validations"
                :key="index"
              >
                <validation-item
                  :validation="validation"
                  :index="index"
                  @save="saveValidationName"
                  @edit="editValidation"
                />
                <div class="d-flex" style="justify-content: end">
                  <v-btn
                    color="red-darken-1"
                    variant="text"
                    type="button"
                    @click="removeMember(index)"
                    >Eliminar</v-btn
                  >
                </div>
              </v-card>
              <v-btn @click="addValidation" color="primary">Adicionar</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-btn color="blue-darken-1" variant="text" type="submit">
        Submeter
      </v-btn>
    </v-form>
    <v-dialog v-model="changeVars" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center"
          >Deseja substituir todas as validações?</v-card-title
        >
        <v-card-text v-html="varsDisplay" class="text-center"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeChangeVars"
            >Não</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="saveChangeVars"
            >Sim</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import { computed, defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as constants from './constants';
import { getSingleTemplate } from './helper';
import Page from '../../components/shared/Page/page.vue';
import ValidationItem from './components/validationItem.vue';
import ValidationEditModal from './components/validationEditModal.vue';
import {
  getVariablesFromFile,
  templateCreate,
  templateEdit,
} from '@/api/templates';
export default defineComponent({
  name: 'TemplatesForm',
  components: {
    ValidationItem,
    ValidationEditModal,
  },
});
</script>
<script lang="ts" setup>
const route = useRoute();

const defaultObj = {
  name: null,
  optional: true,
  field_type: null,
  is_field_custom: true,
  options: [],
  placeholder: '',
  format: '',
  is_date_numeric: false,
  label: '',
  db_collection: '',
  db_field_reference: '',
  min: null,
  max: null,
  default_value: [],
};
const template = ref({
  id: null,
  title: '',
  group_id: null,
  send_type: 'NONE',
  send_email_to: [],
  send_email_to_cc: [],
  send_email_to_bcc: [],
  file: '',
  validations: [{ ...defaultObj }],
});
let validationItemEdit = reactive({});
const file_temp = ref(null);
const mode = ref('');
const form = ref();
const isLoading = ref(true);
const changeVars = ref(false);
const changeVarsValues = ref({
  vars: [],
  validationVars: {},
  varEquals: [],
});
const openCloseModal = ref(false);
const editIndex = ref(null);

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

  await form.value.validate().then((resp) => {
    const valid = resp.valid;
    console.log(resp);
    console.log('valid', valid);
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
const addValidation = () => {
  template.value.validations.push({ ...defaultObj });
};

const removeMember = (index: Number) => {
  template.value.validations.splice(index, 1);
  if (template.value.validations.length == 0) {
    template.value.validations.push({ ...defaultObj });
  }
  template.value.validations = [...template.value.validations];
};

const handleFileUpload = (file: Blob[]) => {
  //if (template.value.file) {
  getVariablesFromFile(file[0]).then((resp: any) => {
    console.log(resp);
    if (
      resp &&
      resp.data &&
      resp.data.variables &&
      resp.data.variables.length > 0
    ) {
      if (file[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = () => (template.value.file = reader.result);
        reader.onerror = (error) => console.log('error', error);
      } else {
        template.value.file = '';
      }
      var varsEqual = checkVariablesEqual(resp.data.variables);
      changeVarsValues.value.validationVars = {
        ...template.value.validations,
      };
      changeVarsValues.value.vars = resp.data.variables;
      changeVarsValues.value.varEquals = varsEqual;
      changeVars.value = true;
    }
  });
  //}
};

function checkVariablesEqual(requestValidations: any) {
  var compareObj = template.value.validations
    .filter((item) => requestValidations.indexOf(item.name) >= 0)
    .map((itemVal) => itemVal.name);
  return compareObj ? compareObj : [];
}

function closeChangeVars() {
  changeVarsValues.value = {
    vars: [],
    validationVars: {},
    varEquals: [],
  };
}

function saveChangeVars() {
  let newValidations = changeVarsValues.value.vars.map((item) => {
    return { ...defaultObj, name: item };
  });
  template.value.validations = newValidations ? newValidations : [];
  changeVarsValues.value = {
    vars: [],
    validationVars: {},
    varEquals: [],
  };
  changeVars.value = false;
}

const varsDisplay = computed(() => {
  var response = '';
  if (changeVarsValues.value.varEquals.length > 0) {
    response += '<h3>Variáveis iguais encontradas:</h3>';
  }
  changeVarsValues.value.varEquals.map((item) => {
    response += '<p>' + item + '</p>';
  });
  if (changeVarsValues.value.vars.length > 0) {
    response += '<h3>Todas as variáveis do ficheiro:</h3>';
  }
  changeVarsValues.value.vars.map((item) => {
    response += '<p>' + item + '</p>';
  });
  return response;
});

const saveValidationName = (validation: any, index: number) => {
  template.value.validations[index].name = validation;
};

const editValidation = (index: number) => {
  validationItemEdit = { ...template.value.validations[index] };
  openCloseModal.value = true;
  editIndex.value = index;
};

const saveEditValidation = (validation: any, index: number) => {
  console.log('save edit1', validation);
  console.log('save edit2', index);
  openCloseModal.value = false;
  editIndex.value = null;
  template.value.validations[index] = {
    ...template.value.validations[index],
    ...validation.value,
  };
  validationItemEdit = {};
};
const cancelEditValidation = () => {
  console.log('cancel edit');
  openCloseModal.value = false;
  editIndex.value = null;
  validationItemEdit = {};
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
