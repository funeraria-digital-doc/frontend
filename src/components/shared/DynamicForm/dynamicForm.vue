<template>
  <v-expansion-panels style="width: 100%;">
    <v-form ref="form" @submit.prevent="onSubmit">
      <div v-for="(fieldsGroup, indexI) in fieldsGroups" :key="indexI">
        <v-expansion-panel >
          <v-expansion-panel-title>
            <template v-slot:default="{ expanded }">
              {{ fieldsGroup.title }}
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-for="(field, indexJ) in fieldsGroup.fields" :key="indexJ">
              <dynamic-field-input
                :field="field"
                :errorMessages="errorMessages"
              />
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </div>

      <v-btn type="submit" class="mt-2">{{ actionBtnLabel }}</v-btn>
    </v-form>
  </v-expansion-panels>
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
import formSubtitle from './FormSubtitle/formSubtitle.vue';

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

const onSubmit = async (input: any) => {
  const { valid } = await form.value.validate();

  if (valid) {
    const values: any = {};
    let count = 0;

    // form input return the full fields list
    props.fieldsGroups.forEach((fieldsGroup) => {
      const fieldsLength = fieldsGroup.fields.length;

      for (var i = count; i < count + fieldsLength; i++) {
        const fieldName = input.target[i].id;

        switch (fieldsGroup.fields.find((f) => f.name === fieldName)?.input) {
          case 'checkbox':
            values[fieldName] = input.target[i].checked;
            break;
          case 'file':
            values[fieldName] = input.target[i].files[0];
            break;
          default:
            values[fieldName] = input.target[i].value;
            break;
        }
      }

      count += fieldsLength;
    });

    emit('on-submit', values);
  }
};

onMounted(() => {
  checkDuplicateNamesFormFields(props.fieldsGroups);
});
</script>

<style lang="scss"></style>
