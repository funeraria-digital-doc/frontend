<template>
  <v-footer>
    {{ new Date().getFullYear() }} — &nbsp;<strong>Funerária Digital Doc ®</strong>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
  setup() {},
});
</script>

<style lang="scss">
.v-footer {
  max-height: 2rem;
}
</style>
