<template>
  <page title="Funerárias">
    <data-table
      ref="datatableComponent"
      :headers="constants.headers"
      :items="groups"
      :loading="loading"
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
      <template #actions>
        <v-icon size="small" class="me-2" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
      </template>
    </data-table>
  </page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import * as constants from './constants';
import { getGroups, createGroup } from './helper';
export default defineComponent({
  name: 'GroupsDatatable',
  components: {
    DataTable,
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
import { onMounted, ref } from 'vue';

const editedItem = ref({
  name: '',
});
const groups = ref([]);
const loading = ref(true);
const datatableComponent = ref(null);
const form = ref();

const save = async () => {
  const { valid } = await form.value.validate();
  if (valid && datatableComponent.value) {
    //console.log(datatableComponent.value)
    createGroup(loading, groups, editedItem.value, datatableComponent);
    clearInputs()
  }
};

function clearInputs(){
  editedItem.value = {
    name: '',
  }
}

const close = () => {
  console.log('close');
};

function editItem(item){
  console.log('cenas edit')
}

function deleteItem(item){
  console.log('cenas delete')
}
onMounted(() => {
  loading.value = true;
  getGroups(loading, groups);
});
</script>
