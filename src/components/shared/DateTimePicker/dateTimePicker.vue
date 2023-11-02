<template>
  <v-text-field
    :id="field.name"
    :label="field.label"
    :rules="field.rules"
    :v-model="field.name"
    type="datetime-local"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { DynamicField } from '../../../models/dynamicField.model';

export default defineComponent({
  name: 'DateTimePicker',
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
