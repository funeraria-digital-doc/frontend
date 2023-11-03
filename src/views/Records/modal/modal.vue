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
                disabled
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
                <v-col>
                  <v-text-field
                    v-if="validation.field_type.toLowerCase() === 'text'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="fieldRules(true, null, 255)"
                    :type="validation.field_type.toLowerCase()"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <v-text-field
                    v-if="validation.field_type.toLowerCase() === 'email'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="fieldRules(true, null, 255)"
                    :type="validation.field_type.toLowerCase()"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <v-checkbox
                    v-if="validation.field_type.toLowerCase() === 'checkbox'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="validation.label"
                    :error-messages="errorMessages[validation.name]"
                  />

                  <v-select
                    v-if="validation.field_type.toLowerCase() === 'select'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="fieldRules(true, null, 255)"
                    :type="validation.field_type.toLowerCase()"
                    :items="validation.options"
                    item-title="label"
                    item-value="value"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <v-combobox
                    v-if="validation.field_type.toLowerCase() === 'multiselect'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="fieldRules(true, null, 255)"
                    :type="validation.field_type.toLowerCase()"
                    :items="validation.options"
                    item-title="label"
                    item-value="value"
                    :multiple="true"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                    :chips="true"
                    :closable-chips="true"
                    :clearable="true"
                    :teleport="true"
                  />
                  <v-text-field
                    v-if="
                      validation.field_type.toLowerCase() === 'date' &&
                      isDateOrDateTime(validation.name) == 'datetime'
                    "
                    type="datetime-local"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    @update:model-value="handleDate($event, validation.name)"
                    :placeholder="validation.placeholder ?? null"
                  />
                  <v-text-field
                    v-if="
                      validation.field_type.toLowerCase() === 'date' &&
                      isDateOrDateTime(validation.name) == 'date'
                    "
                    type="date"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    @update:model-value="handleDate($event, validation.name)"
                    :placeholder="validation.placeholder ?? null"
                  />
                  <v-text-field
                    v-if="
                      validation.field_type.toLowerCase() === 'date' &&
                      isDateOrDateTime(validation.name) == 'time'
                    "
                    type="time"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    @update:model-value="handleTime($event, validation.name)"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <!-- BOOLEAN -->
                  <v-select
                    v-if="validation.field_type.toLowerCase() === 'boolean'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :type="validation.field_type.toLowerCase()"
                    :items="booleanOptions"
                    item-title="label"
                    item-value="value"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
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
import { computed, defineComponent, ref, onBeforeMount, watch } from 'vue';
import { generateDocument, getTemplates } from '@/api/recordTemplates';
import type { TemplateInterface, ValidationInterface } from './modal.models';
import { fieldRules } from '@/components/shared/DynamicForm/DynamicFieldInput/dynamicFieldInput.utils';
import { clickDownloadFile } from '@/utils/downloadFile';
import moment from 'moment';
import { getFormat } from '../helper';
export default defineComponent({
  name: 'GenerateDocuments',
  components: {},
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
const booleanOptions = [
  { label: 'Sim', value: true },
  { label: 'Não', value: false },
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
      console.log('save', modalFields.value);
      generateDocument(props.documentId.raw.id, modalFields.value).then(
        (docResp) => {
          if (docResp.success) {
            clickDownloadFile(
              { data: docResp.data.file },
              props.documentId.raw.name
            );
            emit('close-modal');
            modalFields.value = {
              to_send_option: '',
              template: '',
              validations: {},
            };
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

function isDateOrDateTime(fieldName: String) {
  const selectedVal = templateValidations.value.find(
    (templateVal: { name: String }) => {
      return templateVal.name === fieldName;
    }
  );
  let format = 'datetime';
  const dateFormats = ['DAY_MONTH_YEAR', 'MONTH_YEAR', 'DAY_MONTH'];
  const timeFormats = [
    'HOURS_ONLY',
    'MINUTES_ONLY',
    'SECONDS_ONLY',
    'HOURS_MINUTES_SECONDS',
    'HOURS_MINUTES',
    'MINUTES_SECONDS',
  ];
  if (dateFormats.includes(selectedVal.format)) {
    format = 'date';
  }
  if (timeFormats.includes(selectedVal.format)) {
    format = 'time';
  }
  return format;
}

const handleDate = (modelData: Date, fieldName: string) => {
  const format = getFormat(fieldName, templateValidations.value, false);
  modalFields.value.validations[fieldName] = moment(modelData).format(format);
};

const handleTime = (modelData: Date, fieldName: string) => {
  const format = getFormat(fieldName, templateValidations.value, false);
  modalFields.value.validations[fieldName] = moment(
    modelData,
    'HH:mm:ss'
  ).format(format);
};

const templateValidations = computed(() => {
  let selected = {};
  validations.value.map((i: any) => {
    if (i.id == modalFields.value.template) {
      selected = i.validations;
    }
  });
  return selected;
});

watch(
  () => modalFields.value.template,
  () => {
    isTemplateSelected.value = modalFields.value.template ? true : false;
    let selectedTemplate = validations.value.find(
      (validation) => validation.id === modalFields.value.template
    );
    console.log('selectedTemplate', selectedTemplate);
    selectedTemplate?.validations.map((selected) => {
      console.log('name', selected.name);
      if (selected.default_value) {
        modalFields.value.validations[selected.name] = selected.default_value;
      }
    });
    if (selectedTemplate?.send_type) {
      console.log('selectedTemplate?.send_type', selectedTemplate?.send_type);
      modalFields.value.to_send_option = selectedTemplate.send_type;
    }
    //aqui tenho de por os valores default_value que vem do template
    console.log('modalFields.value', modalFields.value);
    console.log('validations.value', validations.value);
  }
);

function getValidations(templateValidationsItem: any) {
  let newValidations: any[] = [];
  templateValidationsItem.map((val: any) => {
    errorMessages.value[val.name] = '';
    if (val.is_field_custom) {
      newValidations.push(val);
    }
  });
  return newValidations;
}

onBeforeMount(async () => {
  await getTemplates(props.documentId.raw.id).then((resp) => {
    if (resp.success) {
      console.log('resp', resp.data.data);
      console.log('props', props.documentId.raw);
      templates.value = [];
      errorMessages.value = {};
      resp.data.data.map(
        (i: { send_type: any; title: any; id: any; validations: any }) => {
          templates.value.push({ label: i.title, value: i.id });
          validations.value.push({
            id: i.id,
            validations: getValidations(i.validations),
            send_type: i.send_type,
          });
        }
      );
    } else {
      templates.value = [];
      validations.value = [];
    }
  });
});
</script>
<style>
.dp__input_wrap div {
  position: unset !important;
}
</style>
