<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <div v-for="(field, index) in fields" :key="field.name">
      <template v-for="subtitle in subtitles" :key="subtitle.index">
        <form-subtitle v-if="index === subtitle.index" :subtitle="subtitle" />
      </template>

      <dynamic-field-input :field="field" />
    </div>

    <v-btn type="submit" class="mt-2">{{ actionBtnLabel }}</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, type PropType } from "vue";

export default defineComponent({
  name: "DynamicForm",
});
</script>

<script lang="ts" setup>
import type { DynamicField } from "../../../models/dynamicField.model";
import DynamicFieldInput from "./DynamicFieldInput/dynamicFieldInput.vue";
import {
  checkDuplicateNames,
  checkSubtitlesDuplicateIndexes,
} from "./dynamicForm.utils";
import formSubtitle from "./FormSubtitle/formSubtitle.vue";
import type { FormSubtitle } from "@/models/formSubtitle.form";

const props = defineProps({
  fields: {
    type: Array as PropType<Array<DynamicField>>,
    required: true,
  },
  actionBtnLabel: {
    type: String,
    required: true,
  },
  subtitles: {
    type: Array as PropType<Array<FormSubtitle>>,
    required: false,
  },
});

const emit = defineEmits(["on-submit"]);
const form = ref();

const onSubmit = async (input: any) => {
  const { valid } = await form.value.validate();

  if (valid) {
    const values: any = {};

    for (var i = 0; i < props.fields.length; i++) {
      const fieldName = input.target[i].id;

      if (
        props.fields.find((i) => i.name === fieldName)?.input === "checkbox"
      ) {
        values[fieldName] = input.target[i].checked;
      } else {
        values[fieldName] = input.target[i]._value;
      }
    }

    emit("on-submit", values);
  }
};

onMounted(() => {
  checkDuplicateNames(props.fields);
  checkSubtitlesDuplicateIndexes(props.subtitles);
});
</script>

<style lang="scss"></style>
