<template>
  <v-dialog persistent v-model="editModal" max-width="800px">
    <v-card class="px-4 py-2 mb-4">
      <v-card-title class="text-h5 text-center">Editar validação</v-card-title>
      <v-container>
        <v-form ref="form" validate-on="submit" @submit.prevent="save">
          <v-row>
            <v-col cols="3" sm="12" md="3">
              <img
                :src="placeholderImg"
                style="width: 100%"
                alt="Nenhuma imagem disponível"
              />
            </v-col>
            <v-col cols="9" sm="12" md="9">
              <v-container>
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

                <v-row v-if="showDbFields">
                  <!-- db_collection -->
                  <v-col cols="6" sm="6" md="6">
                    <v-select
                      :id="'db_collection_' + props.index"
                      v-model="validation.db_collection"
                      no-data-text="Não existem opções disponíveis"
                      label="Tabela"
                      :items="constants.dbCollectionsFile"
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
                      no-data-text="Não existem opções disponíveis"
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
              </v-container>
            </v-col>
          </v-row>
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
        </v-form>
      </v-container>
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

const props = defineProps([
  'editModal',
  'validation',
  'index',
  'errorMessages',
]);

const emit = defineEmits(['save', 'cancel']);

let validation = ref(props.validation);
let editModal = ref(props.editModal);
let placeholderImg = computed(() => {
  return props.validation.image_data_base64;
});
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

watch(showDbFields, (showDbFields) => {
  if (!showDbFields) {
    validation.value.db_collection = null;
    validation.value.db_field_reference = null;
  }
});

function mapDbFields() {
  if (validation.value.db_collection === 'USERS') {
    dbFields.value = constants.usersFieldsFile.map((item) => {
      return { label: item.label, value: item.value };
    });
  } else if (validation.value.db_collection === 'GROUPS') {
    dbFields.value = constants.groupsFieldsFile.map((item) => {
      return { label: item.label, value: item.value };
    });
  } else if (validation.value.db_collection === 'RECORDS') {
    dbFields.value = constants.recordsFieldsFile.map((item) => {
      return { label: item.label, value: item.value };
    });
  } else if (validation.value.db_collection === 'SYSTEM') {
    dbFields.value = constants.systemFieldsFile.map((item) => {
      return { label: item.label, value: item.value };
    });
  }
}

watch(
  () => validation.value.is_field_custom,
  (field_custom) => {
    if (field_custom) {
      validation.value.db_collection = '';
      validation.value.db_field_reference = '';
    } else {
      mapDbFields();
    }
  }
);

watch(
  () => validation.value.db_collection,
  (db_collection) => {
    if (['USERS', 'GROUPS', 'RECORDS', 'SYSTEM'].indexOf(db_collection) > -1) {
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
    } else if (validation.value.db_collection === 'GROUPS') {
      const item = constants.groupsFields.find(
        (obj) => obj.value === db_field_reference
      );
    } else if (validation.value.db_collection === 'RECORDS') {
      const item = constants.recordsFields.find(
        (obj) => obj.value === db_field_reference
      );
    } else if (validation.value.db_collection === 'SYSTEM') {
      const item = constants.systemFields.find(
        (obj) => obj.value === db_field_reference
      );
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
      is_field_custom: '',
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
