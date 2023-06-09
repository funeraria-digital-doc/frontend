<template>
  <div class="dynamic-field">
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

    <date-picker v-if="field.input === 'date'" :field="field" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import DatePicker from '../../DatePicker/datePicker.vue';
import type { DynamicField } from '../../../../models/dynamicField.model';

export default defineComponent({
  name: 'DynamicFieldInput',
  props: {
    field: {
      type: Object as PropType<DynamicField>,
      required: true,
    },
  },
  components: {
    DatePicker,
  },
});
</script>

<script lang="ts" setup></script>

<style lang="scss">
.dynamic-field {
  margin-bottom: 0.5rem;
}
</style>
