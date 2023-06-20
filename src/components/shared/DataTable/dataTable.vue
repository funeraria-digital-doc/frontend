<template>
  <v-data-table
    :items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    :headers="headers"
    :items="props.items"
    item-value="name"
    class="elevation-1 d-flex flex-column"
    density="comfortable"
    :loading="props.loading"
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
            New Item
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="mt-3">
            <span class="text-h5 ml-6">{{ formTitle }}</span>
          </v-card-title>
          <slot name="editModal" :edited-item="editedItem"></slot>
        </v-card>
      </v-dialog>
      <!-- diaalog para delete -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <slot name="actions" :item="item"></slot>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
  <error-success-message
    :hasMessage="hasMessage"
    :message="message"
    :isSuccess="isSuccess"
  ></error-success-message>

  <!-- @update:options="loadItems" -->
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, watch } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import ErrorSuccessMessage from '@/components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';
export default defineComponent({
  name: 'UsersDataTable',
  components: {
    ErrorSuccessMessage,
  },
});
</script>

<script lang="ts" setup>
const props = defineProps(['headers', 'items', 'loading']);
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
const hasMessage = ref(false);
const isSuccess = ref(false);
const message = ref('');
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref(props.headers);
const itemsPerPageOptions = ref([
  { value: 10, title: '10' },
  { value: 15, title: '15' },
  { value: 20, title: '20' },
  { value: 50, title: '50' },
  { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
]);
const itemsPerPage = ref(10);
const serverItems = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});
const defaultItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Item' : 'Edit Item';
});

function editItem(item: any) {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}
function deleteItem(item) {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}
function deleteItemConfirm() {
  serverItems.value.splice(editedIndex.value, 1);
  closeDelete();
}
function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}
function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

defineExpose({
  closeDialog,
  errorSuccessMessage,
});
async function closeDialog() {
  dialog.value = false;
}

function errorSuccessMessage(messageProps: {
  hasData: any;
  hasMessage: boolean;
  message: string;
  isSuccess: boolean;
}) {
  console.log('---');
  console.log(messageProps);
  if (messageProps.hasData) {
    hasMessage.value = messageProps.hasMessage;
    message.value = messageProps.message;
    isSuccess.value = messageProps.isSuccess;
  }
}

watch(dialog, (val) => {
  val || closeDialog();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});
</script>

<style lang="scss"></style>
