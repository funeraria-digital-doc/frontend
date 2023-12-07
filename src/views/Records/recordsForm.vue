<template>
  <page :title="recordTitle" back="records">
    <p class="mb-6">Por favor introduza os seguintes dados.</p>

    <div class="death-declaration__form">
      <dynamic-form
        :fieldsGroups="fieldsGroups"
        :action-btn-label="submitBtnLabel"
        :errorMessages="errorMessages"
        @on-submit="onSubmit"
      />
    </div>
  </page>
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
import type { FormFieldsGroup } from '@/components/shared/DynamicForm/dynamicForm.models';
import { useSnackBar } from '@/composables/snackBar';

const fieldsGroups = ref<FormFieldsGroup[]>([
  {
    title: 'Dados do defunto',
    fields: DeathDeclarationDefunctForm,
    sm: 4,
  },
  {
    title: 'Dados do cônjuge',
    fields: DeathDeclarationSpouseForm,
    sm: 4,
  },
  {
    title: 'Dados do óbito',
    fields: DeathDeclarationDeathForm,
    sm: 4,
  },
  {
    title: 'Dados do funeral',
    fields: DeathDeclarationFuneralForm,
    sm: 4,
  },
  {
    title: 'Dados do familiar',
    fields: DeathDeclarationFamilyMemberForm,
    sm: 4,
  },
]);

const route = useRoute();
const { showSnackbar } = useSnackBar();

const mode = ref('');

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
  errorMessages.value = {};

  fieldsGroups.value.forEach((fieldsGroup) =>
    fieldsGroup.fields.forEach((field) => {
      field.value = values[field.name];
    })
  );

  const navigateToRecords = (isValid: any, successMessage: string) => {
    if (isValid) {
      showSnackbar(successMessage, '', true);

      router.push('/records');
    } else {
      showSnackbar('Ocorreu um erro, tente novamente.', '', false);
    }
  };

  if (mode.value === 'edit') {
    recordEdit(route.params.id as string, values).then((resp) => {
      if (resp.success) {
        navigateToRecords(resp.success, 'Declaração editada com sucesso.');
      } else {
        checkErrors(
          resp.error,
          errorMessages,
          errorIndexes,
          defaultErrorMessages
        );
      }
    });
  } else if (mode.value === 'create') {
    recordCreate(values).then((resp) => {
      if (resp.success) {
        navigateToRecords(resp.success, 'Declaração criada com sucesso.');
      } else {
        checkErrors(
          resp.error,
          errorMessages,
          errorIndexes,
          defaultErrorMessages
        );
      }
    });
  }
};

onBeforeMount(async () => {
  // clear errors
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
