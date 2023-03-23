<template>
  <v-card class="modal">
    <v-card-actions>
      <v-btn
        @click="$emit('close-modal')"
        color="primary"
        class="modal__close-btn"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text class="modal__title"> {{ title }} </v-card-text>

    <v-card-item class="modal__content">
      <!-- renders wrapped content -->
      <slot></slot>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.modal {
  min-height: 20rem;
  min-width: 20rem;

  &__title {
    align-self: center;
    padding: 0 !important;
  }

  &__close-btn {
    margin-left: auto;
  }

  &__content {
    margin-bottom: 2rem;
  }
}
</style>
