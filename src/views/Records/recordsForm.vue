<template>
  <page :title="recordTitle">
    <p class="mb-6">Por favor introduza os seguintes dados.</p>

    <div class="death-declaration__form">
      <dynamic-form
        :fieldsGroups="fieldsGroups"
        :action-btn-label="submitBtnLabel"
        :errorMessages="errorMessages"
        :sm="4"
        @on-submit="onSubmit"
      />
    </div>
  </page>
  <error-success-message ref="snack"></error-success-message>
</template>

<script lang="ts" setup>
import DynamicForm from '../../components/shared/DynamicForm/dynamicForm.vue';
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
import { checkErrors, getSingleRecord } from './helper';
import ErrorSuccessMessage from '../../components/shared/ErrorSuccessMessages/errorSuccessMessages.vue';
import type { FormFieldsGroup } from '@/components/shared/DynamicForm/dynamicForm.models';

const fieldsGroups = ref<FormFieldsGroup[]>([
  {
    title: 'Dados do defunto',
    isAccordion: true,
    fields: DeathDeclarationDefunctForm,
  },
  {
    title: 'Dados do cônjuge',
    isAccordion: true,
    fields: DeathDeclarationSpouseForm,
  },
  {
    title: 'Dados do óbito',
    isAccordion: true,
    fields: DeathDeclarationDeathForm,
  },
  {
    title: 'Dados do funeral',
    isAccordion: true,
    fields: DeathDeclarationFuneralForm,
  },
  {
    title: 'Dados do familiar',
    isAccordion: true,
    fields: DeathDeclarationFamilyMemberForm,
  },
]);

const route = useRoute();
const mode = ref('');
const snack = ref();

const errorIndexes = ref([]);
const errorMessages = ref<{ [key: string]: string }>({});
const defaultErrorMessages = {};

const recordTitle = computed(() => {
  const nameField = fieldsGroups.value[0].fields.find(
    (field) => field.name === 'name'
  );

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
      if (resp.success) {
        navigateToRecords(resp.success, 'Declaração criada com sucesso.');
      } else {
        checkErrors(
          resp.error,
          errorMessages,
          errorIndexes,
          snack,
          defaultErrorMessages
        );
      }
    });
  } else if (mode.value === 'create') {
    recordCreate(values).then((resp) => {
      if (resp.success) {
        navigateToRecords(resp.success, 'Declaração editada com sucesso.');
      } else {
        checkErrors(
          resp.error,
          errorMessages,
          errorIndexes,
          snack,
          defaultErrorMessages
        );
      }
    });
  }
};

onBeforeMount(async () => {
  fieldsGroups.value.forEach((fieldsGroup) =>
    fieldsGroup.fields.forEach((field) => {
      if (!errorMessages.value[field.name]) {
        errorMessages.value[field.name] = '';
      }
    })
  );

  if (route.name === 'records_edit') {
    getSingleRecord(route.params.id as string).then((resp) => {
      fieldsGroups.value = fieldsGroups.value.map((fieldsGroup) => ({
        ...fieldsGroup,
        fields: fieldsGroup.fields.map((field) => ({
          ...field,
          value: resp[field.name],
        })),
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
    width: 100%;
  }
}
</style>
