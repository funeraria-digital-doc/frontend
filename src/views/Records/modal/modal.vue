<template>
  <v-dialog v-model="props.modalState" max-width="500px" persistent>
    <v-card>
      <v-card-title class="mt-3">
        <span class="text-h5 ml-6">Gerar Documentos</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" validate-on="submit" @submit.prevent="save">
          <v-container>
            <v-col>
              <v-select
                id="to_send_option_id"
                v-model="modalFields.to_send_option"
                label="Tipo de Envio"
                :rules="rules"
                :items="toSendOptionsItems"
                item-title="label"
                item-value="value"
                clearable
              />
            </v-col>
            <v-col>
              <v-select
                id="template_id"
                v-model="modalFields.template"
                label="Template"
                :rules="rules"
                :items="templates"
                item-title="label"
                item-value="value"
                clearable
              />
            </v-col>
            <div v-if="isTemplateSelected">
              <div
                v-for="(validation, index) in templateValidations"
                :key="index"
              >
                <!-- <dynamic-field-input
                    :field="validation"
                    :errorMessages="errorMessages"
                  /> -->
                  {{ console.log(props.documentId) }}
                <v-col>
                  <v-text-field
                    v-if="validation.input === 'text'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="validation.label"
                    :rules="validation.rules"
                    :type="validation.type"
                    :error-messages="errorMessages[validation.name]"
                  />

                  <v-checkbox
                    v-if="validation.input === 'checkbox'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="validation.label"
                    :error-messages="errorMessages[validation.name]"
                  />

                  <v-select
                    v-if="validation.input === 'select'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="validation.label"
                    :rules="validation.rules"
                    :type="validation.type"
                    :items="validation.items"
                    item-title="label"
                    item-value="value"
                    :error-messages="errorMessages[validation.name]"
                  />

                  <v-text-field
                    v-if="validation.input === 'date'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="validation.label"
                    :rules="validation.rules"
                    type="date"
                  />
                </v-col>
              </div>
            </div>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="confirmClose"
              >Cancelar</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" type="submit"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { onBeforeMount, onMounted, watch } from 'vue';
import { generateDocument, getTemplates } from '@/api/recordTemplates';
import type { TemplateInterface, ValidationInterface } from './modal.models';
//import DynamicFieldInput from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.vue';
import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';
import { clickDownloadFile } from '@/utils/downloadFile';
//import * as constants from '../constants.ts';
export default defineComponent({
  name: 'GenerateDocuments',
  components: {
    //DynamicFieldInput,
  },
});
</script>

<script lang="ts" setup>
const form = ref();
const modalFields = ref({
  to_send_option: '',
  template: '',
  validations: {},
});

const props = defineProps(['documentId', 'modalState']);
const emit = defineEmits(['close-modal']);
const errorMessages = ref();

const templates = ref<TemplateInterface[]>([]);
const validations = ref<ValidationInterface[]>([]);
const toSendOptionsItems = [
  { label: 'Documento', value: 'DOCUMENT' },
  { label: 'Email', value: 'EMAIL' },
  { label: 'Documento e Email', value: 'DOCUMENT_EMAIL' },
];

const rules = [(value: string) => !!value || 'É obrigatório escolher 1 opção.'];
const isTemplateSelected = ref(false);

function confirmClose() {
  emit('close-modal');
  modalFields.value = {
    to_send_option: '',
    template: '',
    validations: {},
  };
}

function save() {
  form.value.validate().then((resp: any) => {
    if (resp.valid) {
      generateDocument(props.documentId.raw.id, modalFields.value).then(
        (docResp) => {
          if (docResp.success) {
            clickDownloadFile(
              { data: docResp.data.file },
              props.documentId.raw.name
            );
            emit('close-modal');
          } else {
            console.log('errors', docResp);
          }
        }
      );
    } else {
      console.log('errors', resp.errors);
    }
  });
}

const templateValidations = computed(() => {
  let selected = {};
  validations.value.map((i: any) => {
    if (i.id == modalFields.value.template) {
      selected = i.validations;
    }
  });
  console.log('templateValidations', validations.value)
  return selected;
});

watch(
  () => modalFields.value.template,
  () => {
    isTemplateSelected.value = modalFields.value.template ? true : false;
  }
);

function getValidations(templateValidationsItem: any) {
  let newValidations: {
    name: any;
    label: any;
    input: any;
    rules: ((v: string) => string | true)[];
  }[] = [];
  templateValidationsItem.map((val: any) => {
    errorMessages.value[val.name] = '';
    if (val.is_field_custom) {
      newValidations.push({
        name: val.name,
        label: val.label ? val.label : '',
        input: val.field_type.toLowerCase(),
        rules: fieldRules(true, null, 255),
      });
    }
  });
  return newValidations;
}

onMounted(() => {});

onBeforeMount(async () => {
  await getTemplates(props.documentId.raw.id).then((resp) => {
    if (resp.success) {
      templates.value = [];
      errorMessages.value = {};
      resp.data.data.map((i: { title: any; id: any; validations: any }) => {
        templates.value.push({ label: i.title, value: i.id });
        validations.value.push({
          id: i.id,
          validations: getValidations(i.validations),
        });
      });
    } else {
      templates.value = [];
      validations.value = [];
    }
  });
});
</script>
