<template class="page">
  <h1 class="page__title text-h6 text-md-h5 text-lg-h4">{{ title }}</h1>
  <!-- renders wrapped content -->
  <slot></slot>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<script lang="ts"></script>

<style lang="scss">
.page {
  &__title {
    margin-bottom: 1rem;
  }
}
</style>
