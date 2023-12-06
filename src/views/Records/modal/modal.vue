<template>
  <v-dialog v-model="props.modalState" max-width="500px" persistent>
    <v-card v-if="!hasKeysMissing">
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
                    no-data-text="Sem Dados."
                    persistent-placeholder
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

                  <!-- DATE/DATETIME/TIME -->
                  <v-text-field
                    v-if="
                      ['DATE', 'DATETIME', 'TIME'].indexOf(
                        validation.field_type
                      ) >= 0
                    "
                    :type="getDateType(validation, templateValidations)"
                    :label="
                      validation.label ? validation.label : validation.name
                    "
                    :rules="getFieldRules(validation)"
                    @update:model-value="
                      handleDate(
                        $event,
                        validation.name,
                        validation.field_type === 'TIME' ? true : false
                      )
                    "
                    clearable
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
              <div
                v-for="(fileValidation, fileIndex) in templateFileValidations"
                :key="fileIndex"
              >
                <v-col>
                  <photo-upload
                    :error-messages="fileValidation.name"
                    :id="fileValidation.name"
                    :title="fileValidation.name"
                    :imageUrl="
                      modalFields.file_validations[fileValidation.name]
                    "
                    :label="fileValidation.name"
                    @save="handleFileChange"
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
    <v-card v-else>
      <v-card-title class="mt-3 d-flex align-items-center">
        <v-icon color="warning" icon="mdi-alert-circle" size="x-large"></v-icon>
        <span class="text-h5 ml-6">Informações em falta</span>
      </v-card-title>
      <v-card-text>
        <div v-for="msg in missingKeys" :key="msg">
          <div v-html="getMissingKeyLabel(msg)"></div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="redirectToRecord"
          >Preencher dados em falta</v-btn
        >
        <v-btn color="blue-darken-1" variant="text" @click="closeMissingModal"
          >Cancelar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- <v-dialog v-model="hasKeysMissing" max-width="500px" persistent>
    
  </v-dialog> -->
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeMount, watch } from 'vue';
import { getTemplates } from '@/api/recordTemplates';
import type { TemplateInterface, ValidationInterface } from './modal.models';
import {
  getFieldRules,
  getDateType,
  getValidations,
  saveForm,
  getDateFormated,
  getMissingKeysLabelHelper,
} from './modal.helper';
import PhotoUpload from '@/components/shared/PhotoUpload/photoUpload.vue';
import router from '@/router';
export default defineComponent({
  name: 'GenerateDocuments',
  components: {
    PhotoUpload,
  },
});
</script>

<script lang="ts" setup>
const form = ref();
const modalFields = ref({
  to_send_option: '',
  template: '',
  validations: {},
  file_validations: {},
});
const props = defineProps(['documentId', 'modalState']);
const emit = defineEmits(['close-modal', 'snack-messages']);
const errorMessages = ref();
const templates = ref<TemplateInterface[]>([]);
const validations = ref<ValidationInterface[]>([]);
const isTemplateSelected = ref(false);
const hasKeysMissing = ref(false);
const forceSave = ref(false);
const missingKeys = ref();

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

function emitCloseModal() {
  emit('close-modal');
}

function emitSnackMessages(message: any) {
  emit('snack-messages', message);
}

function confirmClose() {
  emitCloseModal();
  modalFields.value = {
    to_send_option: '',
    template: '',
    validations: {},
    file_validations: {},
  };
}

function redirectToRecord() {
  hasKeysMissing.value = false;
  missingKeys.value = [];
  modalFields.value = {
    to_send_option: '',
    template: '',
    validations: {},
    file_validations: {},
  };
  router.push({ name: 'records_edit', params: { id: props.documentId.id } });
  emitCloseModal();
}

function closeMissingModal() {
  hasKeysMissing.value = false;
  missingKeys.value = [];
}

function save() {
  saveForm(
    form,
    props,
    modalFields,
    errorMessages,
    emitSnackMessages,
    emitCloseModal,
    hasKeysMissing,
    forceSave,
    missingKeys
  );
}

function handleDate(modelData: Date, fieldName: string, isTime: boolean) {
  const selectedVal = templateValidations.value.find(
    (templateVal: { name: String }) => {
      return templateVal.name === fieldName;
    }
  );
  modalFields.value.validations[fieldName] = getDateFormated(
    selectedVal.format,
    modelData,
    isTime
  );
}

function getMissingKeyLabel(key: any) {
  return getMissingKeysLabelHelper(key);
}

const templateValidations = computed(() => {
  let selected = {};
  validations.value.map((i: any) => {
    if (i.id == modalFields.value.template) {
      selected = i.validations;
    }
  });
  return selected;
});

const templateFileValidations = computed(() => {
  let selected = {};
  validations.value.map((i: any) => {
    if (i.id == modalFields.value.template) {
      selected = i.file_validations;
      i.file_validations.map((f: { name: string }) => {
        modalFields.value.file_validations[f.name] = f.image_data_base64
          ? f.image_data_base64
          : '';
      });
    }
  });
  return selected;
});

const handleFileChange = (base64File: string, file: any, name: string) => {
  modalFields.value.file_validations[name] = base64File ?? '';
};

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

onBeforeMount(async () => {
  await getTemplates(props.documentId.id).then((resp) => {
    templates.value = [];
    errorMessages.value = {};

    if (resp.success) {
      resp.data.data.map(
        (i: {
          send_type: any;
          title: any;
          id: any;
          validations: any;
          file_validations: any;
        }) => {
          templates.value.push({ label: i.title, value: i.id });
          validations.value.push({
            id: i.id,
            validations: getValidations(i.validations, errorMessages),
            file_validations: getValidations(i.file_validations, errorMessages),
            send_type: i.send_type,
          });
        }
      );
    }
  });
});
</script>
<style>
.dp__input_wrap div {
  position: unset !important;
}
</style>
