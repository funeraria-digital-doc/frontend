<template>
  <page title="Templates">
    <data-table :data="data"></data-table>
  </page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import * as constants from './constants';
import { getTemplates, deleteTemplate, canAction } from './helper';
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
  createAndEditByModal: false,
  homeLink: '/templates',
  headers: constants.headers,
  fields: constants.fields,
  createButtonTitle: 'Criar Template',
  deleteText: 'Tem a certeza de que quer <br>eliminar este Template?',
  deleteButtons: { cancel: 'Não', action: 'Sim' },
  delete: deleteTemplate,
  getData: getTemplates,
  canAction: canAction,
  updateVariables: () => {
    return true;
  },
};
</script>
