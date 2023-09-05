<template>
  <div class="dynamic-field">
    <v-text-field
      v-if="field.input === 'text'"
      :id="field.name"
      v-model="model"
      :label="field.label"
      :rules="field.rules"
      :type="field.type"
    />

    <v-checkbox
      v-if="field.input === 'checkbox'"
      :id="field.name"
      v-model="model"
      :label="field.label"
    />

    <v-select
      v-if="field.input === 'select'"
      :id="field.name"
      v-model="model"
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

<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue';
import DatePicker from '../../DatePicker/datePicker.vue';
import type { DynamicField } from '../../../../models/dynamicField.model';

const props = defineProps({
  field: {
    type: Object as PropType<DynamicField>,
    required: true,
  },
});

const model = ref(props.field.value);

watch(props, (newProps) => {
  model.value = newProps.field.value;
});
</script>

<style lang="scss">
.dynamic-field {
  margin-bottom: 0.5rem;
}
</style>
