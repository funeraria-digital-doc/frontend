<template>
  <v-divider v-if="!subtitle.hideDivider"></v-divider>

  <h6 class="form-subtitle text-h6">{{ subtitle.text }}</h6>
</template>

<script lang="ts">
import type { FormSubtitle } from '@/models/formSubtitle.form';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'FormSubtitle',
  props: {
    subtitle: {
      type: Object as PropType<FormSubtitle>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.form-subtitle {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
</style>
