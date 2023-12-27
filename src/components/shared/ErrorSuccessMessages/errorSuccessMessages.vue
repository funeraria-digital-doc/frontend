<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      location="top right"
      :color="color"
      vertical
      multi-line
    >
      <div>{{ message }}</div>
      <p>{{ subMessage }}</p>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ErrorSuccessMessage',
});
</script>

<script lang="ts" setup>
import { useSnackBar } from '@/composables/snackBar';

const { snackBarModel, message, subMessage, color, timeout } = useSnackBar();
const snackbar = ref(snackBarModel);
</script>
