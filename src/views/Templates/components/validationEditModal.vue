<template>
  <v-dialog v-model="editModal" max-width="800px">
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
              ></v-text-field>
            </v-col>
            <!-- field_type -->
            <v-col v-if="!showDbFields" cols="6" sm="6" md="6">
              <v-select
                :id="'field_type_' + props.index"
                v-model="validation.field_type"
                label="Tipo de Campo"
                :items="fieldTypeItems"
                item-title="label"
                item-value="value"
                :rules="constants.fieldTypeRules"
                clearable
              />
            </v-col>
          </v-row>
          <v-row>
            <!-- is_field_custom -->
            <v-col cols="6" sm="6" md="6">
              <v-checkbox
                :id="'is_field_custom_' + props.index"
                v-model="validation.is_field_custom"
                label="Campo Personalizado?"
              />
            </v-col>
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
              />
            </v-col>
            <!-- is_date_numeric -->
            <v-col cols="4" sm="4" md="4">
              <v-checkbox
                :id="'is_date_numeric_' + props.index"
                v-model="validation.is_date_numeric"
                label="Data por extenso?"
              />
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
                  :items="validation.options ? validation.options : []"
                  :multiple="isMultiSelect"
                  :chips="isMultiSelect"
                  :closable-chips="isMultiSelect"
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
                ></v-text-field>
              </v-col>
              <!-- label -->
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  :id="'label_' + props.index"
                  v-model="validation.label"
                  :rules="constants.labelRules"
                  label="Nome do campo"
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
                  v-model="validation.min"
                  label="Minimo"
                ></v-text-field>
              </v-col>
              <!-- max -->
              <v-col v-if="showMax" cols="6" sm="6" md="6">
                <v-text-field
                  :id="'max_' + props.index"
                  v-model="validation.max"
                  :rules="maxRules"
                  label="Máximo"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="cancelEdit"
              >Não</v-btn
            >
            <v-btn color="blue-darken-1" variant="text" type="submit"
              >Sim</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import * as constants from '../constants';

export default defineComponent({
  name: 'ValidationEditModal',
});
</script>

<script lang="ts" setup>
const props = defineProps(['editModal', 'validation', 'index']);
const emit = defineEmits(['save', 'cancel']);

let validation = ref(props.validation);
let editModal = ref(props.editModal);

const dbFields = ref<{ label: string; value: string }[]>([]);

const fieldTypeItems = [
  { label: 'Texto', value: 'TEXT' },
  { label: 'Verdadeiro/Falso', value: 'BOOLEAN' },
  { label: 'Inteiro', value: 'INTEGER' },
  { label: 'Opções', value: 'SELECT' },
  { label: 'Multiplas Opções', value: 'MULTISELECT' },
  { label: 'Área de Texto', value: 'TEXTAREA' },
  { label: 'Data', value: 'DATE' },
  { label: 'Email', value: 'EMAIL' },
];
const form = ref();

const maxRules = [
  (value: string) => {
    if (value == '' || value == null) {
      return true;
    } else {
      if (value < validation.value.min) {
        return 'Máximo tem de ser maior que o mínimo';
      } else {
        return true;
      }
    }
  },
];

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
  validation.value.field_type === 'DATE' ? true : false
);

const isMultiSelect = computed(() =>
  validation.value.field_type === 'MULTISELECT' ? true : false
);

const defaultValueLabel = computed(() =>
  isMultiSelect.value ? 'Valores por defeito' : 'Valor por defeito'
);

const showDefaultValue = computed(() => {
  return (
    (validation.value.field_type !== 'MULTISELECT' ||
      (validation.value.field_type === 'MULTISELECT' &&
        validation.value.options.length > 0)) &&
    (validation.value.field_type !== 'SELECT' ||
      (validation.value.field_type === 'SELECT' &&
        validation.value.options.length > 0))
  );
});

const showMax = ref(false);

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
    if (['SELECT', 'MULTISELECT'].indexOf(field_type) == -1) {
      validation.value.options = [];
      validation.value.default_value = [];
    }
    if (['SELECT', 'DATE', 'EMAIL'].indexOf(field_type) > -1) {
      validation.value.max = 1;
      showMax.value = false;
    } else if (field_type === 'BOOLEAN') {
      showMax.value = false;
    } else {
      showMax.value = true;
      validation.value.max = null;
    }
  }
);

watch(
  () => validation.value.is_field_custom,
  (field_custom) => {
    if (field_custom) {
      validation.value.db_collection = '';
      validation.value.db_field_reference = '';
    } else {
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
  }
);

watch(
  () => validation.value.db_collection,
  (db_collection) => {
    if (db_collection === 'USERS') {
      dbFields.value = constants.usersFields.map((item) => {
        return { label: item.label, value: item.value };
      });
    } else if (db_collection === 'GROUPS') {
      dbFields.value = constants.groupsFields.map((item) => {
        return { label: item.label, value: item.value };
      });
    } else if (db_collection === 'RECORDS') {
      dbFields.value = constants.recordsFields.map((item) => {
        return { label: item.label, value: item.value };
      });
    } else {
      dbFields.value = [];
    }
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
</script>
