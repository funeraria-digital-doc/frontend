<template>
  <page title="Declarações">
    <data-table :data="data"></data-table>
    <generate-documents
      v-if="docId"
      :document-id="docId"
      :modalState="modalState"
      @close-modal="closeModal"
    ></generate-documents>
  </page>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import GenerateDocuments from '../Records/modal/modal.vue';
import * as constants from './constants';
import { getRecords, deleteRecord, canAction, updateVariables } from './helper';
import { groupsList } from '@/api/groups';
export default defineComponent({
  name: 'RecordsDatatable',
  components: {
    DataTable,
    GenerateDocuments,
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
const docId = ref();
const modalState = ref(false);

let data = reactive({
  createAndEditByModal: false,
  homeLink: '/records',
  headers: constants.headers,
  fields: constants.fields((documentId: string) => {
    docId.value = documentId;
    modalState.value = true;
  }),
  createButtonTitle: 'Criar Declaração',
  deleteText: 'Tem a certeza de que quer <br>eliminar esta declaração?',
  deleteButtons: { cancel: 'Não', action: 'Sim' },
  delete: deleteRecord,
  getData: getRecords,
  canAction: canAction,
  updateVariables: updateVariables,
});

function closeModal(){
  modalState.value = false;
}

onBeforeMount(async () => {
  const parse = (group: any) => ({ label: group.name, value: group.id });

  await groupsList().then((resp) => {
    if (resp.success) {
      data.fields = data.fields.map((field: any) =>
        field.name === 'group_id'
          ? { ...field, items: resp.data.map((i: any) => parse(i)) }
          : field
      );
    }
  });
});
</script>
