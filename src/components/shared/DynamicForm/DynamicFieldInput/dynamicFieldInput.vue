<template>
  <div class="dynamic-field">
    <v-text-field
      v-if="field.input === 'text'"
      :id="field.name"
      v-model="model"
      :label="field.label"
      :rules="field.rules"
      :type="field.type"
      :error-messages="error"
      :name="field.name"
    />

    <v-checkbox
      v-if="field.input === 'checkbox'"
      :id="field.name"
      v-model="model"
      :label="field.label"
      :error-messages="error"
      :name="field.name"
    />

    <v-select
      v-if="field.input === 'select'"
      :error-messages="error"
      :id="field.name"
      :items="field.items"
      :label="field.label"
      :name="field.name"
      :rules="field.rules"
      :type="field.type"
      item-title="label"
      item-value="value"
      v-model="model"
      autocomplete="off"
    />

    <date-picker
      v-if="field.input === 'date'"
      :error-messages="error"
      :field="field"
      :name="field.name"
      v-model="model"
    />

    <date-time-picker
      v-if="field.input === 'date-time'"
      :error-messages="error"
      :field="field"
      :name="field.name"
      v-model="dateTimeModel"
    />

    <time-picker
      v-if="field.input === 'time'"
      :error-messages="error"
      :field="field"
      :name="field.name"
      v-model="model"
    />

    <photo-upload
      v-if="field.input === 'file'"
      :error-messages="error"
      :id="field.name"
      :imageUrl="imageUrl"
      :isLoading="isLoading"
      :label="field.label"
      :snack="snack"
      @save="saveFile"
    />

    <error-success-message ref="snack"></error-success-message>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue';
import DatePicker from '../../DatePicker/datePicker.vue';
import DateTimePicker from '../../DateTimePicker/dateTimePicker.vue';
import TimePicker from '../../TimePicker/timePicker.vue';
import type { DynamicField } from '../../../../models/dynamicField.model';
import PhotoUpload from '@/components/shared/PhotoUpload/photoUpload.vue';
import ErrorSuccessMessage from '../../ErrorSuccessMessages/errorSuccessMessages.vue';

const props = defineProps({
  field: {
    type: Object as PropType<DynamicField>,
    required: true,
  },
  errorMessages: {
    type: String,
    required: false,
  },
});

const model = ref(props.field.value);
const error = ref(props.errorMessages);

// for image
const snack = ref();
const isLoading = ref(false);
const imageUrl = ref(props.field.value);

// for datetime
const dateTimeModel = ref();

// for edit case (input with a pre-filled value)
watch(props, (newProps) => {
  model.value = newProps.field.value;
  error.value = newProps.errorMessages;
  imageUrl.value = newProps.field.value;

  // parse value for 'date-time' input type
  if (newProps.field.input === 'date-time') {
    dateTimeModel.value = ((newProps.field.value as string) ?? '').replace(
      'Z',
      ''
    );
  }
});

// clear error message when input changes
watch(model, (newModel) => {
  if (props.field.value != newModel) {
    error.value = '';
  }
});

// for file type
const saveFile = (base64File: string) => {
  imageUrl.value = base64File;
};
</script>

<style lang="scss">
.dynamic-field {
  margin-bottom: 0.5rem;
}
</style>
