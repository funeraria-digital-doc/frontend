<template>
  <div>
    <v-snackbar
      v-model="hasMessage"
      :timeout="4000"
      location="top right"
      :color="color"
      ref="snackbar"
      vertical
      multi-line
    >
      <div v-html="message"></div>
      <p v-html="subMessage"></p>
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
const hasMessage = ref(false);
const message = ref('');
const subMessage = ref('');
const color = ref('');
const snackbar = ref(null);

defineExpose({
  showSnackbar,
});
function showSnackbar(
  messageProp: string,
  subMessageProp: string,
  isSuccessProp: boolean
) {
  message.value = ''
  subMessage.value = ''
  if (messageProp) {
    message.value = messageProp;
  }
  if (subMessageProp) {
    subMessage.value = subMessageProp;
  }
  if (isSuccessProp) {
    color.value = 'green-darken-2';
  } else {
    color.value = 'red-darken-2';
  }
  hasMessage.value = true;
}
</script>
