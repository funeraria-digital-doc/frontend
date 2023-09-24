<template>
  <div class="dynamic-field">
    <v-text-field
      v-if="field.input === 'text'"
      :id="field.name"
      v-model="model"
      :label="field.label"
      :rules="field.rules"
      :type="field.type"
      :error-messages="errorMessages[field.name]"
    />

    <v-checkbox
      v-if="field.input === 'checkbox'"
      :id="field.name"
      v-model="model"
      :label="field.label"
      :error-messages="errorMessages[field.name]"
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
      :error-messages="errorMessages[field.name]"
    />

    <date-picker
      v-if="field.input === 'date'"
      :field="field"
      :error-messages="errorMessages[field.name]"
    />

    <photo-upload
      v-if="field.input === 'file'"
      :id="field.name"
      :label="field.label"
      :snack="snack"
      :isLoading="isLoading"
      :imageUrl="imageUrl"
      :error-messages="errorMessages[field.name]"
      @save="saveFile"
    />

    <error-success-message ref="snack"></error-success-message>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue';
import DatePicker from '../../DatePicker/datePicker.vue';
import type { DynamicField } from '../../../../models/dynamicField.model';
import PhotoUpload from '@/components/shared/PhotoUpload/photoUpload.vue';

const props = defineProps({
  field: {
    type: Object as PropType<DynamicField>,
    required: true,
  },
  errorMessages: {
    type: Object,
  },
});

const model = ref(props.field.value);

// for image
const snack = ref();
const isLoading = ref(false);
const imageUrl = ref();

watch(props, (newProps) => {
  model.value = newProps.field.value;
});

const saveFile = (base64File: string, file: any) => {
  imageUrl.value = base64File;
  model.value = file;
};
</script>

<style lang="scss">
.dynamic-field {
  margin-bottom: 0.5rem;
}
</style>
