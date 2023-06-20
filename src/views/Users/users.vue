<template>
  <page title="Utilizadores">
    <data-table
      ref="datatableComponent"
      :headers="constants.headers"
      :items="users"
    >
      <template #editModal>
        <v-card-text>
          <v-form ref="form" validate-on="submit" @submit.prevent="save">
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    id="name"
                    v-model="editedItem.name"
                    :rules="constants.nameRules"
                    label="Nome"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    id="email"
                    v-model="editedItem.email"
                    :rules="constants.emailRules"
                    label="Email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    id="group"
                    :v-model="editedItem.group"
                    label="Funerária"
                    :items="groups"
                    item-title="label"
                    item-value="value"
                    :rules="groupRules"
                    clearable
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-checkbox
                    v-model="editedItem.is_admin"
                    label="Admin?"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-checkbox
                    v-model="editedItem.is_staff"
                    label="Staff?"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" type="submit">
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </template>
    </data-table>
  </page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import * as constants from './constants';
export default defineComponent({
  name: 'UserDatatable',
  components: {
    DataTable,
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
import { onMounted, ref } from 'vue';
import { getLocalStorage } from '@/utils/localStorage';
import { TOKEN_KEY } from '@/utils/constants';
import { groupsList } from '@/api/groups';
import { listAllUsers } from '@/api/users';

const editedItem = ref({
  name: '',
  email: '',
  group: null,
  is_staff: false,
  is_admin: false,
});
const groups = ref([]);
const loading = ref(false);
const datatableComponent = ref(null);
const form = ref();
const users = ref([]);
const groupRules = [
  (value1: string) =>
    !!editedItem.value.is_staff || !!editedItem.value.is_admin || !!value1
      ? null
      : 'A escolha de uma é obrigatória.',
];
const save = async () => {
  console.log('save');
  const { valid } = await form.value.validate();
  if (valid && datatableComponent.value) {
    //console.log(datatableComponent.value)
    //datatableComponent.value.saveItem(editedItem);
  }
};

const close = () => {
  console.log('close');
};

onMounted(() => {
  loading.value = true;
  const token = getLocalStorage(TOKEN_KEY);
  if (token) {
    groupsList().then((resp) => {
      if (resp.success) {
        console.log(resp.data);
        const groupsData = resp.data.map((group: { id: any; name: any }) => {
          return {
            id: group.id,
            label: group.name,
            value: group.name,
          };
        });
        groups.value = groupsData;
      } else {
        console.log('erro', resp);
      }
      loading.value = false;
    });
    listAllUsers(token).then((resp) => {
      if (resp.success) {
        console.log(resp.data);
        const usersData = resp.data.users.map(
          (user: {
            id: any;
            username: any;
            email: any;
            gourp_user_id: any;
            is_superuser: any;
            is_staff: any;
            is_active: any;
            status: any;
          }) => {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              group: user.gourp_user_id ? user.gourp_user_id : '---',
              is_superuser: user.is_superuser ? 'Sim' : 'Não',
              is_staff: user.is_staff ? 'Sim' : 'Não',
              is_active: user.is_active ? 'Sim' : 'Não',
              status: user.status,
            };
          }
        );
        users.value = usersData;
      } else {
        console.log('erro');
      }
      loading.value = false;
    });
  } else {
    console.log('no token');
  }
});
</script>
