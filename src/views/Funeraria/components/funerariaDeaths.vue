<template>
  <div class="funeraria-deaths__container">
    <h4 class="funeraria-deaths__title text-h4">Mortuário</h4>

    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(deathsGroup, i) in sliceArray(deaths, elementsPerGroup)"
        :key="i"
      >
        <div class="funeraria-deaths__card-container">
          <div v-for="(death, j) in deathsGroup" :key="`card_${i}_${j}`">
            <div class="funeraria-deaths__card">
              <img
                class="funeraria-deaths__card-image"
                :src="death.image"
                alt="Imagem do falecido"
              />
              <h5 class="funeraria-deaths__card-name">{{ death.name }}</h5>
              <h6 class="funeraria-deaths__card-date">{{ death.date }}</h6>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import { useMedia } from '@/composables/useMedia';
import type { FunerariaDeath } from '@/models/funeraria.model';
import { defineProps, ref, type PropType, watch } from 'vue';
import { sliceArray } from '@/utils/array';

defineProps({
  deaths: {
    type: Array as PropType<FunerariaDeath[]>,
    required: true,
  },
});

const { isDesktopView, isMobileView } = useMedia();

const getElementsPerGroup = (isMobileView: boolean, isDesktopView: boolean) =>
  isMobileView ? 1 : !isDesktopView ? 2 : 3;

const elementsPerGroup = ref(
  getElementsPerGroup(isMobileView.value, isDesktopView.value)
);

watch([isDesktopView, isMobileView], ([newIsDesktopView, newIsMobileView]) => {
  elementsPerGroup.value = getElementsPerGroup(
    newIsMobileView,
    newIsDesktopView
  );
});
</script>

<style scoped lang="scss">
.funeraria-deaths {
  &__container {
    margin: 3vw 12vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 2vw !important;
    margin-bottom: 1vw;
    font-weight: bold;
  }

  &__card-container {
    display: flex;
    margin-inline: 5vw;
    place-content: space-evenly;
    gap: 2vw;
  }

  &__card {
    color: white;
    margin-bottom: 3vw;
  }

  &__card-image {
    object-fit: cover;
    width: 18vw;
    height: 20vw;
  }

  &__card-name {
    font-size: 1vw !important;
    font-weight: bold;
    margin-top: 0.7vw;
    margin-bottom: 0.3vw;
  }

  &__card-date {
    font-size: 0.7vw !important;
    height: 3vw;
  }
}

@media screen and (max-width: 1024px) {
  .funeraria-deaths {
    &__title {
      font-size: 3vw !important;
    }

    &__card-image {
      width: 28vw;
      height: 32vw;
    }
  }
}

.v-carousel {
  height: auto !important;
}
</style>
