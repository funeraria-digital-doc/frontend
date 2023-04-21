<template>
  <page title="Declaração de Óbito">
    <p class="mb-6">Por favor introduza os seguintes dados.</p>

    <dynamic-form
      :fields="fields"
      :subtitles="subtitles"
      action-btn-label="Submeter"
      @on-submit="onSubmit"
    />
  </page>
</template>

<script lang="ts" setup>
import DynamicForm from "../../components/shared/DynamicForm/dynamicForm.vue";
import type { DynamicField } from "@/models/dynamicField.model";
import Page from "../../components/shared/Page/page.vue";
import { DeathDeclarationDefunctForm } from "./forms/deathDeclarationDefunct.form";
import { DeathDeclarationSpouseForm } from "./forms/deathDeclarationSpouse.form";
import { DeathDeclarationDeathForm } from "./forms/deathDeclarationDeath.form";
import { DeathDeclarationFuneralForm } from "./forms/deathDeclarationFuneral.form";
import { DeathDeclarationFamilyMemberForm } from "./forms/deathDeclarationFamilyMember.form";

const fields: DynamicField[] = [
  ...DeathDeclarationDefunctForm,
  ...DeathDeclarationSpouseForm,
  ...DeathDeclarationDeathForm,
  ...DeathDeclarationFuneralForm,
  ...DeathDeclarationFamilyMemberForm,
];

const subtitles = [
  { index: 0, text: "Dados do defunto", hideDivider: true },
  { index: 15, text: "Dados do cônjuge" },
  { index: 19, text: "Dados do óbito" },
  { index: 40, text: "Dados do funeral" },
  { index: 46, text: "Dados do familiar" },
];

const onSubmit = (values: any) => console.log(values);
</script>
