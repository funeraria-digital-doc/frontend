<template>
  <v-data-table
    :items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    items-per-page-text="items por página"
    :headers="headers"
    :items="serverItems"
    item-value="name"
    class="elevation-1 d-flex flex-column"
    density="comfortable"
    :loading="loading"
    loading-text="A carregar"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            dark
            class="mb-2 d-flex align-self-end"
            v-bind="props"
          >
            {{ propsData.data.createButtonTitle }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="mt-3">
            <span class="text-h5 ml-6">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" validate-on="submit" @submit.prevent="save">
              <v-container v-for="field in propsData.data.fields" :key="field">
                <v-row>
                  <v-col :cols="field.col" :sm="field.col" :md="field.col">
                    <v-text-field
                      v-if="field.type === 'text-field'"
                      :id="field.name"
                      v-model="editedItem[field.name]"
                      :rules="field.rules"
                      :label="field.label"
                    ></v-text-field>

                    <v-checkbox
                      v-if="field.type === 'checkbox'"
                      :id="field.name"
                      v-model="editedItem[field.name]"
                      :label="field.label"
                    />
                    <v-select
                      v-if="field.type === 'select'"
                      :id="field.name"
                      v-model="editedItem[field.name]"
                      :label="field.label"
                      :rules="field.rules"
                      :items="field.items"
                      item-title="label"
                      item-value="value"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  {{ propsData.data.createEditButtons.cancel }}
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" type="submit">
                  {{ propsData.data.createEditButtons.action }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- diaalog para delete -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title
            class="text-h5 text-center"
            v-html="propsData.data.deleteText"
          ></v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">{{
              propsData.data.deleteButtons.cancel
            }}</v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >{{ propsData.data.deleteButtons.action }}</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
  <error-success-message ref="snack"></error-success-message>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  nextTick,
  watch,
  onMounted,
} from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import ErrorSuccessMessage from '../ErrorSuccessMessages/errorSuccessMessages.vue';
export default defineComponent({
  name: 'GenericDataTable',
  components: {
    ErrorSuccessMessage,
  },
});
</script>

<script lang="ts" setup>
const propsData = defineProps(['data']);
/*
Exemplo de header
type DataTableHeader = {
    key: string;
    value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end';
    width?: number;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: DataTableCompareFunction;
};
*/
const form = ref();
const loading = ref(false);
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref(propsData.data.headers);
const itemsPerPageOptions = ref([
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 15, title: '15' },
  { value: 20, title: '20' },
  { value: 50, title: '50' },
  { value: -1, title: 'Todos' },
  //{ value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
]);
const itemsPerPage = ref(10);
const serverItems = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({});
const defaultItem = ref({});
const formTitle = computed(() => {
  return editedIndex.value === -1
    ? propsData.data.newItemTitle
    : propsData.data.editItemTitle;
});
const snack = ref(null);

function editItem(item: any) {
  editedIndex.value = serverItems.value.indexOf(item);
  let newItem = {};
  for (let i = 0; i < Object.keys(item).length; i++) {
    const key = Object.keys(item)[i];
    const value = item[key];
    const field = propsData.data.fields.find((f: any) => f.name === key);
    if (field) {
      newItem[key] = getLabelValue(
        key,
        field.type,
        value,
        propsData.data.fields
      );
    } else {
      newItem[key] = value;
    }
  }
  editedItem.value = Object.assign({}, newItem);
  dialog.value = true;
}
function deleteItem(item) {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}
async function deleteItemConfirm() {
  await propsData.data.delete(
    serverItems.value[editedIndex.value].id,
    serverItems,
    snack
  );
  closeDelete();
}
function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
    setFields();
  });
}
function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
    setFields();
  });
}

async function save() {
  const { valid } = await form.value.validate();
  if (valid) {
    try {
      if (editedIndex.value > -1) {
        propsData.data
          .edit(
            editedItem.value,
            editedIndex.value,
            serverItems,
            snack,
            propsData.data.fields
          )
          .then(() => {
            close();
          });
      } else {
        propsData.data
          .save(editedItem.value, serverItems, snack, propsData.data.fields)
          .then(() => {
            close();
          });
      }
    } catch (error) {
      console.error(error);
      // Handle the error here if necessary
    }
  }
}

watch(dialog, (val) => {
  val || close();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});

function setFields() {
  const fields = propsData.data.fields;
  let newEditedItem = {};
  for (let i = 0; i < fields.length; i++) {
    newEditedItem[fields[i].name] = '';
  }
  editedItem.value = newEditedItem;
  defaultItem.value = newEditedItem;
}

function getLabelValue(key: string, type: string, label: any, fields: any) {
  const field = fields.find((f: { name: string }) => f.name === key);
  let value = null;
  if (type == 'checkbox') {
    if (label === field.true_value_label) {
      value = true;
    } else {
      value = false;
    }
  } else if (type == 'select') {
    const val = field.items.find((i: { label: any }) => i.label === label);
    if (val && val['value']) {
      value = val['value'];
    }
  } else {
    value = label;
  }
  return value;
}

onMounted(() => {
  propsData.data.getData(loading, serverItems, propsData.data.fields);
  setFields();
});
</script>

<style lang="scss"></style>
