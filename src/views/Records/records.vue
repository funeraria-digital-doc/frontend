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
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import DataTable from '../../components/shared/DataTable/dataTable.vue';
import GenerateDocuments from '../Records/modal/modal.vue';

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
import * as constants from './constants';
import {
  getRecords,
  deleteRecord,
  canAction,
  changeRecordsStatus,
  changeDatatableStatus
} from './helper';
import { groupsList } from '@/api/groups';
import { useSnackBar } from '@/composables/snackBar';

const { showSnackbar } = useSnackBar();

const docId = ref();
const data = ref();
const modalState = ref(false);

function closeModal() {
  modalState.value = false;
}

function snackMessages(message: any) {
  showSnackbar(message[0], message[1], message[2]);
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
        selectCheckbox: true,
        search: true,
        selectFunction: changeRecordsStatus,
        toggle: {
          field: 'status',
          trueValue: 'ACTIVE',
          falseValue: 'ARCHIVED',
          truelabel: 'Ativos',
          falselabel: 'Arquivados',
          changeFunction: changeDatatableStatus
        }
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
