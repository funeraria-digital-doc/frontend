<template>
  <page title="Declarações">
    <data-table :data="data"></data-table>
    <generate-documents v-if="docId" :document-id="docId"></generate-documents>
  </page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import GenerateDocuments from '../Records/modal/modal.vue';
import * as constants from './constants';
import { getRecords, deleteRecord, canAction } from './helper';
export default defineComponent({
  name: 'RecordsDatatable',
  components: {
    DataTable,
    GenerateDocuments
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
const docId = ref()
const data = {
  createAndEditByModal: false,
  homeLink: '/records',
  headers: constants.headers,
  fields: constants.fields((documentId: string) => {
    console.log(documentId)
    docId.value = documentId
  }),
  createButtonTitle: 'Criar Declaração',
  deleteText: 'Tem a certeza de que quer <br>eliminar esta declaração?',
  deleteButtons: { cancel: 'Não', action: 'Sim' },
  delete: deleteRecord,
  getData: getRecords,
  canAction: canAction
};

</script>
