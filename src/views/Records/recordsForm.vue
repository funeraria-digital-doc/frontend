<template>
  <page :title="recordTitle">
    <p class="mb-6">Por favor introduza os seguintes dados.</p>

    <div class="death-declaration__form">
      <dynamic-form
        :fields="fields"
        :subtitles="subtitles"
        :action-btn-label="submitBtnLabel"
        @on-submit="onSubmit"
      />
    </div>
  </page>
  <error-success-message ref="snack"></error-success-message>
</template>

<script lang="ts" setup>
import DynamicForm from '../../components/shared/DynamicForm/dynamicForm.vue';
import type { DynamicField } from '@/models/dynamicField.model';
import Page from '../../components/shared/Page/page.vue';
import { DeathDeclarationDefunctForm } from './forms/deathDeclarationDefunct.form';
import { DeathDeclarationSpouseForm } from './forms/deathDeclarationSpouse.form';
import { DeathDeclarationDeathForm } from './forms/deathDeclarationDeath.form';
import { DeathDeclarationFuneralForm } from './forms/deathDeclarationFuneral.form';
import { DeathDeclarationFamilyMemberForm } from './forms/deathDeclarationFamilyMember.form';
import { recordCreate, recordEdit } from '@/api/records';
import router from '@/router';
import { onBeforeMount, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getSingleRecord } from './helper';
import ErrorSuccessMessage from '../../components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';

const subtitles = [
  { index: 0, text: 'Dados do defunto', hideDivider: true },
  { index: 15, text: 'Dados do cônjuge' },
  { index: 19, text: 'Dados do óbito' },
  { index: 40, text: 'Dados do funeral' },
  { index: 46, text: 'Dados do familiar' },
];

const fields = ref<DynamicField[]>([
  ...DeathDeclarationDefunctForm,
  ...DeathDeclarationSpouseForm,
  ...DeathDeclarationDeathForm,
  ...DeathDeclarationFuneralForm,
  ...DeathDeclarationFamilyMemberForm,
]);

const route = useRoute();
const mode = ref('');
const snack = ref();

const recordTitle = computed(() => {
  const nameField = fields.value.find((field) => field.name === 'name');

  if (mode.value === 'create') {
    return 'Criar Declaração de Óbito';
  } else if (mode.value === 'edit') {
    return nameField?.value
      ? `Editar Declaração - ${nameField?.value}`
      : 'Editar Declaração de Óbito';
  }

  return '';
});

const submitBtnLabel = computed(() =>
  mode.value === 'create' ? 'Criar' : 'Editar'
);

const onSubmit = (values: any) => {
  const navigateToRecords = (isValid: any, successMessage: string) => {
    if (isValid) {
      router.push('/records');
      snack.value.showSnackbar(successMessage, '', true);
    } else {
      snack.value.showSnackbar('Ocorreu um erro, tente novamente.', '', false);
    }
  };

  if (mode.value === 'edit') {
    recordEdit(route.params.id as string, values).then((resp) => {
      navigateToRecords(resp.success, 'Declaração criada com sucesso.');
    });
  } else if (mode.value === 'create') {
    recordCreate(values).then((resp) => {
      navigateToRecords(resp.success, 'Declaração editada com sucesso.');
    });
  }
};

onBeforeMount(async () => {
  if (route.name === 'records_edit') {
    getSingleRecord(route.params.id as string).then((resp) => {
      fields.value = fields.value.map((field) => ({
        ...field,
        value: resp[field.name],
      }));

      mode.value = 'edit';
    });
  } else if (route.name === 'records_create') {
    mode.value = 'create';
  }
});
</script>

<style lang="scss">
.death-declaration {
  &__form {
    max-width: 30rem;
  }
}
</style>
