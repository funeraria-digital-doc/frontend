<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <div v-for="field in fields" :key="field.name">
      <dynamic-field-input :field="field" />
    </div>

    <v-btn type="submit" class="mt-2">{{ actionBtnLabel }}</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, type PropType } from "vue";
import type { DynamicField } from "../../../models/dynamicField.model";
import DynamicFieldInput from "./DynamicFieldInput/dynamicFieldInput.vue";
import { checkDuplicateNames } from "./dynamicForm.utils";

export default defineComponent({
  name: "DynamicForm",
});
</script>

<script lang="ts" setup>
const props = defineProps({
  fields: {
    type: Array as PropType<Array<DynamicField>>,
    required: true,
  },
  actionBtnLabel: {
    type: String,
    required: true,
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
  if (checkDuplicateNames(props.fields)) {
    console.error("Dynamic Form - Fields with duplicated names");
  }
});
</script>

<style lang="scss"></style>
