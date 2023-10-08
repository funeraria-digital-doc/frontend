<template>
  <div class="page">
    <div class="d-flex" style="justify-content: space-between">
      <h1 class="page__title text-h6 text-md-h5 text-lg-h4">{{ title }}</h1>
      <v-btn
        v-if="back"
        type="button"
        dark
        class="mb-2 d-flex align-self-center"
        color="primary"
        @click="backRedirect(back)"
        >Voltar</v-btn
      >
    </div>

    <!-- renders wrapped content -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';

defineProps({
  title: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: false,
  },
});
</script>
<script lang="ts">
function backRedirect(link: string) {
  router.push({ name: link });
}
</script>

<style lang="scss">
.page {
  &__title {
    margin-bottom: 1rem;
  }
}
</style>
