<template>
  <page title="Declaração de Óbito">
    <p class="mb-6">Por favor introduza os seguintes dados.</p>

    <div class="death-declaration__form">
      <dynamic-form
        :fields="fields"
        :subtitles="subtitles"
        action-btn-label="Submeter"
        @on-submit="onSubmit"
      />
    </div>
  </page>
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
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getSingleRecord } from './helper';

const fields: DynamicField[] = [
  ...DeathDeclarationDefunctForm,
  ...DeathDeclarationSpouseForm,
  ...DeathDeclarationDeathForm,
  ...DeathDeclarationFuneralForm,
  ...DeathDeclarationFamilyMemberForm,
];

const subtitles = [
  { index: 0, text: 'Dados do defunto', hideDivider: true },
  { index: 15, text: 'Dados do cônjuge' },
  { index: 19, text: 'Dados do óbito' },
  { index: 40, text: 'Dados do funeral' },
  { index: 46, text: 'Dados do familiar' },
];
const route = useRoute();
const mode = ref('')

// TODO finish this
const onSubmit = (values: any) => {
  if (mode.value === 'edit') {
    recordEdit(values).then((resp) => {
      console.log('resp', resp);
    });
  } else if (mode.value === 'create') {
    recordCreate(values).then((resp) => {
      console.log('resp', resp);
      if (resp.success) {
        router.push('/records');
      }
    });
  }
};


onBeforeMount(async () => {
  if (route.name === 'records_edit') {
    getSingleRecord(route.params.id as string).then((resp) => {
      console.log(resp)
      //resp && (template.value = resp);
      //file_temp.value = [new File([template.value.file], 'file')];
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
