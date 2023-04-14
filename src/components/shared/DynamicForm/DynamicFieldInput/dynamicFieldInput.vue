<template>
  <v-text-field
    v-if="field.input === 'text'"
    :id="field.name"
    :v-model="field.name"
    :label="field.label"
    :rules="field.rules"
    :type="field.type"
  />

  <v-checkbox
    v-if="field.input === 'checkbox'"
    :id="field.name"
    :v-model="field.name"
    :label="field.label"
  />

  <v-select
    v-if="field.input === 'select'"
    :id="field.name"
    :v-model="field.name"
    :label="field.label"
    :rules="field.rules"
    :type="field.type"
    :items="field.items"
    item-title="label"
    item-value="value"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { DynamicField } from "../../../../models/dynamicField.model";

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
