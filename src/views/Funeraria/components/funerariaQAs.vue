<template>
  <div class="funeraria-qas__container">
    <h4 class="funeraria-qas__title text-h4">Perguntas frequentes</h4>

    <div class="funeraria-qas__accordion">
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          v-for="(qa, i) in qas"
          :key="i"
          :title="qa.question"
          :text="qa.answer"
        ></v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FunerariaQA } from '@/models/funeraria.model';
import { defineProps, type PropType } from 'vue';

defineProps({
  qas: {
    type: Array as PropType<FunerariaQA[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.funeraria-qas {
  &__container {
    margin: 3vw 12vw;
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  &__accordion {
    width: 100%;
    box-shadow: rgba(245, 245, 245, 0.2) 0px 4px 12px;
    margin-bottom: 2vw;
  }
}
</style>
