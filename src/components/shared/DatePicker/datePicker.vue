<template>
  <v-text-field
    :id="field.name"
    :v-model="field.name"
    :label="field.label"
    :rules="field.rules"
    type="date"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { DynamicField } from "../../../models/dynamicField.model";

export default defineComponent({
  name: "DynamicFieldInput",
  props: {
    field: {
      type: Object as PropType<DynamicField>,
      required: true,
    },
  },
});
</script>

<script lang="ts" setup></script>

<style lang="scss"></style>
