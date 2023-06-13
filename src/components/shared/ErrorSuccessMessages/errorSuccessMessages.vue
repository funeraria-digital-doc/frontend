<template>
  <div>
    <v-snackbar
      v-model="hasMessage"
      :timeout="2000"
      location="top right"
      :color="color"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  name: 'ErrorSuccessMessage',
});
</script>

<script lang="ts" setup>
const props = defineProps(['isSuccess', 'hasMessage', 'message']);
const hasMessage = ref(false);
const message = ref('');
const color = ref('');
watch(
  () => props.hasMessage,
  (newValue) => {
    console.log('hasMessage changed:', newValue);
    hasMessage.value = newValue;
    message.value = props.message;
    if (props.isSuccess) {
      color.value = 'green-darken-2';
    } else {
      color.value = 'red-darken-2';
    }
  }
);
</script>
