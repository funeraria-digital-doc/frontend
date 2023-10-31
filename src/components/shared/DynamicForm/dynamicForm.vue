<template>
  <v-form ref="form" @submit.prevent="onSubmit" class="dynamic-form__form">
    <div v-for="(fieldsGroup, indexI) in fieldsGroups" :key="indexI">
      <h6
        v-if="fieldsGroup.title"
        class="form-subtitle text-h6 dynamic-form__group-title"
      >
        {{ fieldsGroup.title }}
      </h6>

      <v-row no-gutters class="dynamic-form__row">
        <v-col
          v-for="(field, indexJ) in fieldsGroup.fields"
          class="pa-2"
          :key="indexJ"
          :cols="12"
          :sm="fieldsGroup.sm ?? 12"
        >
          <dynamic-field-input
            :field="field"
            :errorMessages="errorMessage(field.name)"
          />
        </v-col>
      </v-row>
    </div>

    <v-btn type="submit" class="mt-10" color="primary" size="large">
      {{ actionBtnLabel }}
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, type PropType } from 'vue';

export default defineComponent({
  name: 'DynamicForm',
});
</script>

<script lang="ts" setup>
import DynamicFieldInput from './DynamicFieldInput/dynamicFieldInput.vue';
import type { FormFieldsGroup } from './dynamicForm.models';
import { checkDuplicateNamesFormFields } from './dynamicForm.utils';

const props = defineProps({
  fieldsGroups: {
    type: Array as PropType<Array<FormFieldsGroup>>,
    required: true,
  },
  actionBtnLabel: {
    type: String,
    required: true,
  },
  errorMessages: {
    type: Object,
  },
});

const emit = defineEmits(['on-submit']);

const form = ref();

const errorMessage = (fieldName: string) =>
  (props.errorMessages ?? {})[fieldName];

const onSubmit = async (input: any) => {
  const { valid } = await form.value.validate();

  if (valid) {
    const values: any = {};
    const data = new FormData(input.target);

    [...data.entries()].forEach((entry) => {
      values[entry[0]] =
        entry[1] instanceof File
          ? input.target[entry[0]].attributes.value
          : entry[1];
    });

    emit('on-submit', values);
  }
};

onMounted(() => {
  checkDuplicateNamesFormFields(props.fieldsGroups);
});
</script>

<style lang="scss">
.dynamic-form {
  &__form {
    width: 100%;
  }

  &__group-title {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
