<template>
  <div class="funeraria-services__container">
    <h4 class="funeraria-services__title text-h4">Serviços</h4>

    <p class="funeraria-services__desc text-subtitle-1 font-weight-light">
      {{ serviceDescription }}
    </p>

    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(serviceGroup, i) in sliceArray(services, elementsPerGroup)"
        :key="i"
      >
        <div class="funeraria-services__card-container">
          <div v-for="(service, j) in serviceGroup" :key="`card_${i}_${j}`">
            <div class="funeraria-services__card">
              <img
                class="funeraria-services__card-image"
                :src="service.image"
                alt="Imagem do serviço"
              />
              <h5 class="funeraria-services__card-text">{{ service.title }}</h5>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup lang="ts">
import type { FunerariaService } from '@/models/funeraria.model';
import { useMedia } from '@/composables/useMedia';
import { ref, type PropType } from 'vue';
import { watch } from 'vue';
import { sliceArray } from '@/utils/array';

defineProps({
  serviceDescription: {
    type: String,
    required: true,
  },
  services: {
    type: Array as PropType<FunerariaService[]>,
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
.funeraria-services {
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

  &__desc {
    font-size: 1vw !important;
    margin-bottom: 3vw;
  }

  &__card-container {
    display: flex;
    margin-inline: 5vw;
    place-content: space-evenly;
    gap: 2vw;
  }

  &__card {
    background-color: white;
    color: black;
    margin-bottom: 3vw;
    border-radius: 5%;
    box-shadow: rgba(245, 245, 245, 0.2) 0px 4px 12px;
  }

  &__card-image {
    object-fit: cover;
    width: 18vw;
    height: 12vw;
    border-radius: 5% 5% 0 0;
  }

  &__card-text {
    font-size: 1vw !important;
    font-weight: bold;
    margin-top: 0.5vw;
    text-align: center;
    height: 3vw;
  }
}

@media screen and (max-width: 1024px) {
  .funeraria-services {
    &__title {
      font-size: 3vw !important;
    }

    &__desc {
      font-size: 2vw !important;
    }

    &__card-image {
      width: 28vw;
      height: 18vw;
    }
  }
}

.v-carousel {
  height: auto !important;
}
</style>
