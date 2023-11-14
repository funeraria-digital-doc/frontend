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
    v-model:search="search"
    no-data-text="Nenhum registo disponível"
    multi-sort
  >
    <template
      v-for="(field, key) in fields"
      :key="field.name"
      v-slot:[`item.${field.name}`]="{ item }"
    >
      <v-btn
        v-if="
          (item[field.name] && field.type == 'file') || field.type == 'button'
        "
        @click="field.clickFunction(item)"
        >{{ field.message }}</v-btn
      >
      <p v-else>{{ item[field.name] }}</p>
    </template>
    <template v-slot:top>
      <div class="d-flex">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Procurar"
          single-line
          flat
          hide-details
          variant="solo-filled"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-if="propsData.data.createAndEditByModal"
          v-model="dialog"
          max-width="500px"
        >
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
                <div v-if="mode === 'create'">
                  <v-container v-for="field in createFields" :key="field">
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
                          clearable
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
                <div v-else>
                  <v-container v-for="field in editFields" :key="field">
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
                          clearable
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
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

        <div v-else class="d-flex" style="justify-content: end">
          <v-btn
            type="button"
            @click="getRedirectLink('create', '')"
            color="primary"
            dark
            class="mb-2 d-flex align-self-end"
          >
            {{ propsData.data.createButtonTitle }}
          </v-btn>
        </div>
      </div>

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
    <template
      v-if="propsData.data.createAndEditByModal"
      v-slot:item.actions="{ item }"
    >
      <div v-if="canAction(item)">
        <v-icon size="small" class="me-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </div>
    </template>
    <template v-else v-slot:item.actions="{ item }">
      <div v-if="canAction(item)">
        <v-icon
          size="small"
          class="me-2"
          @click="getRedirectLink('edit', item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </div>
    </template>
  </v-data-table>
  <error-success-message ref="snack"></error-success-message>
</template>
<script lang="ts">
import router from '@/router';
import {
  defineComponent,
  ref,
  computed,
  nextTick,
  watch,
  onMounted,
} from 'vue';
import ErrorSuccessMessage from '../ErrorSuccessMessages/errorSuccessMessages.vue';
import { onBeforeMount } from 'vue';
import { useUser } from '@/composables/user';
import { AUTH_PERMISSIONS } from '@/authorizations/constants';
import { getLabel } from '@/utils/datatableHelper';
export default defineComponent({
  name: 'GenericDataTable',
  components: {
    ErrorSuccessMessage,
  },
});
</script>

<script lang="ts" setup>
const propsData = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const { user } = useUser();
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
const search = ref('');
const form = ref();
const loading = ref(false);
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([]);
const fields = ref(propsData.data.fields);
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
const mode = computed(() => {
  return editedIndex.value === -1 ? 'create' : 'edit';
});
const formTitle = computed(() => {
  return editedIndex.value === -1
    ? propsData.data.newItemTitle
    : propsData.data.editItemTitle;
});

const createFields = computed(() => {
  return fields.value.filter(
    (i: { createDisplayRole: string | string[] }) =>
      i.createDisplayRole.includes(user.role) ||
      i.createDisplayRole == AUTH_PERMISSIONS.NO_AUTH
  );
});

const editFields = computed(() => {
  return fields.value.filter(
    (i: { editDisplayRole: string | string[] }) =>
      i.editDisplayRole.includes(user.role) ||
      i.editDisplayRole == AUTH_PERMISSIONS.NO_AUTH
  );
});

const snack = ref(null);

function editItem(item: any) {
  editedIndex.value = serverItems.value.indexOf(item);
  let newItem = {};
  for (let i = 0; i < Object.keys(item).length; i++) {
    const key = Object.keys(item)[i];
    const value = item[key];
    newItem[key] = getLabel(key, value, fields.value);
  }
  editedItem.value = Object.assign({}, newItem);
  dialog.value = true;
}
function deleteItem(item: any) {
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
            fields.value
          )
          .then(() => {
            close();
          });
      } else {
        propsData.data
          .save(editedItem.value, serverItems, snack, fields.value)
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
  let newEditedItem = {};
  for (let i = 0; i < fields.value.length; i++) {
    newEditedItem[fields.value[i].name] = '';
  }
  editedItem.value = newEditedItem;
  defaultItem.value = newEditedItem;
}

function getRedirectLink(mode: string, item: any) {
  let link = '';
  if (mode == 'edit') {
    link = propsData.data.homeLink + '/' + item.id + '/edit';
  } else if (mode == 'create') {
    link = propsData.data.homeLink + '/create';
  }
  router.push(link);
}

function canAction(itemRaw: { username: string; email: string; role: string }) {
  return propsData.data.canAction(itemRaw);
}

onMounted(() => {
  propsData.data.getData(loading, serverItems, fields.value);
  setFields();
});

onBeforeMount(() => {
  propsData.data.headers.map((item: { roles: string | string[] }) => {
    if (item.roles.includes(user.role)) {
      headers.value.push(item);
    }
  });
});
</script>

<style lang="scss"></style>
