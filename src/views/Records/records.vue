<template>
  <page title="Declarações">
    <data-table v-if="data" :data="data"></data-table>
    <generate-documents
      v-if="docId"
      :document-id="docId"
      :modalState="modalState"
      @close-modal="closeModal"
      @snack-messages="snackMessages"
    ></generate-documents>
  </page>
  <error-success-message ref="snack"></error-success-message>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import GenerateDocuments from '../Records/modal/modal.vue';
import * as constants from './constants';
import { getRecords, deleteRecord, canAction } from './helper';
import { groupsList } from '@/api/groups';
import ErrorSuccessMessage from '../../components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';

export default defineComponent({
  name: 'RecordsDatatable',
  components: {
    DataTable,
    GenerateDocuments,
    ErrorSuccessMessage
  },
});
</script>
<script lang="ts" setup>
import Page from '../../components/shared/Page/page.vue';
const docId = ref();
const data = ref();
const modalState = ref(false);
const snack = ref();
function closeModal() {
  modalState.value = false;
}

function snackMessages(message: any) {
  snack.value.showSnackbar(message[0], message[1], message[2]);
}

onBeforeMount(() => {
  const parse = (group: any) => ({ label: group.name, value: group.id });

  groupsList().then((resp) => {
    if (resp.success) {
      const tableData = {
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
        multiSort: true,
        selectCheckbox: false,
        search: true
      };

      tableData.fields = tableData.fields.map((field: any) =>
        field.name === 'group_id'
          ? { ...field, items: resp.data.map((i: any) => parse(i)) }
          : field
      );

      data.value = tableData;
    }
  });
});
</script>
