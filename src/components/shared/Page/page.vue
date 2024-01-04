<template>
  <div class="page">
    <div class="d-flex" style="justify-content: space-between">
      <h1 class="page__title text-h6 text-md-h5 text-lg-h4">{{ title }}</h1>

      <v-btn
        v-if="back"
        class="page__back-btn"
        type="button"
        dark
        @click="backRedirect(back)"
      >
        Voltar
      </v-btn>
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
  &__back-btn {
    margin-right: 1rem;
  }
}
</style>
