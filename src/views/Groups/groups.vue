<template>
  <page title="Funerárias">
    <data-table :data="data"></data-table>
  </page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import * as constants from './constants';
import { getGroups, createGroup, editGroup, deleteGroup } from './helper';
export default defineComponent({
  name: 'GroupsDatatable',
  components: {
    DataTable,
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';

const data = {
  headers: constants.headers,
  fields: [
    {
      name: 'name',
      type: 'text-field',
      label: 'Nome',
      rules: constants.nameRules,
    },
  ],
  save: createGroup,
  edit: editGroup,
  delete: deleteGroup,
  getData: getGroups,
  newItemTitle: 'Criar Funerária',
  editItemTitle: 'Editar Funerária',
  createButtonTitle: 'Criar Funerária',
  deleteText: 'Tem a certeza de que quer <br>eliminar esta Funerária?',
  deleteButtons: { cancel: 'Não', action: 'Sim' },
  createEditButtons: { cancel: 'Cancelar', action: 'Guardar' },
};
</script>
