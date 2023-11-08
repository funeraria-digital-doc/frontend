<template>
  <v-dialog v-model="props.modalState" max-width="500px" persistent>
    <v-card>
      <v-card-title class="mt-3">
        <span class="text-h5 ml-6">Gerar Documentos</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          validate-on="submit"
          @submit.prevent="save"
          :disabled="isLoading"
        >
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
                  <!-- TEXT|EMAIL -->
                  <v-text-field
                    v-if="
                      ['text', 'email'].includes(
                        validation.field_type.toLowerCase()
                      )
                    "
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="getFieldRules(validation)"
                    :type="validation.field_type.toLowerCase()"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <!-- TEXTAREA -->
                  <v-textarea
                    v-if="
                      ['textarea'].includes(validation.field_type.toLowerCase())
                    "
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    clearable
                    auto-grow
                    :rules="getFieldRules(validation)"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <!-- NUMBER -->
                  <v-text-field
                    v-if="validation.field_type.toLowerCase() === 'integer'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    type="number"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                    :rules="getFieldRules(validation)"
                  />

                  <!-- CHECKBOX -->
                  <v-checkbox
                    v-if="validation.field_type.toLowerCase() === 'checkbox'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="validation.label"
                    :error-messages="errorMessages[validation.name]"
                    :rules="getFieldRules(validation)"
                  />

                  <!-- SELECT -->
                  <v-select
                    v-if="validation.field_type.toLowerCase() === 'select'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :type="validation.field_type.toLowerCase()"
                    :items="validation.options"
                    item-title="label"
                    item-value="value"
                    clearable
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                    :rules="getFieldRules(validation)"
                  />

                  <!-- MULTISELECT -->
                  <v-combobox
                    v-if="validation.field_type.toLowerCase() === 'multiselect'"
                    :id="validation.name"
                    v-model="modalFields.validations[validation.name]"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
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
                    :rules="getFieldRules(validation)"
                  />

                  <!-- DATETIME -->
                  <v-text-field
                    v-if="
                      validation.field_type.toLowerCase() === 'date' &&
                      isDateOrDateTime(validation.name) == 'datetime'
                    "
                    type="datetime-local"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="getFieldRules(validation)"
                    @update:model-value="handleDate($event, validation.name)"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <!-- DATE -->
                  <v-text-field
                    v-if="
                      validation.field_type.toLowerCase() === 'date' &&
                      isDateOrDateTime(validation.name) == 'date'
                    "
                    type="date"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="getFieldRules(validation)"
                    @update:model-value="handleDate($event, validation.name)"
                    :error-messages="errorMessages[validation.name]"
                    :placeholder="validation.placeholder ?? null"
                  />

                  <!-- TIME -->
                  <v-text-field
                    v-if="
                      validation.field_type.toLowerCase() === 'date' &&
                      isDateOrDateTime(validation.name) == 'time'
                    "
                    type="time"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="getFieldRules(validation)"
                    @update:model-value="handleTime($event, validation.name)"
                    :error-messages="errorMessages[validation.name]"
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
                    :items="booleanOptions"
                    item-title="label"
                    item-value="value"
                    clearable
                    :rules="getFieldRules(validation)"
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
import { clickDownloadFile } from '@/utils/downloadFile';
import { getFieldRules } from './modal.helper';
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
const emit = defineEmits(['close-modal', 'snack-messages']);
const isLoading = ref(false);
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
  isLoading.value = true;
  form.value.validate().then((resp: any) => {
    if (resp.valid) {
      generateDocument(props.documentId.raw.id, modalFields.value).then(
        (docResp) => {
          console.log(docResp)
          if (docResp.success) {
            clickDownloadFile(
              { data: docResp.data.file },
              props.documentId.raw.name
            );
            emit('snack-messages', [
              'Documento emitido com sucesso.',
              '',
              true,
            ]);
            emit('close-modal');
            modalFields.value = {
              to_send_option: '',
              template: '',
              validations: {},
            };
            isLoading.value = false;
          } else {
            if (docResp.error && docResp.error.status.toString()[0] === '4') {
              emit('snack-messages', [
                'Formulário preenchido incorretamente.',
                'Preencha todos os campos em falta',
                false,
              ]);
              getApiErrors(docResp.error);
              isLoading.value = false;
            } else {
              emit('snack-messages', [
                'Ocorreu um erro. Tente novamente mais tarde.',
                'Em caso de presistencia, contacte os administradores do sistema',
                false,
              ]);
              isLoading.value = false;
            }
          }
        }
      );
    } else {
      emit('snack-messages', [
        'Formulário preenchido incorretamente.',
        'Preencha todos os campos em falta',
        false,
      ]);
      isLoading.value = false;
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
    selectedTemplate?.validations.map((selected) => {
      if (selected.default_value) {
        modalFields.value.validations[selected.name] = selected.default_value;
      }
    });
    if (selectedTemplate?.send_type) {
      modalFields.value.to_send_option = selectedTemplate.send_type;
    }
  }
);

function getApiErrors(errors: any) {
  for (var t = 0; t < Object.keys(errorMessages.value).length; t++) {
    const errorMessageKey = Object.keys(errorMessages.value)[t];
    errorMessages.value[errorMessageKey] = '';
  }
  console.log('keys_missing', errors.keys_missing)
  if (errors.keys_missing) {
    for (let i = 0; i < errors.keys_missing.length; i++) {
      const key = errors.keys_missing[i];
      console.log('key - ' + key)
      errorMessages.value[key] = 'Campo obrigatório.';
    }
    console.log('errorMessages.value', errorMessages.value)
  }
  if (errors.errors) {
    for (let i = 0; i < Object.keys(errors.errors).length; i++) {
      const key = Object.keys(errors.errors)[i];
      if (typeof errors.errors[key] === 'object' && errors.errors[key][Object.keys(errors.errors[key])[0]]) {
        errorMessages.value[key] =
          errors.errors[key][Object.keys(errors.errors[key])[0]];
      }else{
        errorMessages.value[key] = errors.errors[key]
      }
    }
  }
}

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
