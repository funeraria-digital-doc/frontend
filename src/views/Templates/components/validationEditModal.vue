<template>
  <v-dialog v-model="props.editModal" max-width="500px">
    <v-card class="px-4 py-2 mb-4">
      <v-card-title class="text-h5 text-center">edit</v-card-title>
      <v-form ref="form" validate-on="submit" @submit.prevent="save">
        <v-container>
          <v-row>
            <v-col cols="12" :sm="12" :md="12">
              <v-text-field
                :id="'name_' + props.index"
                v-model="validation.name"
                :rules="constants.nameRules"
                label="Nome"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :sm="12" :md="12">
              <v-select
                :id="'field_type_' + props.index"
                v-model="validation.field_type"
                label="Tipo de Campo"
                :items="fieldTypeItems"
                no-data-text="Não existem opções disponíveis"
                item-title="label"
                item-value="value"
                :rules="constants.fieldTypeRules"
                clearable
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" :sm="6" :md="6">
              <v-checkbox
                :id="'optional_' + props.index"
                v-model="validation.optional"
                label="Opcional?"
              />
            </v-col>
            <v-col cols="6" :sm="6" :md="6">
              <v-checkbox
                :id="'is_field_custom_' + props.index"
                v-model="validation.is_field_custom"
                label="Campo Personalizado?"
              />
            </v-col>
          </v-row>
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
import {
  defineComponent,
  defineProps,
  defineEmits,
  onBeforeMount,
  ref,
} from 'vue';
import * as constants from '../constants';
export default defineComponent({
  name: 'ValidationEditModal',
});
</script>
<script lang="ts" setup>
const props = defineProps(['editModal', 'validation', 'index']);
let validation = ref({});
const fieldTypeItems = [
  { label: 'Texto', value: 'TEXT' },
  { label: 'Verdadeiro/Falso', value: 'BOOLEAN' },
  { label: 'Inteiro', value: 'INTEGER' },
  { label: 'Opções', value: 'SELECT' },
  { label: 'Multiplas Opções', value: 'MULTISELECT' },
  { label: 'Área de Texto', value: 'TEXTAREA' },
  { label: 'Rádio', value: 'RADIO' },
  { label: 'Checkbox', value: 'CHECKBOX' },
  { label: 'Data', value: 'DATE' },
  { label: 'Data e Hora', value: 'DATETIME' },
  { label: 'Horas', value: 'TIME' },
  { label: 'Ano', value: 'YEAR' },
  { label: 'Mês', value: 'MONTH' },
  { label: 'Dia', value: 'DAY' },
  { label: 'Email', value: 'EMAIL' }
];
const emit = defineEmits();
const save = () => {
  emit('save', validation.value, props.index);
};
const cancelEdit = () => {
  emit('cancel');
};

onBeforeMount(async () => {
  validation.value = props.validation;
});
</script>
