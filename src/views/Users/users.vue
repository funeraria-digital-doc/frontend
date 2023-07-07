<template>
  <page title="Utilizadores">
    <data-table :data="data"></data-table>
  </page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import * as constants from './constants';
import { createUser, editUser, deleteUser, getUsers } from './helper';
export default defineComponent({
  name: 'UsersDatatable',
  components: {
    DataTable,
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';

const data = {
  createAndEditByModal: true,
  headers: constants.headers,
  fields: constants.fields,
  save: createUser,
  edit: editUser,
  delete: deleteUser,
  getData: getUsers,
  newItemTitle: 'Criar Utilizador',
  editItemTitle: 'Editar Utilizador',
  createButtonTitle: 'Criar Utilizador',
  deleteText: 'Tem a certeza de que quer <br>eliminar este Utilizador?',
  deleteButtons: { cancel: 'Não', action: 'Sim' },
  createEditButtons: { cancel: 'Cancelar', action: 'Guardar' },
};
</script>
