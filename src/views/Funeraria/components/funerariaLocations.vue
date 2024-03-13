<template>
  <div class="funeraria-locations__container">
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(location, i) in locations" :key="i">
        <div>
          <div class="funeraria-locations__map">
            <l-map
              :zoom="16"
              :useGlobalLeaflet="false"
              :center="location.coords"
            >
              <l-tile-layer :url="mapLayer" />
              <l-marker :lat-lng="location.coords" />
            </l-map>
          </div>

          <div class="funeraria-locations__card">
            <div class="funeraria-locations__info">
              <p class="funeraria-locations__info-town">
                {{ location.town }}
              </p>
              <p class="funeraria-locations__info-address">
                {{ location.address }}
              </p>
            </div>

            <a
              class="funeraria-locations__linkout"
              :href="googleMapsLink(location.address)"
              target="_blank"
            >
              <img
                class="funeraria-locations__linkout-logo"
                src="@/assets/google_maps.png"
              />
              <p class="funeraria-locations__linkout-text">Direções</p>
            </a>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script lang="ts">
import type { FunerariaLocation } from '@/models/funeraria.model';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'FunerariaMap',
  props: {
    locations: {
      type: Array as PropType<FunerariaLocation[]>,
      required: true,
    },
  },
});
</script>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

import 'leaflet/dist/leaflet.css';

const mapLayer =
  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

const googleMapsLink = (address: string) =>
  `https://www.google.com/maps/search/${encodeURI(address)}`;
</script>

<style scoped lang="scss">
.funeraria-locations {
  &__container {
    margin-bottom: 2vw;
  }

  &__map {
    height: 30rem;
  }

  &__card {
    position: absolute;
    top: 0;
    z-index: 999;
    display: flex;
    background-color: white;
    color: black;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    border-radius: 2%;
    margin-left: auto;
    margin-top: 1rem;
    margin-right: 1rem;
    right: 0;
  }

  &__info {
    max-width: 18vw;
  }

  &__info-town {
    font-weight: bold;
    font-size: 1.2rem;
  }

  &__info-address {
    font-weight: 300;
    line-height: normal;
  }

  &__linkout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__linkout-text {
    color: black;
    font-size: 0.8rem;
    font-weight: 300;

    &:hover {
      text-decoration: underline;
      color: blue;
    }
  }

  &__linkout-logo {
    width: 2rem;
  }
}
@media screen and (max-width: 1024px) {
  .funeraria-locations {
    &__card {
      flex-direction: column;
    }

    &__info {
      max-width: 28vw;
    }
  }
}
.v-carousel {
  height: auto !important;
}
</style>
