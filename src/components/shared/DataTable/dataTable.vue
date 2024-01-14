<template>
  <v-data-table
    :items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    items-per-page-text="items por página"
    :headers="headers"
    :items="serverItems"
    item-value="id"
    class="elevation-1 d-flex flex-column"
    density="comfortable"
    v-model="selected"
    v-model:search="search"
    no-data-text="Nenhum registo disponível"
    :multi-sort="propsData.data.multiSort"
    :show-select="propsData.data.selectCheckbox"
    item-selectable="selectable"
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
          v-if="propsData.data.search"
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
        <div class="action-bar">
          <v-switch
            v-if="propsData.data.toggle"
            class="mr-2"
            v-model="toggle"
            hide-details
            inset
            :label="toggleLabel"
            @change="changeToggle"
          />
          <v-spacer></v-spacer>
          <v-btn
            v-if="canChangeStatus"
            color="primary"
            dark
            class="mb-2 mr-2 d-flex"
            @click="clickSelect"
          >
            Arquivar Selecionados
          </v-btn>
          <v-spacer></v-spacer>

          <create-edit-modal
            v-if="propsData.data.createAndEditByModal"
            v-model="dialog"
            :btn-action-title="propsData.data.createEditButtons.action"
            :btn-cancel-title="propsData.data.createEditButtons.cancel"
            :btn-create-title="propsData.data.createButtonTitle"
            :create-fields="createFields"
            :edit-fields="editFields"
            :mode="mode"
            :title="formTitle"
            :edited-item="editedItem"
            @close="close"
            @save="save"
          />

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
      </div>

      <!-- diaalog para delete -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title
            class="text-h5 text-center"
            v-html="propsData.data.deleteText"
          ></v-card-title>
          <v-card-text class="delete-modal__content">
            <p v-if="fields.length > 0 && serverItems[editedIndex]">
              <b>{{ fields[0].label }}:</b>
              {{ serverItems[editedIndex][fields[0].name] }}
            </p>
            <p v-if="fields.length > 1 && serverItems[editedIndex]">
              <b>{{ fields[1].label }}:</b>
              {{ serverItems[editedIndex][fields[1].name] }}
            </p>
          </v-card-text>
          <v-card-actions class="delete-modal__actions-btns">
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
import { onBeforeMount } from 'vue';
import { useUser } from '@/composables/user';
import { AUTH_PERMISSIONS } from '@/authorizations/constants';
import { getLabel } from '@/utils/datatableHelper';
import CreateEditModal from './components/createEditModal.vue';

export default defineComponent({
  name: 'GenericDataTable',
  components: {
    CreateEditModal,
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

const search = ref('');
const selected = ref([]);

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
const toggle = ref(true);

const toggleLabel = computed(() => {
  return toggle.value
    ? propsData.data.toggle.truelabel
    : propsData.data.toggle.falselabel;
});

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

const canChangeStatus = computed(() => {
  return (
    propsData.data.selectCheckbox && selected.value && selected.value.length > 0
  );
});

function editItem(item: any) {
  editedIndex.value = serverItems.value.indexOf(item);
  let newItem = {};
  for (let i = 0; i < Object.keys(item).length; i++) {
    const key = Object.keys(item)[i];
    const value = item[key];
    newItem[key] = getLabel(key, value, fields.value);
  }
  editedItem.value = newItem;
  dialog.value = true;
}

function deleteItem(item: any) {
  editedIndex.value = serverItems.value.indexOf(item);
  editedItem.value = item;
  dialogDelete.value = true;
}

async function deleteItemConfirm() {
  await propsData.data.delete(
    serverItems.value[editedIndex.value].id,
    serverItems
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

async function save(form: any, newValues: any) {
  const { valid } = await form.validate();
  if (valid) {
    try {
      if (editedIndex.value > -1) {
        propsData.data
          .edit(newValues, editedIndex.value, serverItems, fields.value)
          .then(() => {
            close();
          });
      } else {
        propsData.data.save(newValues, serverItems, fields.value).then(() => {
          close();
        });
      }
    } catch (error) {
      console.error(error);
      // Handle the error here if necessary
    }
  }
}

function setFields() {
  let newEditedItem = {};
  for (let i = 0; i < fields.value.length; i++) {
    newEditedItem[fields.value[i].name] = null;
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

function clickSelect() {
  propsData.data.selectFunction(selected.value, serverItems);
  selected.value = [];
}

function changeToggle() {
  propsData.data.toggle.changeFunction(
    serverItems,
    fields.value,
    propsData.data.toggle.field,
    toggle.value
  );
}

watch(dialog, (val) => {
  val || close();
});

watch(dialogDelete, (val) => {
  val || closeDelete();
});

onMounted(() => {
  propsData.data.getData(
    serverItems,
    fields.value,
    propsData.data.toggle && propsData.data.toggle.field
      ? propsData.data.toggle.field
      : 'status',
    propsData.data.toggle && propsData.data.toggle.trueValue
      ? propsData.data.toggle.trueValue
      : 'ACTIVE'
  );
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

<style lang="scss">
.action-bar {
  display: flex !important;
  align-items: center !important;
}
.modal__col {
  padding-bottom: 0;
}
.modal__checkbox {
  height: 2rem;
}
.delete-modal {
  &__content {
    margin-bottom: 1rem;
  }
  &__actions-btns {
    margin: 1rem;
  }
}
</style>
