<template>
  <v-dialog persistent v-model="editModal" max-width="800px">
    <v-card class="px-4 py-2 mb-4">
      <v-card-title class="text-h5 text-center">Editar validação</v-card-title>
      <v-form ref="form" validate-on="submit" @submit.prevent="save">
        <v-container>
          <v-row>
            <!-- name -->
            <v-col
              :cols="!showDbFields ? 6 : 12"
              :sm="!showDbFields ? 6 : 12"
              :md="!showDbFields ? 6 : 12"
            >
              <v-text-field
                :id="'name_' + props.index"
                v-model="validation.name"
                :rules="constants.nameRules"
                label="Nome da variável"
                :error-messages="errorMessages.title"
                disabled
              ></v-text-field>
            </v-col>

            <!-- field_type -->
            <v-col v-if="!showDbFields" cols="6" sm="6" md="6">
              <v-select
                :id="'field_type_' + props.index"
                v-model="validation.field_type"
                label="Tipo de Campo"
                :items="validationFieldTypeItems"
                item-title="label"
                item-value="value"
                :rules="constants.fieldTypeRules"
                clearable
                :error-messages="errorMessages.field_type"
              />
            </v-col>
          </v-row>

          <v-row>
            <!-- is_field_custom -->
            <v-checkbox
              :id="'is_field_custom_' + props.index"
              class="validation-edit-modal__is-field-custom-chk"
              v-model="validation.is_field_custom"
              :error-messages="errorMessages.is_field_custom"
            />
            <v-label class="validation-edit-modal__is-field-custom-label">
              Campo Personalizado?
            </v-label>
          </v-row>

          <v-row v-if="showOptions">
            <!-- options -->
            <v-col cols="12" sm="12" md="12">
              <v-combobox
                :id="'options_' + props.index"
                v-model="validation.options"
                label="Opções"
                :items="[]"
                multiple
                chips
                closable-chips
                item-title="label"
                item-value="value"
                :return-object="false"
                :error-messages="errorMessages.options"
              ></v-combobox>
            </v-col>
          </v-row>

          <v-row v-if="showDbFields">
            <!-- db_collection -->
            <v-col cols="6" sm="6" md="6">
              <v-select
                :id="'db_collection_' + props.index"
                v-model="validation.db_collection"
                label="Tabela"
                :items="constants.dbCollections"
                item-title="label"
                item-value="value"
                clearable
                :rules="constants.groupRules"
                :error-messages="errorMessages.db_collection"
              />
            </v-col>
            <!-- db_field_reference -->
            <v-col cols="6" sm="6" md="6">
              <v-select
                :id="'db_field_reference_' + props.index"
                v-model="validation.db_field_reference"
                label="Campo da Tabela"
                :items="dbFields"
                item-title="label"
                item-value="value"
                item-props="type"
                clearable
                :rules="constants.groupRules"
                :error-messages="errorMessages.db_field_reference"
              />
            </v-col>
          </v-row>

          <v-row v-if="showDateFields">
            <!-- format -->
            <v-col cols="8" sm="8" md="8">
              <v-select
                :id="'format_' + props.index"
                v-model="validation.format"
                label="Formato da data"
                :items="constants.dateFormat"
                item-title="label"
                item-value="value"
                clearable
                :rules="constants.groupRules"
                :error-messages="errorMessages.format"
              />
            </v-col>
            <!-- is_date_numeric -->
            <v-col cols="4" sm="4" md="4">
              <v-checkbox
                :id="'is_date_numeric_' + props.index"
                v-model="validation.is_date_numeric"
                :error-messages="errorMessages.is_date_numeric"
              >
                <template v-slot:label>
                  <div>
                    <span>Data Numérica?</span><br>
                    <span>ex: 20/10/2023</span>
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

          <div v-if="validation.is_field_custom">
            <v-row>
              <!-- default_value -->
              <v-col v-if="showDefaultValue" cols="12" sm="12" md="12">
                <v-combobox
                  :id="'default_value_' + props.index"
                  v-model="validation.default_value"
                  :label="defaultValueLabel"
                  :items="defaultValueValues"
                  :multiple="isMultiSelect"
                  :chips="isMultiSelect"
                  :closable-chips="isMultiSelect"
                  item-title="label"
                  item-value="value"
                  :return-object="false"
                  :type="isNumberField"
                  :rules="defaultValueRules(validation)"
                  :error-messages="errorMessages.default_value"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <!-- placeholder -->
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  :id="'placeholder_' + props.index"
                  v-model="validation.placeholder"
                  :rules="constants.textRules"
                  label="Placeholder"
                  :error-messages="errorMessages.placeholder"
                ></v-text-field>
              </v-col>
              <!-- label -->
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  :id="'label_' + props.index"
                  v-model="validation.label"
                  :rules="constants.labelRules"
                  label="Nome do campo"
                  :error-messages="errorMessages.label"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- min -->
              <v-col
                :cols="showMax ? 6 : 12"
                :sm="showMax ? 6 : 12"
                :md="showMax ? 6 : 12"
              >
                <v-text-field
                  :id="'min_' + props.index"
                  v-model.number="validation.min"
                  type="number"
                  label="Minimo"
                  :error-messages="errorMessages.min"
                ></v-text-field>
              </v-col>
              <!-- max -->
              <v-col v-if="showMax" cols="6" sm="6" md="6">
                <v-text-field
                  :id="'max_' + props.index"
                  v-model.number="validation.max"
                  type="number"
                  :rules="maxRules(validation)"
                  label="Máximo"
                  :error-messages="errorMessages.max"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="cancelEdit">
              Não
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" type="submit">
              Sim
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'ValidationEditModal',
});
</script>

<script lang="ts" setup>
import * as constants from '../../constants';
import {
  defaultValueRules,
  maxRules,
  validationFieldTypeItems,
} from './validationEditModal.constants';

const props = defineProps([
  'editModal',
  'validation',
  'index',
  'errorMessages',
]);
const emit = defineEmits(['save', 'cancel']);

let validation = ref(props.validation);
let editModal = ref(props.editModal);
let errorMessages = ref();

const dbFields = ref<{ label: string; value: string }[]>([]);

const form = ref();

const save = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    emit('save', validation.value, props.index);
  } else {
    console.error('Template validation edit invalid');
  }
};

const cancelEdit = () => emit('cancel');

const showDbFields = computed(() =>
  validation.value.is_field_custom ? false : true
);

const showDateFields = computed(() =>
  ['DATE', 'TIME', 'DATETIME'].indexOf(validation.value.field_type) > -1
    ? true
    : false
);

const isMultiSelect = computed(() =>
  validation.value.field_type === 'MULTISELECT' ? true : false
);

const defaultValueLabel = computed(() =>
  isMultiSelect.value ? 'Valores por defeito' : 'Valor por defeito'
);

const isNumberField = computed(() => {
  return validation.value.field_type === 'INTEGER' ? 'number' : 'text';
});

const showDefaultValue = computed(() => {
  return (
    (validation.value.field_type !== 'MULTISELECT' ||
      (validation.value.field_type === 'MULTISELECT' &&
        validation.value.options.length > 0)) &&
    (validation.value.field_type !== 'SELECT' ||
      (validation.value.field_type === 'SELECT' &&
        validation.value.options &&
        validation.value.options.length > 0))
  );
});

const defaultValueValues = computed(() => {
  if (
    ['SELECT', 'MULTISELECT'].indexOf(validation.value.field_type) > -1 &&
    validation.value.options
  ) {
    return validation.value.options.map((item: any) => {
      return { label: item, value: item };
    });
  }
  if (validation.value.field_type === 'BOOLEAN') {
    return constants.BooleanOptions;
  }
  return [];
});

const showMax = computed(() => {
  if (['SELECT', 'DATE', 'EMAIL'].indexOf(validation.value.field_type) > -1) {
    return false;
  } else if (validation.value.field_type === 'BOOLEAN') {
    return false;
  } else {
    return true;
  }
});

const showOptions = computed(() => {
  let canShow = false;
  if (
    validation.value.is_field_custom &&
    (validation.value.field_type === 'SELECT' ||
      validation.value.field_type === 'MULTISELECT')
  ) {
    canShow = true;
  }
  return canShow;
});

watch(showDbFields, (showDbFields) => {
  if (!showDbFields) {
    validation.value.db_collection = null;
    validation.value.db_field_reference = null;
  }
});

watch(showDateFields, (showDateFields) => {
  if (!showDateFields) {
    validation.value.format = null;
    validation.value.is_date_numeric = false;
  }
});

watch(
  () => validation.value.field_type,
  (field_type) => {
    if (field_type) {
      validation.value.default_value = [];
    }
    if (['SELECT', 'MULTISELECT'].indexOf(field_type) == -1) {
      validation.value.options = [];
    }
    if (['SELECT', 'DATE', 'EMAIL'].indexOf(field_type) > -1) {
      validation.value.max = 1;
    } else {
      validation.value.max = null;
    }
  }
);

function mapDbFields() {
  if (validation.value.db_collection === 'USERS') {
    dbFields.value = constants.usersFields.map((item) => {
      return { label: item.label, value: item.value };
    });
  } else if (validation.value.db_collection === 'GROUPS') {
    dbFields.value = constants.groupsFields.map((item) => {
      return { label: item.label, value: item.value };
    });
  } else if (validation.value.db_collection === 'RECORDS') {
    dbFields.value = constants.recordsFields.map((item) => {
      return { label: item.label, value: item.value };
    });
  }
}

watch(
  () => validation.value.is_field_custom,
  (field_custom) => {
    if (field_custom) {
      validation.value.field_type = '';
      validation.value.db_collection = '';
      validation.value.db_field_reference = '';
    } else {
      validation.value.field_type = '';
      mapDbFields();
    }
  }
);

watch(
  () => validation.value.db_collection,
  (db_collection) => {
    if (['USERS', 'GROUPS', 'RECORDS'].indexOf(db_collection) > -1) {
      mapDbFields();
    } else {
      dbFields.value = [];
    }
    validation.value.db_field_reference = '';
  }
);

watch(
  () => validation.value.db_field_reference,
  (db_field_reference) => {
    if (validation.value.db_collection === 'USERS') {
      const item = constants.usersFields.find(
        (obj) => obj.value === db_field_reference
      );
      validation.value.field_type = item ? item.type : 'TEXT';
    } else if (validation.value.db_collection === 'GROUPS') {
      const item = constants.groupsFields.find(
        (obj) => obj.value === db_field_reference
      );
      validation.value.field_type = item ? item.type : 'TEXT';
    } else if (validation.value.db_collection === 'RECORDS') {
      const item = constants.recordsFields.find(
        (obj) => obj.value === db_field_reference
      );
      validation.value.field_type = item ? item.type : 'TEXT';
    }
  }
);

watch(
  () => validation.value.options,
  (options) => {
    if (
      validation.value &&
      validation.value.default_value &&
      validation.value.default_value.length > 0
    ) {
      let newDefaultValue = [];
      validation.value.default_value.map((val: any) => {
        if (options.indexOf(val) > -1) {
          newDefaultValue.push(val);
        }
      });
      validation.value.default_value = newDefaultValue;
    }
  }
);

onBeforeMount(() => {
  if (props.errorMessages && props.errorMessages[props.index]) {
    errorMessages.value = props.errorMessages[props.index];
  } else {
    errorMessages.value = {
      db_collection: '',
      db_field_reference: '',
      default_value: '',
      format: '',
      is_date_numeric: '',
      is_field_custom: '',
      label: '',
      min: '',
      max: '',
      optional: '',
      options: '',
      placeholder: '',
    };
  }
  if (validation.value.db_collection != '') {
    mapDbFields();
  }
});
</script>

<style lang="scss">
.validation-edit-modal {
  &__is-field-custom-chk {
    max-width: fit-content;
  }

  &__is-field-custom-label {
    margin-top: -1rem;
  }
}
</style>
