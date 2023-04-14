<template>
  <page title="Declaração de Óbito">
    <p class="mb-6">Por favor introduza os seguintes dados.</p>

    <dynamic-form
      :fields="fields"
      action-btn-label="Submeter"
      @on-submit="onSubmit"
    />
  </page>
</template>

<script lang="ts" setup>
import DynamicForm from "../../components/shared/DynamicForm/dynamicForm.vue";
import type { DynamicField } from "@/models/dynamicField.model";
import Page from "../../components/shared/Page/page.vue";
import { DeathDeclarationPersonalFields } from "./forms/deathDeclarationPersonalFields.form";

const fields: DynamicField[] = DeathDeclarationPersonalFields;

const onSubmit = (values: any) => console.log(values);
</script>
